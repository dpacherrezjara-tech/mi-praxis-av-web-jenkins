
prototype.id = 'SalesReportForm';
prototype.idGr = 'DataEntryGrupo';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 768;
prototype.idRfnd = 'SalesReportFormRfnd';
prototype.idSale = 'SalesReportFormSale';
prototype.idRfndFOP = 'SalesReportFormRfndFOP';
prototype.idRfndTAX = 'SalesReportFormRfndTAX';
prototype.idRfndTAXCOMM = 'SalesReportFormRfndTAXCOMM';
prototype.idRfndCOMM = 'SalesReportFormRfndCOMM';
prototype.idRfndFareCalc = 'SalesReportFormRfndFareCalc';
prototype.idAdm = 'SalesReportFormAdm';
prototype.iderr = 'DataEntryError';
prototype.ideterr = 'DataDetailEntryError';
prototype.url = CONTEXTPATH + '/SalesReport';

Ext.define('Ext.Praxis.view.sales.SalesReportForm.SalesReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesReportForm',
    requires: [
        // 'Ext.Praxis.view.sales.SalesReportForm.Options',
        // 'Ext.Praxis.view.sales.SalesReportForm.Filters',
        // 'Ext.Praxis.view.sales.SalesReportForm.Info',
        'Ext.Praxis.controller.sales.SalesReport.SalesReportController',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryGrupo'
    ],
    controller: 'SalesReportController',

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
            width: prototype.widthContenedor,
            items: [
                // {
                //   xtype: 'panel',
                //   width: 1370,
                //   height: 680,
                //   items: [
                //     {
                //       xtype: 'prorrate',
                //       id: prototype.facsimil_id + '-widget-prorrate'
                //     }
                //   ]
                // },
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
                                    xtype: 'Paginator',
                                    id: prototype.id + '-paggin',
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
                                    id: prototype.id + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'btnSearch_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnFilter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Display filter',
                                    listeners: 'btnFilter_click'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnExcel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'btnExcel_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnClear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'btnClear_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnAdd',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'New',
                                    listeners: {
                                        click: 'btnAdd_click'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnBack',
                                    iconCls: 'prx-icon-back',
                                    tooltip: 'Back',
                                    listeners: 'btnBack_click'
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
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters',
                            border: false,
                            layout: 'column',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '8px 5px 8px 5px',
                                anchor: '100%'
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
                                    style: 'color:red;font-size:13px;',
                                    text: '*',
                                    width: 20,
                                    padding: '10 5 5 5',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                , {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDate',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 110,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listeners: {
                                        change: 'onChangeCmbDate'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 70,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonth',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 55,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateDay',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 55,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelSource',
                                    text: 'Source',
                                    style: 'font-weight:bold;',
                                    padding: '10 5 5 5'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelSource2',
                                    style: 'color:red;font-size:13px;',
                                    text: '*',
                                    padding: '10 5 5 5',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSource',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 70,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listeners: {
                                        change: 'onChangeCmbSource'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCountry',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'Country',
                                    width: 105,
                                    labelWidth: 45,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        keypress: 'onTextKeypress',
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBanco',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: 'Bank',
                                    width: 105,
                                    labelWidth: 40,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCurrency',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'Currency',
                                    width: 135,
                                    labelWidth: 55,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        keypress: 'onTextKeypress',
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtIata',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'IATA',
                                    width: 145,
                                    labelWidth: 45,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbStatus',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: 'Status',
                                    width: 130,
                                    labelWidth: 50,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtGroup',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'Group',
                                    width: 145,
                                    labelWidth: 45,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 9,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtIdFil',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'IdFil',
                                    width: 145,
                                    labelWidth: 45,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 9,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCia',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'Ticket',
                                    width: 100,
                                    labelWidth: 50,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTicket',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: '',
                                    width: 100,
                                    labelWidth: 0,
                                    enableKeyEvents: true,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        keypress: 'onTextKeypress'
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
                            padding: '20 0 0 0',
                            id: prototype.id + '-gridData',
                            width: prototype.widthContenedor,
                            height: 530,
                            columnLines: true,
                            resizable: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    resizable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Group', width: 80, dataIndex: 'A1530GRUPO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#sales-sales-report-form" style="color:#244066;">' + value + '</a>';
                                        },
                                        listeners: {
                                            click: 'onClickGrupo'
                                        }
                                    },
                                    {text: 'Country', width: 80, dataIndex: 'A1530PSVTA'},
                                    {text: 'City/Bank', width: 80, dataIndex: 'A1530CIUVT'},
                                    {text: 'Source"', width: 80, dataIndex: 'A1530FUENT'},
                                    {text: 'Channel', width: 80, dataIndex: 'A1530SFUEN'},
                                    {text: 'Procesing<br>Date', width: 100, dataIndex: 'A1530FPROC'},
                                    {
                                        text: 'Ending Date',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'From', width: 80, dataIndex: 'A1530FDESD'},
                                            {text: 'To', width: 80, dataIndex: 'A1530FHAST'}
                                        ]
                                    },
                                    {text: 'IATA Code', width: 80, dataIndex: 'A1530AGENT'},
                                    {
                                        text: 'ACCOUNTING',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'ID', width: 80, dataIndex: 'A1530IDCON'},
                                            {text: 'Date', width: 80, dataIndex: 'A1530FCONT'},
                                            {text: 'GL', width: 80, dataIndex: 'A1530POLGL'},
                                            {text: 'AP', width: 80, dataIndex: 'A1530POLAP'},
                                            {text: 'AR', width: 80, dataIndex: 'A1530POLAR'}
                                        ]
                                    },
                                    {text: 'Currency', width: 80, dataIndex: 'A1530MDA'},
                                    {text: 'Status', width: 80, dataIndex: 'A1530STPRO'},
                                    {
                                        text: 'Edit',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 40,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    }
                                ]
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

            /*
             
             layout: {
             type: 'fit'
             },
             padding: '0 0 0 0',
             border: false,
             defaults: {
             border: false
             },
             
             items: [
             {
             id: prototype.id + '-xpanel',
             border: false,
             autoScroll: false,
             layout: 'fit',
             items: [
             {
             id: prototype.id + '-form',
             border: false,
             bodyCls: 'colorFondo',
             layout: 'fit',
             defaults: {
             border: false,
             autoScroll: true
             },
             items: [
             {
             xtype: 'panel',
             region: 'center',
             layout: 'border',
             items: [
             {
             region: 'center',
             id: prototype.id + '-centerC',
             layout: {
             type: 'vbox',
             align: 'center'
             },
             border: true,
             autoScroll: true,
             defaults: {
             width: 1400,
             align: 'center'
             },
             items: [
             {
             xtype: prototype.id + '-options'
             }
             ,
             {
             xtype: prototype.id + '-filters',
             id: prototype.id + '-contentFilter'
             }
             ,
             {
             xtype: 'panel',
             height: 570,
             width: 1400,
             layout: 'fit',
             items: [
             {
             xtype: 'panel',
             id: prototype.id + '-centerC-panel01',
             width: 1400,
             layout: 'border',
             align: 'center',
             border: true,
             defaults: {
             border: false
             },
             bodyStyle: 'background-color: white;',
             items: [
             {
             region: 'center',
             xtype: prototype.id + '-info',
             id: prototype.id + '-contentInfo'
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
             }
             ]
             }
             ]
             
             
             */
});