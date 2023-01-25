
prototype.id = 'Postbilling';
prototype.id1 = 'DataEntryBsplinkRefundQueryRFND';
prototype.url = CONTEXTPATH + '/Postbilling';
prototype.url2 = CONTEXTPATH + '/SpdrspcrQuery';
prototype.id03 = CONTEXTPATH + '/PostbillingFileViewer';
prototype.url3 = CONTEXTPATH + '/ADMReport';
prototype.id0 = 'DocumListAdmsController';
prototype.id1 = 'SeguimietoFormUnico';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.salesaudit.Postbilling.Postbilling', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Postbilling',

    requires: [
        'Ext.Praxis.controller.salesaudit.Postbilling.PostbillingController',
        'Ext.Praxis.view.salesaudit.Postbilling.DetailPostbilling',
        'Ext.Praxis.view.salesaudit.SpdrspcrQuery.DetailSpdrspcrQuery',
        'Ext.Praxis.view.salesaudit.ADMReportForm.DocumListAdms',
        'Ext.Praxis.view.screens.ScrFormUnico'
    ],

    controller: 'PostbillingController',

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
            width: 1400, //prototype.widthContenedor,
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
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIATA',
                                            width: 100,
                                            hideLabel: true,
                                            enableKeyEvents: true,
                                            hidden: true,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            //value:Ext.Date.format(new Date(),'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
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
                                            // value:Ext.Date.format(new Date(),'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNumber',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            hideLabel: true,
                                            width: 80,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-cmbCountry2',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            width: 110,
                                            hidden: true,
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
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            hidden: true,
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbStatusChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbTRNCU',
                                            fieldLabel: 'TRNC',
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
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbStatusChange'
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
                                    hidden: true,
                                    hideMode: 'offsets',
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-cmbCountry',
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
                                            id: prototype.id + '-txtUser',
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            fieldLabel: 'Auditor',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
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
                            width: 1400,
                            height: 480,
                            columns: {
                                items: [
                                    {
                                        text: 'Origin', dataIndex: 'A3537MODO', align: 'center', width: 75
                                    }, {
                                        text: 'IATA',
                                        dataIndex: 'A3537IATA',
                                        width: 65
                                    },
                                    {
                                        text: 'Agency',
                                        dataIndex: 'A3537NOMAGENCY',
                                        width: 200,
                                        align: 'left',
                                        renderer: 'onRendererColumnAgency'
                                    },
                                    {
                                        text: 'TRNC',
                                        dataIndex: 'A3537TRNCU',
                                        width: 60
                                    },
                                    {
                                        text: 'Document',
                                        dataIndex: 'A3537NMEMO',
                                        width: 80
                                    },
                                    {
                                        text: 'Connexion',
                                        dataIndex: 'A3537NUMCONX',
                                        width: 80,
                                        renderer: 'onRendererColumnOnCon'
                                    },
                                    {
                                        text: 'SPDR',
                                        dataIndex: 'A3537PREDR',
                                        width: 80,
                                        renderer: 'onRendererColumnOnSPDR'
                                    },
                                    {
                                        text: 'SPCR',
                                        dataIndex: 'A3537PRECR',
                                        width: 80,
                                        renderer: 'onRendererColumnOnSPCR'
                                    },
                                    {
                                        text: 'PBD date',
                                        dataIndex: 'A3537FPBD',
                                        width: 80
                                    },
                                    {
                                        text: 'Resolution <br> Date',
                                        dataIndex: 'A3537RDSTE',
                                        width: 85,
                                        align: 'right'
                                    },
                                    /* {
                                     text: 'Answer /</br>date',
                                     dataIndex: 'A3537FREPT',
                                     width: 75
                                     },*/
                                    {
                                        text: 'Country',
                                        dataIndex: 'A3537PAIS',
                                        width: 60
                                    },
                                    /* {
                                     text: 'Dais',
                                     dataIndex: 'A3537DIAS',
                                     width: 60
                                     },    */
                                    {
                                        text: 'Cur.',
                                        dataIndex: 'A3537MDA',
                                        width: 40
                                    },
                                    {
                                        text: 'Amount <br>ADM/ACM',
                                        dataIndex: 'A3537NETO',
                                        width: 85,
                                        align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Disputable <br> amount',
                                        dataIndex: 'A3537NMAX',
                                        width: 85,
                                        align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'PBD <br> Amount',
                                        dataIndex: 'A3537PBDNE',
                                        width: 70,
                                        align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Amount <br> DIF.',
                                        dataIndex: 'A3537NETD',
                                        width: 70,
                                        align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3537RAUDI',
                                        width: 80
                                    },
                                    {
                                        text: 'Answer <br>status',
                                        dataIndex: 'A3537STAT3',
                                        width: 100
                                    },
                                    /*{
                                     text: 'Reason <br> PBD',
                                     dataIndex: 'A3389RAAG',
                                     flex: 1,
                                     align: 'left',
                                     renderer: 'onRendererColumnReason'
                                     },*/
                                    {
                                        text: 'Status',
                                        dataIndex: 'A3537FLAG',
                                        width: 150,
                                        renderer: 'onRendererColumnStatus'
                                    },
                                    {
                                        text: 'Days',
                                        dataIndex: 'A3537DIAS',
                                        width: 45
                                    },
                                    {
                                        text: 'On time',
                                        dataIndex: '',
                                        width: 60,
                                        renderer: 'onRendererColumnOnTime'
                                    },
                                    {
                                        text: 'System /</br>date',
                                        dataIndex: 'A3537FREGI',
                                        width: 75
                                    },
                                    {
                                        text: 'QTY </br> AM',
                                        dataIndex: 'A3537CANTAERO',
                                        width: 40
                                    },
                                    {
                                        text: 'QTY </br> BSP',
                                        dataIndex: 'A3537CANTANGE',
                                        width: 40
                                    },
                                    {
                                        text: 'Issue</br>date',
                                        dataIndex: 'A3537FVTA',
                                        width: 80
                                    },
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

