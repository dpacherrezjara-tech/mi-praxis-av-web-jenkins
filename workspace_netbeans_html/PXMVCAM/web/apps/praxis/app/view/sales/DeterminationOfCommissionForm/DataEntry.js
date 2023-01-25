var widthDataEntry = 1490;
Ext.define('Ext.Praxis.view.sales.DeterminationOfCommissionForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDeterminationOfCommissionForm',
    requires:[
        'Ext.Praxis.controller.sales.DeterminationOfCommission.DataEntryDeterminationOfCommissionController'
    ],
    controller: 'DataEntryDeterminationOfCommissionController',
    title:'History:',
    header:true,
    height:690,
    width:widthDataEntry,
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
                            margin: '4 2 4 2',
                            defaults: {
                                anchor: '100%',
                                width: widthDataEntry-30
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Options">
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
                                            id: prototype.id+'-boxPaginacion2',
                                            width: 100,
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    cls: 'x-toolbar-pag',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-first2',
                                                            iconCls: 'prx-icon-pagination-first',
                                                            tooltip: 'First Page',
                                                            listeners: {
                                                                click: 'pagFirst'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-previous2',
                                                            iconCls: 'prx-icon-pagination-previous',
                                                            tooltip: 'Previous Page',
                                                            listeners: {
                                                                click: 'pagPrevious'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-next2',
                                                            iconCls: 'prx-icon-pagination-next',
                                                            tooltip: 'Next Page',
                                                            listeners: {
                                                                click: 'pagNext'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-last2',
                                                            iconCls: 'prx-icon-pagination-last',
                                                            tooltip: 'Last Page',
                                                            listeners: {
                                                                click: 'pagLast'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            id: prototype.id + '-paggin3',
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
                                                            id: prototype.id + '-btnExcel2',
                                                            iconCls: 'prx-icon-excel',
                                                            tooltip: 'Export to Excel',
                                                            listeners: {
                                                                click: 'btnExcel_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnBack2',
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
                                // </editor-fold>
                                { xtype: 'tbspacer', height: 2 },
                                // <editor-fold defaultstate="collapsed" desc="Info">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    height: 580,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="grid_det_comm_GridGroup2">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-grid_det_comm_GridGroup2',
                                            width: widthDataEntry-30,
                                            height: 550,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'TAKEN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Currency', dataIndex: 'A2845MDAFA', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#244066;font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Fare', dataIndex: 'A2845FARE', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup2').getStore().getData().items[0].data;
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(data.TOT_LOCAL_FARE, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Value Commission', dataIndex: 'A2845TTCOM', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup2').getStore().getData().items[0].data;
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(data.TOT_VALE_COMMISSION, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'GIVEN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Value Commission', dataIndex: 'A2845VUPFR', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#d5f4d5;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup2').getStore().getData().items[0].data;
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(data.TOT_GIVEN_COMMISSION_VALUE, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'DIFFERENCE ',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Value', dataIndex: 'DIFERENCIA', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup2').getStore().getData().items[0].data;
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(data.TOT_DIFFERENCE_VALUE, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Round ', dataIndex: 'ROUND', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup2').getStore().getData().items[0].data;
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(data.TOT_DIFFERENCE_ROUND, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'IVA Round', dataIndex: 'ROUND_IVA', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup2').getStore().getData().items[0].data;
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return Ext.util.Format.number(data.TOT_DIFFERENCE_IVA_ROUND, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'DIFERENCIA_IVA_TOTAL', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#d5f4d5;color:#244066;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-grid_det_comm_GridGroup2').getStore().getData().items[0].data;
                                                            metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                            return Ext.util.Format.number(data.TOT_TOTAL, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Apply', dataIndex: 'APPLY_ADM', width: 70, sortable: false,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;color:#2D486C;font-weight:bold;";
                                                            if (value==='YES') value = data.A2959TRNCO;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'A2959TRNCO', width: 118, sortable: false,
                                                        listeners: {
                                                            click: 'onSearchInfoADMClick'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            if(data.STATUS==="P")value ="Pending";
                                                            if(data.STATUS==="D")value ="IATA Disabled";
                                                            if(data.STATUS==="C")value ="Not Client Register";
                                                            if(data.STATUS==="Y")value ="processed "+value;
                                                            metaData.style = "text-align:left;color:#057ECB;text-decoration:none;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#sales-determination-of-commission-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Status Record', dataIndex: 'A2959FLAG', width: 130,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if(value==="R")value ="Reprocessing";
                                                            if(value==="D")value ="Removed";
                                                            if(value==="A")value ="Active";
                                                            metaData.style = "text-align:left;color:#244066;font-weight:bold;";
                                                            return value;
                                                        }
                                                    },
                                                    
                                                    {
                                                        text: 'Record Change ',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'User', dataIndex: 'A2959RMODI', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Date', dataIndex: 'A2959FMODI', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#244066;font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Hour', dataIndex: 'A2959HMODI', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;font-weight:bold;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="pie3">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-pie3',
                                            width: widthDataEntry-30,
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: true
                                            },
                                            padding: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: widthDataEntry-30,
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
                                                            id: prototype.id + '-lbl-currentPage3',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-pageCount3',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total found',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-total3',
                                                            text: '0',
                                                            width: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                                // </editor-fold>
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