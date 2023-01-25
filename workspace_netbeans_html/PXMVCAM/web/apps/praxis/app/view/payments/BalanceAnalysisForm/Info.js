/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.payments.BalanceAnalysisForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
//    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 2000,
            height: 1000,
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
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   PANEL MAIN DATA - ACCB - CURRENCY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - ACCB - CURRENCY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 230 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1194,
                                        height: 550,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMain',
                                            height: 400,
                                            width: 1194,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Sales Date', dataIndex: 'strFormatDate', width: 80, listeners: {
                                                                    click: 'OnGridACCBDetByDate'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }},
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CASH', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP_C', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#F1D179;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP_C, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP_C', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#F1D179;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP_C, '0,000') + '<b>';
                                                                        }

                                                                    }
                                                                ]},
                                                            {text: 'CREDIT CARD', dataIndex: 'NAMEBANK', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '% C. Card', dataIndex: 'perSale', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.TotperSale, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to Bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '% Month', dataIndex: 'dblPerc02', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Sales without bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '% Month', dataIndex: 'dblPerc03', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    hidden: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 450',
                                            text: 'Passenger by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico01',
                                            width: 1000,
                                            border: false,
                                            height: 300,
                                            background: '#E3EAEF',
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [{
                                                    type: 'numeric',
                                                    position: 'left',
                                                    grid: true
                                                }, {
                                                    type: 'category',
                                                    position: 'bottom',
                                                    visibleRange: [0, 1]
                                                }],
                                            series: [
                                                {
                                                    type: 'line',
                                                    xField: 'ZONA',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'QCPAX16',
                                                    title: '2018',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28, renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX16'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#FAB347",
                                                        stroke: "#FAB347",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#FAB347',
                                                        lineWidth: 2,
                                                        fill: 'white'
                                                    }
                                                },
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-leyendLastG1',
                                                    xField: 'ZONA',
                                                    yField: 'QCPAX15',
                                                    title: '2017',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX15'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        smooth: true,
                                                        fill: "#FF5555",
                                                        stroke: "#FF5555",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'circle',
                                                        radius: 4,
                                                        lineWidth: 1,
                                                        stroke: "#FF5555",
                                                        fill: 'white'}
                                                }
                                            ]
                                        }]}
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - ACCB - CURRENCY DET BY DATE---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - ACCB - CURRENCY DET BY DATE">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelACCBDetByDate',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 230 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1120,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataACCBDetByDate',
                                            height: 350,
                                            width: 1120,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                                                                listeners: {
                                                                    click: 'OnGridACCBDetByCountry'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {text: 'Country Name', dataIndex: 'strDescCountry', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to Bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Sales without bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    hidden: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 450',
                                            text: 'Passenger by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico01',
                                            width: 1000,
                                            border: false,
                                            height: 300,
                                            background: '#E3EAEF',
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [{
                                                    type: 'numeric',
                                                    position: 'left',
                                                    grid: true
                                                }, {
                                                    type: 'category',
                                                    position: 'bottom',
                                                    visibleRange: [0, 1]
                                                }],
                                            series: [
                                                {
                                                    type: 'line',
                                                    xField: 'ZONA',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'QCPAX16',
                                                    title: '2018',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28, renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX16'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#FAB347",
                                                        stroke: "#FAB347",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#FAB347',
                                                        lineWidth: 2,
                                                        fill: 'white'
                                                    }
                                                },
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-leyendLastG1',
                                                    xField: 'ZONA',
                                                    yField: 'QCPAX15',
                                                    title: '2017',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX15'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        smooth: true,
                                                        fill: "#FF5555",
                                                        stroke: "#FF5555",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'circle',
                                                        radius: 4,
                                                        lineWidth: 1,
                                                        stroke: "#FF5555",
                                                        fill: 'white'}
                                                }
                                            ]
                                        }]}
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - ACCB - CURRENCY DET BY COUNTRY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - ACCB - CURRENCY DET BY COUNTRY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelACCBDetByCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 230 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 910,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataACCBDetByCountry',
                                            height: 350,
                                            width: 910,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'strCREJEC', width: 80,
                                                                    },
                                                                    {text: 'Description', dataIndex: 'strDescCard', width: 180,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:left;";
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    },
                                                    {text: 'Sales without Bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - ACCB - COUNTRY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - ACCB - COUNTRY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataACCBCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1280,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainACCBCountry',
                                            height: 350,
                                            width: 1280,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                                                                listeners: {
                                                                    click: 'OnGridACCBCountryDetByCountry'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {text: 'Country Name', dataIndex: 'strDescCountry', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CASH', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP_C', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#F1D179;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP_C, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP_C', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#F1D179;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP_C, '0,000') + '<b>';
                                                                        }

                                                                    }
                                                                ]},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {text: '% Total',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'By Amount', dataIndex: 'strPEM', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Payments',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - ACCB - COUNTRY DET BY COUNTRY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - ACCB - COUNTRY DET BY COUNTRY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelACCBCountryDetByCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 900,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataACCBCountryDetByCountry',
                                            height: 350,
                                            width: 900,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'strCREJEC', width: 80,
                                                                    },
                                                                    {text: 'Description', dataIndex: 'strDescCard', width: 180,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:left;";
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    },
                                                    {text: 'Sales without Bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - ACCB - CARD ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - ACCB - CARD">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataACCBCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1160,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainACCBCard',
                                            height: 350,
                                            width: 1160,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'SCOUNTRY', width: 80,
                                                                        listeners: {
                                                                            click: 'OnGridACCBCardDetByCard'
                                                                        },
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {text: 'Name', dataIndex: 'strDescCountry', width: 180,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:left;";
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {text: '% Total',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'By Amount', dataIndex: 'strPEM', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Payments',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainACCBCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - ACCB - CARD DET BY CARD---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - ACCB - CARD DET BY CARD">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelACCBCardDetByCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1020,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataACCBCardDetByCard',
                                            height: 350,
                                            width: 1020,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                                                                /*listeners: {
                                                                 click: 'OnGridACCBDetByCountry'
                                                                 },
                                                                 renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                 metaData.style = "color:#057ECB;";
                                                                 value = '<b>' + value + '</b>';
                                                                 return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                 }*/
                                                            },
                                                            {text: 'Country Name', dataIndex: 'strDescCard', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to Bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Sales without bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - Settlement - CURRENCY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - Settlement - CURRENCY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataSettCurr',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1364,
                                        height: 400,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainSettCurr',
                                            height: 400,
                                            width: 1364,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Sales Date', dataIndex: 'strFormatDate', width: 80},
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CASH', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP_C', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#F1D179;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP_C, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP_C', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#F1D179;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP_C, '0,000') + '<b>';
                                                                        }

                                                                    }
                                                                ]},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: '% Total', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'by Amount', dataIndex: 'strPEM', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Settlement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Accepted',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '% Month', dataIndex: 'dblPerc02', width: 70,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Rejected',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'OUT_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totOUT_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc02OUT', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04OUT, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Suspect',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'SOS_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSOS_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc02SOS', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04SOS, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCurr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    hidden: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 450',
                                            text: 'Passenger by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico01',
                                            width: 1000,
                                            border: false,
                                            height: 300,
                                            background: '#E3EAEF',
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [{
                                                    type: 'numeric',
                                                    position: 'left',
                                                    grid: true
                                                }, {
                                                    type: 'category',
                                                    position: 'bottom',
                                                    visibleRange: [0, 1]
                                                }],
                                            series: [
                                                {
                                                    type: 'line',
                                                    xField: 'ZONA',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'QCPAX16',
                                                    title: '2018',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28, renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX16'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#FAB347",
                                                        stroke: "#FAB347",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#FAB347',
                                                        lineWidth: 2,
                                                        fill: 'white'
                                                    }
                                                },
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-leyendLastG1',
                                                    xField: 'ZONA',
                                                    yField: 'QCPAX15',
                                                    title: '2017',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX15'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        smooth: true,
                                                        fill: "#FF5555",
                                                        stroke: "#FF5555",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'circle',
                                                        radius: 4,
                                                        lineWidth: 1,
                                                        stroke: "#FF5555",
                                                        fill: 'white'}
                                                }
                                            ]
                                        }]}
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - Settlement - COUNTRY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - Settlement - COUNTRY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataSettCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1480,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainSettCountry',
                                            height: 350,
                                            width: 1480,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 80},
                                                            {text: 'Country Name', dataIndex: 'strDescCountry', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CASH', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP_C', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#F1D179;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP_C, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP_C', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#F1D179;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP_C, '0,000') + '<b>';
                                                                        }

                                                                    }
                                                                ]},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: '% Total', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'by Amount', dataIndex: 'strPEM', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Settlement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Accepted',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '% Month', dataIndex: 'dblPerc02', width: 70,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Rejected',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'OUT_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totOUT_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc02OUT', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04OUT, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Suspect',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'SOS_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSOS_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc02SOS', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04SOS, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - Settlement - CARD ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - Settlement - CARD">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataSettCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 230 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1300,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainSettCard',
                                            height: 350,
                                            width: 1300,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Credit Card', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'SCOUNTRY', width: 80},
                                                                    {text: 'Name', dataIndex: 'strDescCountry', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:left;";
                                                                            return value;
                                                                        },
                                                                    },
                                                                ]
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: '% Total', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'by Amount', dataIndex: 'strPEM', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Settlement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Accepted',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '% Month', dataIndex: 'dblPerc02', width: 70,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Rejected',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'OUT_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totOUT_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc02OUT', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04OUT, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Suspect',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Amount', dataIndex: 'SOS_SVFOP', width: 110,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSOS_SVFOP, '0,000.00') + '<b>';
                                                                        }

                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc02SOS', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.dblPerc04SOS, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSettCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - PAYMENTS - CURRENCY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - PAYMENTS - CURRENCY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataPayCurr',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 230 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1194,
                                        height: 400,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainPayCurr',
                                            height: 400,
                                            width: 1194,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Sales Date', dataIndex: 'strFormatDate', width: 80,
                                                                listeners: {
                                                                    click: 'OnGridPayCurrDetByDate'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CASH', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP_C', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#F1D179;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP_C, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP_C', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#F1D179;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP_C, '0,000') + '<b>';
                                                                        }

                                                                    }
                                                                ]},
                                                            {text: 'CREDIT CARD', dataIndex: 'NAMEBANK', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '% C. Card', dataIndex: 'perSale', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.TotperSale, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to Bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '% Month', dataIndex: 'dblPerc02', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Sales without bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '% Month', dataIndex: 'dblPerc03', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCurr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    hidden: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 450',
                                            text: 'Passenger by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico01',
                                            width: 1000,
                                            border: false,
                                            height: 300,
                                            background: '#E3EAEF',
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [{
                                                    type: 'numeric',
                                                    position: 'left',
                                                    grid: true
                                                }, {
                                                    type: 'category',
                                                    position: 'bottom',
                                                    visibleRange: [0, 1]
                                                }],
                                            series: [
                                                {
                                                    type: 'line',
                                                    xField: 'ZONA',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'QCPAX16',
                                                    title: '2018',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28, renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX16'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#FAB347",
                                                        stroke: "#FAB347",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#FAB347',
                                                        lineWidth: 2,
                                                        fill: 'white'
                                                    }
                                                },
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-leyendLastG1',
                                                    xField: 'ZONA',
                                                    yField: 'QCPAX15',
                                                    title: '2017',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX15'), '0,000.00'));
                                                        }
                                                    },
                                                    style: {
                                                        smooth: true,
                                                        fill: "#FF5555",
                                                        stroke: "#FF5555",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'circle',
                                                        radius: 4,
                                                        lineWidth: 1,
                                                        stroke: "#FF5555",
                                                        fill: 'white'}
                                                }
                                            ]
                                        }]}
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - PAYMENTS - CURRENCY DET BY DATE---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - PAYMENTS - CURRENCY DET BY DATE">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPayCurrDetByDate',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1020,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataPayCurrDetByDate',
                                            height: 350,
                                            width: 1020,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                                                                listeners: {
                                                                    click: 'OnGridPayDetByCountry'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {text: 'Country Name', dataIndex: 'strDescCountry', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to Bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Sales without bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - PAYMENTS - CURRENCY DET BY COUNTRY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - PAYMENTS - CURRENCY DET BY COUNTRY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPayDetByCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 900,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataPayDetByCountry',
                                            height: 350,
                                            width: 900,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'strCREJEC', width: 80,
                                                                    },
                                                                    {text: 'Description', dataIndex: 'strDescCard', width: 180,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:left;";
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    },
                                                    {text: 'Sales without Bill',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - PAYMENTS - COUNTRY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - PAYMENTS - COUNTRY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataPayCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1280,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainPayCountry',
                                            height: 350,
                                            width: 1280,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                                                                listeners: {
                                                                    click: 'OnGridACCBCountryDetByCountry'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {text: 'Country Name', dataIndex: 'strDescCountry', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CASH', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP_C', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#F1D179;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP_C, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP_C', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#F1D179;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP_C, '0,000') + '<b>';
                                                                        }

                                                                    }
                                                                ]},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {text: '% Total',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'By Amount', dataIndex: 'strPEM', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Payments',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL MAIN DATA - PAYMENTS - CARD ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - PAYMENTS - CARD">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataPayCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1110,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMainPayCard',
                                            height: 350,
                                            width: 1110,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true

                                                        },
                                                        columns: [
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'SCOUNTRY', width: 80,
                                                                        listeners: {
                                                                            click: 'OnGridACCBCardDetByCard'
                                                                        },
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-balance-analysis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {text: 'Name', dataIndex: 'strDescCountry', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:left;";
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'CREDIT CARD', align: 'Center',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Quantity',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '%', dataIndex: 'dblPerc01', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            if (data.totSVFOP > 0) {
                                                                                value = '100.00'
                                                                            } else {
                                                                                value = '0.00'
                                                                            }
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {text: '% Total',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'By Amount', dataIndex: 'strPEM', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                            return value;
                                                                        },
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Payments',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainPayCard').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // ------------------------------------------ DETAILS -------------------------------------------------
                        //--------------------------------------------------------------------------------------------

                        // --------------------------   PANEL DETAIL DATA - ACCB - CURRENCY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL DETAIL DATA - ACCB - CURRENCY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDetailACCB_Curr',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 874,
                                        height: 400,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDetailACCB_Curr',
                                            height: 400,
                                            width: 874,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Sales Date', dataIndex: 'strFormatDate', width: 80},
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Bill to Bank',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL DETAIL DATA - ACCB - COUNTRY ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL DETAIL DATA - ACCB - COUNTRY">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDetailACCB_Country',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1060,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDetailACCB_Country',
                                            height: 350,
                                            width: 1060,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Sales Date', dataIndex: 'strFormatDate', width: 80},
                                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70},
                                                            {text: 'Country Name', dataIndex: 'strDescCountry', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Payments',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Country').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

                        // --------------------------   PANEL DETAIL DATA - ACCB - CARD ---------------------
                        //-----------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="PANEL DETAIL DATA - ACCB - CARD">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDetailACCB_Card',
                            bodyStyle: 'background-color: #E3EAEF;',
                            //                    padding: '5 0 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    align: 'center',
                                    //                            padding: '5 20 0 20',
                                    margin: '5 5 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        //                                padding: '20 0 0 10',
                                        bodyStyle: 'background-color: #E3EAEF;',
                                        width: 1060,
                                        height: 350,
                                        columnLines: true
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDetailACCB_Card',
                                            height: 350,
                                            width: 1060,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'

                                                },
                                                items: [
                                                    {text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Sales Date', dataIndex: 'strFormatDate', width: 80},
                                                            {text: 'Credit Card', dataIndex: 'SCOUNTRY', width: 80},
                                                            {text: 'Credit Card Name', dataIndex: 'strDescCountry', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:left;";
                                                                            return value;
                                                                        },
                                                            },
                                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 65},
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'QTYSVFOP', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTYSVFOP, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#9dc2f9;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Payments',
                                                        //id: prototype.id + '-colPrin',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'IN_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIN_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Amount', dataIndex: 'IN_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totIN_SVFOP, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                            {text: '%', dataIndex: 'dblPerc02', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = " text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblPerc04, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Pendings',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Quantity',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Tickets', dataIndex: 'DIFF_QTYSVFOP', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var color = Number(record.data.DIFF_QTYSVFOP) > 0 ? '#008000' : '#800000';
                                                                            metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';

                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_QTYSVFOP, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            }, {text: 'Amount', dataIndex: 'DIFF_SVFOP', width: 110,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'dblPerc03', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = Number(record.data.DIFF_SVFOP) > 0 ? '#008000' : '#800000';
                                                                    metaData.style = "color:" + color + ";text-align:right;background-color:#c8c3d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailACCB_Card').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblAMOUNTR, '0,000.00') + '<b>';
                                                                }

                                                            },
                                                        ]
                                                    }

                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>

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
                                    //width: 1295,
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

