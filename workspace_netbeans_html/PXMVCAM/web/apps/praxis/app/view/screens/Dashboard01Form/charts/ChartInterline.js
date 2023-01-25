Ext.define('Ext.Praxis.view.screens.Dashboard01Form.charts.ChartInterline', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-chartInterline',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.charts.ChartInterlineController'
    ],
    controller: 'ChartInterlineController',

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
                /**
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
//                                            bodyStyle: 'background-color: transparent;',
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
                                    width: 400,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    border: true,
                                    layout: 'column',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '4px 7px 4px 10px',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbChart_IA',
                                            fieldLabel: '',
                                            horizontal: true,
                                            items: [
//                                                {boxLabel: '<strong >Month</strong>', name: 'rb', inputValue: 'rbc1_IA', width: 120, checked: true},[
                                                {boxLabel: '<strong >Month</strong>', name: 'rb', inputValue: 'rbc1_IA', width: 120},
                                                {boxLabel: '<strong >Airline</strong>', name: 'rb', inputValue: 'rbc2_IA', width: 120},
                                                {boxLabel: '<strong >WorkProgress</strong>', name: 'rb', inputValue: 'rbc3_IA', width: 120}
                                            ],
                                            listeners: {
                                                change: 'onChangeRadio'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: 760,
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
                                            id: prototype.id + '-cmbDateYear_IA_Chart',
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
                                            id: prototype.id + '-cmbDateMonthFrom_IA_Chart',
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
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateMonthTo_IA_Chart',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111}
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-cmbAirline_INT2_2',
                                            html: '<b>Billing Airline:</b>',
                                            fieldStyle: 'text-align: center;'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbAirline_INT2',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: true,
                                            enableKeyEvents: true,
                                            caseSensitive: false,
                                            valueField: 'A005KEY', displayField: 'A005KEY2',
                                            width: 280,
                                            listeners: {
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    padding: '4px 7px 4px 10px',
                                    width: 80,
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearch_chartInter',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onClickSearch'
                                            }

                                        },

                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnBack_chartInter',
                                            iconCls: 'prx-icon-back',
                                            tooltip: 'Back'

                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /**
                 * PANEL DE GRILLA Y GRAFICOS - MONTH
                 * */
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxInt_Month',
                    margin: '0 0 0 0',
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // By MONTH
                        {
                            xtype: 'panel',
                            border: false,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {xtype: 'tbspacer', width: 700},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkMonth',
                                    margin: '0 5 0 5',
                                    labelStyle: 'color:#378BCC;font-weight:bold;',
                                    width: 100,
                                    boxLabel: 'Total',
                                    inputValue: '1',
                                    listeners: {
                                        change: 'onChangeCKTotal'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-byMonth_01',
                            border: false,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'vbox',
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
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_INT',
                                            width: 703,
                                            columnLines: true,
                                            margin: "5 0 0 0",
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
                                                    {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: ' Outgoing Prime ',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'QTY', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:center";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Gross', dataIndex: 'A050ACEPTA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Isc', dataIndex: 'A050COMISI', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Tax', dataIndex: 'A050TUA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Net', dataIndex: 'A050NETO', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050NETO, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'Perc1', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }

                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
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
                                                            xtype: 'radiogroup',
                                                            id: prototype.id + '-rbChart1_IA',
                                                            fieldLabel: '',
                                                            horizontal: true,
                                                            items: [
                                                                {boxLabel: '<strong >Coupons</strong>', name: 'rb2', inputValue: 'rbcC_IA', width: 100, checked: true},
                                                                {boxLabel: '<strong >Amount</strong>', name: 'rb2', inputValue: 'rbcG_IA', width: 100}
                                                            ],
                                                            listeners: {
                                                                change: 'onChangeChart_IA_01'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_01_C',
                                                    width: 780,
                                                    height: 380,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {text: 'Coupons by Month - Prime', alignTo: 'chart'}
                                                    },
                                                    animation: {duration: 200},
                                                    interactions: ['itemhighlight'],
                                                    axes: [
                                                        {
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['QTY'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            colors: ['#38A0F0', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['QTY'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {

                                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    hidden: true,
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_01_A',
                                                    width: 780,
                                                    height: 380,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {text: 'Amount by Month - Prime', alignTo: 'chart'}
                                                    },
                                                    animation: {duration: 200},
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['A050NETO'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: '',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            colors: ['#38A0F0', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['A050NETO'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {

                                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }]
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_INT2',
                                            width: 703,
                                            columnLines: true,
                                            margin: "5 0 0 0",
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
                                                    {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: ' Outgoing Reject ',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Documents', dataIndex: 'QTY2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:center";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Gross', dataIndex: 'A050ACEPTA2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Isc', dataIndex: 'A050COMISI2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Tax', dataIndex: 'A050TUA2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Net', dataIndex: 'A050NETO2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050NETO2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'Perc2', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }

                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
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
                                                            xtype: 'radiogroup',
                                                            id: prototype.id + '-rbChart2_IA',
                                                            fieldLabel: '',
                                                            horizontal: true,
                                                            items: [
                                                                {boxLabel: '<strong >Documents</strong>', name: 'rb3', inputValue: 'rbcD_IA2', width: 100, checked: true},
                                                                {boxLabel: '<strong >Amount</strong>', name: 'rb3', inputValue: 'rbcA_IA2', width: 100}
                                                            ],
                                                            listeners: {
                                                                change: 'onChangeChart_IA_02'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_02_D',
                                                    width: 800,
                                                    height: 400,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {
                                                            text: 'Documents by Month - Reject',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
//                                            legend: {
//                                                background: '#E3EAF9',
//                                                //type: 'dom',
//                                                docked: 'bottom'
//                                            },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['QTY2'],
                                                            grid: true,
                                                            title: '',

                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Amount'],
                                                            colors: ['#A3F36B', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['QTY2'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'QTY2') {
                                                                        label = 'Amount';
                                                                    }
                                                                    toolTip.setHtml(label + ' -  ' + record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_02_A',
                                                    width: 800,
                                                    height: 400,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {
                                                            text: 'Amount by Month - Reject',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
//                                            legend: {
//                                                background: '#E3EAF9',
//                                                //type: 'dom',
//                                                docked: 'bottom'
//                                            },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['A050NETO2'],
                                                            grid: true,
                                                            title: '',

                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Amount'],
                                                            colors: ['#A3F36B', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['A050NETO2'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'A050NETO2') {
                                                                        label = 'Amount';
                                                                    }
                                                                    toolTip.setHtml(label + ' -  ' + record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // By MONTH - TOTAL
                        {
                            xtype: 'panel',
                            id: prototype.id + '-byMonth_02',
                            hidden: true,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData_INT_TOT',
                                    width: 703,
                                    columnLines: true,
                                    margin: "5 0 0 0",
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
                                            {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            },
                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:center";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: ' Outgoing  ',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [

                                                    {text: 'Gross', dataIndex: 'ACEPTA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#99CCFF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGros_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Isc', dataIndex: 'COMISI', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#99CCFF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totIsc_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tax', dataIndex: 'TUA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#99CCFF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTua_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Net', dataIndex: 'NETO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNet_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'Perc3', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }

                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    padding: '5 0 0 20',
                                    width: 700,
                                    height: 400,
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-ChtSalesAnalysis_IA_03',
                                            width: 680,
                                            height: 380,
                                            background: '#E3EAF9',
                                            captions: {
                                                title: {text: 'Amount by Month - Reject', alignTo: 'chart'}
                                            },
                                            animation: {duration: 200},
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    yField: ['ACEPTA'],
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'strDescripcion',
                                                    grid: true,
//                                                    title: {
//                                                        text: 'Date',
//                                                        translationX: -30
//                                                    }                                                            
                                                    label: {
                                                        rotate: {
                                                            degrees: -45
                                                        }
                                                    }

                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: [''],
                                                    colors: ['#38A0F0', ],
                                                    xField: 'strDescripcion',
                                                    yField: ['ACEPTA'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {

                                                            toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /**
                 * PANEL DE GRILLA Y GRAFICOS - AIRLINE
                 * */
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxInt_Airline',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    scrollable: true,
                    height: 650,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            width: 80,
                            height: 50,
                            border: false,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-rbcP',
                                    fieldLabel: '',
                                    height: 50,
                                    columns: 1,
                                    vertical: true,
                                    items: [
                                        {boxLabel: '<strong >Prime</strong>', name: 'rb01', inputValue: 'Prime', width: 100, checked: true},
                                        {boxLabel: '<strong >Reject</strong>', name: 'rb01', inputValue: 'Reject', width: 100}

                                    ],
                                    listeners: {
                                        change: 'onChangeRadioAirline'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataAIR_P_INT',
                            width: 800,
                            columnLines: true,
                            scrollable: true,
                            margin: "5 0 0 0",
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
                                    {text: 'Airline', dataIndex: 'strDescripcion1', width: 300,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            value = '<b>' + value + '</b>';
                                            return value;
                                        }
                                    },
                                    {
                                        text: ' Outgoing Reject ',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:center";
                                                    return value;
                                                }
                                            },
                                            {text: 'Gross', dataIndex: 'A050ACEPTA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Isc', dataIndex: 'A050COMISI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Tax', dataIndex: 'A050TUA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Net', dataIndex: 'A050NETO', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050NETO, '0,000') + '<b>';
                                                }
                                            },
                                            {text: '%', dataIndex: 'Perc1', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>100%<b>';
                                                }

                                            }
                                        ]
                                    },
                                ]
                            }
                        },
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-ChtSalesAnalysis_IA_04',
                            margin: '0 10 0 0 ',
                            flipXY: true,
                            width: 600,
                            height: 500,
                            insetPadding: '20 10',
                            background: '#E3EAF9',
                            captions: {
                                title: {
                                    text: 'Amount by Airline',
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
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'bottom',
                                    majorTickSteps: 5,
                                    fields: ['A050ACEPTA'],
                                    title: 'Amount ',
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
                                            return ' ' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                        } else {
                                            return '';
                                        }
                                    }
                                }, {
                                    type: 'category3d',
                                    position: 'left',
                                    fields: 'strDescripcion1',
                                    grid: true,
                                    label: {
                                        textAlign: 'left'
                                    },

                                }],
                            series: [{
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Net'],
                                    yField: ['A050ACEPTA'],
                                    xField: 'strDescripcion1',
                                    //highlight: true,
                                    style: {
                                        inGroupGapWidth: -7
                                    },
                                    highlight: {
                                        strokeStyle: 'rgba(0, 0, 0, .2)',
                                        lineWidth: 1
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        //height: 28,
                                        renderer: function (toolTip, record, ctx) {
                                            //var label = record.get('strFormatDate') + ' ';
                                            var label = ' ';
//                                            if (ctx.field === 'GROSS') {
                                            label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
//                                            } else if (ctx.field === 'VALOR') {
//                                                label += ' Invoice : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
//                                            }
                                            toolTip.setHtml(label);
                                        }
                                    }
                                }]
                        },
                        {
                            xtype: 'slider',
                            fieldLabel: 'Top',
                            width: 40,
                            hideLabel: true,
                            value: 10,
                            height: 400,
                            vertical: true,
                            minValue: 5,
                            maxValue: 20,
                            tipText: function (thumb) {
                                return Ext.String.format('First {0} Airline', thumb.value);
                            },
                            listeners:{
                                change:'onChangeTopAirline'
                            }

                        },
                    ]
                },
                
                
                
                
                
                /**
                 * PANEL DE GRILLA Y GRAFICOS - WORKP
                 * */
                
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxInt_WorkProgress',
                    margin: '20 0 0 0',
                    border: true,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // Filtros
                        {
                            xtype: 'panel',
                            id: prototype.id + '-SalesAnalysis_filter_WK',
                            layout: 'hbox',
                            border: false,
                            width: 1200,
                            bodyStyle: 'background: transparent',
                            margin: '0 800 5 0',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    width: 1200,
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    items: [
                                        {xtype: 'tbspacer', width: 230},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFecha',
                                            fieldStyle: 'text-align:left;',
                                            padding: '5px 20px 5px 0px',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 100,
                                            width: 140,
//                                            listeners: {
//                                                change: 'imgSearch_clickHandler'
//                                            }
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Select By : </strong>',
                                            align: 'left',
                                            fieldStyle: 'text-align: center;',
        //                                    width: 120,
                                            padding: '8px 0px 0px 5px',
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSelectBy_WK',
                                            fieldStyle: 'text-align:left;',
                                            padding: '5px 20px 5px 0px',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 100,
                                            width: 140,
//                                            listeners: {
//                                                change: 'imgSearch_clickHandler'
//                                            }
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSelectGrafic',
                                            fieldStyle: 'text-align:left;',
                                            padding: '5px 20px 5px 0px',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 100,
                                            width: 100,
//                                            listeners: {
//                                                change: 'imgSearch_clickHandler'
//                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-SalesAnalysis_filter_WK_2',
                            width: 1200,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1200,
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    items: [
                                        {xtype: 'tbspacer', width: 230},
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Source Code ',
                                            id: prototype.id + '-cmbSourceCode',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: true,
                                            selectOnFocus: true,
                                            triggerAction: 'all',
//                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'A051KEY2',
                                            displayField: 'A051DESCR1',
//                                            emptyText: 'All',
                                            labelWidth: 100,
                                            width: 350,
                                            anchor: '100%',
                                            listeners:{
                                                change: function(field, newValue){
                                                    field.setValue(newValue.toUpperCase());
                                                 } 
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Type Doc ',
                                            id: prototype.id + '-cmbTypeDoc',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 100,
                                            width: 200,
                                            anchor: '100%'
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Billing Airline ',
                                            id: prototype.id + '-cmbAerolinea',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            selectOnFocus: true,
                                            editable: true,
                                            triggerAction: 'all',
//                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
//                                            valueField: 'A051KEY2',
//                                            displayField: 'A051DESCR1',
                                            valueField: 'A005KEY',
                                            displayField: 'A005KEY2',
//                                            emptyText: 'All',
                                            labelWidth: 130,
                                            width: 320,
                                            anchor: '100%',
                                            listeners:{
                                                change: function(field, newValue){
                                                    field.setValue(newValue.toUpperCase());
                                                 } 
                                            }
                                        },
                                        
                                    ]
                                }
                            ]
                        },
                        
                        // INFO PRINCIPAL - COUPON
                        {
                            xtype: 'panel',
                            id: prototype.id + '-byWork_WK',
                            border: false,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                // GRAFICO
                                {
                                    xtype: 'panel',
                                    margin: '5 0 5 0',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        // Grafico Lineas
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
//                                                {
//                                                    xtype: 'label',
//                                                    labelAlign: 'center',
//                                                    style: 'color:#3C3C3D;font-size:16px;font-weight:bold',
//                                                    align: 'center',
//                                                    margin: '5 0 0 450',
//                                                    text: 'Passenger by Market'
//                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-graficLine',
                                                    width: 750,
                                                    margin: '80 0 0 0',
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
                                                            grid: true,
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    if ((value / 1000).toString().length > 3) {
                                                                        return  ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                                    } else {
                                                                        return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                                    }
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'category',
                                                            position: 'bottom',
                                                            visibleRange: [0, 1]
                                                        }],
                                                        series: [
                                                            {
                                                                type: 'line',
                                                                xField: 'strDescripcion',
                                                                yField: 'totAud1',
                                                                title: 'Audited',
                                                                fill: true,
                                                                highlight: true,
                                                                tooltip: {
                                                                    trackMouse: true,
                                                                    height: 28,
                                                                    renderer: function(toolTip, record, ctx) {
                                                                        toolTip.setHtml(record.get('strDescripcion') + ' : ' + Ext.util.Format.number(record.get('totAud1'), '0,000'));
                                                                    }
                                                                },
//                                                                tooltip: {
//                                                                    trackMouse: true,
//                                                                    style: 'background: #FFF',
//                                                                    height: 20,
//                                                                    showDelay: 0,
//                                                                    dismissDelay: 0,
//                                                                    hideDelay: 0,
//                                                                    renderer: function (toolTip, record, ctx) {
//                                                                        toolTip.setHtml('Total Coupons : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
//                                                                    }
//                                                                },
                                                                style: {
                                                                    smooth: true,
                                                                    fill: '#fcfcfc',    // punto
                                                                    stroke: '#33bdda',
                                                                    
                                                                    fillOpacity: 0.1,
                                                                    miterLimit: 3,
                                                                    lineCap: 'miter',
                                                                    lineWidth: 2
                                                                },
                                                                marker: {
                                                                    type: 'circle',
                                                                    radius: 4,
                                                                    lineWidth: 2,
                                                                    stroke: "#33bdda",
                                                                    fill: 'white'
                                                                },
//                                                                label: {
//                                                                    field: 'Aud1',
//                                                                    display: 'over',
//                                                                    renderer: function (value, b, callout) {
//                                                                        callout.calloutVertical = false;
//                                                                        //return Ext.util.Format.number(value, '0')
//                                                                        return ''
//                                                                    }
//                                                                },
//                                                                markerConfig: {
//                                                                    radius: 4
//                                                                },
//                                                                highlight: {
//                                                                    fill: '#fcfcfc',
//                                                                    radius: 5,
//                                                                    'stroke-width': 2,
//                                                                    stroke: '#fff'
//                                                                },
                                                                //renderer: 'onColumnRender'
                                                            },
                                                            {
                                                                type: 'line',
//                                                                id: prototype.id + '-leyendLastG1',
                                                                xField: 'strDescripcion',
                                                                yField: 'totRej1',
                                                                title: 'Rejected',
                                                                fill: true,
                                                                highlight: true,
                                                                tooltip: {
                                                                    trackMouse: true,
                                                                    height: 28,
                                                                    renderer: function(toolTip, record, ctx) {
                                                                        toolTip.setHtml(record.get('strDescripcion') + ' : ' + Ext.util.Format.number(record.get('totRej1'), '0,000'));
                                                                    }
                                                                },
                                                                style: {
                                                                    smooth: true,
                                                                    fill: "#FAB347",
                                                                    stroke: "#FAB347",
                                                                    fillOpacity: 0.1,
                                                                    miterLimit: 3,
                                                                    lineCap: 'miter',
                                                                    lineWidth: 2
                                                                },
                                                                marker: {
                                                                    type: 'circle',
                                                                    radius: 4,
                                                                    lineWidth: 1,
                                                                    stroke: "#FAB347",
                                                                    fill: 'white'
                                                                }
                                                            }
                                                            
                                                    ]
                                                }
                                            ]
                                        },
                                        
                                        // Grafico Barras
                                        {
                                            xtype: 'panel',
//                                            hidden: true,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-byWork_WK_barras',
                                                    width: 780,
                                                    height: 380,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {text: 'Total Reject in USD', alignTo: 'chart'}
                                                    },
                                                    animation: {duration: 200},
                                                    interactions: ['itemhighlight'],
                                                    axes: [
                                                        {
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['totNETO'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            colors: ['#38A0F0', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['totNETO'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {

                                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender_WK'
                                                        }

                                                    ]
                                                },
//                                                hidden: true,
//                                                id: prototype.id + '-ChtSalesAnalysis_IA_01_A',
                                            ]
                                        }
                                    ]
                                },
                                
                                // GRID
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelData_WK',
                                    margin: '15 270 5 0',
                                    width: 1343,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_WK',
                                            width: 1343,
                                            columnLines: true,
                                            margin: "5 0 0 0",
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
                                                        text: ' Total Audited Coupons by Billing Month vs. Rejected Month ( FC ) ',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titHorzFecha1',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: '', dataIndex: 'FINVOICE', width: 110, id: prototype.id + '-titVertFecha1',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha1',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Audit', dataIndex: 'Aud1', width: 70, id: prototype.id + '-totAud1',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud1, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rej', dataIndex: 'Rej1', width: 70, id: prototype.id + '-totRej1',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totRej1, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha2',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Audit', dataIndex: 'Aud2', width: 70, id: prototype.id + '-totAud2',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud2, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rej', dataIndex: 'Rej2', width: 70, id: prototype.id + '-totRej2',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totRej2, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha3',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Audit', dataIndex: 'Aud3', width: 70, id: prototype.id + '-totAud3',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud3, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rej', dataIndex: 'Rej3', width: 70, id: prototype.id + '-totRej3',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totRej3, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha4',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Audit', dataIndex: 'Aud4', width: 70, id: prototype.id + '-totAud4',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud4, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rej', dataIndex: 'Rej4', width: 70, id: prototype.id + '-totRej4',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totRej4, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha5',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Audit', dataIndex: 'Aud5', width: 70, id: prototype.id + '-totAud5',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud5, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rej', dataIndex: 'Rej5', width: 70, id: prototype.id + '-totRej5',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totRej5, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha6',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Audit', dataIndex: 'Aud6', width: 70, id: prototype.id + '-totAud6',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud6, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rej', dataIndex: 'Rej6', width: 70, id: prototype.id + '-totRej6',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totRej6, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Total Documents', dataIndex: 'QCUPON', width: 110,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQCUPON, '0,000');
                                                                }
                                                            },
                                                            {text: 'Total Audited <br> Documents', dataIndex: 'QAUDI', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQAUDI, '0,000');
                                                                }
                                                            },
                                                            {text: '% Reviewed', dataIndex: 'Porc', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000') + '%';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totPorc, '0,000') + '%';;
                                                                }
                                                            },
                                                            {text: 'Total Rejected <br> Coupons', dataIndex: 'QRM', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQRM, '0,000');
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
                        
                        
                        
                        // INFO PRINCIPAL - AMOUNT
                        {
                            xtype: 'panel',
                            id: prototype.id + '-byWork_WK_AMT',
                            border: false,
                            hidden: true,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                // GRAFICOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                                {
                                    xtype: 'panel',
                                    margin: '5 0 5 0',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        
                                        // Grafico Barras
                                        {
                                            xtype: 'panel',
//                                            hidden: true,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-byWork_WK_barras_ATM',
                                                    width: 780,
                                                    height: 380,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {text: '', alignTo: 'chart'}
                                                    },
                                                    animation: {duration: 200},
                                                    interactions: ['itemhighlight'],
                                                    axes: [
                                                        {
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['totNETO'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            colors: ['#38A0F0', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['totNETO'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {

                                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender_WK'
                                                        }

                                                    ]
                                                },
//                                                hidden: true,
//                                                id: prototype.id + '-ChtSalesAnalysis_IA_01_A',
                                            ]
                                        },
                                        
                                        // Grafico Lineas
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
//                                            margin: '100 0 0 0',
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-graficLine_ATM',
                                                    width: 750,
                                                    margin: '80 0 0 0',
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
                                                            grid: true,
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  ' ' + Ext.util.Format.number((value), '0.') + '%';
                                                                }else 
//                                                                    if (value < 1) {
                                                                    return  ' ' + Ext.util.Format.number((value), '0.00') + '%';
//                                                                }else {
//                                                                    return ' 0%';
//                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'category',
                                                            position: 'bottom',
                                                            visibleRange: [0, 1]
                                                        }],
                                                        series: [
                                                            {
                                                                type: 'line',
                                                                xField: 'strDescripcion',
                                                                yField: 'totAud1',
                                                                title: 'Recovered',
                                                                fill: true,
                                                                highlight: true,
                                                                tooltip: {
                                                                    trackMouse: true,
                                                                    height: 28,
                                                                    renderer: function(toolTip, record, ctx) {
                                                                        toolTip.setHtml(record.get('strDescripcion') + ' : ' + Ext.util.Format.number(record.get('totAud1'), '0,000.00') + '%');
                                                                    }
                                                                },
                                                                style: {
                                                                    smooth: true,
                                                                    fill: '#fcfcfc',    // punto
                                                                    stroke: '#33bdda',
                                                                    
                                                                    fillOpacity: 0.1,
                                                                    miterLimit: 3,
                                                                    lineCap: 'miter',
                                                                    lineWidth: 2
                                                                },
                                                                marker: {
                                                                    type: 'circle',
                                                                    radius: 4,
                                                                    lineWidth: 2,
                                                                    stroke: "#33bdda",
                                                                    fill: 'white'
                                                                }
                                                            }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                
                                // GRID
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelData_WK_AMT',
                                    margin: '15 270 5 0',
                                    width: 1323,
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_WK_AMT',
                                            width: 1103,
                                            columnLines: true,
                                            margin: "5 0 0 0",
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
                                                        text: ' Total Audited Coupons by Billing Month vs. Rejected Month ( FC ) ',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titHorzFecha2',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: '', dataIndex: 'FINVOICE', width: 110, id: prototype.id + '-titVertFecha2',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha1_AMT',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud1', width: 100, id: prototype.id + '-totAud1_AMT',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud1, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha2_AMT',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud2', width: 100, id: prototype.id + '-totAud2_AMT',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud2, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha3_AMT',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud3', width: 100, id: prototype.id + '-totAud3_AMT',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud3, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha4_AMT',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud4', width: 100, id: prototype.id + '-totAud4_AMT',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud4, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha5_AMT',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud5', width: 100, id: prototype.id + '-totAud5_AMT',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud5, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '',
                                                                id: prototype.id + '-titFecha6_AMT',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud6', width: 100, id: prototype.id + '-totAud6_AMT',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAud6, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Invoice Amount', dataIndex: 'QAUDI', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQAUDI, '0,000');
                                                                }
                                                            },
                                                            {text: 'Audit Amount', dataIndex: 'QRM', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQRM, '0,000');
                                                                }
                                                            },
                                                            {text: 'Reject Amount', dataIndex: 'QCUPON', width: 110,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQCUPON, '0,000');
                                                                }
                                                            },
                                                            {text: '% Rec', dataIndex: 'Porc', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#EDF3F3;";
                                                                    return Ext.util.Format.number(value, '0,000.00') + '%';;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_WK').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totPorc, '0,000') + '%';;
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
                        
                    ]
                }
                
                
                
            ]
        },
    ]
});