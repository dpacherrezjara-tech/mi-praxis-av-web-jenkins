Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrAVSales', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrAVSales',
    requires: [
          'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrAVSalesController'
    ],
    controller: 'ScrAVSalesController',
//    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
//    bodyStyle: 'background: transparent;',
    defaults: {
        bodyStyle: 'background: transparent;'
//        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalSales',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [        
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxMainData',
                    width: '100%',
//                    hidden: false,
                    layout: {
                        type: 'hbox',
                        align: 'center',
                        pack:'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center',
                        margin: "0 15 0 0"  // (top, right, bottom, left)
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                                
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                 {xtype:'label',text:'Low Values',style: "font-size:18px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                 {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridSalesL',
                                    padding: '5px 0px 0px 0px',
                                    width: 402,
//                                    height: 428,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            { text: 'Sales',
                                              columns: [ 
                                                  {
                                                    text: 'Date', dataIndex: 'strFormatDate', width: 90, align: 'center', 
                                                    listeners: {
                                                        click: 'clickDetSales_colHandler',
                                                        args: ['MIN']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    }
                                                  }  
                                              ]
                                            },
                                            { text: 'Totals',
                                              columns: [ 
                                                  {
                                                        text: 'Coupons', dataIndex: 'QTKTS', width: 80, align: 'center',
                                                        listeners: {
                                                            click: 'clickDetSales_colHandler',
                                                            args: ['MIN']
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:right;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSalesL').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQTKTS, '0,000');
                                                        }
                                                  } 
                                              ]
                                            },
                                            { text: 'Fare',
                                              columns: [ 
                                                  {text: 'USD', dataIndex: 'AMOUNT', width: 90, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSalesL').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.dblTotAMOUNT, '0,000');
                                                        }
                                                  } 
                                              ]
                                            },
                                            {text: 'Percent', dataIndex: 'perMim', width: 70,
                                                  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                      metaData.style = "text-align:right; ";
                                                      return Ext.util.Format.number(value, '0,000.000') + ' %';
                                                  }
                                            }, 
                                            {text: 'AVG', dataIndex: 'avgMim', width: 70,
                                                  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                      metaData.style = "text-align:right; ";
                                                      return Ext.util.Format.number(value, '0,000.000');
                                                  }
                                            }
                                           

                                        ]
                                   }
                                 }
                                
                            ]
                        },  
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                 {xtype:'label',text:'High Values',style: "font-size:18px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                 {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridSalesH',
                                    padding: '5px 0px 0px 0px',
                                    width: 402,
//                                    height: 428,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            { text: 'Sales',
                                              columns: [ 
                                                  {
                                                    text: 'Date', dataIndex: 'strFormatDate', width: 90, align: 'center',
                                                    listeners: {
                                                        click: 'clickDetSales_colHandler',
                                                        args: ['MAX']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    }
                                                  }  
                                              ]
                                            },
                                            { text: 'Totals',
                                              columns: [ 
                                                  {text: 'Coupons', dataIndex: 'QTKTSmax', width: 80, align: 'center',
                                                        listeners: {
                                                            click: 'clickDetSales_colHandler',
                                                            args: ['MAX']
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:right;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSalesL').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQTKTSmax, '0,000');
                                                        }
                                                  } 
                                              ]
                                            },
                                            { text: 'Fare',
                                              columns: [ 
                                                  {text: 'USD', dataIndex: 'AMOUNTmax', width: 90, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSalesL').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.dblTotAMOUNTmax, '0,000');
                                                        }
                                                  } 
                                              ]
                                            },
                                            {text: 'Percent', dataIndex: 'perMax', width: 70,
                                                  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                      metaData.style = "text-align:right; ";
                                                      return Ext.util.Format.number(value, '0,000.000') + ' %';
                                                  }
                                            }, 
                                            {text: 'AVG', dataIndex: 'avgMax', width: 70,
                                                  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                      metaData.style = "text-align:right; ";
                                                      return Ext.util.Format.number(value, '0,000.000');
                                                  }
                                            }
                                           

                                        ]
                                   }
                                 }
                                
                            ]
                        },  
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                 {xtype:'label',text:'Below Minimum Values',style: "font-size:18px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                 {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridSalesB',
                                    padding: '5px 0px 0px 0px',
                                    width: 402,
//                                    height: 428,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            { text: 'Sales',
                                              columns: [ 
                                                  {
                                                    text: 'Date', dataIndex: 'strFormatDate', width: 90, align: 'center',
                                                    listeners: {
                                                        click: 'clickDetSales_colHandler',
                                                        args: ['BEL']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    }
                                                  }  
                                              ]
                                            },
                                            { text: 'Totals',
                                              columns: [ 
                                                  {text: 'Coupons', dataIndex: 'QTKTSbel', width: 80, align: 'center',
                                                        listeners: {
                                                            click: 'clickDetSales_colHandler',
                                                            args: ['BEL']
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:right;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSalesL').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.lngTotQTKTSbel, '0,000');
                                                        }
                                                  } 
                                              ]
                                            },
                                            { text: 'Fare',
                                              columns: [ 
                                                  {text: 'USD', dataIndex: 'AMOUNTbel', width: 90, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSalesL').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.dblTotAMOUNTbel, '0,000');
                                                        }
                                                  } 
                                              ]
                                            },
                                            {text: 'Percent', dataIndex: 'perBel', width: 70,
                                                  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                      metaData.style = "text-align:right; ";
                                                      return Ext.util.Format.number(value, '0,000.000') + ' %';
                                                  }
                                            }, 
                                            {text: 'AVG', dataIndex: 'avgBel', width: 70,
                                                  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                      metaData.style = "text-align:right; ";
                                                      return Ext.util.Format.number(value, '0,000.000');
                                                  }
                                            }
                                           

                                        ]
                                   }
                                 }
                                
                            ]
                        }
                        
                          
                    ]  
                              
                         
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDetDataS',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack:'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center',
                        margin: "0 15 0 0" // (top, right, bottom, left)
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
        //                    hidden: false,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack:'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                margin: "10 15 10 0"  // (top, right, bottom, left)
                            },
                            items: [
//                                {xtype:'label',text:'City Pair',style: "font-size:12px;font-weight:bold;width:60;"},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbcCitiesFrom',
                                    fieldStyle: 'text-align: left;',
                                    disabled: false,
                                    fieldLabel: 'City Pair',
                                    width: 250,
                                    labelWidth: 70,
                                    labelAlign: 'left',
                                    labelStyle: 'text-align:left;font-weight:bold;',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR'
                                },{
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbcCitiesTo',
                                    fieldStyle: 'text-align: left;',
                                    disabled: false,
                                    width: 180,
                                    labelWidth: 70,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnSearchCities',
                                    text: '<b>Search</b>',
                                    tooltip: 'Search',
                                    width: 80,
                                    height: 25,
//                                    margin: '8px 5px 5px 5px',
//                                    padding: '4 5 5 2',
                                    listeners: {
                                         click: 'viewDetSales_colHandler'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtDateCreate',
                                    format: 'Y/m/d',
                                    maskRe: /[0-9/]/,
                                    width: 190,
                                    labelWidth: 80,
                                    fieldLabel: 'Create Date',
                                    name: 'from_date',
                                    maxValue: new Date(),  // limited to the current date or prior,
                                    listeners : {
                                       change : 'dateChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 200},
                                {
                                    xtype: 'button',
//                                    margin: '5 1 1 1',
                                    width: 20,
                                    height: 20,
                                    icon: 'resources/img/exchange.png',
                                    tooltip: 'Swap',
//                                    listeners: {
//                                        click: function(obj, e) {
//                                            me.addItinerario();
//                                        }
//                                    }
                                },
                                {xtype:'label',text:'Factor Miles : ',style: "font-size:12px;font-weight:bold;width:60;"},
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id+'-rbgpDetail',
                                    defaultType: 'radiofield',
                                    style: 'text-align: right;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            id: prototype.id+'-rbMIN',
                                            boxLabel  : '<label style="color:#142E7A;">Low</label>',
                                            inputValue: 'MIN',
                                            checked: true,
                                            name: 'rbgpDetail',
                                            listeners: {
                                                change: 'rgchange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            id: prototype.id+'-rbMAX',
                                            boxLabel  : '<label style="color:#142E7A;">High</label>',
                                            inputValue: 'MAX',
                                            name: 'rbgpDetail',
                                            listeners: {
                                                change: 'rgchange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            id: prototype.id+'-rbBEL',
                                            boxLabel  : '<label style="color:#142E7A;">Below</label>',
                                            inputValue: 'BEL',
                                            name: 'rbgpDetail',
                                            listeners: {
                                                change: 'rgchange'
                                            }
                                        }
                                    ]
                                }

                            ] 
                        },   
                        
                        
                        {xtype:'label',id:prototype.id + '-titDetSalesS',text:'',style: "font-size:12px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                           xtype: 'grid',
                           id: prototype.id + '-gridDetSalesS',
                           padding: '5px 0px 0px 0px',
                           width: 1320,
//                           height: 528,
                           columnLines: true,
                           features: [{
                                   ftype: 'summary'
                               }],
                           columns: 
//                                   {
//                               defaults: {
//                                   menuDisabled: true,
//                                   sortable: false,
//                                   align: 'center'
//                               },
//                               items: 
                                       [
                                   { text: 'Agent',
                                     columns: [ 
                                         {text: 'Code', dataIndex: 'VENDOR', width: 90, align: 'center'},
                                         {text: 'Name', dataIndex: 'strDescription', width: 200, align: 'left'}   
                                     ]
                                   },
                                   {text: 'Ctry', dataIndex: 'COUNTRYS', width: 50, align: 'center'},
                                   {text: 'Scr', dataIndex: 'strDescription2', width: 50, align: 'center'},
                                   {text: 'Type', dataIndex: 'TDOC', width: 50, align: 'center'},
                                   {text: 'Ticket Number', dataIndex: 'TKT', width: 120, align: 'center'},
                                   { text: 'Date of',
                                     columns: [ 
                                         {text: 'Sale', dataIndex: 'FEAC', width: 90, align: 'center'}
                                     ]
                                   },
                                   {text: 'Org - Des', dataIndex: 'CITYS', width: 80, align: 'center'},
                                   {text: 'Miles', dataIndex: 'PMP', width: 80,
                                         renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:right; ";
                                             return Ext.util.Format.number(value, '0,000') ;
                                         },
                                         summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetSalesS').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totPMP, '0,000');
                                        }
                                   },
                                   {text: 'Cl', dataIndex: 'CLASEO', width: 30, align: 'center'},
                                   {text: 'Fare Basis', dataIndex: 'FAREBASE', width: 90, align: 'center'},
                                   { text: 'Rev. by Miles',
                                     columns: [ 
                                         {text: 'Sold', dataIndex: 'FACRMI', width: 90, align: 'center',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:center;background:#aeeaae;";
                                                return Ext.util.Format.number(value, '0,000.000') ;
                                            }
                                         }
                                     ]
                                   },
                                   { text: 'Fare USD',
                                     columns: [ 
                                         {text: 'Sold', dataIndex: 'VALOR', width: 70,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:right;background:#75bda6;";
                                                return Ext.util.Format.number(value, '0,000') ;
                                            },
                                            summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                               metaData.style = "text-align:right;";
                                               var data = Ext.getCmp(prototype.id + '-gridDetSalesS').getStore().getData().items[0].data;
                                               return Ext.util.Format.number(data.totVALOR, '0,000');
                                            }
                                         }, 
                                         {text: 'Min. -50%', dataIndex: 'VALORMIN', width: 80,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:right;background:#9ccfbf;";
                                                return Ext.util.Format.number(value, '0,000.00') ;
                                            },
                                            summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                               metaData.style = "text-align:right;";
                                               var data = Ext.getCmp(prototype.id + '-gridDetSalesS').getStore().getData().items[0].data;
                                               return Ext.util.Format.number(data.totVALORMIN, '0,000');
                                            }
                                         }, 
                                         {text: 'Normal(Est)', dataIndex: 'VALORBAS', width: 80,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:right;background:#9ccfbf;";
                                                return Ext.util.Format.number(value, '0,000.00') ;
                                            },
                                            summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                               metaData.style = "text-align:right;";
                                               var data = Ext.getCmp(prototype.id + '-gridDetSalesS').getStore().getData().items[0].data;
                                               return Ext.util.Format.number(data.totVALORBAS, '0,000');
                                            }
                                         }, 
                                         {text: 'Diff', dataIndex: 'DIFFNORMAL', width: 70,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:right;background:#9ccfbf;";
                                                return Ext.util.Format.number(value, '0,000.00') ;
                                            },
                                            summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                               metaData.style = "text-align:right;";
                                               var data = Ext.getCmp(prototype.id + '-gridDetSalesS').getStore().getData().items[0].data;
                                               return Ext.util.Format.number(data.totVALORMAX, '0,000');
                                            }
                                         }
                                     ]
                                   }
                               ]
//                          }
                        }
                    
                    ]
                        
                }
                                            
                                            
                                            
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});