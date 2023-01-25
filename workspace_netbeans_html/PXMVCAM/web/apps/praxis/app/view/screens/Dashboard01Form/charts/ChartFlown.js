Ext.define('Ext.Praxis.view.screens.Dashboard01Form.charts.ChartFlown', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-chartFlown',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.charts.ChartFlownController'
    ],
    controller: 'ChartFlownController',
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
                align: 'center'
            },
            items: [
                /*************************************************************************
                 * PANEL DE FILTROS
                 * */
                {
                    xtype: 'panel',
                    margin: '20 0 5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    border: true,
                    defaults: {
                        width: 1550,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: true,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 950,
                                    bodyStyle: 'background-color: transparent; border: 0px solid #81BEF7',
                                    border: true,
                                    layout: 'column',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '8px 7px 8px 20px',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-Box_Chart_Flown',
                                            fieldLabel: '',
                                            horizontal: true,
                                            items: [
                                                {boxLabel: '<strong style="color:#3399FF" >By Month</strong>', name: 'rb', inputValue: 'MO', width: 120, checked: true},
                                                {boxLabel: '<strong style="color:#3399FF" >On/Off</strong>', name: 'rb', inputValue: 'NF', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >By Zone</strong>', name: 'rb', inputValue: 'ZN', width: 120}
                                            ],
                                            listeners: {
                                                change: 'chooseChart_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: 420,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    border: true,
                                    layout: 'column',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '4px 5px 4px 5px',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<b>Year:</b>',
                                            fieldStyle: 'text-align: center;'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFADateFromYear1',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            editable: false,
                                            width: 75,
                                            listConfig: {maxHeight: 111}
                                        },
                                        {xtype: 'tbspacer', width: 0},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFADateFromMonth1',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listeners: {
                                                change: 'cbxDateFromMonth_changeHandler_chart'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            html: '<b>To</b>',
                                            fieldStyle: 'text-align: center;'
                                        },
                                        {xtype: 'tbspacer', width: 0},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFADateToMonth1',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
//                                            listeners: {
//                                                change: 'cbxDateFromMonth_changeHandler_chart'
//                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    padding: '4px 7px 4px 20px',
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    width: 80,
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearch_chartFlown',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onClickSearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnBack_chartFlown',
                                            iconCls: 'prx-icon-back',
                                            tooltip: 'Back'
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /*************************************************************************
                 ***************PANEL DE GRILLA Y GRAFICOS - Month************************ 
                 *************************************************************************/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownByMonth',
                    margin: '0 0 0 0',
                    hidden: false,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillMonth',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownMonthBack',
                                    border: false,
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '5 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownMonthPieBack',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 50,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 100
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
//                                                    rotation: (-0.5 * Math.PI) - (25/180 * Math.PI),
//                                            legend: {
//                                                docked: 'bottom',
//                                                background: '#E3EAEF',
//                                            },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'VCPNB',

//                                                            rotation:90,
                                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                                '#06f985', '#0aac52', '#93d250',
                                                                '#ffff00', '#ffc102', '#fe0000',
                                                                '#ff0167', '#9b66fe', '#6600cd'],
                                                            label: {
                                                                field: 'strValueB',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    metaData.style = "font-size:12px;font-weight:bold;text-align:center;";
                                                                    var value0 = value.substr(0, 4);
                                                                    var value1 = value.substr(4, 15);
                                                                    var value2 = Ext.util.Format.number((value1 / 1000000), '0.0');
                                                                    if ((value2 / 100) > 1) {
//                                                                       console.log(value2 + ' es grande'); 
                                                                    } else {
                                                                        if (value2 < 40) {
//                                                                            console.log(value2 +  ' es chica no se muestra');
                                                                            value0 = '';
                                                                            value2 = '';
                                                                        } else {
//                                                                            console.log(value2 +  ' es chica');
                                                                        }
                                                                    }
                                                                    return value0 + value2 + 'M';
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'strFormatDate') {
                                                                        label = 'Total';
                                                                    } else {
                                                                        label = '';
                                                                    }
                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(label + 'Total Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' USD' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownMonthBack',
                                                    width: 550,
                                                    height: 373, //403
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
//                                            features: [{
//                                                    ftype: 'summary'
//                                                }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Flight',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Date', dataIndex: 'strFormatDateB', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cabin',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Business',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_JB', width: 40,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_JB', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Economy',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_YB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_YB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAXB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownMonthNow',
                                    border: false,
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownMonthPieNow',
                                                    width: 555,
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 50,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'VCPN',
                                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                                '#06f985', '#0aac52', '#93d250',
                                                                '#ffff00', '#ffc102', '#fe0000',
                                                                '#ff0167', '#9b66fe', '#6600cd'],
                                                            label: {
                                                                field: 'strValue',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    metaData.style = "font-size:12px;font-weight:bold;text-align:center;";
                                                                    var value0 = value.substr(0, 4);
                                                                    var value1 = value.substr(4, 15);
                                                                    var value2 = Ext.util.Format.number((value1 / 1000000), '0.0');
                                                                    if ((value2 / 100) > 1) {
//                                                                       console.log(value2 + ' es grande'); 
                                                                    } else {
                                                                        if (value2 < 40) {
//                                                                            console.log(value2 +  ' es chica no se muestra');
                                                                            value0 = '';
                                                                            value2 = '';
                                                                        } else {
//                                                                            console.log(value2 +  ' es chica');
                                                                        }
                                                                    }
                                                                    return value0 + value2 + 'M';
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'strFormatDate') {
                                                                        label = 'Total';
                                                                    } else {
                                                                        label = '';
                                                                    }
                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(label + 'Total Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' USD' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownMonthNow',
                                                    width: 550,
                                                    height: 373,
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Flight',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cabin',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Business',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_J', width: 40,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_J', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Economy',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_Y', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_Y', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownMonthBared',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayFlownMonthBared',
                                    margin: '15 0 0 10 ',
                                    flipXY: true,
                                    width: 420,
                                    height: 747,
                                    insetPadding: '20 20',
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'bottom',
                                            majorTickSteps: 5,
                                            fields: ['VCPN', 'VCPNB'],
                                            title: 'Amount',
                                            grid: {
                                                odd: {
                                                    fillStyle: 'rgba(245, 245, 245, 1.0)'
                                                },
                                                even: {
                                                    fillStyle: 'rgba(255, 255, 255, 1.0)'
                                                }
                                            },
                                            renderer: function (obj, value) {
                                                if (value > 1) {
                                                    return ' ' + Ext.util.Format.number((value / 1000000), '0,000') + 'M ';
                                                } else {
                                                    return '';
                                                }
                                            }
                                        }, {
                                            type: 'category3d',
                                            position: 'left',
                                            fields: 'strMonth',
                                            grid: true,
                                            label: {
                                                textAlign: 'left'
                                            },
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['current', 'last'],
                                            yField: ['VCPN', 'VCPNB'],
                                            colors: ['#209938', '#1c50c9'],
                                            xField: 'strMonth',
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7
                                            },
                                            highlight: {
                                                strokeStyle: 'rgba(0, 0, 0, .2)',
                                                lineWidth: 1
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var year = '';
                                                    var month = record.get('strMonth');
                                                    if (ctx.field === 'VCPN') {
                                                        year = record.get('strYear');
                                                    } else if (ctx.field === 'VCPNB') {
                                                        year = record.get('strYearB');
                                                    }
                                                    toolTip.setHtml('Total ' + year + '-' + month + ' Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' USD' + '</b>');
                                                }
                                            }
                                        }]
                                },
                            ]
                        },
                    ]
                },
                /*************************************************************************
                 ***************PANEL DE GRILLA Y GRAFICOS - OnOff************************ 
                 *************************************************************************/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownOnOff',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillOnOff',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownOnOffBack',
                                    border: false,
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '5 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownOnOffPieBack',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 50,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleBNF',
                                                            colors: ['#EC3838', '#ffc102'],
                                                            label: {
                                                                field: 'AngleBNF',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                    return value;
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total  Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' %' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownOnOffBack',
                                                    width: 630,
                                                    height: 373, //403
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Date', dataIndex: 'strFormatDateB', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Flights', dataIndex: 'QFLIGHTB', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Stock',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Off',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNOALB', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNOALB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'On',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNONB', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNONB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNNFB', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNNFB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownOnOffNow',
                                    border: false,
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownOnOffPieNow',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 50,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleNF',
                                                            colors: ['#EC3838', '#ffc102'],
                                                            label: {
                                                                field: 'AngleNF',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                    return value;
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total  Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' %' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownOnOffNow',
                                                    width: 630,
                                                    height: 373, //403
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Date', dataIndex: 'strFormatDate', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Flights', dataIndex: 'QFLIGHT', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Stock',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Off',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNOAL', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNOAL', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'On',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNON', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNON', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNNF', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNNF', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownOnOffBared',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayFlownOnOffBared',
                                    margin: '15 0 0 10 ',
                                    flipXY: true,
                                    width: 420,
                                    height: 747,
                                    insetPadding: '20 20',
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'bottom',
                                            majorTickSteps: 5,
                                            fields: ['VCPN', 'VCPNB'],
                                            title: 'Amount',
                                            grid: {
                                                odd: {
                                                    fillStyle: 'rgba(245, 245, 245, 1.0)'
                                                },
                                                even: {
                                                    fillStyle: 'rgba(255, 255, 255, 1.0)'
                                                }
                                            },
                                            renderer: function (obj, value) {
                                                if (value > 1) {
                                                    return ' ' + Ext.util.Format.number((value / 1000000), '0,000') + 'M ';
                                                } else {
                                                    return '';
                                                }
                                            }
                                        }, {
                                            type: 'category3d',
                                            position: 'left',
                                            fields: 'strMonth',
                                            grid: true,
                                            label: {
                                                textAlign: 'left'
                                            },
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['current', 'last'],
                                            yField: ['VCPN', 'VCPNB'],
                                            colors: ['#209938', '#1c50c9'],
                                            xField: 'strMonth',
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7
                                            },
                                            highlight: {
                                                strokeStyle: 'rgba(0, 0, 0, .2)',
                                                lineWidth: 1
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var year = '';
                                                    var month = record.get('strMonth');
                                                    if (ctx.field === 'VCPN') {
                                                        year = record.get('strYear');
                                                    } else if (ctx.field === 'VCPNB') {
                                                        year = record.get('strYearB');
                                                    }
                                                    toolTip.setHtml('Total ' + year + '-' + month + ' Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' USD' + '</b>');
                                                }
                                            }
                                        }]
                                },
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 ***************PANEL DE GRILLA Y GRAFICOS - ByZone*********************** 
                 *************************************************************************/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownByZone',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillByZone',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'polar',
                                    id: prototype.id + '-displayFlownByZonePieBack',
                                    width: 430,
                                    height: 282,
                                    border: true,
                                    margin: '5 5 0 0',
                                    innerPadding: 40,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['rotate', 'itemhighlight'],
                                    series: [{
                                            type: 'pie3d',
                                            angleField: 'QCPAXB',
                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                     '#06f985', '#0aac52', '#93d250',
                                                     '#ffff00', '#ffc102', '#fe0000',
                                                     '#ff0167'],
                                                 rotation: 75,
                                            label: {
                                                field: 'QCPAXB',
                                                renderer: function (value, metaData, b, callout) {
                                                    if(value<25000){
                                                        return 'K';
                                                    }else{
                                                        value = Ext.util.Format.number(value, '0,0' + 'K');
                                                        return value;
                                                    }
                                                },
                                            },
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var zona = record.get('strDescripcion');
                                                    toolTip.setHtml('Total Pax: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' from ' + zona +  '</b>');
                                                }
                                            }
                                        }]
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData_FlownByZoneBack',
                                    width: 240,
