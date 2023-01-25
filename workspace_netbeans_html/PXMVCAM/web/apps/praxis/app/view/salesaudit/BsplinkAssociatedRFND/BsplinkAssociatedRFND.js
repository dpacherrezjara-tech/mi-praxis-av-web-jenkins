/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
prototype.id = 'BsplinkAssociatedRFND';
prototype.id01 = 'DataEntryBsplinkRefundQueryRFND';
prototype.id02 = 'FormOfPaymentRFND';
prototype.id03 = 'OriginalDataTaxesRFND';
prototype.idSabreEstatus = 'FormSabreEstatus'; 
prototype.url = CONTEXTPATH + '/BwrBSPLINKRFND';
prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.salesaudit.BsplinkAssociatedRFND.BsplinkAssociatedRFND',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.BsplinkAssociatedRFND',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkAssociatedRFND.BsplinkAssociatedRFNDController',
        'Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFND'
    ],

    controller: 'BsplinkAssociatedRFNDController',

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

    items:[
        {
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: prototype.widthContenedor,
            items:[
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding:'10px 5px 0px 5px',
                    layout:{
                        type: 'hbox',
                        pack: 'end'
                    },
                    items:[
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults:{
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items:[
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    disabled: true,
                                    listeners:{
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.id + '-pagginator-01',
                                    pagInfo:[
                                        prototype.id + '-lbl-currentPage',
                                        prototype.id + '-lbl-pageCount',
                                        prototype.id + '-lbl-total'
                                    ]
                                }
                            ]
                        },
                        { xtype: 'tbspacer', width: 50 },
                        {
                            xtype: 'toolbar',
                            items:[
                                {
                                    xtype:'button',
                                    id: prototype.id + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners:{
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype:'button',
                                    id: prototype.id + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners:{
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype:'button',
                                    id: prototype.id + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners:{
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners:{
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
                    defaults:{
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding:'5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'form',
                            id: prototype.id + '-contenedor-filters-form',
                            defaults:{
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items:[
                                {
                                    xtype: 'panel',
                                    id:prototype.id+'-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults:{
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items:[
                                        {
                                            xtype:'combo',
                                            fieldLabel: 'Search Type',
                                            id: prototype.id+'-search-type',
                                            labelAlign:'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 275,
                                            editable: false,
                                            listConfig:{
                                                minWidth: 200
                                            },
                                            listeners:{
                                                afterrender: 'onCmbSearchAfterRender',
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtIATA',
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
                                            id: prototype.id+'-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
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
                                            id: prototype.id+'-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue : Ext.Date.format(new Date(),'Y/m/d'),
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
                                            xtype: 'textfield',
                                            id: prototype.id+'-txthora1',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            fieldLabel: 'Start hour',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            width: 100,
                                            hidden: true,
                                            listeners: {
                                               specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txthora2',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            fieldLabel: 'End hour',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            width: 100,
                                            hidden: true,
                                            listeners: {
                                               specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtCia',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            hideLabel: true,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            width: 35,
                                            hidden: true,
                                            value:'139'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtFrmaSerie',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            hideLabel: true,
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
                                            id: prototype.id+'-txtSeq',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            hideLabel: true,
                                            width: 30,
                                            hidden: true,
                                            value:'00'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-txtNumber',
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
                                            id: prototype.id+'-cmbCountry2',
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
                                            id: prototype.id+'-CmbStatus',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig:{
                                                minWidth: 200
                                            },
                                            hidden: true,
                                            listeners:{
                                                afterrender: 'onCmbStatusAfterRender',
                                                change: 'onCmbStatusChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    hidden: true,
                                    hideMode: 'offsets',
                                    defaults:{
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-cmbCountry',
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
                                            id: prototype.id+'-txtUser',
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            readOnly: true,
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
                    layout:{
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults:{
                        border: false,
                        padding:'0px 5px 0px 5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'grid',
                            id: prototype.id + '-grid',
                            columnLines: true,
                            autoScroll:true,
                            width: 1360,
                            height: 480,
                            columns:{
                                items:[
                                     {text: 'Channel', dataIndex: 'A3389CHANEL', width: 60, sortable: false, align: 'center'},
                                     {
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
                                        text: 'IATA',
                                        dataIndex: 'A3389IATA',
                                        width: 65
                                    },
                                    {
                                        text: 'Agency',
                                        dataIndex: 'A3389NOMAGENCY',
                                        flex: 1,
                                        align: 'left',
                                        renderer: 'onRendererColumnAgency'
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
                                        text: 'Country',
                                        dataIndex: 'A3389PAIS',
                                        width: 60
                                    },
                                    {
                                        text: 'Cur.',
                                        dataIndex: 'A3389MDA',
                                        width: 40
                                    },
                                    {
                                        text: 'Net',
                                        dataIndex: 'A3389TOTAL',
                                        width: 70,
                                        align: 'right',
                                        renderer: 'onColumnAmountRenderer'
                                    },
                                    {
                                        text: 'Passenger',
                                        dataIndex: 'A3389PAX',
                                        flex: 1,
                                        align: 'left',
                                        renderer: 'onRendererColumnPassenger'
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3389REGAS',
                                        width: 80
                                    },
                                    {
                                        text: 'Reason BSP',
                                        dataIndex: 'A3389RAAG',
                                        flex: 1,
                                        align: 'left',
                                        renderer: 'onRendererColumnReason'
                                    },
                                    {
                                        text: 'Sales audit',
                                        dataIndex: 'A3389STATO',
                                        flex: 1,
                                        align: 'left'
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'A3389FLAG',
                                        width: 150,
                                        renderer: 'onRendererColumnStatus'
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
                                defaults:{
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
                    layout:{
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: transparent;',
                    defaults:{
                        border: false,
                        padding:'0px 5px 0px 5px'
                    },
                    padding:'1px 5px 1px 5px',
                    items:[
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults:{
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items:[
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
                                { xtype: 'tbspacer', width: 100 },
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

