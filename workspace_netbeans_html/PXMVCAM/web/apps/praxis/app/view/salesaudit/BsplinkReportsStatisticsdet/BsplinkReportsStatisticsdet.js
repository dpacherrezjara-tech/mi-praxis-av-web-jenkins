prototype.id = 'BsplinkReportsStatisticsdet';
prototype.url = CONTEXTPATH + '/BsplinkReportsStatisticsdet';
prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
prototype.url02 = CONTEXTPATH + '/BwrBSPLINKRFND';
prototype.id01 = 'DataEntryBsplinkRefundQueryRFND';
prototype.id02 = 'FormOfPaymentRFND';
prototype.id03 = 'OriginalDataTaxesRFND';
prototype.id04 = 'FormRazonesRFND';
prototype.id05 = 'BsplinkFileViewer';

prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.BsplinkReportsStatisticsdet.BsplinkReportsStatisticsdet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.BsplinkReportsStatisticsdet',
    requires: [
        'Ext.Praxis.controller.salesaudit.BsplinkReportsStatisticsdet.BsplinkReportsStatisticsdetController',
        'Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFND'
    ],
    controller: 'BsplinkReportsStatisticsdetController',
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
            xtype: 'panel', //itle: 'Detail of the RFND',
            id: prototype.id + '-contenedor-form',
            width: 1366, //prototype.widthContenedor,
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 30,
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
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 20,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Cia',
                                            id: prototype.id + '-txtCia',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            value: '139',
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 20,
                                            width: 65
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Ticket',
                                            id: prototype.id + '-txtFrmaSerie',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            width: 120,
                                            labelWidth: 35,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'IATA',
                                            id: prototype.id + '-txtIATA',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            width: 100,
                                            labelWidth: 25,
                                            //hideLabel: true,
                                            enableKeyEvents: true,
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
                                            hidden: true,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            listeners: {
                                                specialkey: 'onSearchkey'
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
                                    defaults: {
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCountry',
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
                                            id: prototype.id + '-CmbPayment',
                                            fieldLabel: 'Payment',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 80
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbStatusChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbTypeRFND',
                                            fieldLabel: 'Type RFND',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 150,
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 80
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbStatusChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtUser',
                                            fieldLabel: 'Auditor',
                                            queryMode: 'local',
                                            displayField: 'A3389REGAS',
                                            valueField: 'A3389REGAS',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
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
                            xtype: 'panel', title: 'Detail of the RFND',
                            id: prototype.id + '-contenedor-grid',
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                bodyStyle: 'background: transparent',
                                border: false,
                                padding: '5px'
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
                                            id: prototype.id + '-grid',
                                            columnLines: true,
                                            autoScroll: true,
                                            width: 1360,
                                            height: 480,
                                            columns: {
                                                items: [
                                                     {text: 'Channel', dataIndex: 'A3389CHANEL', width: 60, sortable: false, align: 'center'},
                                                     {
                                                        text: 'Country',
                                                        dataIndex: 'A3389PAIS',
                                                        width: 60
                                                    }, {
                                                        text: 'IATA',
                                                        dataIndex: 'A3389IATA',
                                                        width: 65
                                                    },
                                                    {
                                                        text: 'Agency',
                                                        dataIndex: 'A3389NOMAGENCY',
                                                        width: 100,
                                                        renderer: 'onRendererColumntdAttr'
                                                    }, {
                                                        text: 'Type </br> RFND',
                                                        dataIndex: 'A3389RAUD',
                                                        width: 90
                                                    }, {
                                                        text: 'Document',
                                                        dataIndex: 'A3389NUMER',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Ticket',
                                                        dataIndex: 'A3389TKT',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Sale </br>date',
                                                        dataIndex: 'A3389FECOR',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Application </br>date',
                                                        dataIndex: 'A3389FAPPI',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Authorise/</br>Reject date',
                                                        dataIndex: 'A3389FAUTO',
                                                        width: 75
                                                    },
                                                    {
                                                        text: 'Auditor',
                                                        dataIndex: 'A3389REGAS',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Status',
                                                        dataIndex: 'A3389FLAG',
                                                        width: 150,
                                                        renderer: 'onRendererColumntdAttr'
                                                    },
                                                    {
                                                        text: 'Reason BSP',
                                                        dataIndex: 'A3389RAAG',
                                                        width: 100,
                                                        renderer: 'onRendererColumnReason'
                                                    },
                                                    {
                                                        text: 'Reason AM',
                                                        dataIndex: 'A3389RAAR',
                                                        width: 100,
                                                        renderer: 'onRendererColumntdAttr'
                                                    },
                                                    {
                                                        text: 'Sales audit',
                                                        dataIndex: 'A3389STATO',
                                                        width: 100,
                                                        renderer: 'onRendererColumntdAttr'
                                                    },
                                                    {
                                                        text: 'Cur.',
                                                        dataIndex: 'A3389MDA',
                                                        width: 40
                                                    },
                                                    {
                                                        text: 'FOP',
                                                        dataIndex: 'A3389TCODE',
                                                        width: 80,
                                                        renderer: 'onRendererColumntdAttr'
                                                    },
                                                    {
                                                        text: 'Fare',
                                                        dataIndex: 'A3389TARIF',
                                                        width: 70,
                                                        align: 'right',
                                                        renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Commi.',
                                                        dataIndex: 'A3389COMIS',
                                                        width: 70,
                                                        align: 'right',
                                                        renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Tax',
                                                        dataIndex: 'A3389TTAX',
                                                        width: 70,
                                                        align: 'right',
                                                        renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Penalty',
                                                        dataIndex: 'A3389PENAL',
                                                        width: 70,
                                                        align: 'right',
                                                        renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'TAX on </br>  CP',
                                                        dataIndex: 'A3389PORPE',
                                                        width: 70,
                                                        align: 'right',
                                                        renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Total authorised',
                                                        dataIndex: 'A3389TOTAL',
                                                        width: 70,
                                                        align: 'right',
                                                        renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Days',
                                                        dataIndex: 'A3389DIAS',
                                                        width: 45
                                                    },
                                                    {
                                                        text: 'On time',
                                                        dataIndex: '',
                                                        width: 60,
                                                        renderer: 'onRendererColumnOnTime'
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
                                                // trackOver: false,
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
                        },
                        {
                            xtype: 'panel', title: 'Detail of the RFND Auditor',
                            id: prototype.id + '-PrincipalUser',
                            border: true, width: 1366, autoScroll: true, height: 500,
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
                                    width: 1300, //prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-chart',
                                            // height: 250,
                                            width: '100%'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart2',
                                            // height: 250,
                                            width: '100%'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart21',
                                            // height: 250,
                                            width: '100%'
                                        }]
                                }

                            ]//, listeners: {show: 'onclickshow'}
                        },
                        {
                            xtype: 'panel', title: 'Detail of the type RFND',
                            id: prototype.id + '-PrincipaltypeRFND',
                            border: true, width: 1366, autoScroll: true, height: 500,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + 'DetatypeRFND',
                                    width: 1300, //prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-chart3',
                                            // height: 250,
                                            width: '100%'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart4',
                                            // height: 250,
                                            width: '100%'
                                        }]
                                }

                            ]//, listeners: {show: 'onclickstypeRFNDhow'}
                        },
                        {
                            xtype: 'panel', title: 'Detail of the RFND Country',
                            id: prototype.id + '-PrincipalRFNDCOUTRY',
                            border: true, width: 1366, autoScroll: true, height: 500,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-RFNDCOUTRY',
                                    width: 1300, //prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-TOTALRFNDCOUTRY',
                                            // height: 250,
                                            width: '1355'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-DETALLERFNDCOUTRY',
                                            // height: 250,
                                            width: '1355'
                                        }]
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Detail of the RFND days',
                            id: prototype.id + '-PrincipalRFNDdays',
                            border: true, width: 1366, autoScroll: true, height: 500,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + 'DetaRFNDdays',
                                    width: 1300, //prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-chart6',
                                            // height: 250,
                                            width: '100%'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart7',
                                            // height: 250,
                                            width: '100%'
                                        }]
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Detail of the RFND FOP & Reason',
                            id: prototype.id + '-PrincipalRFNDFOP',
                            border: true, width: 1366, autoScroll: true, height: 500,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + 'DetaRFNDFOP',
                                    width: 1300, //prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-chart8',
                                            // height: 250,
                                            width: '100%'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart9',
                                            // height: 250,
                                            width: '100%'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart9_2',
                                            // height: 250,
                                            width: '100%'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Detail of the RFND time',
                            id: prototype.id + '-PrincipalDias',
                            border: true, width: 1366, autoScroll: true, height: 500,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + 'DetaRFNDays',
                                    width: 1300, //prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-chart10',
                                            // height: 250,
                                            width: '100%'
                                        }]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + 'DetaRFNDaysPastel',
                                    width: 1300, //prototype.widthContenedor,
                                    items: [{
                                            xtype: 'panel',
                                            id: prototype.id + '-chart11',
                                            // height: 250,
                                            width: '100%'
                                        }]
                                }

                            ]
                        }
                    ]
                }
            ]
        }
    ]
});