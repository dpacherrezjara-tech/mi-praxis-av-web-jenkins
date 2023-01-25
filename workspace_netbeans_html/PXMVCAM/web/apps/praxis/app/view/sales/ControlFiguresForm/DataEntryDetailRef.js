Ext.define('Ext.Praxis.view.sales.ControlFiguresForm.DataEntryDetailRef',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailRefControlFiguresForm',
    requires:[
        'Ext.Praxis.controller.sales.ControlFigures.DataEntryDetailRefControlFiguresController'
    ],
    controller: 'DataEntryDetailRefControlFiguresController',
    title:'',
    header:true,
    height:660,
    width:1130,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '4 2',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Options">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 100,
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    cls: 'x-toolbar-pag',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btn-pag-first',
                                                            iconCls: 'prx-icon-pagination-first',
                                                            tooltip: 'First Page',
                                                            listeners: {
                                                                click: 'pagFirst'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btn-pag-previous',
                                                            iconCls: 'prx-icon-pagination-previous',
                                                            tooltip: 'Previous Page',
                                                            listeners: {
                                                                click: 'pagPrevious'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btn-pag-next',
                                                            iconCls: 'prx-icon-pagination-next',
                                                            tooltip: 'Next Page',
                                                            listeners: {
                                                                click: 'pagNext'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btn-pag-last',
                                                            iconCls: 'prx-icon-pagination-last',
                                                            tooltip: 'Last Page',
                                                            listeners: {
                                                                click: 'pagLast'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            id: prototype.id+'2-paggin',
                                                            pageSize: 10,
                                                            border: false,
                                                            displayInfo: false,
                                                            hidden: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'panel',
                                            border: true,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btnSearch',
                                                            iconCls: 'prx-icon-search',
                                                            tooltip: 'Search',
                                                            hidden: true,
                                                            listeners: {
                                                                click: 'btnSearch_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btnExcel',
                                                            iconCls: 'prx-icon-excel',
                                                            tooltip: 'Export to Excel',
                                                            listeners: {
                                                                click: 'btnExcel_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btnClear',
                                                            iconCls: 'prx-icon-clear',
                                                            tooltip: 'Clear Options',
                                                            hidden: true,
                                                            listeners: {
                                                                click: 'btnClear_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id+'2-btnBack',
                                                            iconCls: 'prx-icon-back',
                                                            tooltip: 'Back',
                                                            listeners: {
                                                                click: 'btnBack_click'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', height: 4},
                                {
                                    xtype: 'panel',
                                    border: false,
                                    height: 600,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        width: 1080
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridDataRfnd">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id+'2-gridDataRfnd',
                                            height: 516,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Air', dataIndex: 'A713CIA', 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Document', dataIndex: 'DOCUMENTO', flex: 1,//width: 100,
                                                        listeners: {
                                                            click: 'gridRFND_act1_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;text-decoration:underline;font-weight:bold;";
                                                            value = '<b>'+value+'</b>';
                                                            return '<a href="#sales-control-figures-form" style="color:#244066;text-decoration:underline;">'+value+'</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Issue Date', dataIndex: 'A713FECVTA', 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Coupons', dataIndex: 'CUPON', 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'CNJ', dataIndex: 'CNJ', 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Transaction', dataIndex: 'A713TRNCU', 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Document Type', dataIndex: 'A713TDOC', 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Fare Currency', dataIndex: 'A713MONEDA', 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Fare Amount', dataIndex: 'A713TARIFA',  align: 'right',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#244066;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '', dataIndex: 'VALOR_CONCEPT',  id: prototype.id+'2-gridDataTkt_TitleColumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#244066;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        { xtype: 'tbspacer', height: 4 },
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            layout: 'hbox',
                                            height: 70,
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="pie">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'2-pie',
                                                    width: 532,
                                                    border: false,
                                                    height: 25,
                                                    bodyStyle: 'background-color: transparent;',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    padding: '1px 0px 1px 0px',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            border: false,
                                                            width: 690,
                                                            height: 25,
                                                            layout: 'hbox',
                                                            defaults: {
                                                                xtype: 'label',
                                                                margin: '3px 0px 0px 2px'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 110},
                                                                {
                                                                    text: 'Page',
                                                                    width: 50
                                                                },
                                                                {
                                                                    id: prototype.id+'2-lbl-currentPage',
                                                                    text: '1',
                                                                    width: 30
                                                                },
                                                                {
                                                                    text: 'Of',
                                                                    width: 40
                                                                },
                                                                {
                                                                    id: prototype.id+'2-lbl-pageCount',
                                                                    text: '0',
                                                                    width: 30
                                                                },
                                                                {xtype: 'tbspacer', width: 40},
                                                                {
                                                                    text: 'Total found',
                                                                    width: 80
                                                                },
                                                                {
                                                                    id: prototype.id+'2-lbl-total',
                                                                    text: '0',
                                                                    width: 50
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                {
                                                    xtype: 'panel',
                                                    width: 547,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'background: #E2E3ED;border-style:solid;border-color:#9B9AB3;border-width:2px;',
                                                    defaults: {
                                                        padding: '7 0 0 0'
                                                    },
                                                    height: 40,
                                                    items: [
                                                        { xtype: 'tbspacer', width: 7 },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'2-gridDataTkt_TitleTotals',
                                                            text: '',
                                                            style: 'font-weight:bold;color:#203D6B;',
                                                            width: 300,
                                                            margin: '5 0 5 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            xtype: 'textfield',
                                                            id:prototype.id+'2-txtTotalAountConcep',
                                                            fieldStyle: 'text-align:right;font-weight:bold;color:#3C6B8C;',
                                                            border: true,
                                                            readOnly: true,
                                                            width: 130
                                                        },
                                                        {xtype: 'tbspacer', width: 7}
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
    ],
    dockedItems:[
    ]
});