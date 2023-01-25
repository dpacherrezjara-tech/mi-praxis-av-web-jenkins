valor = '0';
Ext.define('Ext.Praxis.view.payments.BankReconciCommisForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1620,
                height: 'auto',
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1203,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    width: 1203,
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
                                            {
                                                text: 'Bank Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#d5f4d5;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Match Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QMATCH', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQMATCH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMATCH', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMATCH, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement w/o Bank Account Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QLIQUI', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQLIQUI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'ALIQUIL', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totALIQUIL, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Account w/o Settlement Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QBANK', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQBANK, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'ABANKE', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totABANKE, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Match with Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QDIFF', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQDIFF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Settlement', dataIndex: 'ADIFFL', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totADIFFL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Bank Account', dataIndex: 'ADIFFE', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totADIFFE, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Diff', dataIndex: 'ADIFF', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totADIFF, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                { xtype: 'tbspacer', height: 20 },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraficos',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico01',
                                            width: 700,
                                            border: false,
                                            height: 450,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Bank Date',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['QMATCH', 'QLIQUI', 'QBANK', 'QDIFF'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: '',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Match', 'Settlement', 'Bank', 'Diff'],
                                                    xField: 'strFormatDate',
                                                    yField: ['QMATCH', 'QLIQUI', 'QBANK', 'QDIFF'],
                                                    colors: ['#3d9e3d', '#9e3d6f', '#9e743d', '#3d629e'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            if (ctx.field === 'QMATCH') {
                                                                label = 'Match';
                                                            } else if (ctx.field === 'QLIQUI') {
                                                                label = 'Settlement';
                                                            } else if (ctx.field === 'QBANK') {
                                                                label = 'Bank';
                                                            } else if (ctx.field === 'QDIFF') {
                                                                label = 'Diff';
                                                            }
                                                            toolTip.setHtml(label + ' -  ' + record.get('strFormatDate') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }],
//                            series: [
//                                {
//                                    type: 'line',
//                                    xField: 'strFormatDate',
//                                    background: 'rgba(90,240,250, .1)',
//                                    yField: 'QMATCH',
//                                    title: 'Sales',
//                                    grid: true,
//                                    fill: true,
//                                    highlight: true,
//                                    tooltip: {
//                                        trackMouse: true,
//                                        height: 28,
//                                        renderer: function(toolTip, record, ctx) {
//                                            toolTip.setHtml(record.get('strFormatDate') + ' : ' + Ext.util.Format.number(record.get('QMATCH'), '0,000.00'));
//                                        }
//                                    },
//                                    style: {
//                                        fill: "#61A08D",
//                                        // stroke: "#B4F3C7",
//                                        fillOpacity: 0.1,
//                                        miterLimit: 3,
//                                        lineCap: 'miter',
//                                        lineWidth: 2
//                                    },
//                                    marker: {
//                                        type: 'path',
//                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
//                                        stroke: '#61A08D',
//                                        lineWidth: 2,
//                                        fill: 'black'
//                                    }
//                                },
//                                {
//                                    type: 'line',
//                                    id: prototype.id + '-leyendLastG1',
//                                    xField: 'strFormatDate',
//                                    yField: 'QLIQUI',
//                                    title: 'Cont',
//                                    fill: true,
//                                    highlight: true,
//                                    tooltip: {
//                                        trackMouse: true,
//                                        height: 28,
//                                        renderer: function(toolTip, record, ctx) {
//                                            toolTip.setHtml(record.get('strFormatDate') + ' : ' + Ext.util.Format.number(record.get('QLIQUI'), '0,000.00'));
//                                        }
//                                    },
//                                    style: {
//                                        smooth: true,
//                                        fill: "#165D81",
//                                        //stroke: "#9FD8FA",
//                                        fillOpacity: 0.1,
//                                        miterLimit: 3,
//                                        lineCap: 'miter',
//                                        lineWidth: 2
//                                    },
//                                    marker: {
//                                        type: 'circle',
//                                        radius: 4,
//                                        lineWidth: 1,
//                                        stroke: "#165D81",
//                                        fill: 'white'
//                                    }
//                                }
//                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1203,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDay',
                                    width: 1203,
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
                                            {
                                                text: 'Bank Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'BDATEP', width: 100}
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#d5f4d5;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Match Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QMATCH', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetTran'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQMATCH, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMATCH', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMATCH, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement w/o Bank Account Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QLIQUI', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetTran'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQLIQUI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'ALIQUIL', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totALIQUIL, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Account w/o Settlement Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QBANK', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetTran'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQBANK, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'ABANKE', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totABANKE, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Match with Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty Tran', dataIndex: 'QDIFF', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetTran'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQDIFF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Settlement', dataIndex: 'ADIFFL', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totADIFFL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Bank Account', dataIndex: 'ADIFFE', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totADIFFE, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Diff', dataIndex: 'ADIFF', width: 100, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totADIFF, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTran',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 530,
                            width: 1590,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTran',
                                    width: 1589,
                                    height: 485,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '', dataIndex: 'RN', width: 50},
                                            {text: 'Description', dataIndex: 'strDescripcion', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    (data.strDescripcion === 'Difference') ? metaData.style = "text-align:center;font-weight: bold;color:#008000"
                                                            : metaData.style = "text-align:center;font-weight: normal;color:#244066";
                                                    metaData.tdAttr = 'data-qtip="' + data.DATEF + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Merchant',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'MERCHN', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODEBANK', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.strDescripcion === 'Difference') ? metaData.style = "text-align:center;font-weight: bold;color:#008000"
                                                                    : metaData.style = "text-align:center;font-weight: normal;color:#244066";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescBank + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:center;font-weight: bold;color:#008000"
                                                            : metaData.style = "text-align:center;font-weight: normal;color:#244066";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Qty',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tran.', dataIndex: 'QTYTRAN', width: 75, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#d5f4d5"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#d5f4d5";
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totQTYTRAN, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#d5f4d5"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#d5f4d5";
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'National Credit Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Base', dataIndex: 'MONBTCRE1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totMONBTCRE1, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Rate', dataIndex: 'RATCNAC1', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'COMITCRE1', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#ddebf7";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totCOMITCRE1, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'IVACRE1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totIVACRE1, '0,000.00') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'National Debit Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Base', dataIndex: 'MONBTDEB1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totMONBTDEB1, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Rate', dataIndex: 'RATDNAC1', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'COMITDEB1', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totCOMITDEB1, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'IVADEB1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totIVADEB1, '0,000.00') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Foreign Card Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Base', dataIndex: 'MONBTEXT1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totMONBTEXT1, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Rate', dataIndex: 'RATCEXT1', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'COMITEXT1', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#ddebf7";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totCOMITEXT1, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'IVAEXT1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totIVAEXT1, '0,000.00') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary3',
                                    width: 1589,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 50},
                                        {width: 100},
                                        {width: 200},
                                        {width: 75, id: prototype.id + '-lblTotT_QTYTRAN'},
                                        {width: 100, id: prototype.id + '-lblTotT_SVFOP'},
                                        {width: 100, id: prototype.id + '-lblTotT_MONBTCRE1'},
                                        {width: 50, id: prototype.id + '-lblTotT_RATCNAC1'},
                                        {width: 100, id: prototype.id + '-lblTotT_COMITCRE1'},
                                        {width: 100, id: prototype.id + '-lblTotT_IVACRE1'},
                                        {width: 100, id: prototype.id + '-lblTotT_MONBTDEB1'},
                                        {width: 50, id: prototype.id + '-lblTotT_RATDNAC1'},
                                        {width: 100, id: prototype.id + '-lblTotT_COMITDEB1'},
                                        {width: 100, id: prototype.id + '-lblTotT_IVADEB1'},
                                        {width: 100, id: prototype.id + '-lblTotT_MONBTEXT1'},
                                        {width: 50, id: prototype.id + '-lblTotT_RATCEXT1'},
                                        {width: 100, id: prototype.id + '-lblTotT_COMITEXT1'},
                                        {width: 100, id: prototype.id + '-lblTotT_IVAEXT1'}
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1463,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCard',
                                    width: 1463,
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
                                            {
                                                text: 'Type',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Doc', dataIndex: 'TDOC', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strTOPER + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Src', dataIndex: 'FTE', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 110
                                                    },
                                                    {
                                                        text: 'Type', dataIndex: 'strDescripcion', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Author.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAUTHOC', width: 75
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate', dataIndex: 'RATECOM', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'COMISION', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totCOMISION, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TDATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Liquidation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATEF', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'BDATEP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Deposit', dataIndex: 'strBankDeposit', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'BSTVAL', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "background-color:#d5f4d5;";
                                                    metaData.tdAttr = 'data-qtip="' + data.BSTVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'FLAGC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.FLAGC + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYDOC', width: 50,
                                                        listeners: {
                                                            click: 'onGridDetTkt'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYDOC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }


                                        ]
                                    }
                                },
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-panelDataSummary4',
//                                    width: 1463,
//                                    align: 'left',
//                                    margin: '0 0 0 0 ',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        align: 'center',
//                                        html: '' + '&nbsp',
//                                        height: 25,
//                                        padding: '5 5 5 0',
//                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                    },
//                                    items: [
//                                        {width: 585, id: prototype.id + '-lblTotAMOUNT4_1', align: 'center'},
//                                        {width: 50},
//                                        {width: 75, id: prototype.id + '-lblTotM_QTEF4_2', align: 'center'},
//                                        {width: 750, id: prototype.id + '-lblTotM_QTYDOC4_3', align: 'center'}
//                                    ]
//                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTicket',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1268,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTicket',
                                    width: 1268,
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
                                            {
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 120, //flex: 1
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'AAGENT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'ACURRENCY', width: 75
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AVFOP', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetTicket').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Card Number', dataIndex: 'ACARDN', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.ACARDN + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'APNR', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.APNR + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Authorization',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'AAUTHOC', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Acceptance Date', dataIndex: 'BDATEL', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'BSTVAL', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'BDATEP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'BSTVALP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days', dataIndex: 'lngDays', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    (data.lngDays > 4) ? metaData.style = "color:#c22428"
                                                            : metaData.style = "color:#2BC224";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  '<b>' + value + '</b>';
                                                }
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1132,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
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
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


