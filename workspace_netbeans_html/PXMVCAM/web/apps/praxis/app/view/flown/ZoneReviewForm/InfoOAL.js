/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ZoneReviewForm.InfoOAL', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-infoOAL',
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
            id: prototype.id + '-oal' + '-regionCenterGrid01',
            width: 1600,
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
                // --------------------------   PANEL MAIN DATA OAL - FLIGHT AND PAX ---------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc="PANEL MAIN DATA - FLIGHT AND PAX">
                {
                    xtype: 'panel',
                    id: prototype.id + '-oal' + '-panelMainData',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            //id: prototype.id+'-oal' + '-labelTitle',
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
                                //height: 348,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP1',
                                    width: 600,
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
                                            {text: 'Market', width: 65, dataIndex: 'ZONA',
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 65, dataIndex: 'QCFLOW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 65, dataIndex: 'QCFLOW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW16OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 65, dataIndex: 'per16FlownOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper16FlownOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 65, dataIndex: 'QCPAX16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 65, dataIndex: 'QCPAX16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX16OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 65, dataIndex: 'per16PaxOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper16PaxOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'AVG PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 65, dataIndex: 'AVG16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 65, dataIndex: 'AVG16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG16avgOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP2',
                                    width: 533,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 65, dataIndex: 'QCFLOW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 65, dataIndex: 'QCFLOW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW15OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 65, dataIndex: 'per15FlownOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper15FlownOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 65, dataIndex: 'QCPAX15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 65, dataIndex: 'QCPAX15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX15OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 65, dataIndex: 'per15PaxOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper15PaxOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'AVG PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 65, dataIndex: 'AVG15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG15avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 65, dataIndex: 'AVG15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG15avgOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP3',
                                    width: 355,
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
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 85, dataIndex: 'diffQCFLOW',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 85, dataIndex: 'diffQCFLOWOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 85, dataIndex: 'diffQCPAX',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCPAX, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 85, dataIndex: 'diffQCPAXOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion4 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP3').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCPAXOAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }

//                                                   
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
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 0',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 5 5 5',
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-oal' + '-label_grafico01_1',
                                                    labelAlign: 'center',
                                                    style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                                    align: 'center',
                                                    margin: '5 0 0 300',
                                                    text: 'Flight by Market'
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-oal' + '-grafico01_1',
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
                                                            yField: 'QCFLOW16',
                                                            title: 'Flight',
                                                            grid: true,
                                                            fill: true,
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function(toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCFLOW16'), '0,000.00'));
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
                                                            xField: 'ZONA',
                                                            yField: 'QCFLOW16OAL',
                                                            title: 'OAL',
                                                            fill: true,
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function(toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCFLOW16OAL'), '0,000.00'));
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
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 5 5 5',
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-oal' + '-label_grafico01_2',
                                                    labelAlign: 'center',
                                                    style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                                    align: 'center',
                                                    margin: '5 0 0 300',
                                                    text: 'Flight by Market'
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-oal' + '-grafico01_2',
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
                                                            yField: 'QCPAX16',
                                                            title: 'Flight',
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
                                                            xField: 'ZONA',
                                                            yField: 'QCPAX16OAL',
                                                            title: 'OAL',
                                                            fill: true,
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function(toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX16OAL'), '0,000.00'));
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
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 0',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 5 5 5',
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-oal' + '-label_grafico01_3',
                                                    labelAlign: 'center',
                                                    style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                                    align: 'center',
                                                    margin: '5 0 0 300',
                                                    text: 'Flight by Market'
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-oal' + '-grafico01_3',
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
                                                            yField: 'QCFLOW15',
                                                            title: 'Flight',
                                                            grid: true,
                                                            fill: true,
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function(toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCFLOW15'), '0,000.00'));
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
                                                            xField: 'ZONA',
                                                            yField: 'QCFLOW15OAL',
                                                            title: 'OAL',
                                                            fill: true,
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function(toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCFLOW15OAL'), '0,000.00'));
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
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 5 5 5',
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-oal' + '-label_grafico01_4',
                                                    labelAlign: 'center',
                                                    style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                                    align: 'center',
                                                    margin: '5 0 0 300',
                                                    text: 'Flight by Market'
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-oal' + '-grafico01_4',
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
                                                            yField: 'QCPAX15',
                                                            title: 'Flight',
                                                            grid: true,
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
                                                            xField: 'ZONA',
                                                            yField: 'QCPAX15OAL',
                                                            title: 'OAL',
                                                            fill: true,
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function(toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('QCPAX15OAL'), '0,000.00'));
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
                        }
                    ]
                },
                // </editor-fold>
                // --------------------------   PANEL AMOUNT AOL  -FARE x FARE ------------------------------------
                //-----------------------------------------------------------------

                {
                    xtype: 'panel',
                    id: prototype.id + '-oal' + '-panelAmountData',
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
                            text: 'AVERAGE FARE '
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
                                //height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP4',
                                    width: 193,
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
                                            {text: '<br> Market ', width: 60, dataIndex: 'ZONA', height: 43,
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
                                            {text: '<br>Description ', width: 120, dataIndex: 'strDescripcion6',
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
                                    id: prototype.id + '-oal' + '-gridDataP5',
                                    width: 522,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Fare', width: 85, dataIndex: 'VCPN16',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#F7D49E;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP5').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN16, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'OAL', width: 85, dataIndex: 'VCPN16OAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#FFAEAE;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP5').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN16OAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Fare', width: 85, dataIndex: 'VCPN15',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#F7D49E;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP5').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN15, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'OAL', width: 85, dataIndex: 'VCPN15OAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#FFAEAE;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP5').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN15OAL, '0,000') + '<b>';
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
                                                    {text: 'Fare', width: 85, dataIndex: 'VCPNavg',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion7 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP5').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNavg, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'OAL', width: 85, dataIndex: 'VCPNavgOAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion8 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP5').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNavgOAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                //        PANEL DE GRAFICOS
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
                                            id: prototype.id + '-oal' + '-label_grafico02_1',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 300',
                                            text: 'Fare by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-oal' + '-grafico02_1',
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
                                                    title: 'Fare',
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
                                                    xField: 'ZONA',
                                                    yField: 'VCPN16OAL',
                                                    title: 'OAL',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('VCPN16OAL'), '0,000.00'));
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
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-oal' + '-label_grafico02_2',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 300',
                                            text: 'Fare by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-oal' + '-grafico02_2',
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
                                                    yField: 'VCPN15',
                                                    title: 'Fare',
                                                    grid: true,
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
                                                    xField: 'ZONA',
                                                    yField: 'VCPN15OAL',
                                                    title: 'OAL',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion6') + ' : ' + Ext.util.Format.number(record.get('VCPN15OAL'), '0,000.00'));
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
                // --------------------------   PANEL AMOUNT OAL -FARE x DAY ------------------------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-oal' + '-panelAmountDayData',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'panel',
                            width: 1450,
                            bodyStyle: 'background-color: #E3EAEF;',
                            //padding: '10 0 10 10',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnChange',
                                    icon: 'resources/img/exchange.png',
                                    tooltip: 'Change Year',
                                    listeners: {
                                        click: 'btnChange_click'
                                    }
                                }
                            ]
                        },
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
                                type: 'vbox'
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
                                    id: prototype.id + '-oal' + '-gridDataP18',
                                    width: 1483,
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
                                            {text: 'Market ', width: 70, dataIndex: 'ZONA',
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
                                            {text: 'Description ', width: 120, dataIndex: 'strDescripcion',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR6',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MONDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNM16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNM16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUESDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WENDSDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNW16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THUESDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNTH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNTH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRIDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNF16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNF16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNF16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNF16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SATURDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNS16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNS16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNS16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNS16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUNDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNSA16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNSA16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNSA16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNSA16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 80, dataIndex: 'VCPNTT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNTT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP19',
                                    width: 1483,
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
                                            {text: 'Market ', width: 70, dataIndex: 'ZONA',
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
                                            {text: 'Description ', width: 120, dataIndex: 'strDescripcion',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR6',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MONDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNM15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNM15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUESDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WENDSDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNW15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THUESDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNTH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNTH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRIDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNF15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNF15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNF15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNF15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SATURDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNS15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNS15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNS15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNS15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUNDAY',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'VCPNSA15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNSA15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNSA15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNSA15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 80, dataIndex: 'VCPNTT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'VCPNTT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNTT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
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
                // --------------------------   PANEL -FARE x YIELD OAL ------------------------------------
                //-----------------------------------------------------------------

                // <editor-fold defaultstate="collapsed" desc=" PANEL -FARE x  YIELD OAL ">
                {
                    xtype: 'panel',
                    id: prototype.id + '-oal' + '-panelYield',
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
                            margin: '5 0 0 500',
                            text: 'Yield'
                        },
                        //PANEL DE GRILLAS Y GRAFICO
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            margin: '5 0 0 200',
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
                                    id: prototype.id + '-oal' + '-gridDataP21',
                                    width: 205,
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
                                            {text: ' Market ', width: 70, dataIndex: 'ZONA', height: '65px',
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
                                            {text: 'Description ', width: 120, dataIndex: 'strDescripcion1',
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
                                    id: prototype.id + '-oal' + '-gridDataP22',
                                    width: 813,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR7',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Distance',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'QBASICM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'QBASICM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Yield',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'QYIELD16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'QYIELD16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR7',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Distance',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'QBASICM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'QBASICM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Yield',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 80, dataIndex: 'QYIELD15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 80, dataIndex: 'QYIELD15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    return '<b>' + '<b>';
                                                                }
                                                            }
                                                        ]
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
                                                    {text: 'Yields', width: 80, dataIndex: 'diffQYIELD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            return '<b>' + '<b>';
                                                        }
                                                    },
                                                    {text: 'Yields <br> OAL', width: 80, dataIndex: 'diffQYIELDOAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            return '<b>' + '<b>';
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
                                type: 'hbox'
                            },
                            items: [
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
                                            id: prototype.id + '-oal' + '-label_grafico03_1',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 300',
                                            text: 'Yield by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-oal' + '-grafico03_1',
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
                                                    title: 'YIELD',
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
                                                    xField: 'ZONA',
                                                    yField: 'QYIELD16OAL',
                                                    title: 'OAL',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion1') + ' : ' + Ext.util.Format.number(record.get('QYIELD16OAL'), '0,000.00'));
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
                                },
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
                                            id: prototype.id + '-oal' + '-label_grafico03_2',
                                            labelAlign: 'center',
                                            style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
                                            align: 'center',
                                            margin: '5 0 0 300',
                                            text: 'Yield by Market'
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-oal' + '-grafico03_2',
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
                                                    yField: 'QYIELD15',
                                                    title: 'YIELD',
                                                    grid: true,
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
                                                    xField: 'ZONA',
                                                    yField: 'QYIELD15OAL',
                                                    title: 'OAL',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('strDescripcion1') + ' : ' + Ext.util.Format.number(record.get('QYIELD15OAL'), '0,000.00'));
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

                // --------------------------   PANEL HOUR DATA OAL ---------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL HOUR DATA - Revenue per Hour OAL">
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelHourData',
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
                                    id: prototype.id + '-oal' + '-gridDataP6',
                                    width: 633,
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
                                            {text: 'Description', width: 120, dataIndex: 'strDescripcion6',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'VCPN16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'VCPN16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN162OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Block Hrs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QBLOCKH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQBLOCKH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QBLOCKH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQBLOCKH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Rev/Hrs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Rev/Hrs', width: 70, dataIndex: 'avgBLOCKH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totBLOCKH16avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'avgBLOCKH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totBLOCKH162avgOAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP7',
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'VCPN15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP7').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'VCPN15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP7').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN152OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Block Hrs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QBLOCKH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP7').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQBLOCKH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QBLOCKH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP7').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQBLOCKH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Rev/Hrs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Rev/Hrs', width: 70, dataIndex: 'avgBLOCKH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP7').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totBLOCKH15avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'avgBLOCKH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E;';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP7').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totBLOCKH152avgOAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }

                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP8',
                                    width: 433,
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
                                                    {text: 'Revenue',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'diffVCPN',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP8').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffVCPN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'diffVCPNOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP8').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffVCPNOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Block Hrs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'diffQBLOCKH',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP8').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffQBLOCKH, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'diffQBLOCKHOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP8').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffQBLOCKHOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Rev/Hrs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Rev/Hrs', width: 70, dataIndex: 'diffAvgBLOCKH',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion4 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP8').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffAvgBLOCKH, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'diffAvgBLOCKHOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP8').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffAvgBLOCKHOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
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


                // --------------------------   PANEL FlightPaxPAX  OAL------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxPAX OAL">
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelFlightPaxPAX',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'panel',
                            width: 1400,
                            bodyStyle: 'background-color: #E3EAEF;',
                            //padding: '10 0 10 10',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnChangeFlightPax',
                                    icon: 'resources/img/exchange.png',
                                    tooltip: 'Change Year',
                                    listeners: {
                                        click: 'btnChange_clickFlightPax'
                                    }
                                }
                            ]
                        },
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
                            margin: '5 0 0 150',
                            layout: {
                                type: 'vbox'
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
                                    id: prototype.id + '-oal' + '-gridDataP9',
                                    width: 1213,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR3',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXTH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXF16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXF16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXS16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXS16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXSA16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXSA16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 70, dataIndex: 'QCPAXTT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP10',
                                    width: 1213,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR3',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXTH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXF15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXF15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXS15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXS15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXSA15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXSA15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 70, dataIndex: 'QCPAXTT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
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

                // --------------------------   PANEL FlightPaxFlight OAL------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxFlight">
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelFlightPaxFLIGHT',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'panel',
                            width: 1400,
                            bodyStyle: 'background-color: #E3EAEF;',
                            //padding: '10 0 10 10',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnChangeFlightFlight',
                                    icon: 'resources/img/exchange.png',
                                    tooltip: 'Change Year',
                                    listeners: {
                                        click: 'btnChangeFlightFlight_click'
                                    }
                                }
                            ]
                        },
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
                            margin: '5 0 0 150',
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
                                    id: prototype.id + '-oal' + '-gridDataP12',
                                    width: 1213,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR4',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Fri', width: 70, dataIndex: 'QCFLOWF16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWF16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWS16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWS16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWSA16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWSA16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP13',
                                    width: 1213,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR4',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Fri', width: 70, dataIndex: 'QCFLOWF15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWF15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWS15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWS15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWSA15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWSA15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
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



                // --------------------------   PANEL  DATA city Pair OAL ---------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc="PANEL  DATA city Pair OAL">
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelDataCityPair',
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
                                    id: prototype.id + '-oal' + '-gridDataP23',
                                    width: 680,
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
                                            {text: 'Market', width: 65, dataIndex: 'ZONA',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var tool = record.data['strDescripcion'].trim();
                                                    if (tool.length > 0) {
                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                    }
                                                    metaData.style = 'background:#D1E0E0;color:#008FE3;';
                                                    return '<a href="#flown-zone-review-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridCityPairOAL'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: 'Description', width: 120, dataIndex: 'strDescripcion6',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'background:#D1E0E0;text-align:left';
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEARCity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCFLOW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCFLOW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW16OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 60, dataIndex: 'per16FlownOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper16FlownOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCPAX16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCPAX16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX16OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 60, dataIndex: 'per16PaxOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper16PaxOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'AVG PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'AVG16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'AVG16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG16avgOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP24',
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEARCity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCFLOW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCFLOW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW15OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 60, dataIndex: 'per15FlownOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper15FlownOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCPAX15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCPAX15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX15OAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL %', width: 60, dataIndex: 'per15PaxOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totper15PaxOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'AVG PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'AVG15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG15avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'AVG15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG15avgOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP25',
                                    width: 355,
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
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 85, dataIndex: 'diffQCFLOW',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP25').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 85, dataIndex: 'diffQCFLOWOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP25').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 85, dataIndex: 'diffQCPAX',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP25').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCPAX, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 85, dataIndex: 'diffQCPAXOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion4 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP25').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCPAXOAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }

