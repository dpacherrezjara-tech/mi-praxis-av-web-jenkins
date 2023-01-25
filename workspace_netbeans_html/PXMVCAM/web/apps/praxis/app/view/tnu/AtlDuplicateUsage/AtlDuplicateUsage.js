
prototype.id = 'AtlDuplicateUsage';
prototype.url = CONTEXTPATH + '/AtlDuplicateUsage';
prototype.widthContenedor = 1360; //defaulf 1366  
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.tnu.AtlDuplicateUsage.AtlDuplicateUsage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AtlDuplicateUsage',
    requires: [
        'Ext.Praxis.controller.tnu.AtlDuplicateUsage.AtlDuplicateUsageController'
    ],
    controller: 'AtlDuplicateUsageController',
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
                                    boxLabel: 'Pagination',
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
                                    id: prototype.id + '-btn-texto',
                                    icon: 'resources/img/botones/txt.png',                                    
                                    tooltip: 'Export to txt',
                                    listeners: {
                                        click: 'onTextoClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    disabled: true,
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
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-cont-filter',
                                            bodyStyle: 'background: #e3eaf9',
                                            layout: 'hbox',
                                            border: false,
                                            padding: '2px 1px 1px 1px',
                                            defaults: {
                                                bodyStyle: 'background: transparent',
                                                border: false,
                                                padding: '5px'
                                            },
                                            items: [
                                                {
                                                    xtype:'combo',                                               
                                                    fieldLabel: 'Filter By',                                                       
                                                    id: prototype.id+'-search-type',                                                    
                                                    labelAlign:'right',
                                                    queryMode: 'remote',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    emptyText: '[Seleccione]',
                                                    labelWidth: 85,
                                                    width: 220,                                                    
                                                    listeners:{
                                                      select:function(obj, records, eOpts){
                                                         me.setFilter(records);                                                    
                                                      }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-tkt-air',
                                                    labelWidth: 100,
                                                    labelAlign: 'right',                                                    
                                                    fieldLabel: 'Ticket Number',
                                                    value:"139",
                                                    width: 140,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-tkt',
                                                    labelWidth: 50,
                                                    width: 80,
                                                    listeners: {
                                                        specialkey: function(f, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                me.setGridData();
                                                            }
                                                        }
                                                    }
                                                },
                                                {                                                    
                                                    xtype:'combo',                                               
                                                    fieldLabel: 'Use',                                                       
                                                    id:prototype.id+'-tuse',                                                    
                                                    labelAlign:'right',
                                                    queryMode: 'remote',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    hidden:true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    emptyText: '[All]',
                                                    labelWidth: 85,
                                                    width: 150,
                                                    listeners:{
                                                      select:function(obj, records, eOpts){
                                                         Ext.getCmp(prototype.id+'-fecha1').focus(true,100);                                               
                                                      }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id:prototype.id+'-fecha1',
                                                    labelWidth:35,
                                                    labelAlign:'right',                                            
                                                    fieldLabel: 'From',
                                                    format:'Y/m/d',                                                    
                                                    width:130,
                                                    hidden:true,
                                                    listeners:{
                                                         specialkey: function(f,e){  
                                                             if(e.getKey()===e.ENTER){
                                                                 Ext.getCmp(prototype.id+'-fecha2').focus(true,100);
                                                             }  
                                                         },
                                                         change: function(  obj, newValue , oldValue , eOpts ){
                                                             Ext.getCmp(prototype.id+'-fecha2').setValue( new Date() );
                                                         }
                                                     }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id:prototype.id+'-fecha2',
                                                    labelWidth:35,
                                                    labelAlign:'right',                                            
                                                    fieldLabel: 'To',
                                                    format:'Y/m/d',                                                    
                                                    width:130,
                                                    hidden:true,
                                                    listeners:{
                                                         specialkey: function(f,e){  
                                                             if(e.getKey()===e.ENTER){
                                                                 me.setGridData();
                                                             }  
                                                         }
                                                     }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-nvlo',
                                                    labelWidth:85,
                                                    labelAlign:'right',                                            
                                                    fieldLabel: 'Flight Number',                                               
                                                    width:130,
                                                    hidden:true,
                                                    maxLength:9,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    listeners:{
                                                         specialkey: function(f,e){  
                                                             if(e.getKey()===e.ENTER){                                                                 
                                                                 me.setGridData();
                                                             }  
                                                         }
                                                     }
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Adjustment',  
                                                    id:prototype.id+'-filtr-adjustment',
                                                    labelAlign:'right',      
                                                    columns: 3,
                                                    hidden:true,
                                                    vertical: true,
                                                    defaults:{
                                                        style: 'margin: 2px;'
                                                    },                                                
                                                    items: [
                                                        { boxLabel: 'Yes', name: 'rb-filtr-adj', inputValue: 'A'},
                                                        { boxLabel: 'Not', name: 'rb-filtr-adj', inputValue: 'P'},
                                                        { boxLabel: 'All', name: 'rb-filtr-adj', inputValue: '', checked: true}
                                                    ]
                                                }
                                            ]
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
                            height: 500,
                            width: 880,
                            emptyText: 'No Matching Records',
                            loadMask: true,
                            stateful: true,                                
                            columns: {
                                items: [
                                    {
                                        text: 'Nbr',
                                        dataIndex: 'RN',
                                        width: 40,
                                        align: 'left'
                                    },{
                                        text: 'Agent',
                                        dataIndex: 'A1547AGTIA',
                                        width: 70,
                                        align: 'left'
                                    },{
                                        text: 'Usage',
                                        dataIndex: 'A1547TUSO',
                                        width: 50,
                                        align: 'left'
                                    },{
                                        text: 'Use Date',
                                        dataIndex: 'A1547FUSO',
                                        width: 70,
                                        align: 'center'
                                    },{
                                        text: 'Accounting<br>Date',
                                        dataIndex: 'A1547FPROC',
                                        width: 80,
                                        hidden:true,
                                        align: 'center'
                                    },{
                                        text: 'Ticket Number',
                                        dataIndex:'A1547TICKT',
                                        width: 110,
                                        align: 'center'
//                                        cls: 'column_header_double',                                        
//                                        renderer:function(value, metaData, record, rowIndex, colIndex, store, view){
//                                            var tdAttr =  "'"+ value + "'";
//                                            return '<a href="#" onclick="DuplicateUsage.getView_TICKET('+tdAttr+');">'+value+'</a>';
//                                        }
                                    },{
                                        text: 'Cpn',
                                        dataIndex: 'A1547CUPON',
                                        width: 40,
                                        align: 'center'
                                    },{
                                        text: 'From',
                                        dataIndex: 'A1547ORIG',
                                        width: 50,
                                        align: 'center'
                                    },{
                                        text: 'To',
                                        dataIndex: 'A1547DEST',
                                        width: 50,
                                        align: 'center'
                                    },{
                                        text: 'Flight',
                                        dataIndex: 'A1547NVLO',
                                        width: 60,
                                        align: 'center'
                                    },{
                                        text: 'Carrier',
                                        dataIndex: 'A1547CARR',
                                        width: 60,
                                        align: 'center'
                                    },{
                                        text: 'Curr.',
                                        dataIndex: 'A1547MDARV',
                                        width: 60,
                                        align: 'center'
                                    },{
                                        text: 'Amount',
                                        dataIndex: 'A1547VCPUS',
                                        width: 70,
                                        align: 'right',                                            
                                        renderer: function(value, metaData, record, rowIndex, colIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },{
                                        text: 'Comm.',
                                        dataIndex: 'A1547PRRCM',
                                        width: 70,
                                        align: 'right',                                            
                                        renderer: function(value, metaData, record, rowIndex, colIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },{
                                        text: 'Double Usage<br>Accounting ',
                                        dataIndex: 'CONT_DOBLE',
                                        width: 80,
                                        align: 'center',
                                        hidden:true
                                    },{
                                        text: 'Adjustment',
                                        hidden:true,
                                        columns:[{
                                            text: 'Accounting<br>Date',
                                            dataIndex: 'A1547FAJT',
                                            width: 80,
                                            align: 'center'
                                        },{
                                            text: 'Original<br>Use Type',
                                            dataIndex: 'A1547OUSO',
                                            width: 70,
                                            align: 'center'
                                        }]
                                    }

                                ]
                            },
                            listeners: {
                                select: function(obj, record, index, eOpts) {
                                }
                            },/*
                            selModel: Ext.create('Ext.selection.CheckboxModel', {
                                checkOnly : true 
                            }),*/
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    if ( rowIndex % 2 === 0 ) return 'rowA';
                                }
                            },
                            trackMouseOver: true
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

