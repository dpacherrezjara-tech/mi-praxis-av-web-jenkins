
prototype.id = 'ChangeOfStatus';
prototype.url2 = CONTEXTPATH + '/ChangeOfStatus';
prototype.url = CONTEXTPATH + '/ChangeOfStatusForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.ChangeOfStatus.ChangeOfStatus',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.ChangeOfStatus',

    requires:[
        'Ext.Praxis.controller.salesaudit.ChangeOfStatus.ChangeOfStatusController',
    ],

    controller: 'ChangeOfStatusController',

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
            width: 1366,
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
                                            width: 5, border: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtReference',
                                            fieldLabel: 'Reference',
                                            labelWidth: 60,
                                            width: 300,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCia',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            hideLabel: true,
                                            value: '139',
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            width: 35,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFrmaSerie',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtSeq',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            hideLabel: true,
                                            width: 30,
                                            value: '00',
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            hidden: true
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
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
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
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
                                            id: prototype.id + '-txthora1',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            fieldLabel: 'Start hour',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            width: 100,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txthora2',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            fieldLabel: 'End hour',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            width: 100,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            width: 5, border: false
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbStatus',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 250,
                                            labelWidth: 40,
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbStatusChange'
                                            }
                                        },
                                        {
                                            width: 5, border: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCurrency',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCountry',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50, hidden: true,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbStatusIni',
                                            fieldLabel: 'Status Initial',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 280,
                                            labelWidth: 75,
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender'
                                            }
                                        },
                                        {
                                            width: 5, border: false
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbStatusFin',
                                            fieldLabel: 'Status end',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 280,
                                            labelWidth: 70,
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
                                            id: prototype.id + '-CmbOrigen',
                                            fieldLabel: 'Origin',//readOnly: true,
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
                                                afterrender: 'onCmbStatusOrigen'
                                            }
                                        },
                                        {
                                            width: 5, border: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtLote',
                                            fieldLabel: 'Lote',
                                            labelWidth: 50,
                                            width: 300,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbType',
                                            fieldLabel: 'Type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 200,
                                            labelWidth: 50,
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender'
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
                            width: 1360,
                            height: 480,
                            columns: {
                                items: [
                                    {
                                        text: 'Origin',
                                        dataIndex: 'A3676ORIG',
                                        width: 100
                                    },
                                    {
                                        text: 'System </br>date',
                                        dataIndex: 'A3676FREGI',
                                        width: 80
                                    },
                                    {
                                        text: 'Processing </br> date',
                                        dataIndex: 'A3676FRECE',
                                        width: 80
                                    },
                                    {text: 'Praxis',
                                        columns: [
                                            {text: 'Ticket', dataIndex: 'A3676TIKET',width: 100},
                                            { text: 'CPN',dataIndex: 'A3676CUPON',width: 40},
                                            {text: 'Cur.',dataIndex: 'A3676CUR',width: 40},
                                            {text: 'Net.',dataIndex: 'A3676MONTO',width: 70,align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return win.formatDblNumber(value);
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Robot',
                                        columns: [
                                             {text: 'Ticket', dataIndex: 'A3676TKT',width: 100},
                                             { text: 'CPN',dataIndex: 'A3676CPNRB',width: 40},
                                             {text: 'Cur.',dataIndex: 'A3676CURRB',width: 40},
                                             {text: 'Net.',dataIndex: 'A3676MONRB',width: 70,align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return win.formatDblNumber(value);
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Status initial',
                                        dataIndex: 'A3676STINI',
                                        width: 150,
                                        align: 'left',
                                        renderer: 'onRendererToltip'
                                    },
                                    {
                                        text: 'Status end',
                                        dataIndex: 'A3676STFIN',
                                        width: 150,
                                        align: 'left',
                                        renderer: 'onRendererToltip'
                                    },
                                    {
                                        text: 'Result',
                                        dataIndex: 'A3676RESUL',
                                        width: 150,
                                        align: 'left',
                                        renderer: 'onRendererToltip'
                                    },
                                     {
                                        text: 'Description',
                                        dataIndex: 'A3676DESCR',
                                        width: 150,
                                        align: 'left',
                                        renderer: 'onRendererToltip'
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A3676STROB',
                                        width: 150,
                                         renderer: 'onRendererColumnStatus'
                                    },
                                    {
                                        text: 'Lote',
                                        dataIndex: 'A3676NARCH',
                                        width: 150,
                                        align: 'left',
                                        renderer: 'onRendererToltip'
                                    },
                                    {
                                        text: 'Reference',
                                        dataIndex: 'A3676REFER',
                                        width: 150,
                                        align: 'left',
                                        renderer: 'onRendererToltip'
                                    },
                                    {
                                        text: 'Hour',
                                        dataIndex: 'A3676HRECE',
                                        width: 50
                                    },
                                    {
                                        text: 'Type',
                                        dataIndex: 'A3676TIDOC',
                                        width: 50
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
                            width: 1366,
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



