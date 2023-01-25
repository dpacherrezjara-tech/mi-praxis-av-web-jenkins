//Ext.define('Ext.Praxis.view.sales.ControlFiguresForm.DataEntryDetailAdms',{
//    extend: 'Ext.window.Window',
//    alias: 'widget.DataEntryDetailAdmsControlFiguresForm',
//    requires:[
//        'Ext.Praxis.controller.sales.ControlFigures.DataEntryDetailAdmsControlFiguresController'
//    ],
//    controller: 'DataEntryDetailAdmsControlFiguresController',
//    title:'',
//    header:true,
//    height:640,
//    width:900,
//    resizable:false,
//    layout:'fit',
//    modal:true,
//    border: false,
//    defaults: {
//        border: false
//    },
//    items:[
//        {
//            xtype: 'form',
//            width: '100%',
//            defaults:{
//                style: 'margin: 3px;',
//                border: false
//            },
//            items:[
//                {
//                    xtype: 'panel',
//                    width: '100%',
//                    bodyStyle: 'background: transparent;"',
//                    layout: {
//                        type: 'vbox',
//                        align: 'center'
//                    },
//                    defaults: {
//                        anchor: '100%'
//                    },
//                    items: [
//                        {
//                            xtype: 'panel',
//                            width: '100%',
//                            layout: 'vbox',
//                            border: false,
//                            margin: '4 2',
//                            defaults: {
//                                anchor: '100%',
//                                width: '100%'
//                            },
//                            items: [
//                                //<editor-fold defaultstate="collapsed" desc="Options">
//                                {
//                                    xtype: 'panel',
//                                    border: false,
//                                    height: '9%',
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'end'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'panel',
//                                            width: 100,
//                                            border: false,
//                                            items: [
//                                                {
//                                                    xtype: 'toolbar',
//                                                    cls: 'x-toolbar-pag',
//                                                    items: [
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btn-pag-first',
//                                                            iconCls: 'prx-icon-pagination-first',
//                                                            tooltip: 'First Page',
//                                                            listeners: {
//                                                                click: 'pagFirst'
//                                                            }
//                                                        },
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btn-pag-previous',
//                                                            iconCls: 'prx-icon-pagination-previous',
//                                                            tooltip: 'Previous Page',
//                                                            listeners: {
//                                                                click: 'pagPrevious'
//                                                            }
//                                                        },
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btn-pag-next',
//                                                            iconCls: 'prx-icon-pagination-next',
//                                                            tooltip: 'Next Page',
//                                                            listeners: {
//                                                                click: 'pagNext'
//                                                            }
//                                                        },
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btn-pag-last',
//                                                            iconCls: 'prx-icon-pagination-last',
//                                                            tooltip: 'Last Page',
//                                                            listeners: {
//                                                                click: 'pagLast'
//                                                            }
//                                                        },
//                                                        {
//                                                            xtype: 'pagingtoolbar',
//                                                            id: prototype.id+'-3-paggin',
//                                                            pageSize: 10,
//                                                            border: false,
//                                                            displayInfo: false,
//                                                            hidden: true
//                                                        }
//                                                    ]
//                                                }
//                                            ]
//                                        },
//                                        {xtype: 'tbspacer', width: 20},
//                                        {
//                                            xtype: 'panel',
//                                            border: true,
//                                            items: [
//                                                {
//                                                    xtype: 'toolbar',
//                                                    items: [
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btnSearch',
//                                                            iconCls: 'prx-icon-search',
//                                                            tooltip: 'Search',
//                                                            hidden: true,
//                                                            listeners: {
//                                                                click: 'btnSearch_click'
//                                                            }
//                                                        },
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btnExcel',
//                                                            iconCls: 'prx-icon-excel',
//                                                            tooltip: 'Export to Excel',
//                                                            hidden: true,
//                                                            listeners: {
//                                                                click: 'btnExcel_click'
//                                                            }
//                                                        },
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btnClear',
//                                                            iconCls: 'prx-icon-clear',
//                                                            tooltip: 'Clear Options',
//                                                            hidden: true,
//                                                            listeners: {
//                                                                click: 'btnClear_click'
//                                                            }
//                                                        },
//                                                        {
//                                                            xtype: 'button',
//                                                            id: prototype.id+'-3-btnBack',
//                                                            iconCls: 'prx-icon-back',
//                                                            tooltip: 'Back',
//                                                            listeners: {
//                                                                click: 'btnBack_click'
//                                                            }
//                                                        }
//                                                    ]
//                                                }
//                                            ]
//                                        }
//                                    ]
//                                },
//                                //</editor-fold>
//                                {xtype: 'tbspacer', height: 4},
//                                {
//                                    xtype: 'panel',
//                                    width: '100%',
//                                    bodyStyle: 'background-color: #F4F4F2;',
//                                    border: true,
//                                    height: '90%',
//                                    layout: {
//                                        type: 'vbox',
//                                        align: 'center'
//                                    },
//                                    items: [
//                                        // <editor-fold defaultstate="collapsed" desc="gridDataAdmAcm">
//                                        {
//                                            xtype: 'grid',
//                                            id: prototype.id+'-3-gridDataAdmAcm',
//                                            bodyStyle: 'background: transparent;',
//                                            width: '100%',
//                                            height: 499,
//                                            columnLines: true,
//                                            columns: {
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                items: [
//                                                    {
//                                                        text: 'Air', dataIndex: 'A714CIA', width: 50,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Document', dataIndex: 'DOCUMENTO', flex: 1,//width: 100,
//                                                        listeners: {
//                                                            click: 'gridADM_act1_clickHandler'
//                                                        },
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;text-decoration:underline;font-weight:bold;";
//                                                            value = '<b>'+value+'</b>';
//                                                            return '<a href="#sales-control-figures-form" style="color:#244066;text-decoration:underline;">'+value+'</a>';
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Issue Date', dataIndex: 'A714FECVTA', width: 90,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'CNJ', dataIndex: 'CNJ', width: 65,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Transaction', dataIndex: 'A714TRNCU', width: 90,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Document<br>Type', dataIndex: 'A714TDOC', width: 85,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Currency', dataIndex: 'A714MDAFA', width: 80,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Amount', dataIndex: 'A714FARE',  align: 'right', width: 85,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;color:#244066;";
//                                                            return win.formatDblNumber(value);
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'FOP<br>Currency', dataIndex: 'A714MDAFP', width: 75,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#244066;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'FOP Amount', dataIndex: 'A714VFOP',  width: 115,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;color:#244066;";
//                                                            return win.formatDblNumber(value);
//                                                        }
//                                                    }
//                                                ]
//                                            }
//                                        },
//                                        // </editor-fold>
//                                        { xtype: 'tbspacer', height: 4 },
//                                        {
//                                            xtype: 'panel',
//                                            bodyStyle: 'background: transparent;',
//                                            width: '100%',
//                                            height: '12%',
//                                            border: false,
//                                            layout: 'hbox',
//                                            items: [
//                                                // <editor-fold defaultstate="collapsed" desc="pie">
//                                                {
//                                                    xtype: 'panel',
//                                                    id: prototype.id+'-3-pie',
//                                                    width: '60%',
//                                                    border: false,
//                                                    height: 25,
//                                                    bodyStyle: 'background-color: transparent;',
//                                                    layout: {
//                                                        type: 'vbox',
//                                                        align: 'center'
//                                                    },
//                                                    padding: '1px 0px 1px 0px',
//                                                    items: [
//                                                        {
//                                                            xtype: 'panel',
//                                                            bodyStyle: 'background: transparent;',
//                                                            border: false,
//                                                            width: '100%',
//                                                            height: '100%',
//                                                            layout: 'hbox',
//                                                            defaults: {
//                                                                xtype: 'label',
//                                                                margin: '3px 0px 0px 2px'
//                                                            },
//                                                            items: [
//                                                                {xtype: 'tbspacer', width: 110},
//                                                                {
//                                                                    text: 'Page',
//                                                                    width: 50
//                                                                },
//                                                                {
//                                                                    id: prototype.id+'-3-lblPagActualTk',
//                                                                    text: '1',
//                                                                    width: 30
//                                                                },
//                                                                {
//                                                                    text: 'Of',
//                                                                    width: 40
//                                                                },
//                                                                {
//                                                                    id: prototype.id+'-3-lblPagTotalTk',
//                                                                    text: '0',
//                                                                    width: 30
//                                                                },
//                                                                {xtype: 'tbspacer', width: 40},
//                                                                {
//                                                                    text: 'Total found',
//                                                                    width: 80
//                                                                },
//                                                                {
//                                                                    id: prototype.id+'-3-lblRowsTotalTk',
//                                                                    text: '0',
//                                                                    width: 50
//                                                                }
//                                                            ]
//                                                        }
//                                                    ]
//                                                },
//                                                //</editor-fold>
//                                                {
//                                                    xtype: 'panel',
//                                                    width: '40%',
//                                                    border: true,
//                                                    layout: 'hbox',
//                                                    bodyStyle: 'background: #E2E3ED;border-style:solid;border-color:#9B9AB3;border-width:2px;',
//                                                    defaults: {
//                                                        padding: '4 0'
//                                                    },
//                                                    height: 35,
//                                                    items: [
//                                                        { xtype: 'tbspacer', width: '1%' },
//                                                        {
//                                                            xtype: 'label',
//                                                            id: prototype.id+'-3-gridDataTkt_TitleTotals',
//                                                            text: '',
//                                                            width: '55%',
//                                                            style: 'font-weight:bold;color:#203D6B;',
//                                                            margin: '4 0'
//                                                        },
//                                                        {
//                                                            xtype: 'textfield',
//                                                            id:prototype.id+'-3-txtTotalAountConcep',
//                                                            value: '',
//                                                            fieldStyle: 'text-align:right;font-weight:bold;color:#3C6B8C;',
//                                                            border: true,
//                                                            readOnly: true,
//                                                            width: '43%'
//                                                        },
//                                                        {xtype: 'tbspacer', width: '1%'}
//                                                    ]
//                                                }
//                                            ]
//                                        },
//                                        { xtype: 'tbspacer', height: 4 }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                }
//            ]
//        }
//    ]
//});