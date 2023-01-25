/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'AtlSalesUseMonthlyBalance';
prototype.url = CONTEXTPATH + '/AtlSalesUseMonthlyBalance';
prototype.widthContenedor = 1360; //defaulf 1366  //old 1640
prototype.heightContenedor = 850;
 
Ext.define('Ext.Praxis.view.tnu.AtlSalesUseMonthlyBalance.AtlSalesUseMonthlyBalance', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AtlSalesUseMonthlyBalance',
    requires: [
        'Ext.Praxis.controller.tnu.AtlSalesUseMonthlyBalance.AtlSalesUseMonthlyBalanceController'        
    ],
    controller: 'AtlSalesUseMonthlyBalanceController',
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
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            labelStyle: 'text-align:center',
                                            fieldLabel: 'Period',
                                            value:  new Date().getFullYear(),
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
                            width:'100%',
                            height: 575, //default 480 //old 640
                            features: [{
                                dock: 'bottom',
                                ftype: 'summary'
                            }],                             
                            columns:{
                            items: [
                                {
                                    text: '',
                                    dataIndex: 'MES2',
                                    width: 40,                            
                                    locked: true,
                                    align: 'center'
                                },                                
                                {
                                    text: 'Sales',
                                    dataIndex:'SALE',
                                    width: 100,
                                    locked: true,
                                    align: 'right',                                                                                                            
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {                                        
                                        return Ext.util.Format.number(value, '0,000.00');                                        
                                    },                                                
                                    summaryType: function(records, values ){                                        
                                        var i = 0, total = 0,record;
                                        for (; i < records.length; ++i) {
                                            record = records[i];                                            
                                            if (record.get('MES2') !== '%')total += record.get('SALE');
                                        }                                        
                                        return  Ext.util.Format.number(total, '0,000.00');                                        
                                    }
                                },                                
                                {
                                    text: 'Last',
                                    dataIndex: 'LAST',
                                    width: 60,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {                                       
                                        return Ext.util.Format.number(value, '0,000.00');                                        
                                    },
                                    summaryType: function(records, values) {
                                        var i = 0,total = 0,record;
                                        for (; i < records.length; ++i) {
                                            record = records[i];
                                            if (record.get('MES2') !== '%')total += record.get('LAST');
                                        }
                                        return  Ext.util.Format.number(total, '0,000.00');
                                    }
                                },
                                {
                                    text: 'Months',
                                    columns: [
                                        {
                                            text: 'January',
                                            dataIndex: 'ENE',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {                                        
                                                if(record.data.MES === '01')  metaData.style = "background-color:#FBD705;";
                                                return Ext.util.Format.number(value, '0,000.00');                                                    
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('ENE');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'February',
                                            dataIndex: 'FEB',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '02')  metaData.style = "background-color:#FBD705;";
                                                else if( record.data.MES <= '02'  )  metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');                                        
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('FEB');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'March',
                                            dataIndex: 'MAR',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '03')  metaData.style = "background-color:#FBD705;";
                                                else if( record.data.MES <= '03' ) metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';

                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0, record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('MAR');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'April',
                                            dataIndex: 'ABR',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '04')  metaData.style = "background-color:#FBD705;";
                                                else if(record.data.MES <= '04' ) metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('ABR');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'May',
                                            dataIndex: 'MAY',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '05')  metaData.style = "background-color:#FBD705;";
                                                else if(record.data.MES <= '05' ) metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('MAY');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }      
                                        }, {
                                            text: 'June',
                                            dataIndex: 'JUN',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '06')  metaData.style = "background-color:#FBD705;";
                                                else if( record.data.MES <= '06' ) metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('JUN');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }
                                        }, {
                                            text: 'July',
                                            dataIndex: 'JUL',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '07')  metaData.style = "background-color:#FBD705;";
                                                else if( record.data.MES <= '07' ) metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('JUL');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }
                                        }, {
                                            text: 'August',
                                            dataIndex: 'AGO',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '08')  metaData.style = "background-color:#FBD705;";
                                                else if( record.data.MES <= '08' ) metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('AGO');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }       
                                        }, {
                                            text: 'September',
                                            dataIndex: 'SET',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '09')  metaData.style = "background-color:#FBD705;";
                                                else if(record.data.MES <= '09') metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('SET');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }       
                                        }, {
                                            text: 'October',
                                            dataIndex: 'OCT',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '10')  metaData.style = "background-color:#FBD705;";
                                                else if(record.data.MES <= '10') metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('OCT');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }       
                                        }, {
                                            text: 'November',
                                            dataIndex: 'NOV',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '11')  metaData.style = "background-color:#FBD705;";
                                                else if(record.data.MES <= '11') metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('NOV');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }        
                                        }, {
                                            text: 'December',
                                            dataIndex: 'DIC',
                                            width: 100,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                if(record.data.MES === '12')  metaData.style = "background-color:#FBD705;";
                                                else if(record.data.MES <= '12') metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
                                                return Ext.util.Format.number(value, '0,000.00');
                                                //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                            },
                                            summaryType: function(records, values) {
                                                var i = 0,total = 0,record;
                                                for (; i < records.length; ++i) {
                                                    record = records[i];
                                                    if (record.get('MES2') !== '%')total += record.get('DIC');
                                                }
                                                return  Ext.util.Format.number(total, '0,000.00');
                                            }       
                                        }]
                                },
                                {
                                    text: 'After',
                                    dataIndex: 'POST',
                                    width: 80,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        return Ext.util.Format.number(value, '0,000.00');
                                        //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                    },
                                    summaryType: function(records, values) {
                                        var i = 0,total = 0,record;
                                        for (; i < records.length; ++i) {
                                            record = records[i];
                                            if (record.get('MES2') !== '%')total += record.get('POST');
                                        }
                                        return  Ext.util.Format.number(total, '0,000.00');
                                   }       
                                },
                                {
                                    text: 'Balance',
                                    dataIndex: 'SALDO',
                                    width: 110,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        return Ext.util.Format.number(value, '0,000.00');
                                        //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000.00') + '</span> ';
                                    },
                                    summaryType: function(records, values) {
                                        var i = 0,total = 0,record;
                                        for (; i < records.length; ++i) {
                                            record = records[i];
                                            if (record.get('MES2') !== '%')total += record.get('SALDO');
                                        }
                                        return  Ext.util.Format.number(total, '0,000.00');
                                   }       
                                }
                            ]
                        }
                            /*viewConfig: {                               
                                stripeRows: true,
                                enableTextSelection: true
                            }*/
                        }
                   ]
                }
            ]
        }
    ]

});