//                                    height: 373,
                                    columnLines: true,
                                    margin: "5 5 0 0",
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Year - ',
                                                id: prototype.id + '-yearBack',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 80, dataIndex: 'QCFLOWB',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneBack').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 80, dataIndex: 'QCPAXB',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#8adb93';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneBack').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 80, dataIndex: 'AVGB',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneBack').getStore().getData().items[0].data;
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
                                    id: prototype.id + '-gridData_FlownByZones',
                                    width: 200,
//                                    height: 373,
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '.',
                                                
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Market', width: 80, dataIndex: 'ZONA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:center;';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Description', width: 120, dataIndex: 'strDescripcion',
                                                         renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        },
                                                    },
                                                    
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData_FlownByZoneNow',
                                    width: 240,
//                                    height: 373,
                                    columnLines: true,
                                    margin: "5 0 0 5",
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Year - ',
                                                id: prototype.id + '-yearNow',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 80, dataIndex: 'QCFLOW',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneNow').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 80, dataIndex: 'QCPAX',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#8abbdb';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneNow').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 80, dataIndex: 'AVG',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneNow').getStore().getData().items[0].data;
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
                                    xtype: 'polar',
                                    id: prototype.id + '-displayFlownByZonePieNow',
                                    width: 430,
                                    height: 282,
                                    border: true,
                                    margin: '5 0 0 5',
                                    innerPadding: 40,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['rotate', 'itemhighlight'],
                                    series: [{
                                            type: 'pie3d',
                                            angleField: 'QCPAX',
                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                     '#06f985', '#0aac52', '#93d250',
                                                     '#ffff00', '#ffc102', '#fe0000',
                                                     '#ff0167'],
                                                 rotation: 75,
                                            label: {
                                                field: 'QCPAX',
                                                renderer: function (value, metaData, b, callout) {
                                                    if(value<25000){
                                                        return 'K';
                                                    }else{
                                                        value = Ext.util.Format.number(value, '0,0' + 'K');
                                                        return value;
                                                    }
                                                },
                                            },
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var zona = record.get('strDescripcion');
                                                    toolTip.setHtml('Total Pax: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' from ' + zona +  '</b>');
                                                }
                                            }
                                        }]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '10 0 0 0',
                            border: false,
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'cartesian',
                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                    id: prototype.id + '-displayFlownByZoneLine',
                                    width: 1560,
                                    border: false,
                                    height: 300,
                                    title:'cuarenta y veinte',
                                    background: '#E3EAEF',
                                    interactions: ['itemhighlight'],
