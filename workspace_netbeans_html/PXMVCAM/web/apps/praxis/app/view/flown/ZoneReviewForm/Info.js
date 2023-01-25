/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ZoneReviewForm.Info', {
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
            width: 1600,
            height: 450,
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
                // --------------------------   PANEL MAIN DATA - FLIGHT AND PAX ---------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - FLIGHT AND PAX">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMainData',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            id: prototype.id + '-labelTitle',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 450',
                            text: 'Flights and Passenger'
                        },
                        //PANEL DE GRILLAS
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP1',
                                    width: 463,
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
                                            {text: 'Market', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion6'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Description', width: 130, dataIndex: 'strDescripcion6',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 80, dataIndex: 'QCFLOW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 80, dataIndex: 'QCPAX16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#F7D49E';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 80, dataIndex: 'AVG16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP2',
                                    width: 282,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 90, dataIndex: 'QCFLOW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 90, dataIndex: 'QCPAX15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#FFAEAE';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 90, dataIndex: 'AVG15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG15avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP3',
                                    width: 282,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 90, dataIndex: 'diffQCFLOW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP3').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 90, dataIndex: 'diffQCPAX',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffQCPAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 90, dataIndex: 'diffAVG',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
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
                                                height: 28,
                                                renderer: function(toolTip, record, ctx) {
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
                                                fill: 'white'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>
                // --------------------------   PANEL AMOUNT -FARE x FARE ------------------------------------
                //-----------------------------------------------------------------

                {
                    xtype: 'panel',
                    id: prototype.id + '-panelAmountData',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 200',
                            text: 'AVERAGE FARE USD'
                        },
                        //PANEL DE GRILLAS Y GRAFICO
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP4',
                                    width: 233,
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
                                            {text: '<br> Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion6'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '<br>Description ', width: 140, dataIndex: 'strDescripcion6',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP5',
                                    width: 282,
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
                                            {text: 'Fare', width: 90, dataIndex: 'VCPN16', id: prototype.id + '-HD_CURRENTYEAR1',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataP5').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN16, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Fare', width: 90, dataIndex: 'VCPN15', id: prototype.id + '-HD_LASTYEAR1',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;background:#FFAEAE;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataP5').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN15, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Differences <br> Fare', width: 90, dataIndex: 'VCPNavg',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var color = record.data.strDescripcion7 === 'rojo' ? '#C22437' : '#244066';
                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataP5').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPNavg, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 300',
                                            text: 'Fare by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico02',
                                            width: 700,
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
                                                    yField: 'VCPN16',
                                                    title: '2018',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('VCPN16'), '0,000.00'));
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
                                                    yField: 'VCPN15',
                                                    title: '2017',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('VCPN15'), '0,000.00'));
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
                                                        fill: 'white'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>
                // --------------------------   PANEL AMOUNT -FARE x DAY ------------------------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelAmountDayData',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'FARE BY DATE OF WEEK'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP18',
                                    width: 873,
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
                                            {text: 'Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Description ', width: 140, dataIndex: 'strDescripcion',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR6',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 80, dataIndex: 'VCPNM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNM16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 80, dataIndex: 'VCPNT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNT16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 80, dataIndex: 'VCPNW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 80, dataIndex: 'VCPNTH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNTH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 80, dataIndex: 'VCPNF16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNF16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 80, dataIndex: 'VCPNS16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 80, dataIndex: 'VCPNSA16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNSA16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 80, dataIndex: 'VCPNTT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP18').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNTT16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP19',
                                    width: 653,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR6',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 80, dataIndex: 'VCPNM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNM15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 80, dataIndex: 'VCPNT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNT15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 80, dataIndex: 'VCPNW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNW15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 80, dataIndex: 'VCPNTH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNTH15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 80, dataIndex: 'VCPNF15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNF15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 80, dataIndex: 'VCPNS15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 80, dataIndex: 'VCPNSA15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNSA15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 80, dataIndex: 'VCPNTT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP19').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNTT15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // --------------------------   PANEL -FARE x YIELD ------------------------------------
                //-----------------------------------------------------------------

                // <editor-fold defaultstate="collapsed" desc=" PANEL -FARE x YIELD ">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelYield',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 200',
                            text: 'Yield'
                        },
                        //PANEL DE GRILLAS Y GRAFICO
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP21',
                                    width: 233,
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
                                            {text: ' Market ', width: 80, dataIndex: 'ZONA', height: '42px',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion1'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Description ', width: 140, dataIndex: 'strDescripcion1',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP22',
                                    width: 463,
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
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR7',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Distance', width: 90, dataIndex: 'QBASICM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            return '<b>' + '<b>';
                                                        }
                                                    },
                                                    {text: 'Yield', width: 90, dataIndex: 'QYIELD16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#F7D49E;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            return '<b>' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR7',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Distance', width: 90, dataIndex: 'QBASICM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            return '<b>' + '<b>';
                                                        }
                                                    },
                                                    {text: 'Yield', width: 90, dataIndex: 'QYIELD15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#FFAEAE;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            return '<b>' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences <br> Yields', width: 90, dataIndex: 'diffQYIELD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    return '<b>' + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 300',
                                            text: 'Yield by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico03',
                                            width: 700,
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
                                                    yField: 'QYIELD16',
                                                    title: '2018',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion1') + ' : ' + Ext.util.Format.number(record.get('QYIELD16'), '0,000.00'));
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
                                                    yField: 'QYIELD15',
                                                    title: '2017',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion1') + ' : ' + Ext.util.Format.number(record.get('QYIELD15'), '0,000.00'));
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
                                                        fill: 'white'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL HOUR DATA ---------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL HOUR DATA - Revenue per Hour">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelHourData',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 450',
                            text: 'Revenue per Hour'
                        },
                        //PANEL DE GRILLAS
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP6',
                                    width: 463,
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
                                            {text: 'Market', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion6'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Description', width: 130, dataIndex: 'strDescripcion6',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue', width: 80, dataIndex: 'VCPN16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP6').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Block Hrs', width: 80, dataIndex: 'QBLOCKH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#F7D49E';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP6').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQBLOCKH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Rev/Hrs', width: 80, dataIndex: 'avgBLOCKH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP6').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totBLOCKH16avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP7',
                                    width: 282,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue', width: 90, dataIndex: 'VCPN15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000.');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP7').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Block Hrs', width: 90, dataIndex: 'QBLOCKH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#FFAEAE';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP7').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQBLOCKH15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Rev/Hrs', width: 90, dataIndex: 'avgBLOCKH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP7').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totBLOCKH15avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP8',
                                    width: 282,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue', width: 90, dataIndex: 'diffVCPN',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP8').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffVCPN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Block Hrs', width: 90, dataIndex: 'diffQBLOCKH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP8').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffQBLOCKH, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Rev/Hrs', width: 90, dataIndex: 'diffAvgBLOCKH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion4 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP8').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffAvgBLOCKH, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }

                            ]
                        }

                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL FlightPaxPAX ------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxPAX">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxPAX',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Pax By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP9',
                                    width: 573,
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
                                            {text: 'Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR3',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCPAXM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXM16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCPAXT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXT16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCPAXW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCPAXTH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCPAXF16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXF16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCPAXS16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCPAXSA16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXSA16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCPAXTT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP9').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTT16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP10',
                                    width: 493,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR3',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCPAXM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXM15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCPAXT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXT15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCPAXW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXW15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCPAXTH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTH15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCPAXF15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXF15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCPAXS15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXS15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCPAXSA15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXSA15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCPAXTT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP10').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTT15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP11',
                                    width: 493,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'diffQCPAXM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1_1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'diffQCPAXT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2_2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'diffQCPAXW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3_3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'diffQCPAXTH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion4_4 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXTH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'diffQCPAXF',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion5_5 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'diffQCPAXS',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion6_6 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'diffQCPAXSA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion7_7 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXSA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'diffQCPAXTT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion10 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP11').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXTT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL FlightPaxFlight ------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxFlight">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxFLIGHT',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Flight By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP12',
                                    width: 573,
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
                                            {text: 'Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR4',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCFLOWM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWM16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCFLOWT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWT16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCFLOWW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCFLOWTH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCFLOWF16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWF16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCFLOWS16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCFLOWSA16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCFLOWTT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP12').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP13',
                                    width: 493,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR4',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCFLOWM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWM15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCFLOWT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWT15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCFLOWW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWW15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCFLOWTH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCFLOWF15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWF15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCFLOWS15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWS15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCFLOWSA15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCFLOWTT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP13').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP14',
                                    width: 493,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'diffQCFLOWM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion11 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'diffQCFLOWT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion22 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'diffQCFLOWW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion33 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'diffQCFLOWTH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion44 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWTH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'diffQCFLOWF',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion55 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'diffQCFLOWS',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion66 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'diffQCFLOWSA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion77 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWSA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'diffQCFLOWTT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion9 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP14').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWTT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL FlightPaxAVG ------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxAVG">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxAVG',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Pax/Flight By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP15',
                                    width: 573,
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
                                            {text: 'Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR5',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'avgMONDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgMONDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'avgTUESDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTUESDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'avgWEDNESDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgWEDNESDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'avgTHURSDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTHURSDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'avgFRIDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgFRIDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'avgSATURDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSATURDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'avgSUNDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSUNDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'avgTOTAL16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP15').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTOTAL16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP16',
                                    width: 493,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR5',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'avgMONDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgMONDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'avgTUESDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTUESDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'avgWEDNESDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgWEDNESDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'avgTHURSDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTHURSDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'avgFRIDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgFRIDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'avgSATURDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSATURDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'avgSUNDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSUNDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'avgTOTAL15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP16').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTOTAL15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP17',
                                    width: 493,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'diffavgMONDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgMONDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'diffavgTUESDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTUESDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'diffavgWEDNESDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgWEDNESDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'diffavgTHURSDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion4 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTHURSDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'diffavgFRIDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion5 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgFRIDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'diffavgSATURDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion6 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgSATURDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'diffavgSUNDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion7 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgSUNDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'diffavgTOTAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion8 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP17').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTOTAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>
                // --------------------------   PANEL  DATA city Pair---------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc="PANEL  DATA city Pair">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDataCityPair',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 450',
                            text: 'City Pair'
                        },
                        //PANEL DE GRILLAS
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP23',
                                    width: 463,
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
                                            {text: 'Market', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;color:#008FE3;';
                                                    return '<a href="#flown-zone-review-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridCityPair'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Description', width: 130, dataIndex: 'strDescripcion',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEARCity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 80, dataIndex: 'QCFLOW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP23').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 80, dataIndex: 'QCPAX16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#F7D49E';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP23').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 80, dataIndex: 'AVG16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP23').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP24',
                                    width: 282,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEARCity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 90, dataIndex: 'QCFLOW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP24').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 90, dataIndex: 'QCPAX15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#FFAEAE';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP24').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 90, dataIndex: 'AVG15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP24').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG15avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP25',
                                    width: 282,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 90, dataIndex: 'diffQCFLOW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP3').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 90, dataIndex: 'diffQCPAX',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP25').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffQCPAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 90, dataIndex: 'diffAVG',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP25').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }

                            ]
                        }

                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL  DATA city Pair Detail---------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc="PANEL  DATA city Pair Detail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDataCityPairDetail',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 450',
                            text: 'City Pair Detail'
                        },
                        //PANEL DE GRILLAS
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 550,
                            layout: {
                                type: 'vbox'
                            },
                            defaults: {
                                padding: '10 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP26',
                                    width: 995,
                                    maxHeight: 450,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'City <br> Pair', width: 80, dataIndex: 'CDEPART',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strCDEPART'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Flight <br> Number', width: 80, dataIndex: 'NFLIGHT',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEARCityDet',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 90, dataIndex: 'QCFLOW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 90, dataIndex: 'QCPAX16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#F7D49E';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 90, dataIndex: 'AVG16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-HD_LASTYEARCityDet',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 90, dataIndex: 'QCFLOW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 90, dataIndex: 'QCPAX15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#FFAEAE';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 90, dataIndex: 'AVG15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG15avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 90, dataIndex: 'diffQCFLOW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 90, dataIndex: 'diffQCPAX',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffQCPAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 90, dataIndex: 'diffAVG',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP26').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDiffAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-gridDataP26Sum',
                                    width: 995,
                                    height: 35,
                                    margin: '0 0 0 0',
                                    padding: '0 0 0 0',
                                    align: 'left',
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        margin: '5 0 3 0',
                                        padding: '3 3 3 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:11px;margin:3px;'
                                    },
                                    items: [
                                        {width: 80},
                                        {width: 80},
                                        {width: 90, id: prototype.id + '-totQCFLOW16'},
                                        {width: 90, id: prototype.id + '-totQCPAX16'},
                                        {width: 90, id: prototype.id + '-totAVG16avg'},
                                        {width: 90, id: prototype.id + '-totQCFLOW15'},
                                        {width: 90, id: prototype.id + '-totQCPAX15'},
                                        {width: 90, id: prototype.id + '-totAVG15avg'},
                                        {width: 90, id: prototype.id + '-totDiffQCFLOW'},
                                        {width: 90, id: prototype.id + '-totDiffQCPAX'},
                                        {width: 105, id: prototype.id + '-totDiffAVG'}
                                    ]
                                }
                            ]
                        }

                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL FlightPaxPAX City ------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxPAX City">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxPAXCity',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Pax By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP29',
                                    width: 573,
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
                                            {text: 'Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;color:#008FE3;';
                                                    return '<a href="#flown-zone-review-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridCityPairByDay'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR9',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCPAXM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXM16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCPAXT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXT16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCPAXW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCPAXTH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCPAXF16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXF16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCPAXS16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCPAXSA16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXSA16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCPAXTT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP29').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTT16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP30',
                                    width: 493,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR9',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCPAXM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXM15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCPAXT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXT15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCPAXW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXW15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCPAXTH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTH15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCPAXF15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXF15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCPAXS15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXS15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCPAXSA15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXSA15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCPAXTT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTT15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP31',
                                    width: 493,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'diffQCPAXM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1_1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'diffQCPAXT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2_2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'diffQCPAXW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3_3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'diffQCPAXTH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion4_4 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXTH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'diffQCPAXF',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion5_5 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'diffQCPAXS',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion6_6 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'diffQCPAXSA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion7_7 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXSA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'diffQCPAXTT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion10 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP31').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXTT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL FlightPaxFlight City------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxFlight city">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxFLIGHTCity',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Flight By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP32',
                                    width: 573,
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
                                            {text: 'Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;color:#008FE3;';
                                                    return '<a href="#flown-zone-review-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridCityPairByDay'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR10',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCFLOWM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWM16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCFLOWT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWT16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCFLOWW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCFLOWTH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCFLOWF16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWF16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCFLOWS16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCFLOWSA16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCFLOWTT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP32').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP33',
                                    width: 493,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR10',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCFLOWM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWM15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCFLOWT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWT15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCFLOWW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWW15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCFLOWTH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCFLOWF15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWF15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCFLOWS15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWS15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCFLOWSA15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCFLOWTT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP34',
                                    width: 493,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'diffQCFLOWM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion11 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'diffQCFLOWT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion22 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'diffQCFLOWW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion33 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'diffQCFLOWTH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion44 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWTH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'diffQCFLOWF',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion55 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'diffQCFLOWS',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion66 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'diffQCFLOWSA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion77 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWSA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'diffQCFLOWTT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion9 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP34').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWTT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>   

                // --------------------------   PANEL FlightPaxAVG  City------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxAVG City">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxAVGCity',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Pax/Flight By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP35',
                                    width: 573,
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
                                            {text: 'Market ', width: 80, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;color:#008FE3;';
                                                    return '<a href="#flown-zone-review-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridCityPairByDay'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR11',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'avgMONDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgMONDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'avgTUESDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTUESDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'avgWEDNESDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgWEDNESDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'avgTHURSDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTHURSDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'avgFRIDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgFRIDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'avgSATURDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSATURDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'avgSUNDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSUNDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'avgTOTAL16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP35').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTOTAL16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP36',
                                    width: 493,
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
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR11',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'avgMONDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgMONDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'avgTUESDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTUESDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'avgWEDNESDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgWEDNESDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'avgTHURSDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTHURSDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'avgFRIDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgFRIDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'avgSATURDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSATURDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'avgSUNDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSUNDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'avgTOTAL15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP36').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTOTAL15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP37',
                                    width: 493,
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
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'diffavgMONDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgMONDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'diffavgTUESDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTUESDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'diffavgWEDNESDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgWEDNESDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'diffavgTHURSDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion4 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTHURSDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'diffavgFRIDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion5 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgFRIDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'diffavgSATURDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion6 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgSATURDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'diffavgSUNDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion7 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgSUNDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'diffavgTOTAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion8 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP37').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTOTAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>
                // --------------------------   PANEL FlightPaxPAX City Detail------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxPAX City Detail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxPAXCityDetail',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Pax By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            height: 400,
                            bodyStyle: 'background-color: #E3EAEF;',
                            layout: {
                                type: 'vbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP38',
                                    width: 1584,
                                    maxHeight: 350,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'City <br> Pair ', width: 80, dataIndex: 'CDEPART',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strCDEPART'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'color:#008FE3;';
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Flight <br> Number ', width: 80, dataIndex: 'NFLIGHT',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR12',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCPAXM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXM16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCPAXT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXT16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCPAXW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCPAXTH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCPAXF16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXF16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCPAXS16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCPAXSA16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXSA16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCPAXTT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTT16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR12',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCPAXM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXM15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCPAXT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXT15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCPAXW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXW15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCPAXTH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTH15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCPAXF15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXF15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCPAXS15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXS15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCPAXSA15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXSA15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCPAXTT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAXTT15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 55, dataIndex: 'diffQCPAXM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1_1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 55, dataIndex: 'diffQCPAXT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2_2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 55, dataIndex: 'diffQCPAXW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3_3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 55, dataIndex: 'diffQCPAXTH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion4_4 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXTH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 55, dataIndex: 'diffQCPAXF',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion5_5 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 55, dataIndex: 'diffQCPAXS',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion6_6 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 55, dataIndex: 'diffQCPAXSA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion7_7 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXSA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 55, dataIndex: 'diffQCPAXTT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion10 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP38').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCPAXTT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-gridDataP38Sum',
                                    width: 1584,
                                    height: 35,
                                    margin: '0 0 0 0',
                                    padding: '0 0 0 0',
                                    align: 'left',
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        margin: '5 0 3 0',
                                        padding: '3 3 3 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:11px;margin:3px;'
                                    },
                                    items: [
                                        {width: 80},
                                        {width: 80},
                                        {width: 60, id: prototype.id + '-totQCPAXM16'},
                                        {width: 60, id: prototype.id + '-totQCPAXT16'},
                                        {width: 60, id: prototype.id + '-totQCPAXW16'},
                                        {width: 60, id: prototype.id + '-totQCPAXTH16'},
                                        {width: 60, id: prototype.id + '-totQCPAXF16'},
                                        {width: 60, id: prototype.id + '-totQCPAXS16'},
                                        {width: 60, id: prototype.id + '-totQCPAXSA16'},
                                        {width: 60, id: prototype.id + '-totQCPAXTT16'},
                                        {width: 60, id: prototype.id + '-totQCPAXM15'},
                                        {width: 60, id: prototype.id + '-totQCPAXT15'},
                                        {width: 60, id: prototype.id + '-totQCPAXW15'},
                                        {width: 60, id: prototype.id + '-totQCPAXTH15'},
                                        {width: 60, id: prototype.id + '-totQCPAXF15'},
                                        {width: 60, id: prototype.id + '-totQCPAXS15'},
                                        {width: 60, id: prototype.id + '-totQCPAXSA15'},
                                        {width: 60, id: prototype.id + '-totQCPAXTT15'},
                                        {width: 55, id: prototype.id + '-difftotQCPAXM'},
                                        {width: 55, id: prototype.id + '-difftotQCPAXT'},
                                        {width: 55, id: prototype.id + '-difftotQCPAXW'},
                                        {width: 55, id: prototype.id + '-difftotQCPAXTH'},
                                        {width: 55, id: prototype.id + '-difftotQCPAXF'},
                                        {width: 55, id: prototype.id + '-difftotQCPAXS'},
                                        {width: 55, id: prototype.id + '-difftotQCPAXSA'},
                                        {width: 68, id: prototype.id + '-difftotQCPAXTT'}

                                    ]
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>
                // --------------------------   PANEL FlightPaxFlight City Detail------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxFlight city detail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxFLIGHTCityDetail',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    height: 450,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Flight By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 450,
                            layout: {
                                type: 'vbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP41',
                                    width: 1584,
                                    maxHeight: 350,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'City <br> Pair ', width: 80, dataIndex: 'CDEPART',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strCDEPART'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Flight <br> Number ', width: 80, dataIndex: 'NFLIGHT',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR13',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCFLOWM16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWM16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCFLOWT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWT16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCFLOWW16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCFLOWTH16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCFLOWF16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWF16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCFLOWS16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWS16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCFLOWSA16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCFLOWTT16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR13',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'QCFLOWM15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWM15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'QCFLOWT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWT15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'QCFLOWW15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWW15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'QCFLOWTH15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'QCFLOWF15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWF15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'QCFLOWS15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWS15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'QCFLOWSA15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'QCFLOWTT15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 55, dataIndex: 'diffQCFLOWM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion11 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 55, dataIndex: 'diffQCFLOWT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion22 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 55, dataIndex: 'diffQCFLOWW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion33 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 55, dataIndex: 'diffQCFLOWTH',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion44 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWTH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 55, dataIndex: 'diffQCFLOWF',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion55 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 55, dataIndex: 'diffQCFLOWS',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion66 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 55, dataIndex: 'diffQCFLOWSA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion77 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWSA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 55, dataIndex: 'diffQCFLOWTT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion9 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP41').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.difftotQCFLOWTT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-gridDataP41Sum',
                                    width: 1584,
                                    height: 35,
                                    margin: '0 0 0 0',
                                    padding: '0 0 0 0',
                                    align: 'left',
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        margin: '5 0 3 0',
                                        padding: '3 3 3 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:11px;margin:3px;'
                                    },
                                    items: [
                                        {width: 80},
                                        {width: 80},
                                        {width: 60, id: prototype.id + '-totQCFLOWM16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWT16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWW16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWTH16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWF16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWS16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWSA16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWTT16'},
                                        {width: 60, id: prototype.id + '-totQCFLOWM15'},
                                        {width: 60, id: prototype.id + '-totQCFLOWT15'},
                                        {width: 60, id: prototype.id + '-totQCFLOWW15'},
                                        {width: 60, id: prototype.id + '-totQCFLOWTH15'},
                                        {width: 60, id: prototype.id + '-totQCFLOWF15'},
                                        {width: 60, id: prototype.id + '-totQCFLOWS15'},
                                        {width: 60, id: prototype.id + '-totQCFLOWSA15'},
                                        {width: 60, id: prototype.id + '-totQCFLOWTT15'},
                                        {width: 55, id: prototype.id + '-difftotQCFLOWM'},
                                        {width: 55, id: prototype.id + '-difftotQCFLOWT'},
                                        {width: 55, id: prototype.id + '-difftotQCFLOWW'},
                                        {width: 55, id: prototype.id + '-difftotQCFLOWTH'},
                                        {width: 55, id: prototype.id + '-difftotQCFLOWF'},
                                        {width: 55, id: prototype.id + '-difftotQCFLOWS'},
                                        {width: 55, id: prototype.id + '-difftotQCFLOWSA'},
                                        {width: 68, id: prototype.id + '-difftotQCFLOWTT'}

                                    ]
                                }


                            ]
                        }
                    ]
                },
                // </editor-fold>   

                // --------------------------   PANEL FlightPaxAVG  City Detail------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxAVG City Detail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFlightPaxAVGCityDetail',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    height: 450,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                            align: 'center',
                            margin: '5 0 0 700',
                            text: 'Pax/Flight By Day of Week'
                        },
                        //PANEL DE GRILLAS 
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 400,
                            layout: {
                                type: 'vbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataP44',
                                    maxHeight: 350,
                                    width: 1584,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'City <br> Pair ', width: 80, dataIndex: 'CDEPART',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strCDEPART'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Flight <br> Number ', width: 80, dataIndex: 'NFLIGHT',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-HD_CURRENTYEAR14',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'avgMONDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgMONDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'avgTUESDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTUESDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'avgWEDNESDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgWEDNESDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'avgTHURSDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTHURSDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'avgFRIDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgFRIDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'avgSATURDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#BAE6D7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSATURDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'avgSUNDAY16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EAFDF7;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSUNDAY16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'avgTOTAL16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTOTAL16, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-HD_LASTYEAR14',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 60, dataIndex: 'avgMONDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgMONDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 60, dataIndex: 'avgTUESDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTUESDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 60, dataIndex: 'avgWEDNESDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgWEDNESDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 60, dataIndex: 'avgTHURSDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTHURSDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 60, dataIndex: 'avgFRIDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgFRIDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 60, dataIndex: 'avgSATURDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#C9DEF3;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSATURDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 60, dataIndex: 'avgSUNDAY15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#EBF4FD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgSUNDAY15, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 60, dataIndex: 'avgTOTAL15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#DCDDDD;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totavgTOTAL15, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Mon', width: 55, dataIndex: 'diffavgMONDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgMONDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tue', width: 55, dataIndex: 'diffavgTUESDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTUESDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Wed', width: 55, dataIndex: 'diffavgWEDNESDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgWEDNESDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Thu', width: 55, dataIndex: 'diffavgTHURSDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion4 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTHURSDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Fri', width: 55, dataIndex: 'diffavgFRIDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion5 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgFRIDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sat', width: 55, dataIndex: 'diffavgSATURDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion6 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgSATURDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Sun', width: 55, dataIndex: 'diffavgSUNDAY',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion7 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgSUNDAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 55, dataIndex: 'diffavgTOTAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion8 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';background:#DCDDDD';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP44').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totdiffavgTOTAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-gridDataP44Sum',
                                    width: 1584,
                                    height: 35,
                                    margin: '0 0 0 0',
                                    padding: '0 0 0 0',
                                    align: 'left',
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        margin: '5 0 3 0',
                                        padding: '3 3 3 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:11px;margin:3px;'
                                    },
                                    items: [
                                        {width: 80},
                                        {width: 80},
                                        {width: 60, id: prototype.id + '-totavgMONDAY16'},
                                        {width: 60, id: prototype.id + '-totavgTUESDAY16'},
                                        {width: 60, id: prototype.id + '-totavgWEDNESDAY16'},
                                        {width: 60, id: prototype.id + '-totavgTHURSDAY16'},
                                        {width: 60, id: prototype.id + '-totavgFRIDAY16'},
                                        {width: 60, id: prototype.id + '-totavgSATURDAY16'},
                                        {width: 60, id: prototype.id + '-totavgSUNDAY16'},
                                        {width: 60, id: prototype.id + '-totavgTOTAL16'},
                                        {width: 60, id: prototype.id + '-totavgMONDAY15'},
                                        {width: 60, id: prototype.id + '-totavgTUESDAY15'},
                                        {width: 60, id: prototype.id + '-totavgWEDNESDAY15'},
                                        {width: 60, id: prototype.id + '-totavgTHURSDAY15'},
                                        {width: 60, id: prototype.id + '-totavgFRIDAY15'},
                                        {width: 60, id: prototype.id + '-totavgSATURDAY15'},
                                        {width: 60, id: prototype.id + '-totavgSUNDAY15'},
                                        {width: 60, id: prototype.id + '-totavgTOTAL15'},
                                        {width: 55, id: prototype.id + '-totdiffavgMONDAY'},
                                        {width: 55, id: prototype.id + '-totdiffavgTUESDAY'},
                                        {width: 55, id: prototype.id + '-totdiffavgWEDNESDAY'},
                                        {width: 55, id: prototype.id + '-totdiffavgTHURSDAY'},
                                        {width: 55, id: prototype.id + '-totdiffavgFRIDAY'},
                                        {width: 55, id: prototype.id + '-totdiffavgSATURDAY'},
                                        {width: 55, id: prototype.id + '-totdiffavgSUNDAY'},
                                        {width: 68, id: prototype.id + '-totdiffavgTOTAL'}

                                    ]
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>

//                    
                //                      
//                        
                //                          
//                            
                //                              
                //                                
                //                                  
                //                                    
                //                                      
                //                                        
                //                                          
                //                                            
                //                                              
                //                                                
                //                                                  
                //                                                    
                //                                                      
                //                                                        
                //                                                          
                //                                                            
                //                                                              
                //                                                                



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
                            width: 1295,
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

