
prototype.id = 'SuggestedDocuments';
prototype.url = CONTEXTPATH + '/SuggestedDocuments';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.SuggestedDocuments.SuggestedDocuments',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.SuggestedDocuments',

    requires:[
        'Ext.Praxis.controller.salesaudit.SuggestedDocuments.SuggestedDocumentsController'
    ],

    controller: 'SuggestedDocumentsController',

    id: prototype.id + '-Contenedor',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults:{
        border: false
    },
    listeners:{
        beforeShow: 'OnBeforeShow'
    },
    items:[{
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: 1300, //prototype.widthContenedor,
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
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
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
                                                afterrender: 'onCmbSearchAfterRender'
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
                                            editable: false,
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
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: '[SELECTED]',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 0,
                                           width: 80,
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
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: '[SELECTED]',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 0,
                                           width: 80,
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
                                            id: prototype.id + '-country',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-Currency',
                                            fieldLabel: 'Currency',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
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
                                    id: prototype.id + '-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboSource',
                                            fieldLabel: 'Source',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 120,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbType',
                                            fieldLabel: 'Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 180,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbCmbTypeAfterRender',
                                                specialkey: 'onSearchkey',
                                                change: 'onCmbSearchChange'
                                            }
                                        },{
                                            xtype: 'combo',
                                            id: prototype.id + '-txtUser',
                                            fieldLabel: 'Auditor',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 180,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            width: 15, border: false
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
                            id: prototype.id + '-gridReport',
                            columnLines: true,
                            autoScroll: true,
                            width: 1300,
                            height: 300,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {
                                        text: 'System / </br> Processing </br>date',
                                        dataIndex: 'A1672FPROC',
                                        width: 80,
                                        renderer: 'OnColumnProcessingDateRenderer'
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A1672FUENT', width: 60, sortable: false,
                                         renderer: 'OnColumnSourceDateRenderer'
                                    },
                                    {text: 'TKTs Qty',
                                        columns: [
                                            {
                                                text: 'Suggested',
                                                dataIndex: 'SUGGESTQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnSuggestedRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'SUGGESTPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Accepted',
                                                dataIndex: 'ACCEPTQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnAcceptedRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'ACCEPTPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Reaudited',
                                                dataIndex: 'REAUTQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnReauditedRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'REAUTPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Rejected',
                                                dataIndex: 'REJETQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnRejectedRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'REJETPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Justified',
                                                dataIndex: 'JUSTIQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnJustifiedRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'JUSTIPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Authorized',
                                                dataIndex: 'AUTHOQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnAuthorizedRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'AUTHOPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Total',
                                                dataIndex: 'TOTAL',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000,00');
                                                }
                                            }
                                        ]


                                    },
                                    {
                                        text: 'Cur.', dataIndex: 'A1672CURRENCY', width: 40, sortable: false
                                    },
                                    {
                                        text: 'Country', //hidden: true,
                                        dataIndex: 'A1672PAIVT',
                                        width: 60
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A1672AGENT', width: 70, sortable: false
                                    },
                                    {
                                        text: 'Agency', dataIndex: 'A1672NAGENCY', width: 150,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672NAGENCY + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A1672REVIS',
                                        width: 100,
                                        align: 'left'
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
                        },
                        {
                            xtype: 'grid',hidden: true,
                            id: prototype.id + '-gridReport2',
                            columnLines: true,
                            autoScroll: true,
                            width: 1300,
                            height: 300,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {
                                        text: 'System / </br> Processing </br>date',
                                        dataIndex: 'A1672FPROC',
                                        width: 80,
                                        renderer: 'OnColumnProcessing2DateRenderer'
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A1672FUENT', width: 60, sortable: false,
                                        renderer: 'OnColumnSource2DateRenderer'
                                    },
                                    {text: 'TKTs Qty',
                                        columns: [
                                            {
                                                text: 'Suggested',
                                                dataIndex: 'SUGGESTQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnSuggested2Renderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'SUGGESTPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Accepted',
                                                dataIndex: 'ACCEPTQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnAccepted2Renderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'ACCEPTPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Pending <br> Grouping',
                                                dataIndex: 'PEDIENTEQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnPendiRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'PEDIENTEPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Reaudited',
                                                dataIndex: 'REAUTQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnReaudited2Renderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'REAUTPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Rejected',
                                                dataIndex: 'REJETQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnRejected2Renderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'REJETPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Justified',
                                                dataIndex: 'JUSTIQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnJustified2Renderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'JUSTIPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Authorized',
                                                dataIndex: 'AUTHOQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnAuthorized2Renderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'AUTHOPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Unregistered </br> client',
                                                dataIndex: 'CLIENTEQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnUnregisteredRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'CLIENTEPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'IATA </br> disabled',
                                                dataIndex: 'DESHABIQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnDisabledRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'DESHABIPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Special<br> Cases',
                                                dataIndex: 'CANTADMGDS',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnSuggested2Renderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'CANTBILLEDPORC',
                                                flex: 1,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Total',
                                                dataIndex: 'TOTAL',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000,00');
                                                }
                                            }
                                        ]


                                    },
                                    {
                                        text: 'Cur.', dataIndex: 'A1672CURRENCY', width: 40, sortable: false
                                    },
                                    {
                                        text: 'Country', //hidden: true,
                                        dataIndex: 'A1672PAIVT',
                                        width: 60
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A1672AGENT', width: 70, sortable: false
                                    },
                                    {
                                        text: 'Agency', dataIndex: 'A1672NAGENCY', width: 150,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.A1672NAGENCY + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A1672REVIS',
                                        width: 100,
                                        align: 'left'
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
                    xtype: 'tabpanel',  //fullscreen: true,
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
                            xtype: 'panel', title: 'Charts per year',
                            id: prototype.id + '-graficos',
                            layout: {
                                type: 'hbox'
                            },
                            border: true, width: 1200, autoScroll: true, height: 415,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [{
                                    xtype: 'panel',
                                    id: prototype.id + '-chart',
                                    height: 415,
                                    width: '50%'
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-chart2',
                                    height: 415,
                                   width: '50%'
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Charts per month and source',
                            id: prototype.id + '-graficosmonth',
                            layout: {
                                type: 'hbox'
                            },
                            border: true, width: 1200, autoScroll: true, height: 415,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [{
                                    xtype: 'panel',
                                    id: prototype.id + '-chart3',
                                    height: 415,
                                    width: '50%'
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-chart4',
                                    height: 415,
                                   width: '50%'
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Auditor',
                            id: prototype.id + '-graficosUser',
                            layout: {
                                type: 'hbox'
                            },
                            border: true, width: 1200, autoScroll: true, height: 415,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [{
                                    xtype: 'panel',
                                    id: prototype.id + '-chart5',
                                    height: 415,
                                     width: '100%'
                                }

                            ]
                        }
                    ]

                }
            ]
        }
        
    ]
});

