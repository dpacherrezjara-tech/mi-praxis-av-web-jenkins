/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.interline.InterlineFlownAnalysisForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            //width: 1550,
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
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
//                        
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                             layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                        {
                            xtype: 'grid',
                            padding: '10 0 0 0',
                            id: prototype.id + '-gridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 530,
                            width: 914,
                            columnLines: true,
                            resizable: false,
                            features: [{
                                        ftype: 'summary',
                                        dock: 'bottom'
                                    }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    resizable: false,
                                    align: 'center'
                                },
                                items: [
                                  
                                     {text: 'Clearing',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Date', width: 80, dataIndex: 'strFormatDate',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-interline-flown-analysis-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataGroup'
                                                }
                                            }
                                        ]
                                    },
                                            
                                    {text: 'Period', width: 60, dataIndex: 'IN_PERIOD'},
                                    {text: 'Qty',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'right',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Groups', width: 90, dataIndex: 'QGRUPO',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totQGRUPO, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                     {text: 'Qty',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'right',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Coupons', width: 90, dataIndex: 'QTYC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totQTYDOC, '0,000');
                                                        }
                                                    }
                                                ]
                                            },       
                                    {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 90, dataIndex: 'MONED',
                                                     }
                                                ]
                                            }, 
                                              
                              
                                    {text: 'Gross', align: 'right',width: 100, dataIndex: 'GROSS',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return Ext.util.Format.number(data.totGROSS, '0,000.00');
                                        }
                                    
                                    },
                                     
                                    {text: 'Commision',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'right',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'ISC', width: 100, dataIndex: 'ISC',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return Ext.util.Format.number(data.totISC, '0,000.00');
                                                }
                                            
                                          },
                                            {text: 'CSC', width: 100, dataIndex: 'OCOMIS',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return Ext.util.Format.number(data.totOCOMIS, '0,000.00');
                                            }
                                        }   
                                        ]
                                    },
                                    {text: 'Tax',align: 'right', width: 90, dataIndex: 'TAX',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                metaData.style = 'text-align:right';
                                                return Ext.util.Format.number(data.totTAX, '0,000.00');
                                            }
                                        },
                                    {text: 'Net',align: 'right', width: 100, dataIndex: 'NETO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return Ext.util.Format.number(data.totNETO, '0,000.00');
                                                    }
                                                }

                                            ]
                                        }
                                    }
                                ]
                           },
                         //----------------------DETAIL GROUP----------------------------
                         //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataGroup',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle2',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataGroup',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1124,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                           
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 80, dataIndex: 'CIA',
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:center;';
                                                    return  value;
                                                }},
                                                    
                                                     {text: 'Desciption', width: 300, dataIndex: 'strDescripcion',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:left;';
                                                    return  value;
                                                }
                                            },
                                                ]
                                            },
                                             {text: 'Group', width: 60, dataIndex: 'IN_GB'},
                                             {text: 'Qty',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'right',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Coupons', width: 90, dataIndex: 'QTYC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataGroup').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totQTYDOC, '0,000');
                                                        }
                                                    }
                                                ]
                                            },    
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', width: 90, dataIndex: 'MONED'}
                                                ]
                                            },
                                            {text: 'Gross', align: 'right',width: 100, dataIndex: 'GROSS',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataGroup').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totGROSS, '0,000.00');
                                                        }
                                    
                                    },
                                             {text: 'Commision',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'right',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'ISC', width: 100, dataIndex: 'ISC',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                      summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataGroup').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return Ext.util.Format.number(data.totISC, '0,000.00');
                                                    }
                                            
                                          },
                                            
                                            {text: 'CSC', width: 100, dataIndex: 'OCOMIS',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                      summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataGroup').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return Ext.util.Format.number(data.totOCOMIS, '0,000.00');
                                                    }
                                                }
                                            
                                        ]
                                    },
                                     {text: 'Tax',align: 'right', width: 90, dataIndex: 'TAX',
                                         renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                      summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataGroup').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return Ext.util.Format.number(data.totTAX, '0,000.00');
                                                    }
                                                },
                                    {text: 'Net',align: 'right', width: 100, dataIndex: 'NETO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                      summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataGroup').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return Ext.util.Format.number(data.totNETO, '0,000.00');
                                                    }
                                                }

                                        ]
                                    }
                                }
                            ]
                        },

                    ]
                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1100,
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
}
);

