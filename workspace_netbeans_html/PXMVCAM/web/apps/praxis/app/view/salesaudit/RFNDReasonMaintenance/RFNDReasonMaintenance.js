
prototype.id = 'RFNDReasonMaintenance';
prototype.id01 = 'DataEntryRFNDReasonMaintenanceController';
prototype.url = CONTEXTPATH + '/RFNDReasonMaintenance';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.RFNDReasonMaintenance.RFNDReasonMaintenance',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.RFNDReasonMaintenance',

    requires:[
        'Ext.Praxis.controller.salesaudit.RFNDReasonMaintenance.RFNDReasonMaintenanceController',
        'Ext.Praxis.view.salesaudit.RFNDReasonMaintenance.DataEntryRFNDReasonMaintenance'
    ],

    controller: 'RFNDReasonMaintenanceController',

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
            width: 1366, 
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
                                    disabled: false,
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
                                    xtype:'button',
                                    id: prototype.id + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners:{
                                        click: 'onAddClick'
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
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items:[
                                        {
                                            xtype:'combo',
                                            fieldLabel: 'Search by',
                                            id: prototype.id+'-cbxFiltro',
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
                                            xtype:'combo',
                                            fieldLabel: 'Family',
                                            id: prototype.id+'-txtFamilia',
                                            labelAlign:'right',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            width: 230,
                                            editable: false,
                                            listConfig:{
                                                minWidth: 200
                                            }
                                        },
                                        {
                                            xtype:'combo',
                                            fieldLabel: 'Status',
                                            id: prototype.id+'-CmbStatus',
                                            labelAlign:'right',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            width: 200,
                                            editable: false,
                                            listConfig:{
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
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            autoScroll:true,
                            width: 1190,
                            height: 480,
                            columns:{
                                items:[
                                    //{ text: 'Cust', dataIndex: 'A3651CCUST', width: 40 },
                                    { text: 'Cod. Reason', dataIndex: 'A3651CODRZ', width: 90 },
                                    { text: 'Family', dataIndex: 'A3651FAMIL', width: 90 },
                                    { text: 'Comment', flex: 1, 
                                        columns:[
                                            { text: 'Relation', dataIndex: 'A3651COMRE', flex: 1, renderer: 'onRendererColumDescription' },
                                            { text: 'Des. Spanish', dataIndex: 'A3651COMES', flex: 1, renderer: 'onRendererColumDescription' },
                                            { text: 'Des. English', dataIndex: 'A3651COMEN', flex: 1, renderer: 'onRendererColumDescription' }
                                            //{ text: 'Des. Portuguese', dataIndex: 'A3651COMPO', flex: 1, renderer: 'onRendererColumDescription' },
                                            //{ text: 'Des. French', dataIndex: 'A3651COMFR', flex: 1, renderer: 'onRendererColumDescription' }
                                        ]
                                    },
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 30,
                                        renderer: 'OnColumnStatusRenderer'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Detail',
                                                handler: 'onEditActionColumnClick',
                                                isActionDisabled: 'OnEditActionDisabled'
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
                    hidden: false,
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

