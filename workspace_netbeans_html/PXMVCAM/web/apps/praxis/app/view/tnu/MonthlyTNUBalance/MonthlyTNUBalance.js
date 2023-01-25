
prototype.id = 'MonthlyTNUBalance';
prototype.url = CONTEXTPATH + '/MonthlyTNUBalance';
prototype.widthContenedor = 1360; //defaulf 1366  
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.tnu.MonthlyTNUBalance.MonthlyTNUBalance', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MonthlyTNUBalance',
    requires: [
        'Ext.Praxis.controller.tnu.MonthlyTNUBalance.MonthlyTNUBalanceController'        
    ],
    controller: 'MonthlyTNUBalanceController',
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
    listeners:{
        beforeShow: 'OnBeforeShow'
    },
    items:[
        {
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: prototype.widthContenedor,
            items:[
                //opciones y paginacion
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding:'2px 5px 0px 5px',
                    layout:{
                        type: 'hbox',
                        pack: 'end'
                    },
                    items:[
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                           // hidden: true,
                            defaults:{
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items:[
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-pagination',
                                    boxLabel: 'Pagination',
                                    checked: false,  
                                    hidden: true,
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
                                    hidden:true,
                                    listeners:{
                                        click: 'onClearClick'
                                    }
                                }
                           ]
                        }
                    ]
                },
                //filters
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-filters',
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults:{
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding:'2px'
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
                                            xtype: 'numberfield',
                                            id: prototype.id + '-periodo',
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            labelStyle: 'text-align:center',
                                            fieldLabel: 'Period',
                                            value: new Date().getFullYear(),
                                            width: 110,
                                            listeners: {
                                                specialkey: function(f, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        // MonthlyAtlBalance.getSearchStore();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                               }
                           ]
                        }
                    ]
                },
                //grid data 
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
                            //width: 1360,
                            width: '100%',
                            //height: 480,
                            height: 280,
                            columns:{
                                items:[                                                                        
                                    {
                                        text: 'Concept',
                                        dataIndex: 'CONCEPTO',
                                        width: 90,
                                        align: 'left',
                                        renderer: function(value, metaData, record, rowIndex, colIndex) {
                                            return '<strong style="color:#000;font-size:12px;">' + value + '</strong> ';
                                        }
                                    },
                                    {
                                        text: 'Months',
                                        columns:[
                                            {
                                                text: 'January',
                                                dataIndex: 'ENE',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }, 
                                            {
                                                text: 'February',
                                                dataIndex: 'FEB',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }, 
                                            {
                                                text: 'March',
                                                dataIndex: 'MAR',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'April',
                                                dataIndex: 'ABR',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }, 
                                            {
                                                text: 'May',
                                                dataIndex: 'MAY',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'June',
                                                dataIndex: 'JUN',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'July',
                                                dataIndex: 'JUL',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },                                            
                                            {
                                                text: 'August',
                                                dataIndex: 'AGO',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'September',
                                                dataIndex: 'SET',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'October',
                                                dataIndex: 'OCT',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'November',
                                                dataIndex: 'NOV',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },                                            
                                            {
                                                text: 'December',
                                                dataIndex: 'DIC',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            viewConfig: {                               
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                }
            ]
        }
    ]

});

