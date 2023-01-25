Ext.define('Ext.Praxis.view.interline.WorkProgressReportForm.Info', {
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
            id: prototype.id + '-boxConsultas',
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
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    width: '100%',
                    hidden: false,
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
                            id: prototype.id + '-boxChart_01',
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            hidden: true,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-swf1',
                                    width: '85%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                        anchor: '80%'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="line_01">
                                        {
                                            xtype: 'cartesian',
        //                                    style: 'font-weight:bold;background:red;',
        //                                    title: '<div style="text-align:center;color:#6E6E73;background:blue;font-size:17px">Passenger by Market</div>',
                                            id: prototype.id + '-line_01',
                                            width: 550,
                                            border: false,
                                            height: 300,
        //                                    bodyStyle: 'background:black;',
                                            background: '#E3F8E3',
                                            captions: {
                                                title: {
        //                                            text: 'Total Reject in USD',
        //                                            fontSize: 9,
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3F8E3'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['Audit', 'Rej'],
                                                    grid: true,
        //                                            title: 'Y',
                                                    renderer: function(obj, value) {
                                                        if (value > 1) {
                                                            return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'mes',
                                                    grid: true,
                                                    title: {
        //                                                text: 'X',
                                                        translationX: -30
                                                    },
                                                    renderer: function(obj, value) {
                                                        return value.substring(value.length - 3);
                                                    }
                                                }
                                            ],
                                            series: [
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-Audited1',
                                                    xField: 'mes',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'Audit',
                                                    title: 'Audited',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes') + ' : Audited : <b>' + Ext.util.Format.number(record.get('Audit'), '0,000') + '</b>');
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#61A08D",
                                                        // stroke: "#B4F3C7",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#61A08D',
                                                        lineWidth: 2,
                                                        fill: 'black'
                                                    }
                                                },
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-Rejected1',
                                                    xField: 'mes',
                                                    yField: 'Rej',
                                                    title: 'Rejected',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes') + ' : Rejected : <b>' + Ext.util.Format.number(record.get('Rej'), '0,000') + '</b>');
                                                        }
                                                    },
                                                    style: {
                                                        smooth: true,
                                                        fill: "#165D81",
                                                        //stroke: "#9FD8FA",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'circle',
                                                        radius: 4,
                                                        lineWidth: 1,
                                                        stroke: "#165D81",
                                                        fill: 'white'
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="chart_01">
                                        {
                                            xtype: 'cartesian',
        //                                    style: 'font-weight:bold;background:red;',
        //                                    title: '<div style="text-align:center;color:#6E6E73;background:blue;font-size:17px">Passenger by Market</div>',
                                            id: prototype.id + '-chart_01',
                                            width: 550,
                                            border: false,
                                            height: 300,
        //                                    bodyStyle: 'background:black;',
                                            background: '#E3F8E3',
                                            captions: {
                                                title: {
                                                    text: 'Total Reject in USD',
        //                                            fontSize: 9,
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
        //                                    legend: {
        //                                        docked: 'bottom',
        ////                                        background: 'green'
        //                                    },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['valor'],
                                                    grid: true,
        //                                            title: 'Y',
                                                    renderer: function(obj, value) {
                                                        return Ext.util.Format.number(value, '0,000');
                                                    }
                                                },
                                                {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'mes',
                                                    grid: true,
                                                    title: {
        //                                                text: 'X',
                                                        translationX: -30
                                                    },
                                                    renderer: function(obj, value) {
                                                        return value.substring(value.length - 3);
                                                    }
                                                }
                                            ],
                                            series: [
                                                {
                                                    type: 'bar3d',
                                                    stacked: false,
        //                                            title: ['valors'],
                                                    xField: 'mes',
                                                    yField: ['valor'],
                                                    highlight: true,
                                                    background: 'transparent',
                                                    style: {
        //                                                color: 'blue',
                                                        inGroupGapWidth: -7
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxChart_02',
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            hidden: true,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-swf2',
                                    width: '85%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                        anchor: '80%'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="line_02">
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-line_02',
                                            width: 550,
                                            border: false,
                                            height: 300,
                                            background: '#E3F8E3',
                                            captions: {
                                                title: {
                                                    text: 'Prime Billing',
        //                                            fontSize: 9,
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3F8E3'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['Audit', 'Rej'],
                                                    grid: true,
        //                                            title: 'Y',
                                                    renderer: function(obj, value) {
                                                        if (value > 1) {
                                                            return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'mes',
                                                    grid: true,
                                                    title: {
        //                                                text: 'X',
                                                        translationX: -30
                                                    },
                                                    renderer: function(obj, value) {
                                                        return value.substring(value.length - 3);
                                                    }
                                                }
                                            ],
                                            series: [
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-Audited2',
                                                    xField: 'mes',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'Audit',
                                                    title: 'Audited',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes') + ' : Audited : <b>' + Ext.util.Format.number(record.get('Audit'), '0,000') + '</b>');
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#61A08D",
                                                        // stroke: "#B4F3C7",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#61A08D',
                                                        lineWidth: 2,
                                                        fill: 'black'
                                                    }
                                                },
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-Rejected2',
                                                    xField: 'mes',
                                                    yField: 'Rej',
                                                    title: 'Rejected',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes') + ' : Rejected : <b>' + Ext.util.Format.number(record.get('Rej'), '0,000') + '</b>');
                                                        }
                                                    },
                                                    style: {
                                                        smooth: true,
                                                        fill: "#165D81",
                                                        //stroke: "#9FD8FA",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'circle',
                                                        radius: 4,
                                                        lineWidth: 1,
                                                        stroke: "#165D81",
                                                        fill: 'white'
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="line_03">
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-line_03',
                                            width: 550,
                                            border: false,
                                            height: 300,
                                            background: '#E3F8E3',
                                            captions: {
                                                title: {
                                                    text: 'RM',
        //                                            fontSize: 9,
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3F8E3'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['Audit', 'Rej'],
                                                    grid: true,
        //                                            title: 'Y',
                                                    renderer: function(obj, value) {
                                                        if (value > 1) {
                                                            return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'mes',
                                                    grid: true,
                                                    title: {
        //                                                text: 'X',
                                                        translationX: -30
                                                    },
                                                    renderer: function(obj, value) {
                                                        return value.substring(value.length - 3);
                                                    }
                                                }
                                            ],
                                            series: [
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-Audited3',
                                                    xField: 'mes',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'Audit',
                                                    title: 'Audited',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes') + ' : Audited : <b>' + Ext.util.Format.number(record.get('Audit'), '0,000') + '</b>');
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#61A08D",
                                                        // stroke: "#B4F3C7",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#61A08D',
                                                        lineWidth: 2,
                                                        fill: 'black'
                                                    }
                                                },
                                                {
                                                    type: 'line',
                                                    id: prototype.id + '-Rejected3',
                                                    xField: 'mes',
                                                    yField: 'Rej',
                                                    title: 'Rejected',
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes') + ' : Rejected : <b>' + Ext.util.Format.number(record.get('Rej'), '0,000') + '</b>');
                                                        }
                                                    },
                                                    style: {
                                                        smooth: true,
                                                        fill: "#165D81",
                                                        //stroke: "#9FD8FA",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'circle',
                                                        radius: 4,
                                                        lineWidth: 1,
                                                        stroke: "#165D81",
                                                        fill: 'white'
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxChart_03',
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            hidden: true,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-swf3',
                                    width: '85%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                        anchor: '80%'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="chart_02">
                                        {
                                            xtype: 'cartesian',
        //                                    style: 'font-weight:bold;background:red;',
        //                                    title: '<div style="text-align:center;color:#6E6E73;background:blue;font-size:17px">Passenger by Market</div>',
                                            id: prototype.id + '-chart_02',
                                            width: 550,
                                            border: false,
                                            height: 300,
        //                                    bodyStyle: 'background:black;',
                                            background: '#E3F8E3',
                                            captions: {
                                                title: {
//                                                    text: 'Total Reject in USD',
        //                                            fontSize: 9,
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
        //                                    legend: {
        //                                        docked: 'bottom',
        ////                                        background: 'green'
        //                                    },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['valor'],
                                                    grid: true,
        //                                            title: 'Y',
                                                    renderer: function(obj, value) {
                                                        return Ext.util.Format.number(value, '0,000');
                                                    }
                                                },
                                                {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'mes',
                                                    grid: true,
                                                    title: {
        //                                                text: 'X',
                                                        translationX: -30
                                                    },
                                                    renderer: function(obj, value) {
                                                        return value.substring(value.length - 3);
                                                    }
                                                }
                                            ],
                                            series: [
                                                {
                                                    type: 'bar3d',
                                                    stacked: false,
        //                                            title: ['valors'],
                                                    xField: 'mes',
                                                    yField: ['valor'],
                                                    highlight: true,
                                                    background: 'transparent',
                                                    style: {
        //                                                color: 'blue',
                                                        inGroupGapWidth: -7
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('mes').substring(record.get('mes').length - 3) + ', ' + Ext.util.Format.number(record.get(ctx.field), '0,000'));
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="line_04">
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-line_04',
                                            width: 550,
                                            border: false,
                                            height: 300,
                                            background: '#E3F8E3',
//                                            captions: {
//                                                title: {
//                                                    text: 'RM',
//        //                                            fontSize: 9,
//                                                    alignTo: 'chart'
//                                                }
//                                            },
//                                            animation: {
//                                                duration: 200
//                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3F8E3'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['Porc'],
                                                    grid: true,
        //                                            title: 'Y',
                                                    renderer: function(obj, value) {
                                                        return Ext.util.Format.number(value, '0,000') + '%';
//                                                        if (value > 1) {
//                                                            return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
//                                                        } else {
//                                                            return '';
//                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
        //                                                text: 'X',
                                                        translationX: -30
                                                    },
                                                    renderer: function(obj, value) {
                                                        return value.substring(value.length - 3);
                                                    }
                                                }
                                            ],
                                            series: [
                                                {
                                                    type: 'line',
//                                                    id: prototype.id + '-Audited4',
                                                    xField: 'strFormatDate',
                                                    background: 'rgba(90,240,250, .1)',
                                                    yField: 'Porc',
                                                    title: 'Recovered',
                                                    grid: true,
                                                    fill: true,
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml('Recovered, ' + record.get('strFormatDate') + ', ' + Ext.util.Format.number(record.get('Porc'), '0,000') + '%');
                                                        }
                                                    },
                                                    style: {
                                                        fill: "#61A08D",
                                                        // stroke: "#B4F3C7",
                                                        fillOpacity: 0.1,
                                                        miterLimit: 3,
                                                        lineCap: 'miter',
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        type: 'path',
                                                        path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                        stroke: '#61A08D',
                                                        lineWidth: 2,
                                                        fill: 'black'
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                                //<mx:SWFLoader source="fusioncharts/ChtWorkProgress03.swf" id="swf3"/>
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: '100%',
                            height: 345,
//                            hidden: true,
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
                                        text: 'Total Audited Coupons by Billing Month vs. Rejected Month ( FC ) ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: '&nbsp;', flex: 1,
                                                id: prototype.id + '-titHorzFecha1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '&nbsp;', dataIndex: 'strFormatDate', id: prototype.id + '-titVertFecha1', flex: 1,//width: 90,
                                                        listeners: {
                                                            click: 'imgByMonth_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                            return '<a href="#interline-work-progress-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud1, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej1, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud2', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud2, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej2', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej2, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha3',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud3', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud3, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej3', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej3, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha4',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud4', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud4, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej4', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej4, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha5',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud5', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud5, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej5', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej5, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha6',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud6', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud6, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej6', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej6, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total<br>Documents', dataIndex: 'QCUPON', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCUPON, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total Audited<br>Documents', dataIndex: 'QAUDI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQAUDI, '0,000');
                                                }
                                            },
                                            {
                                                text: '%<br>Reviewed', dataIndex: 'Porc', width: 82,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000')+'%';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totPorc, '0,000')+'%';
                                                }
                                            },
                                            {
                                                text: 'Total Rejected<br>Coupons', dataIndex: 'QRM', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQRM, '0,000');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="gridData_AMT">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_AMT',
                            width: '100%',
                            height: 345,
                            hidden: true,
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
                                        text: 'Total Audited Coupons by Billing Month vs. Rejected Month ( FC ) ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: '&nbsp;', flex: 1,
                                                id: prototype.id + '-titHorzFecha2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '&nbsp;', dataIndex: 'strFormatDate', id: prototype.id + '-titVertFecha2', flex: 1//width: 90
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha1_AMT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud1', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud1, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha2_AMT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud2', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud2, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha3_AMT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud3', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud3, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha4_AMT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud4', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud4, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha5_AMT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud5', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud5, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha6_AMT',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'Aud6', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud6, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Invoice<br>Amount', dataIndex: 'QAUDI', width: 103,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQAUDI, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Audit<br>Amount', dataIndex: 'QRM', width: 103,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQRM, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Reject<br>Amount', dataIndex: 'QCUPON', width: 103,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCUPON, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '% Rec', dataIndex: 'Porc', width: 73,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#EDF3F3;";
                                                    return Ext.util.Format.number(value, '0,000.00')+'%';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData_AMT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totPorc, '0,000.00')+'%';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="gridData_SUP">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_SUP',
                            width: '100%',
                            height: 362,
                            hidden: true,
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
                                        text: 'Total Audited Coupons by Billing Month vs. Rejected Month ( FC ) ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: '&nbsp;', flex: 1,
                                                id: prototype.id + '-titHorzFecha3',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '&nbsp;', dataIndex: 'strFormatDate', id: prototype.id + '-titVertFecha3', flex: 1,//width: 90,
                                                        listeners: {
                                                            click: 'imgByMonth_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                            return '<a href="#interline-work-progress-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha3_SUPP',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud3', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud3, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej3', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej3, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Supp', dataIndex: 'Sup3', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totSup3, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha4_SUPP',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud4', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud4, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej4', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej4, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Supp', dataIndex: 'Sup4', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totSup4, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha5_SUPP',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud5', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud5, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej5', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej5, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Supp', dataIndex: 'Sup5', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totSup5, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '&nbsp;',
                                                id: prototype.id + '-titFecha6_SUPP',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audit', dataIndex: 'Aud6', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totAud6, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rej', dataIndex: 'Rej6', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totRej6, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Supp', dataIndex: 'Sup6', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totSup6, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Documents',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total', dataIndex: 'QCUPON', width: 52,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#EDF3F3;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCUPON, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Audited', dataIndex: 'QAUDI', width: 56,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#EDF3F3;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQAUDI, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '%<br>Reviewed', dataIndex: 'Porc', width: 54,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#EDF3F3;";
                                                            return Ext.util.Format.number(value, '0,000')+'%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totPorc, '0,000')+'%';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rejected<br>Cpns', dataIndex: 'QRM', width: 56,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#EDF3F3;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQRM, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total Supp. Documents',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total', dataIndex: 'QSFIM', width: 52,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQSFIM, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Audited', dataIndex: 'QSUPAUD', width: 56,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQSUPAUD, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rejected', dataIndex: 'QSUPRM', width: 56,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#BDCEEF;";
                                                            return Ext.util.Format.number(value, '0,000')+'%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData_SUP').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQSUPRM, '0,000')+'%';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {
                            xtype: 'panel',
                            id: prototype.id + '-box_DocType',
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 932,
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                        anchor: '100%',
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            width: '100%',
                                            height: '100%',
                                            hidden: false,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Total Audited Document and Rejected Documents by Type of Doc', width: '100%'
                                                    }
                                                ]
                                            }
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="gridData2">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData2',
                                            width: '100%',
                                            height: 80,
                                            hidden: true,
                                            columnLines: true,
                                            enableKeyEvents: true,
                                            hideHeaders: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: '&nbsp;', dataIndex: 'strDescripcion', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Rej1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud2', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Rej2', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud3', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Rej3', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud4', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Rej4', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud5', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Rej5', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud6', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Rej6', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="gridData2_AMT">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData2_AMT',
                                            width: '100%',
                                            height: 80,
                                            hidden: true,
                                            columnLines: true,
                                            enableKeyEvents: true,
                                            hideHeaders: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: '&nbsp;', dataIndex: 'strDescripcion', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud1', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud2', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud3', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud4', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud5', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '&nbsp;', dataIndex: 'Aud6', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-box_Rates',
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                anchor: '100%',
                                border: false
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData3">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData3',
                                    width: 932,
                                    height: 165,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Currency', dataIndex: 'strDescripcion', flex: 1//width: 83
                                            },
                                            {
                                                text: '&nbsp;', dataIndex: 'totNet1', width: 140, id: prototype.id + '-titFecha_1',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;";
                                                    value = (data.RN===5||data.RN===6)?Ext.util.Format.number(value, '0,000.00000'):Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '&nbsp;', dataIndex: 'totNet2', width: 140, id: prototype.id + '-titFecha_2',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;";
                                                    value = (data.RN===5||data.RN===6)?Ext.util.Format.number(value, '0,000.00000'):Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '&nbsp;', dataIndex: 'totNet3', width: 140, id: prototype.id + '-titFecha_3',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;";
                                                    value = (data.RN===5||data.RN===6)?Ext.util.Format.number(value, '0,000.00000'):Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '&nbsp;', dataIndex: 'totNet4', width: 140, id: prototype.id + '-titFecha_4',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;";
                                                    value = (data.RN===5||data.RN===6)?Ext.util.Format.number(value, '0,000.00000'):Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '&nbsp;', dataIndex: 'totNet5', width: 140, id: prototype.id + '-titFecha_5',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;";
                                                    value = (data.RN===5||data.RN===6)?Ext.util.Format.number(value, '0,000.00000'):Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '&nbsp;', dataIndex: 'totNet6', width: 140, id: prototype.id + '-titFecha_6',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;";
                                                    value = (data.RN===5||data.RN===6)?Ext.util.Format.number(value, '0,000.00000'):Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailData',
//                    width: '100%',
                    width: 1070,
                    hidden: true,
                    border: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByMonth">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByMonth',
//                            width: '100%',
                            width: 1070,
                            height: 137,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Billing',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Month', dataIndex: 'strFormatDate', width: 100
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Type', flex: 1,//
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'of Doc', dataIndex: 'strDescripcion', width: 120,
                                                listeners: {
                                                    click: 'imgByTdoc_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    return '<a href="#interline-work-progress-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Documents',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Inv', dataIndex: 'QTYINV', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Cpns', dataIndex: 'QCUPON', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Aud', dataIndex: 'QAUDI', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: '%Aud', dataIndex: 'dblPerRev', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RMs', dataIndex: 'QRM', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Supported Documents',
                                        hidden: true,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Cpns', dataIndex: 'QSFIM', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Aud', dataIndex: 'QSOPAUD', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RM', dataIndex: 'QSOPRM', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENP', width: 85,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Total Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Invoice', dataIndex: 'NETI', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Rejected', dataIndex: 'NETO', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '%Rec', dataIndex: 'dblPerRec', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00')+'%';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ttl',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Corr.', dataIndex: 'QCORR', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByCurr">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByCurr',
                            width: 900,
                            height: 137,
                            hidden: false,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Invoice', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Currency', dataIndex: 'CURRENP', flex: 1//width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Invoices', dataIndex: 'QTYINV', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Docs', dataIndex: 'QCUPON', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Aud', dataIndex: 'QAUDI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RMs', dataIndex: 'QRM', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: '%',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Audited', dataIndex: 'dblPerRev', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Supported', dataIndex: 'QSFIM', width: 72,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Supp',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Audited', dataIndex: 'QSOPAUD', width: 72,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Supp',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'RM', dataIndex: 'QSOPRM', width: 72,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 87,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Rejected',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 87,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ttl',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Corr.', dataIndex: 'QCORR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailByTdocData',
                    width: '100%',
                    hidden: true,
                    border: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTdocMonth">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTdocMonth',
                            width: 1305,
                            height: 510,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Billing',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Month', dataIndex: 'strFormatDate', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Invoice', dataIndex: 'INVOICE', flex: 1,//width: 100,
                                        listeners: {
                                            click: 'imgByINVOICE_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                            return '<a href="#interline-work-progress-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Air', dataIndex: 'AIRLINE', width: 50
                                    },
                                    {
                                        text: 'Airline',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Name', dataIndex: 'strDescripcion', width: 160,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Docs', dataIndex: 'QCUPON', width: 70,
                                                listeners: {
                                                    click: 'imgByTkt_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return '<a href="#interline-work-progress-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Supp', dataIndex: 'QSFIM', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Audit', dataIndex: 'QAUDI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RMs', dataIndex: 'QRM', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Corr', dataIndex: 'QCORR', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'CURRENP', width: 50
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Rejected',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: '%Rec', dataIndex: 'dblPerRec', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00')+'%';
                                        }
                                    },
                                    {
                                        text: 'Send',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate1', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Date',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Closed', dataIndex: 'strFormatDate2', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'SPMI', dataIndex: 'FMETHOD', width: 50
                                    },
                                    {
                                        text: 'Group', dataIndex: 'GRUPO', width: 70
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', height: 10},
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTdocCurr">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTdocCurr',
                            width: 907,
                            height: 137,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Invoice', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Currency', dataIndex: 'CURRENP', flex: 1//width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Invoices', dataIndex: 'QTYINV', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Docs', dataIndex: 'QCUPON', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Aud', dataIndex: 'QAUDI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RMs', dataIndex: 'QRM', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: '%',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Audited', dataIndex: 'dblPerRev', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Supported', dataIndex: 'QSFIM', width: 77,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Supp',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Audited', dataIndex: 'QSOPAUD', width: 77,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Supp',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'RM', dataIndex: 'QSOPRM', width: 77,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Rejected',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ttl',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Corr.', dataIndex: 'QCORR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailByTktData',
                    width: '100%',
                    hidden: true,
                    border: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTktMonth">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTktMonth',
                            width: 1305,
                            height: 566,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Daily Summary Report View ( FC ) ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Airline', dataIndex: 'AIRLINE', width: 50
                                            },
                                            {
                                                text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 75
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Int.Sequence',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'NROPRT', width: 100,
                                                        listeners: {
                                                            click: 'viewA728'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return '<a href="#interline-work-progress-report-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ticket', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strDescripcion', flex: 1//width: 110
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr', dataIndex: 'CURRENP', width: 70
                                            },
                                            {
                                                text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETI', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Accepted',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETM', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Net',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'RM', dataIndex: 'RMACCEPT', width: 87
                                            },
                                            {
                                                text: 'SPMI', dataIndex: 'FMETHOD', width: 87
                                            },
                                            {
                                                text: 'Group', dataIndex: 'GRUPO', width: 90
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'RUTAP', width: 100
                                            },
                                            {
                                                text: 'Penalty', dataIndex: 'IPENAL', width: 95
                                            },
                                            {
                                                text: 'Reject',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'NRORM', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', height: 5},
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTktCurr">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTktCurr',
                            width: 900,
                            height: 119,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Totals', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Clearing', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', flex: 1//width: 90
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cpns', dataIndex: 'QCUPON', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audited', dataIndex: 'QAUDI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'RM', dataIndex: 'QRM', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '%',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audited', dataIndex: 'dblPerRev', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Rejected Totals',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Gross', dataIndex: 'GROSSN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'ISC', dataIndex: 'ISCN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'TAX', dataIndex: 'TAXN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Rejected',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETO', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '%',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Recovery', dataIndex: 'dblPerRec', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailByInvoiceNbr',
                    width: '100%',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        layout: 'hbox',
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: 900
                    },
                    items: [
                        {
                            region: 'center',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900,
                                padding: '0 0 6 0'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Detail of Invoice">
                                {
                                    defaults: {
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Detail of Invoice',
                                            style: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: '100%',
                                            padding: '4 0'
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Airline',
                                            readOnly: true,
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_AIRLINE_DES',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 510
                                        },
                                        {
                                            id: prototype.id+'-lbl_STVAL_DES',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 200
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice Number',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_INVOICE',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'SRC',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_TUSO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 290
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Group',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_GRUPO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice Date',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_FINVOICE',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Per',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERMONT',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 70
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Time Limit:',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_FECLIMIT',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Clearing',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_FCLEAR',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice Net',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_NETI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 290
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'SPA',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_SPA',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'IMG',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_IMG',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Sending Date',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_DATENV',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Close Date',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_FECL',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 290
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ETKT',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_ETKT',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            region: 'center',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Invoice Quantity Cpns">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            value: 'Invoice Quantity Cpns',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 250
                                        },
                                        {
                                            value: 'Invoice Amount',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 250
                                        },
                                        {
                                            value: 'RM Amount',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 250
                                        },
                                        {
                                            value: 'Currency',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_MONEDA',
                                            value: '',
                                            fieldStyle: 'text-align:center;',
                                            width: 50
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            id: prototype.id+'-lbl_TUSO_DES',
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: '',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 555
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: '% Rec',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            id: prototype.id+'-lbl_QCUPON',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 80
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Rate',
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Gross',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_GROSSI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_GROSSN',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Process',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            id: prototype.id+'-lbl_PCUPON',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC2',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ISC',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_ISCI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_ISCN',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC3',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Checked',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            id: prototype.id+'-lbl_QAUDI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC4',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'TAX',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_TAXI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_TAXN',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC5',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 250
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Totals',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_NETI2',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_NETO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC6',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            region: 'center',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Quantity RM">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            value: 'Quantity RM',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: '100%'
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: '',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Rate',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'RM',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRM',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_Rate1',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Gross',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMGROSS',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC7',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ISC',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMISC',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC8',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Tax',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMTAX',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC9',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 6">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Others',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMOTH',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC10',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            region: 'center',
                            id: prototype.id+'-box_Adjustment',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Adjustment">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            value: 'Adjustment',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: '100%'
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Quantity Cpns',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_ICUPON',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Gross',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_IFARE',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ISC',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_IISC',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Tax',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_ITAX',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Other',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_IOTHER',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 6">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Net',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_INETO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 7">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Comments',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_COMMENTS',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 700
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    width: prototype.widthContenedor,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            height: '100%',
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
                // </editor-fold>
            ]
        }
    ]
});