//                                                   
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

                // --------------------------   PANEL  DATA city Pair Detail OAL--------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc="PANEL  DATA city Pair Detail oal">
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelDataCityPairDetail',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            id: prototype.id + '-oal' + '-labelCityPairDetail',
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
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',                               
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP26',
                                    width: 1263,
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
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEARCityDet',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCFLOW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCFLOW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW16OAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCPAX16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCPAX16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#F7D49E';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX16OAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'AVG',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 60, dataIndex: 'AVG16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'AVG16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG16avgOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEARCityDet',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCFLOW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW15, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCFLOW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOW15OAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'QCPAX15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX15, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'QCPAX15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#FFAEAE';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAX15OAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'AVG',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'AVG15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG15avg, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'AVG15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG15avgOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
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
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'diffQCFLOW',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion1 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCFLOW, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'diffQCFLOWOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion11 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCFLOWOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'PAX',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'diffQCPAX',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCPAX, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'diffQCPAXOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion2 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffQCPAXOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'AVG',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 60, dataIndex: 'diffAVG',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffAVG, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 60, dataIndex: 'diffAVGOAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data.strDescripcion3 === 'rojo' ? '#C22437' : '#244066';
                                                                    metaData.style = 'text-align:right;color:' + color + ';';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDiffAVGOAL, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id +'-oal'+'-gridDataP26Sum',
                                    width: 1263,
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
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCFLOW16'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCFLOW16OAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCPAX16'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCPAX16OAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totAVG16avg'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totAVG16avgOAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCFLOW15'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCFLOW15OAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCPAX15'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totQCPAX15OAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totAVG15avg'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totAVG15avgOAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totDiffQCFLOW'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totDiffQCFLOWOAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totDiffQCPAX'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totDiffQCPAXOAL'},
                                        {width: 60, id: prototype.id + '-oal'+ '-totDiffAVG'},
                                        {width: 72, id: prototype.id + '-oal'+ '-totDiffAVGOAL'}
                                    ]
                                }
                                

                            ]
                        }

                    ]
                },
                // </editor-fold>

                // --------------------------   PANEL FlightPaxPAX City OAL ------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxPAX City OAL">
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelFlightPaxPAXCity',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'panel',
                            width: 1400,
                            bodyStyle: 'background-color: #E3EAEF;',
                            //padding: '10 0 10 10',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnChangeFlightPaxCity',
                                    icon: 'resources/img/exchange.png',
                                    tooltip: 'Change Year',
                                    listeners: {
                                        click: 'btnChange_clickFlightPaxCity'
                                    }
                                }
                            ]
                        },
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
                            margin: '5 0 0 150',
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
                                    id: prototype.id + '-oal' + '-gridDataP29',
                                    width: 1213,
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
                                                    click: 'onSetGridCityPairByDayOAL'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR9',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXTH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXF16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXF16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXS16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXS16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXSA16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXSA16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 70, dataIndex: 'QCPAXTT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP30',
                                    width: 1213,
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
                                                    click: 'onSetGridCityPairByDayOAL'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR9',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXTH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXF15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXF15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXS15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXS15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCPAXSA15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXSA15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 70, dataIndex: 'QCPAXTT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCPAXTT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
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
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelFlightPaxFLIGHTCity',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'panel',
                            width: 1400,
                            bodyStyle: 'background-color: #E3EAEF;',
                            //padding: '10 0 10 10',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnChangeFlightFlightOAL',
                                    icon: 'resources/img/exchange.png',
                                    tooltip: 'Change Year',
                                    listeners: {
                                        click: 'btnChangeFlightFlightOAL_click'
                                    }
                                }
                            ]
                        },
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
                            margin: '5 0 0 150',
                            layout: {
                                type: 'vbox'
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
                                    id: prototype.id + '-oal' + '-gridDataP32',
                                    width: 1213,
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
                                                    click: 'onSetGridCityPairByDayOAL'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR10',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Fri', width: 70, dataIndex: 'QCFLOWF16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWF16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWS16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWS16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWSA16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWSA16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP33',
                                    width: 1213,
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
                                                    click: 'onSetGridCityPairByDayOAL'
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR10',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Fri', width: 70, dataIndex: 'QCFLOWF15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWF15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWS15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWS15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWSA15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWSA15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 70, dataIndex: 'QCFLOWTT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 70, dataIndex: 'QCFLOWTT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
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


                // --------------------------   PANEL FlightPaxPAX City Detail OAL------------------------------------
                //-----------------------------------------------------------------
                // <editor-fold defaultstate="collapsed" desc=" PANEL FlightPaxPAX City Detail OAL">
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelFlightPaxPAXCityDetail',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            id: prototype.id + '-oal' + '-labelFlightPaxPAXCityDetail',
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
                            height: 550,
                            layout: {
                                type: 'vbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                //height: 350,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP38',
                                    width: 1565,
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
                                            {text: 'City <br> Pair ', width: 50, dataIndex: 'CDEPART',
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
                                            {text: 'Flight <br> Number ', width: 50, dataIndex: 'NFLIGHT',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR12',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCPAXM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCPAXT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCPAXW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCPAXTH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXTH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCPAXF16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXF16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCPAXS16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXS16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCPAXSA16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXSA16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 50, dataIndex: 'QCPAXTT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCPAXTT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR12',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCPAXM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXM15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCPAXT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCPAXW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXW15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCPAXTH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXTH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCPAXF15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXF15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXF15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCPAXS15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXS15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXS15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCPAXSA15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXSA15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXSA15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Total', width: 40, dataIndex: 'QCPAXTT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCPAXTT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCPAXTT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-oal' + '-gridDataP38Sum',
                                    width: 1565,
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
                                        {width: 50},
                                        {width: 50},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXM16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXM16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXT16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXT16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXW16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXW16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXTH16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXTH16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXF16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXF16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXS16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXS16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXSA16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXSA16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXTT16'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCPAXTT16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXM15'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXM15OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXT15'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXT15OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXW15'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXW15OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXTH15'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXTH15OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXF15'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXF15OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXS15'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXS15OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXSA15'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXSA15OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCPAXTT15'},
                                        {width: 54, id: prototype.id + '-oal' + '-totQCPAXTT15OAL'}
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
                    xtype: 'panel', id: prototype.id + '-oal' + '-panelFlightPaxFLIGHTCityDetail',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 10 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        //TITULO
                        {
                            xtype: 'label',
                            id: prototype.id + '-oal' + '-labelFlightPaxFLIGHTCityDetail',
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
                            height: 550,
                            layout: {
                                type: 'vbox'
                            },
                            defaults: {
                                padding: '20 0 0 10',
                                bodyStyle: 'background-color: #E3EAEF;',
                                //height: 500,
                                columnLines: true
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-oal' + '-gridDataP41',
                                    width: 1565,
                                    height: 450,
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
                                            {text: 'City <br> Pair ', width: 50, dataIndex: 'CDEPART',
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
                                            {text: 'Flight <br> Number ', width: 50, dataIndex: 'NFLIGHT',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return '';
                                                }
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_CURRENTYEAR13',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCFLOWM16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWM16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCFLOWT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCFLOWW16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWW16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCFLOWTH16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWTH16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Fri', width: 40, dataIndex: 'QCFLOWF16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWF16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCFLOWS16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWS16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCFLOWSA16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWSA16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 40, dataIndex: 'QCFLOWTT16',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 40, dataIndex: 'QCFLOWTT16OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT16OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {text: '201X', id: prototype.id + '-oal' + '-HD_LASTYEAR13',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'MON',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCFLOWM15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWM15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWM15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCFLOWT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'WED',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCFLOWW15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWW15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWW15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'THU',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCFLOWTH15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWTH15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTH15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'FRI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Fri', width: 50, dataIndex: 'QCFLOWF15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWF15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWF15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCFLOWS15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWS15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#BAE6D7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWS15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'SUN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCFLOWSA15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWSA15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#EAFDF7;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWSA15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TOTAL',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'All', width: 50, dataIndex: 'QCFLOWTT15',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'OAL', width: 50, dataIndex: 'QCFLOWTT15OAL',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#DCDDDD;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQCFLOWTT15OAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-oal' + '-gridDataP41Sum',
                                    width: 1565,
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
                                        {width: 50},
                                        {width: 50},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWM16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWM16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWT16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWT16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWW16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWW16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWTH16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWTH16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWF16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWF16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWS16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWS16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWSA16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWSA16OAL'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWTT16'},
                                        {width: 40, id: prototype.id + '-oal' + '-totQCFLOWTT16OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWM15'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWM15OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWT15'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWT15OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWW15'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWW15OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWTH15'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWTH15OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWF15'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWF15OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWS15'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWS15OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWSA15'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWSA15OAL'},
                                        {width: 50, id: prototype.id + '-oal' + '-totQCFLOWTT15'},
                                        {width: 64, id: prototype.id + '-oal' + '-totQCFLOWTT15OAL'}
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



                /** PAGINATION LABELS*/
                {
                    xtype: 'panel', id: prototype.id + '-oal' + '-pie',
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
                                    id: prototype.id + '-oal' + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-oal' + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-oal' + '-lbl-total',
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
                bodyStyle: 'background: transparent;', border: false
            },
            items: [
            ]
        }
    ]
}
);

