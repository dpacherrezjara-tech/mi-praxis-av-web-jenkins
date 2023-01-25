

prototype.idRFNDQuery = 'RFNDQuery';
prototype.idRFNDDIRFileViewer = 'RFNDDIRFileViewer';
prototype.idDetailTicket = 'DetailTicket';
prototype.idRFNDFormRazones = 'FNDFormRazones';
prototype.id05 = 'RFNDFileViewer';
prototype.idDetailTicketHistory = 'DetailTicketHistory';
prototype.url02 = CONTEXTPATH + '/RFNDPending';
prototype.url01 = CONTEXTPATH + '/RFNDQuery';
prototype.url3 = CONTEXTPATH + '/RFNDUserMaintenance';
prototype.widthWindow = 1550;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.RFNDQuery.RFNDQuery', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RFNDQuery',

    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQuery.RFNDQueryController',
        'Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicket',
        'Ext.Praxis.view.salesaudit.RFNDQuery.RFNDAddTax',
        'Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicketHistory',
        'Ext.Praxis.view.salesaudit.RFNDQuery.RFNDFormErrorBPO',
        'Ext.Praxis.view.salesaudit.RFNDQuery.RFNDDIRFileViewer'
    ],

    controller: 'RFNDQueryController',

    id: prototype.idRFNDQuery + '-Contenedor',

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
            id: prototype.idRFNDQuery + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idRFNDQuery + '-contenedor-options',
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
                                    xtype: 'Paginator',
                                    id: prototype.idRFNDQuery + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idRFNDQuery + '-lbl-currentPage',
                                        prototype.idRFNDQuery + '-lbl-pageCount',
                                        prototype.idRFNDQuery + '-lbl-total'
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
                                    id: prototype.idRFNDQuery + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-btnFilter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: 'onFilterClick'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-btnExcel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-btnClear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'btnClear_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-btnBack',
                                    iconCls: 'prx-icon-back',
                                    tooltip: 'Back',
                                    listeners: 'onClearClick'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idRFNDQuery + '-contenedor-filters',
                    border: false,
                    defaults: {
                        bodyStyle: 'background-color: #E3EAF9;',
                        border: true,
                        style: 'margin: 2px',
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            defaults: {
                                style: 'margin: 1px',
                                bodyStyle: 'background: transparent',
                                padding: '5px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Select by:',
                                    style: 'font-weight:bold;',
                                    padding: '10 5 5 5',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    style: 'color:red;font-size:13px;',
                                    padding: '10 5 5 5',
                                    text: '(*)',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                , {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    //fieldLabel: 'Search Type',
                                    id: prototype.idRFNDQuery + '-search-type',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: '[SELECTED]',
                                    //labelWidth: 75,
                                    labelClsExtra: 'prx-label-search',
                                    width: 120,
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
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    style: 'margin-left: 2px',
                                    defaults: {
                                        style: 'margin: 2px'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRFNDQuery + '-txtFilterDateFrom',
                                            format: 'Y/m/d',
                                            fieldLabel: 'From:',
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRFNDQuery + '-txtFilterDateTo',
                                            format: 'Y/m/d',
                                            fieldLabel: 'To:',
                                            labelWidth: 30,
                                            labelAlign: 'right',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            width: 125,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQuery + '-txtCia',
                                            hideLabel: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            width: 35,
                                            value: '139',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQuery + '-txtFrmaSerie',
                                            hideLabel: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            width: 80,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQuery + '-txtFrmaFolio',
                                            hideLabel: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 30,
                                            enforceMaxLength: 30,
                                            width: 90,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idRFNDQuery + '-txtIATA',
                                            width: 140,
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            enableKeyEvents: true,
                                            fieldLabel: 'IATA',
                                            labelWidth: 40,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRFNDQuery + '-CmbStatus',
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
                                                afterrender: 'onCmbStatusAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRFNDQuery + '-CmbStatusBPO',
                                            fieldLabel: 'BPO',
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
                                                afterrender: 'onCmbStatusAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRFNDQuery + '-CmbAudit',
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
                                        //{xtype: 'textfield', id: prototype.idRFNDQuery + '-txtUser', hidden: true}
                                    ]
                                }
                            ]
                        }
                    ]
                },

                {
                    xtype: 'panel',
                    border: false,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idRFNDQuery + '-gridCabe',
                            columnLines: true,
                            autoScroll: true,
                            height: 250,
                            /* selModel: {
                             selType: 'checkboxmodel',
                             listeners: {
                             beforeselect: function (grid, record, index, eOpts, metaData) {
                             
                             if (record.get('CANTPEN') > 0) {
                             return true;
                             } else {
                             return false;
                             }
                             
                             }
                             }
                             
                             },*/
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
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Folio', dataIndex: 'A3647FOLIO', width: 150, align: 'center', renderer: 'onRendererColumnOnPreme'},
                                    {text: 'System <br> date', dataIndex: 'A3647FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Auditor', dataIndex: 'A3647REGAS', width: 100},
                                    {text: 'Zone', dataIndex: 'A3647ARCD', width: 130, renderer: 'onRendererColumnTYPE'},
                                    {text: 'Ticket Qty',
                                        columns: [
                                            {text: 'Request',
                                                columns: [
                                                    {
                                                        text: 'Pend',
                                                        dataIndex: 'CANTPE',
                                                        width: 55,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Aut',
                                                        columns: [
                                                            {
                                                                text: 'Yes',
                                                                dataIndex: 'CANTOK',
                                                                width: 55,
                                                                align: 'right',
                                                                summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                            },
                                                            {
                                                                text: 'Not',
                                                                dataIndex: 'CANTNK',
                                                                width: 55,
                                                                align: 'right',
                                                                summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnNotIntegerRenderer'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Reje',
                                                        dataIndex: 'CANTKO',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'TOTALCANT',
                                                        width: 50,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }
                                                ]
                                            },
                                            {text: 'RFND sabre',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'RFNDSABRE',
                                                        width: 50,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Ret.',
                                                        dataIndex: 'RFNDSABRET',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'TOTALSABRET',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }]
                                            },
                                            {text: 'Change of status',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'STOEN',
                                                        width: 50,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Ret.',
                                                        dataIndex: 'STORET',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'TOTALSTO',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }]
                                            },
                                            {text: 'BPO',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'BPOOK',
                                                        width: 50,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Error',
                                                        dataIndex: 'BPOKO',
                                                        width: 70,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'TOTALBPO',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }]
                                            }
                                        ]


                                    },
                                    {text: 'Ticket Amount',
                                        columns: [
                                            {text: 'Request',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'SUMAOK',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    }
                                                ]
                                            }

                                        ]


                                    },
                                    {
                                        text: 'Days',
                                        dataIndex: 'A3647DIAS',
                                        width: 45
                                    },
                                    //{text: 'Status', dataIndex: 'A4076FLAG', width: 200, renderer: 'onRendererColumnStatuscab'},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnCab'}

                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            iid: prototype.idRFNDQuery + '-pagginator-legend',
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
                                            id: prototype.idRFNDQuery + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.idRFNDQuery + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.idRFNDQuery + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRFNDQuery + '-panelFilter1',
                                    hidden: true,
                                    width: 500, border: false,
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRFNDQuery + '-de-cmbOptionTKT',
                                            margin: '5 0 5 0',
                                            fieldLabel: 'Search By',
                                            width: 180,
                                            labelWidth: 70,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender2',
                                                change: 'onChangeComboTkt'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '5 0 5 5',
                                            id: prototype.idRFNDQuery + '-de-txtTKT',
                                            //hidden: true,
                                            fieldLabel: '',
                                            width: 110,
                                            labelWidth: 10,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            //padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '5 0 5 5',
                                            id: prototype.idRFNDQuery + '-de-txtIata',
                                            hidden: true,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 10,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            //padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', hidden: true, id: prototype.idRFNDQuery + '-tbspacer1', width: 600},
                                {xtype: 'tbspacer', id: prototype.idRFNDQuery + '-tbspacer2', width: 1100},
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-btnSearch1',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onClickBtnSearch'
                                    }

                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-btnFilter1',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: {
                                        click: 'onClickBtnFilter'
                                    }
                                }, {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-Save_List',
                                    icon: 'resources/img/icon/16x16/task-save.png',
                                    tooltip: 'Process Change massive states',
                                    listeners: {
                                        click: 'img_clickHandler_save_List'
                                    }
                                }, {
                                    xtype: 'button',
                                    id: prototype.idRFNDQuery + '-btnExcel2',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick2'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'grid', title: 'TICKET DETAIL',
                            id: prototype.idRFNDQuery + '-grid',
                            columnLines: true,
                            autoScroll: true,
                            //width: 1260,
                            height: 350,
                            /*selModel: {
                             selType: 'checkboxmodel',
                             listeners: {
                             beforeselect: function (grid, record, index, eOpts, metaData) {
                             
                             if (Ext.String.trim(record.get('A4076FLAG')) === 'Y' || Ext.String.trim(record.get('A4076FLAG')) === 'U') {
                             return true;
                             } else {
                             return false;
                             }
                             
                             }
                             }
                             
                             },*/
                            columns: {
                                items: [
                                    {text: 'System<br>Date', dataIndex: 'A3648FREGI', width: 70},
                                    {text: 'Issue<br>Date', dataIndex: 'A3648XFSAL', width: 70},
                                    {text: 'Zone', dataIndex: 'A3648ARCD', width: 120}, //renderer: 'onRendererColumnTYPE'
                                    {text: 'Area', dataIndex: 'A3648COCD', width: 70}, // renderer: 'onRendererColumnBase'
                                    {text: 'Ticket', dataIndex: 'A3648TICKET', width: 120},
                                    {text: 'CPN', dataIndex: 'A3648CPN', width: 40},
                                    {text: 'Country', dataIndex: 'A3648SPVTA', width: 60},
                                    {text: 'IATA', dataIndex: 'A3648SIATA', width: 65},
                                    {text: 'Agency', dataIndex: 'A3648AGENCY', width: 275, align: 'left', renderer: 'onRendererColumnAttr'},
                                    {text: 'Transc.', dataIndex: 'A3648STRCU', width: 80},
                                    {text: 'Tdoc', dataIndex: 'A3648STDOC', width: 80},
                                    {text: 'Cur.', dataIndex: 'A3648MDA', width: 40},
                                    {text: 'Fare', dataIndex: 'A3648TARID', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Tax', dataIndex: 'A3648TTAXD', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Commi.', dataIndex: 'A3648COMID', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>RFND', dataIndex: 'A3648TOTAD', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>Praxis', dataIndex: 'A3648STOTL', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>XML', dataIndex: 'A3648XTOTL', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Req. Reason', dataIndex: 'A3648ERROR', width: 100, align: 'left', renderer: 'onRendererColumnAttr'},
                                    {text: 'Status', dataIndex: 'A3648FLAG', width: 200, renderer: 'onRendererColumnStatus'},
                                    {text: 'BPO', dataIndex: 'A3648STATO', width: 200},
                                    {text: 'Group', dataIndex: 'A3648GRUPO', width: 90},
                                    {
                                        text: '',
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
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        },
                        {
                            xtype: 'panel',
                            iid: prototype.idRFNDQuery + '-pagginator-legend2',
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
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.idRFNDQuery + '-lbl-total2',
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
        }]
});



