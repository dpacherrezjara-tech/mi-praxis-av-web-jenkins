
prototype.id = 'AtlByTransactionType';
prototype.url = CONTEXTPATH + '/AtlByTransactionType';
prototype.widthContenedor = 1360; //defaulf 1366  
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.tnu.AtlByTransactionType.AtlByTransactionType', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AtlByTransactionType',
    requires: [
        'Ext.Praxis.controller.tnu.AtlByTransactionType.AtlByTransactionTypeController'        
    ],
    controller: 'AtlByTransactionTypeController',
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
                    padding:'1px 5px 0px 5px',
                    layout:{
                        type: 'hbox',
                        pack: 'end'
                    },
                    items:[
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            hidden: true,
                            defaults:{
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items:[
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-pagination',
                                    boxLabel: 'Pagination',
                                    checked: false,                                    
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
                                    hidden: true,
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
                        padding:'1px'
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
                                            labelWidth: 100,
                                            labelAlign: 'right',
                                            labelStyle: 'text-align:center',
                                            fieldLabel: 'Select by Year',
                                            value: new Date().getFullYear(),
                                            width: 165,
                                            listeners: {
                                                specialkey: function(f, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        // MonthlyAtlBalance.getSearchStore();
                                                    }
                                                }
                                            }
                                        }
// EN FLEX NO HAY ESTA OPCION                                        
//                                        {
//                                            xtype: 'radiogroup',
//                                            fieldLabel: 'Value',  
//                                            id:prototype.id+'-tipo_rpte',
//                                            labelAlign:'right',      
//                                            columns: 2,
//                                            vertical: true,
//                                            defaults:{
//                                                style: 'margin: 2px;'
//                                            },                                                
//                                            items: [
//                                                { 
//                                                    boxLabel: 'Usage', name: 'rbgCtlStpro', inputValue: '1',checked: true,
//                                                    listeners:{
//                                                        change: function( cb, nv, ov )
//                                                        {
//                                                             if (ov) me.setGridData('2');
//                                                             else me.setGridData('1');
//                                                        }
//                                                   }
//                                                },
//                                                { 
//                                                    boxLabel: 'Sale', name: 'rbgCtlStpro', inputValue: '0'
//                                                }
//                                            ]
//                                        }
                                    ]
                               }
                           ]
                        }
                    ]
                },
                //grid data 
                {
                    xtype: 'panel',  
                    width: '100%',
                    border: false,
//                    activeTab: 0,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults:{
                        //height: 480,                        
                        height: 550,                        
                        border: false,
                        padding:'0px 5px 0px 5px'
                    },
                    padding:'1px 5px 1px 5px',
//                    enableKeyEvents: true,
                    items:[
                        {                                                      
                           xtype: 'panel', 
                           //title:'Atl by transactions',
                           id: prototype.id+'-panel-tree',                                                       
                           layout: {
                               type: 'vbox',
                               align: 'center'
                           },
                           defaults: {
                               bodyStyle: 'background: transparent;'
                           },
                           items: []
                        }
                    ]
                }
            ]
        }
    ]

});