//                                    legend: {
//                                        docked: 'bottom',
//                                        background: '#E3EAEF'
//                                    },
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
                                            yField: 'QCPAX',
                                            title: '',
                                            grid: true,
                                            fill: true,
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function(toolTip, record, ctx) {
                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + Ext.util.Format.number(record.get('QCPAX'), '0,000.00'));
                                                }
                                            },
                                            style: {
                                                fill: "#1c50c9",
                                                stroke: "#1c50c9",
                                                fillOpacity: 0.1,
                                                miterLimit: 3,
                                                lineCap: 'miter',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                type: 'path',
                                                path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                stroke: '#1c50c9',
                                                lineWidth: 2,
                                                fill: 'white'
                                            }
                                        },
                                        {
                                            type: 'line',
                                            id: prototype.id + '-leyendLastG1',
                                            xField: 'ZONA',
                                            yField: 'QCPAXB',
                                            title: '',
                                            fill: true,
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function(toolTip, record, ctx) {
                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + Ext.util.Format.number(record.get('QCPAXB'), '0,000.00'));
                                                }
                                            },
                                            style: {
                                                smooth: true,
                                                fill: "#209938",
                                                stroke: "#209938",
                                                fillOpacity: 0.1,
                                                miterLimit: 3,
                                                lineCap: 'miter',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                type: 'circle',
                                                radius: 4,
                                                lineWidth: 1,
                                                stroke: "#209938",
                                                fill: 'white'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ]
});