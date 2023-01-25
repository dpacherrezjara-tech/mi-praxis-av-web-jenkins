prototype.idMassiveRefunduatpForm = 'MassiveRefunduatpForm';
prototype.idMassiveRefunduatpFormTicket = 'MassiveRefunduatpFormTicket';
prototype.idMassiveRefunduatpFormSubiArchivo = 'MassiveRefunduatpFormSubiArchivo';
prototype.idMassiveRefunduatpFormErrorBPO = 'MassiveRefunduatpFormErrorBPO';
prototype.url = CONTEXTPATH + '/MassiveRefunduatpForm';
prototype.url01 = CONTEXTPATH + '/BwrBSPLINKRFND';
prototype.widthWindow = 1400;
prototype.heightWindow = 768;
//
Ext.define('Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MassiveRefunduatpForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormController',
        'Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormSubiArchivo',
        'Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicket',
        'Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormErrorBPO'

    ],

    controller: 'MassiveRefunduatpFormController',

    id: prototype.idMassiveRefunduatpForm + '-Contenedor',

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
            id: prototype.idMassiveRefunduatpForm + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idMassiveRefunduatpForm + '-contenedor-options',
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
                                    id: prototype.idMassiveRefunduatpForm + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idMassiveRefunduatpForm + '-lbl-currentPage',
                                        prototype.idMassiveRefunduatpForm + '-lbl-pageCount',
                                        prototype.idMassiveRefunduatpForm + '-lbl-total'
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
                                    id: prototype.idMassiveRefunduatpForm + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-Save_refresh',
                                    icon: 'resources/img/icon/16x16/Save_refresh-16.png',
                                    tooltip: 'Change massive from approved states',
                                    listeners: {
                                        click: 'img_clickHandler_save'
                                    }
                                },
                                /*{
                                 xtype: 'button',
                                 id: prototype.idMassiveRefunduatpForm + '-Save_List',
                                 icon: 'resources/img/icon/16x16/task-save.png',
                                 tooltip: 'Process Change massive states',
                                 listeners: {
                                 click: 'img_clickHandler_save_List'
                                 }
                                 },*/
                                {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btnFilter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: 'onFilterClick'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btnExcel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btnClear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'btnClear_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btnBack',
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
                    id: prototype.idMassiveRefunduatpForm + '-contenedor-filters',
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
                                    id: prototype.idMassiveRefunduatpForm + '-search-type',
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
                                            id: prototype.idMassiveRefunduatpForm + '-txtFilterDateFrom',
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
                                            id: prototype.idMassiveRefunduatpForm + '-txtFilterDateTo',
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
                                            id: prototype.idMassiveRefunduatpForm + '-txtCia',
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
                                            id: prototype.idMassiveRefunduatpForm + '-txtFrmaSerie',
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
                                            xtype: 'combo',
                                            id: prototype.idMassiveRefunduatpForm + '-CmbType',
                                            fieldLabel: 'Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 170,
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
                                            xtype: 'textfield',
                                            id: prototype.idMassiveRefunduatpForm + '-txtIATA',
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
                                            id: prototype.idMassiveRefunduatpForm + '-CmbStatus',
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
                                            id: prototype.idMassiveRefunduatpForm + '-CmbStatusBPO',
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
                                            xtype: 'textfield',
                                            id: prototype.idMassiveRefunduatpForm + '-Audit',
                                            fieldLabel: 'Audit',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 30,
                                            width: 120,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {xtype: 'textfield', id: prototype.idMassiveRefunduatpForm + '-txtUser', hidden: true}
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
                            id: prototype.idMassiveRefunduatpForm + '-gridCabe',
                            columnLines: true,
                            autoScroll: true,
                            height: 200,
                            selModel: {
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

                            },
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
                                    {text: 'Folio', dataIndex: 'A4076PREME', width: 150, align: 'center', renderer: 'onRendererColumnOnPreme'},
                                    {text: 'System <br> date', dataIndex: 'A4076FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Auditor', dataIndex: 'A4076REGIS', width: 100},
                                    //{text: 'Base', dataIndex: 'A4076BASE', width: 100, renderer: 'onRendererColumnBase'},
                                    {text: 'Type', dataIndex: 'A4076TYPE', width: 100, renderer: 'onRendererColumnTYPE'},
                                    {text: 'Ticket Qty',
                                        columns: [

                                            {text: 'Load',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'CANTOK',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Error',
                                                        dataIndex: 'CANTKO',
                                                        width: 70,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'TOTALCANT',
                                                        width: 60,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                    }
                                                ]
                                            },
                                            {text: 'BPO',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'BPOOK',
                                                        width: 60,
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
                                            {text: 'Load',
                                                columns: [
                                                    {
                                                        text: 'OK',
                                                        dataIndex: 'SUMAOK',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Error',
                                                        dataIndex: 'SUMAKO',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'TOTALSUMA',
                                                        width: 130,
                                                        align: 'right',
                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                    }]
                                            }

                                        ]


                                    },
                                    //{text: 'Status', dataIndex: 'A4076FLAG', width: 200, renderer: 'onRendererColumnStatuscab'},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnCab'}

                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            iid: prototype.idMassiveRefunduatpForm + '-pagginator-legend',
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
                                            id: prototype.idMassiveRefunduatpForm + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.idMassiveRefunduatpForm + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.idMassiveRefunduatpForm + '-lbl-total',
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
                                    id: prototype.idMassiveRefunduatpForm + '-panelFilter1',
                                    hidden: true,
                                    width: 500, border: false,
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idMassiveRefunduatpForm + '-de-cmbOptionTKT',
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
                                            id: prototype.idMassiveRefunduatpForm + '-de-txtTKT',
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
                                            id: prototype.idMassiveRefunduatpForm + '-de-txtIata',
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
                                {xtype: 'tbspacer', hidden: true, id: prototype.idMassiveRefunduatpForm + '-tbspacer1', width: 600},
                                {xtype: 'tbspacer', id: prototype.idMassiveRefunduatpForm + '-tbspacer2', width: 1100},
                                {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btnSearch1',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onClickBtnSearch'
                                    }

                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btnFilter1',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: {
                                        click: 'onClickBtnFilter'
                                    }
                                }, {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-Save_List',
                                    icon: 'resources/img/icon/16x16/task-save.png',
                                    tooltip: 'Process Change massive states',
                                    listeners: {
                                        click: 'img_clickHandler_save_List'
                                    }
                                }, {
                                    xtype: 'button',
                                    id: prototype.idMassiveRefunduatpForm + '-btnExcel2',
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
                            id: prototype.idMassiveRefunduatpForm + '-grid',
                            columnLines: true,
                            autoScroll: true,
                            //width: 1260,
                            height: 350,
                            selModel: {
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

                            },
                            columns: {
                                items: [
                                    {text: 'Base', dataIndex: 'A4076BASE', width: 60, renderer: 'onRendererColumnBase'},
                                    {text: 'Type', dataIndex: 'A4076TYPE', width: 100},
                                    {text: 'Ticket', dataIndex: 'A4076TICKET', width: 120},
                                    {text: 'CPN', dataIndex: 'A4076CPN', width: 40},
                                    {text: 'USE', dataIndex: 'A4076USO', width: 40},
                                    {text: 'System<br>Date', dataIndex: 'A4076FREVI', width: 70},
                                    {text: 'Issue<br>Date', dataIndex: 'A4076FVTA', width: 70},
                                    {text: 'Country', dataIndex: 'A4076PAIS', width: 60},
                                    {text: 'IATA', dataIndex: 'A4076IATA', width: 65},
                                    {text: 'Agency', dataIndex: 'A4076AGENCY', width: 275, align: 'left', renderer: 'onRendererColumnAttr'},
                                    {text: 'IATA <br> RFND', dataIndex: 'A4076AGEN', width: 65},
                                    {text: 'Cur.', dataIndex: 'A4076MDA', width: 40},
                                    {text: 'Transc.', dataIndex: 'A4076TRNCO', width: 80},
                                    {text: 'Tdoc', dataIndex: 'A4076TDOC', width: 80},
                                    {text: 'Fare', dataIndex: 'A4076TARIFA', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Tax', dataIndex: 'A4076TTAX', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>RFND', dataIndex: 'A4076NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Neto<br>Praxis', dataIndex: 'A4076NETK', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Status', dataIndex: 'A4076FLAG', width: 200, renderer: 'onRendererColumnStatus'},
                                    {text: 'BPO', dataIndex: 'A4076STAT', width: 200, renderer: 'onRendererColumnStatBPO'},
                                    {text: 'Group', dataIndex: 'A4076GRUPO', width: 90},
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
                            iid: prototype.idMassiveRefunduatpForm + '-pagginator-legend2',
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
                                            id: prototype.idMassiveRefunduatpForm + '-lbl-total2',
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
        }
    ]
});