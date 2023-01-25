
prototype.id = 'TraceabilitySuggested';
prototype.url = CONTEXTPATH + '/TraceabilitySuggested';
prototype.id1 = 'SeguimietoFormUnico';
prototype.id5 = 'FormUnicoSeguimietoSubiArchivo';
prototype.id4 = 'FormUnicoSeguimieto';
prototype.id6 = 'ADMSeguimietoSubiArchivo';
prototype.widthWindow = 1500;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.TraceabilitySuggested.TraceabilitySuggested', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.TraceabilitySuggested',

    requires: [
        'Ext.Praxis.controller.salesaudit.TraceabilitySuggested.TraceabilitySuggestedController',
        'Ext.Praxis.view.screens.ScrFormUnico',
        'Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimietoSubiArchivo',
        'Ext.Praxis.view.salesaudit.ADMReportForm.ADMSeguimietoSubiArchivo'
    ],

    controller: 'TraceabilitySuggestedController',

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
    items: [{
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
                                    iconCls: 'prx-icon-pdf',
                                    tooltip: 'Export to Pdf',
                                    listeners: {
                                        click: 'onSearchpdf'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-excel2',
                                    iconCls: 'prx-icon-excel', hidden: true,
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-excel3',
                                    iconCls: 'prx-icon-excel', hidden: true,
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler2'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-excel4',
                                    iconCls: 'prx-icon-excel', hidden: true,
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler3'
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
                                    iconCls: 'prx-icon-back',
                                    id: prototype.id + '-btn-back2',
                                    tooltip: 'Back',
                                    hidden: true,
                                    listeners: {
                                        click: 'onBackClick2'
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
                                                afterrender: 'onCmbSearchAfterRender',
                                                change: 'onCmbSelect'
                                            }
                                        },
                                        {
                                            width: 15, border: false
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'From month',
                                            id: prototype.id + '-txtFilterDateFrom',
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
                                            //editable: false,
                                            listConfig: {
                                                minWidth: 100
                                            },
                                            listeners: {
                                                afterrender: 'onCmbDateAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonth',
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
                                            //editable: false,
                                            listConfig: {
                                                minWidth: 90
                                            },
                                            listeners: {
                                                afterrender: 'onCmbMonthAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'From month',
                                            id: prototype.id + '-txtFilterDateTo',
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
                                            id: prototype.id + '-cmbDateToMonth',
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
                                            //editable: false,
                                            listConfig: {
                                                minWidth: 90
                                            },
                                            listeners: {
                                                afterrender: 'onCmbMonthAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIATA',
                                            width: 140,
                                            labelWidth: 30,
                                            fieldLabel: 'IATA',
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            enableKeyEvents: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            width: 15, border: false
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Type',
                                            id: prototype.id + '-Type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 40,
                                            labelClsExtra: 'prx-label-search',
                                            width: 150,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        },
                                        {
                                            width: 15, border: false
                                        },

                                        {
                                            xtype: 'checkbox',
                                            id: prototype.id + '-Summary',
                                            boxLabel: 'Summary?',
                                            checked: false,
                                            labelStyle: 'font-weight: bold;'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-country',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/, hidden: true,
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
                                            id: prototype.id + '-ComboSource',
                                            fieldLabel: 'Source',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 120,
                                            labelWidth: 50,
                                            labelAlign: 'right', hidden: true,
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
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
                    xtype: 'tabpanel', //fullscreen: true,
                    id: prototype.id + '-tabpanelPrincipal',
                    activeItem: 0,
                    autoScroll: false,
                    tabBar: false,
                    defaults: {
                        closable: false,
                        hideMode: 'display',
                        autoScroll: true
                    },
                    border: false,
                    layout: 'fit',
                    tabPosition: 'top',
                    items: [
                        {
                            xtype: 'panel', title: 'Detail Traceability',
                            id: prototype.id + '-contenedor-grid',
                            width: prototype.widthWindow,
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
                                            id: prototype.id + '-gridReport',
                                            columnLines: true,
                                            autoScroll: true,
                                            width: prototype.widthWindow,
                                            height: 300,
                                            features: [
                                                {
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                items: [
                                                    {text: 'Process </br> Date', dataIndex: 'A1672FPROC', width: 80/*renderer: 'OnColumnProcessingDateRenderer'*/},
                                                    {text: 'Year', dataIndex: 'A1672FPROC', width: 80, hidden: true},
                                                    {text: 'IATA', dataIndex: 'A1672AGENT', width: 80, hidden: true},
                                                    {text: 'Agency', dataIndex: 'A1672IATAO', width: 150, renderer: 'onRendererColumnAttr', hidden: true},
                                                    {text: 'Sales </br>Tkts', dataIndex: 'CANTTOT', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                    {text: 'SUGGESTED BPO',
                                                        columns: [
                                                            {text: 'Tkts', dataIndex: 'CANTADM', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'USD', dataIndex: 'ADMUSD', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                                        ]
                                                    },
                                                    {text: 'ACCEPTED AM',
                                                        columns: [
                                                            {text: 'Tkts', dataIndex: 'CANTADMACEP', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'USD', dataIndex: 'ADMACEPUSD', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                                            {text: '%', dataIndex: 'CANTADMACEPORC', width: 60, align: 'right'}
                                                        ]
                                                    },
                                                    {text: 'PENDING AM',
                                                        columns: [
                                                            {text: 'Tkts', dataIndex: 'CANTADMREV', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnPendienteDateRenderer'},
                                                            //{text: 'Tkts', dataIndex: 'CANTADMREV', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'USD', dataIndex: 'ADMREVUSD', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                                            {text: '%', dataIndex: 'CANTADMREVPORC', flex: 1, align: 'right'}
                                                        ]
                                                    },
                                                    {text: 'REJECTED AM',
                                                        columns: [
                                                            //{text: 'Tkts', dataIndex: 'CANTADMRECH', align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'Tkts', dataIndex: 'CANTADMRECH', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnRechazoDateRenderer'},
                                                            {text: 'USD', dataIndex: 'ADMRECHUSD', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                                            {text: '%', dataIndex: 'CANTADMRECHPORC', flex: 1, align: 'right'}
                                                        ]
                                                    },
                                                    {text: 'SPECIAL CASES',
                                                        columns: [
                                                            {text: 'Tkts', dataIndex: 'CANTADMENV', align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'USD', dataIndex: 'ADMENVUSD', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                                            {text: '%', dataIndex: 'CANTADMENVPORC', flex: 1, align: 'right'}
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
                                    id: prototype.id + '-CABgridReport2',
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
                                            id: prototype.id + '-gridReport2',
                                            columnLines: true,
                                            autoScroll: true,
                                            width: prototype.widthWindow,
                                            height: 300,
                                            features: [
                                                {
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                items: [
                                                    {text: 'Process </br> Date', dataIndex: 'A1672FPROC', width: 80/*renderer: 'OnColumnProcessingDateRenderer'*/},
                                                    {text: 'Year', dataIndex: 'A1672FPROC', width: 80, hidden: true},
                                                    {text: 'IATA', dataIndex: 'A1672AGENT', width: 80, hidden: true},
                                                    {text: 'Agency', dataIndex: 'A1672IATAO', width: 150, renderer: 'onRendererColumnAttr', hidden: true},
                                                    {text: 'DETAIL OF ACCEPTED AM',
                                                        columns: [
                                                            {text: 'Total Tkts', dataIndex: 'CANTADMACEP', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer2'},
                                                            {text: 'ADM Report',
                                                                columns: [
                                                                    {text: 'BSP', dataIndex: 'CANTABSP', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                                    {text: 'ARC', dataIndex: 'CANTARC', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                                    {text: 'ASR', dataIndex: 'CANTASR', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                                    {text: 'Sub Total', dataIndex: 'CANTOTAL', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnProcessingDateRenderer'}
                                                                    //{text: 'Justified <br> ADM <br> Report', dataIndex: 'CANTJUSTIADMREPORT', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'}
                                                                ]
                                                            },
                                                            {text: 'Pending <br> Grouping', dataIndex: 'CANTADMPENGROUP', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'Unregistered <br> Client', dataIndex: 'CANTADMSINCLIE', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'Justified', dataIndex: 'CANTADMJUSTI', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'Reaudited', dataIndex: 'CANTADMREUDITE', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'Authorized', dataIndex: 'CANTADMAUTORI', width: 90, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'Iata <br> Disabled', dataIndex: 'CANTADMIATADISA', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            // {text: 'Special<br> Cases', dataIndex: 'CANTADMGDS', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'},
                                                            {text: 'Sub Total', dataIndex: 'TOTALGROUP', width: 80, align: 'right', summaryType: 'sum', summaryRenderer: 'OnIntSummary', renderer: 'OnColumnIntRenderer'}
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
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Detail of suggested and status graphics',
                            id: prototype.id + '-PrincipalUser',
                            border: true, width: prototype.widthContenedor, autoScroll: true, height: prototype.heightWindow,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-aaa-form',
                                    width: prototype.widthContenedor,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart4',
                                            width: prototype.widthContenedor
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart5',
                                            width: prototype.widthContenedor
                                        }
                                    ]
                                }

                            ]//, listeners: {show: 'onclickshow'}
                        },
                        {
                            xtype: 'panel', title: ' Detail of accepted and approved graphics',
                            id: prototype.id + '-PrincipalUser2',
                            border: true, width: prototype.widthContenedor, autoScroll: true, height: prototype.heightWindow,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-aaa-form2',
                                    width: prototype.widthContenedor,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart1',
                                            width: prototype.widthContenedor
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart3',
                                            width: prototype.widthContenedor
                                        }

                                    ]
                                }

                            ]//, listeners: {show: 'onclickshow'}
                        },
                        /*{
                         xtype: 'panel', title: 'Detail of approved and billing graphics',hidden: true,
                         id: prototype.id + '-PrincipalUser3',
                         border: true, width: prototype.widthContenedor, autoScroll: true, height: prototype.heightWindow,
                         bodyStyle: 'background-color: transparent;',
                         defaults: {
                         border: false,
                         padding: '0px 5px 0px 5px'
                         },
                         padding: '1px 5px 1px 5px',
                         items: [
                         {
                         xtype: 'panel',
                         id: prototype.id + '-aaa-form3',
                         width: prototype.widthContenedor,
                         items: [
                         {
                         xtype: 'panel',
                         id: prototype.id + '-chart6',
                         width: prototype.widthContenedor
                         },
                         {
                         xtype: 'panel',
                         id: prototype.id + '-chart2',
                         width: prototype.widthContenedor
                         }]
                         }
                         
                         ]//, listeners: {show: 'onclickshow'}
                         },*/
                        {
                            xtype: 'panel', title: 'Detail of accepted and accumulated graphics',
                            id: prototype.id + '-PrincipalUser4',
                            border: true, width: prototype.widthContenedor, autoScroll: true, height: prototype.heightWindow,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-aaa-form4',
                                    width: prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-chart7',
                                            width: prototype.widthContenedor
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart8',
                                            width: prototype.widthContenedor
                                        }]
                                }

                            ]//, listeners: {show: 'onclickshow'}
                        },
                                /*{
                                 xtype: 'panel', title: 'Comparative billing usd year graphics',hidden: true,
                                 id: prototype.id + '-PrincipalUser5',
                                 border: true, width: prototype.widthContenedor, autoScroll: true, height: prototype.heightWindow,
                                 bodyStyle: 'background-color: transparent;',
                                 defaults: {
                                 border: false,
                                 padding: '0px 5px 0px 5px'
                                 },
                                 padding: '1px 5px 1px 5px',
                                 items: [
                                 {
                                 xtype: 'panel',
                                 id: prototype.id + '-aaa-form5',
                                 width: prototype.widthContenedor,
                                 items: [{
                                 xtype: 'panel',
                                 id: prototype.id + '-chart9',
                                 width: prototype.widthContenedor
                                 },
                                 {
                                 xtype: 'panel',
                                 id: prototype.id + '-chart10',
                                 width: prototype.widthContenedor
                                 }]
                                 }
                                 
                                 ]//, listeners: {show: 'onclickshow'}
                                 },*/
                                /*{
                                 xtype: 'panel', title: 'Comparative billing quantity year graphics',hidden: true,
                                 id: prototype.id + '-PrincipalUser6',
                                 border: true, width: prototype.widthContenedor, autoScroll: true, height: prototype.heightWindow,
                                 bodyStyle: 'background-color: transparent;',
                                 defaults: {
                                 border: false,
                                 padding: '0px 5px 0px 5px'
                                 },
                                 padding: '1px 5px 1px 5px',
                                 items: [
                                 {
                                 xtype: 'panel',
                                 id: prototype.id + '-aaa-form6',
                                 width: prototype.widthContenedor,
                                 items: [{
                                 xtype: 'panel',
                                 id: prototype.id + '-chart11',
                                 width: prototype.widthContenedor
                                 },
                                 {
                                 xtype: 'panel',
                                 id: prototype.id + '-chart12',
                                 width: prototype.widthContenedor
                                 }]
                                 }
                                 
                                 ]//, listeners: {show: 'onclickshow'}
                                 }*/
                    ]
                },
                {
                    xtype: 'panel',
                    width: prototype.widthWindow,
                    id: prototype.id + '-CABgridReport3', hidden: true,
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
                            id: prototype.id + '-gridReport3',
                            columnLines: true,
                            autoScroll: true,
                            width: prototype.widthWindow,
                            height: 400,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {
                                        text: 'date',
                                        dataIndex: 'A2548FREGI',
                                        width: 80,
                                        renderer: 'OnColumnApplicationRenderer'
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A2548FLAG',
                                        width: 120
                                    },
                                    {text: 'Ticket Qty',
                                        columns: [
                                            {
                                                text: 'ADM',
                                                columns: [
                                                    {
                                                        text: 'ARC',
                                                        dataIndex: 'A2548CATNNTC',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'ASR',
                                                        dataIndex: 'A2548CATNFAC',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'BSP',
                                                        dataIndex: 'A2548CATNNTD',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'A2548CATNDOCUM',
                                                        width: 100,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }/*,
                                                     {
                                                     text: '%',
                                                     dataIndex: '',
                                                     width: 50,
                                                     align: 'right'
                                                     }*/
                                                ]
                                            }/*, {
                                             text: 'ACM',
                                             columns: [
                                             {
                                             text: 'ARC',
                                             dataIndex: 'CANTARCACM',
                                             width: 80,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                             },
                                             {
                                             text: 'ASR',
                                             dataIndex: 'CANTASRACM',
                                             width: 80,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                             },
                                             {
                                             text: 'BSP',
                                             dataIndex: 'CANTBSPACM',
                                             width: 80,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                             },
                                             {
                                             text: 'Total',
                                             dataIndex: 'CANTTOTALACM',
                                             width: 100,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                             },
                                             {
                                             text: '%',
                                             dataIndex: '',
                                             width: 50,
                                             align: 'right'
                                             }
                                             ]
                                             }*/

                                        ]


                                    },
                                    {text: 'Ticket amount USD',
                                        columns: [
                                            {
                                                text: 'ADM',
                                                columns: [
                                                    {
                                                        text: 'ARC',
                                                        dataIndex: 'A2548IVACA',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'ASR',
                                                        dataIndex: 'A2548IVACS',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'BSP',
                                                        columns: [
                                                            {
                                                                text: 'BSP',
                                                                dataIndex: 'A2548IVACD',
                                                                width: 130,
                                                                align: 'right',
                                                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                            },
                                                            {
                                                                text: 'Charges',
                                                                dataIndex: 'TTCARGO',
                                                                width: 130,
                                                                align: 'right',
                                                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                            },
                                                            {
                                                                text: 'Iva Char.',
                                                                dataIndex: 'TTIVACARGO',
                                                                width: 130,
                                                                align: 'right',
                                                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                            }

                                                        ]
                                                    },
                                                    {
                                                        text: 'Pending <br> Grouping',
                                                        dataIndex: 'PENDIGROUP',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Unregistered <br> Client',
                                                        dataIndex: 'PENDISCLIE',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    /*{
                                                     text: 'BSP',
                                                     dataIndex: 'A2548IVACD',
                                                     width: 130,
                                                     align: 'right',
                                                     summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                     },*/
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'A2548TOTAA',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    }

                                                ]
                                            }/*, {
                                             text: 'ACM',
                                             columns: [
                                             {
                                             text: 'ARC',
                                             dataIndex: 'TRFPAG',
                                             width: 120,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                             },
                                             {
                                             text: 'ASR',
                                             dataIndex: 'A2548SUMACM',
                                             width: 120,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                             },
                                             {
                                             text: 'BSP',
                                             dataIndex: 'TARIFA',
                                             width: 120,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                             },
                                             {
                                             text: 'Total',
                                             dataIndex: 'A2548TOTAD',
                                             width: 130,
                                             align: 'right',
                                             summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                             }
                                             
                                             ]
                                             }*/

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
                            },
                            listeners: {
                                afterrender: 'OnLoadDataPendienteAfterrender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: prototype.widthWindow,
                    id: prototype.id + '-CABgridReport5', hidden: true,
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
                            id: prototype.id + '-gridReportReason',
                            columnLines: true,
                            autoScroll: true,
                            width: prototype.widthWindow,
                            height: 400,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {
                                        text: 'date',
                                        dataIndex: 'A2548FREGI',
                                        width: 80,
                                        renderer: 'OnColumnApplicationRenderer'
                                    },
                                    {
                                        text: 'Reason',
                                        dataIndex: 'A2548FLAG',
                                        width: 120
                                    },
                                    {text: 'Ticket Qty',
                                        columns: [
                                            {
                                                text: 'ADM',
                                                columns: [
                                                    {
                                                        text: 'ARC',
                                                        dataIndex: 'A2548CATNNTC',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'ASR',
                                                        dataIndex: 'A2548CATNFAC',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'BSP',
                                                        dataIndex: 'A2548CATNNTD',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'A2548CATNDOCUM',
                                                        width: 100,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }/*,
                                                     {
                                                     text: '%',
                                                     dataIndex: '',
                                                     width: 50,
                                                     align: 'right'
                                                     }*/
                                                ]
                                            }

                                        ]


                                    },
                                    {text: 'Ticket amount USD',
                                        columns: [
                                            {
                                                text: 'ADM',
                                                columns: [
                                                    {
                                                        text: 'ARC',
                                                        dataIndex: 'A2548IVACA',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'ASR',
                                                        dataIndex: 'A2548IVACS',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'BSP',
                                                        dataIndex: 'A2548IVACD',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'A2548TOTAA',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    }

                                                ]
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
                            },
                            listeners: {
                                afterrender: 'OnLoadDataPendienteAfterrender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: prototype.widthWindow,
                    id: prototype.id + '-CABgridReport4', hidden: true,
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
                            id: prototype.id + '-gridAdmreport',
                            width: prototype.widthWindow,
                            autoScroll: true,
                            height: 480,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket', dataIndex: 'A2548TIKET', width: 100},
                                    {text: 'Memo<br>Number', dataIndex: 'A2548NMEMO', width: 80},
                                    {text: 'Amount', dataIndex: 'A2548NETO', width: 100, renderer: 'onColumnAmountRenderer'},
                                    {text: 'IATA', dataIndex: 'A2548IATA', width: 70},
                                    {text: 'Agency', dataIndex: 'AGENCY', width: 120, renderer: 'onRendererColumnAttr'},
                                    {text: 'Cur.', dataIndex: 'A2548MDA', width: 40},
                                    {text: 'Country', dataIndex: 'A2548PAIS', width: 60},
                                    {text: 'Source', dataIndex: 'A2548FTE', width: 60},
                                    {text: 'Transaction', dataIndex: 'A2548TRNCO', width: 80, sortable: false},
                                    {
                                        text: 'Types', dataIndex: 'A2548TRNCU', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'System<br>Date', dataIndex: 'A2548FREGI', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Accounting<br>Date', dataIndex: 'A2548FCONT', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Issued<br>Date', dataIndex: 'A2548FVTA', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Bsplink <br> Date', dataIndex: 'A2548FFILE', width: 85,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'User', dataIndex: 'A2548REGIS', width: 100},
                                    {text: 'Reason 1', dataIndex: 'A2548DESC1', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Origin', dataIndex: 'A2548BASE', width: 100, renderer: 'onRendererColumnBase'},
                                    {
                                        text: 'Area', dataIndex: 'A2548AREA', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'Status', dataIndex: 'A2548FLAG', width: 120, renderer: 'onRendererColumnStatus'},
                                    {text: 'Connexion', dataIndex: 'A2548NMERF', width: 120, renderer: 'onRendererColumnAttr'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
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
                },
                {
                    xtype: 'panel',
                    width: prototype.widthWindow,
                    id: prototype.id + '-CABgridReport6', hidden: true,
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
                            id: prototype.id + '-gridDataSugges',
                            width: 1430,
                            height: 480,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket Nbr', dataIndex: 'strTicket', width: 110},
                                    {text: 'Source', dataIndex: 'A1672FUENT', width: 55},
                                    {text: 'Channel', dataIndex: 'A1672CANAL', width: 60},
                                    {text: 'Country', dataIndex: 'A1672PAIVT', width: 60},
                                    {text: 'IATA', dataIndex: 'A1672AGENT', width: 70},
                                    {text: 'Trans.', dataIndex: 'A1672TRNCU', width: 50},
                                    {text: 'Doc. <br> Type', dataIndex: 'A1672TDOC', width: 40},
                                    {text: 'Issue <br> Date', dataIndex: 'A1672FVENT', width: 70},
                                    {text: 'Processing<br>Date', dataIndex: 'A1672FPROC', width: 80},
                                    {text: 'System<br>Date', dataIndex: 'A1672FREGI', width: 70},
                                    {text: 'Suggested<br>Date', dataIndex: 'A1672FREVI', width: 75},
                                    {text: 'Itinerary', dataIndex: 'A1672ITIN', flex: 1, renderer: 'onRendererColumnAttr'},
                                    {text: 'FCMI', dataIndex: 'A1672FCMI', width: 30},
                                    {text: 'Farebasis', dataIndex: 'A1672FBASI', width: 70, renderer: 'onRendererColumnAttr'},
                                    {text: 'Total Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Curr.', dataIndex: 'A1672MONTT', width: 50},
                                            {text: 'Airline', dataIndex: 'A1672TTMIA', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Agent', dataIndex: 'A1672TTAGT', width: 80, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Difference', dataIndex: 'A1672TTDIF', width: 80, renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'Tour Code', dataIndex: 'A1672CODIT', width: 88, renderer: 'onRendererColumnAttr'},
                                    {text: 'Status', dataIndex: 'A1672FLADM', width: 88, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            value = data.A1672FLADM === 'Y' ? 'Suggested' : data.A1672FLADM === 'N' ? 'Rejected' : data.A1672FLADM === 'C' ? 'Unregistered Client' : data.A1672FLADM === 'D' ? 'IATA disabled' : data.A1672FLADM === 'T' ? 'Reaudited BPO' : data.A1672FLADM;
                                            return value;
                                        }
                                    },
                                    {text: 'PNR', dataIndex: 'A1672PNR', width: 70},
                                    {text: 'Email', dataIndex: 'A1672CORREO', width: 70, renderer: 'onRendererColumnCorreo'},
                                    {text: 'Agent', dataIndex: 'A1672BAGFT', width: 70},
                                    {text: 'Reason Code', dataIndex: 'A1672ERROR', renderer: 'onRendererColumnAttr'},
                                    {text: 'Reason', dataIndex: 'A1580DESC2', width: 70, renderer: 'onRendererColumnAttr'}
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
                    width: prototype.widthWindow,
                    id: prototype.id + '-CABgridReport7', hidden: true,
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
                            id: prototype.id + '-gridReportIata',
                            columnLines: true,
                            autoScroll: true,
                            width: prototype.widthWindow,
                            height: 400,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {
                                        text: 'date',
                                        dataIndex: 'A2548FREGI',
                                        width: 80

                                    },
                                    //{text: 'IATA',dataIndex: 'A2548FLAG', width: 120},
                                    {text: 'IATA', dataIndex: 'A2548IATA', width: 70, renderer: 'OnColumnApplicationRenderer'},
                                    {text: 'Agency', dataIndex: 'AGENCY', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Ticket Qty',
                                        columns: [
                                            {
                                                text: 'ADM',
                                                columns: [
                                                    {
                                                        text: 'ARC',
                                                        dataIndex: 'A2548CATNNTC',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'ASR',
                                                        dataIndex: 'A2548CATNFAC',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'BSP',
                                                        dataIndex: 'A2548CATNNTD',
                                                        width: 80,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'A2548CATNDOCUM',
                                                        width: 100,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }/*,
                                                     {
                                                     text: '%',
                                                     dataIndex: '',
                                                     width: 50,
                                                     align: 'right'
                                                     }*/
                                                ]
                                            }

                                        ]


                                    },
                                    {text: 'Ticket amount USD',
                                        columns: [
                                            {
                                                text: 'ADM',
                                                columns: [
                                                    {
                                                        text: 'ARC',
                                                        dataIndex: 'A2548IVACA',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'ASR',
                                                        dataIndex: 'A2548IVACS',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'BSP',
                                                        dataIndex: 'A2548IVACD',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'A2548TOTAA',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    }

                                                ]
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
                            },
                            listeners: {
                                afterrender: 'OnLoadDataPendienteAfterrender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pagginator-legend',
                    hidden: true,
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
                                    text: 'Total',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lblRowsTotalADM',
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

