Ext.define('Ext.Praxis.view.screens.Dashboard01Form.charts.ChartSales', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-chartSales',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.charts.ChartSalesController'
    ],
    controller: 'ChartSalesController',
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
                                    width: 1060,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
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
                                            id: prototype.id + '-Box_Chart_Sales',
                                            fieldLabel: '',
                                            horizontal: true,
                                            items: [
//                                                {boxLabel: '<strong style="color:#3399FF" >Total</strong>', name: 'rb', inputValue: 'rbc6', width: 120, checked: true},
                                                {boxLabel: '<strong style="color:#3399FF" >Total</strong>', name: 'rb', inputValue: 'rbc6', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >Channels</strong>', name: 'rb', inputValue: 'rbc2', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >On/Off</b>', name: 'rb', inputValue: 'rbc1', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >Countries</b>', name: 'rb', inputValue: 'rbc3', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >Cabin</b>', name: 'rb', inputValue: 'rbc4', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >Agent</b>', name: 'rb', inputValue: 'rbc5', width: 120},
                                                {xtype: 'tbspacer', width: 110},
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-chkUso',
                                                    //                            margin: '0 20 0 30',
                                                    width: 100,
                                                    boxLabel: '<b>Sales vs Used</b>',
                                                    inputValue: '1',
                                                    listeners: {
                                                        change: 'chooseUSO_clickHandler'
                                                    }
                                                }

                                            ],
                                            listeners: {
                                                change: 'chooseChart_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: 350,
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
//                                            id: prototype.id + '-cmbDateYear_IA_Chart',
                                            id: prototype.id + '-cmbDateYear_Chart',
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
//                                            id: prototype.id + '-cmbDateMonthFrom_IA_Chart',
                                            id: prototype.id + '-cmbDateMonthFrom_Chart',
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
//                                            id: prototype.id + '-cmbDateMonthTo_IA_Chart',
                                            id: prototype.id + '-cmbDateMonthTo_Chart',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111}
                                        },
                                        {xtype: 'tbspacer', width: 4}
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    padding: '4px 7px 4px 20px',
                                    width: 80,
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearch_chartSales',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onClickSearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnBack_chartSales',
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
                 * PANEL DE GRILLA Y GRAFICOS - TOTAL 
                 */
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Total',
                    margin: '0 0 0 0',
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // By TOTAL
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
//                                    id: prototype.id + '-chkMonth',
                                    margin: '0 5 0 5',
                                    labelStyle: 'color:#378BCC;font-weight:bold;',
                                    width: 100,
                                    boxLabel: 'Total',
                                    inputValue: '1',
//                                    checked   : true,
                                    listeners: {
//                                        change: 'onChangeCKTotal'
                                        change: 'changeArray_clickHandler'
                                    }
                                }
                            ]
                        },
                        // Grilla boxChart6 %% 2 Grafic Vert
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxChart6',
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
                                            id: prototype.id + '-gridData_boxChart6',
                                            width: 672,
                                            height: 403,
                                            columnLines: true,
                                            margin: "5 0 0 0",
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Transaction', dataIndex: 'TYPE', width: 80,
                                                        listeners: {
                                                            click: 'gridDataByTransactionChart'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Tickets', dataIndex: 'CUPONS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount <br> USD', dataIndex: 'AMOUNT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'Perc1', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:center";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Commission', dataIndex: 'COMISION', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totCOMISION, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Tax', dataIndex: 'TAX', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAX, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'YQ + YR', dataIndex: 'AYQ', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAYQ, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_boxChart6_Tot',
                                            hidden: true,
                                            width: 672,
                                            height: 403,
                                            columnLines: true,
                                            margin: "5 0 0 0",
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Transaction', dataIndex: 'TYPE', width: 80,
                                                        listeners: {
                                                            click: 'gridDataByTransactionChart'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Tickets', dataIndex: 'CUPONS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount <br> USD', dataIndex: 'AMOUNT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'Perc1', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:center";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Commission', dataIndex: 'COMISION', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totCOMISION, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Tax', dataIndex: 'TAX', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAX, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'YQ + YR', dataIndex: 'AYQ', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart6').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAYQ, '0,000') + '<b>';
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
                                            width: 420,
//                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                                    id: prototype.id + '-displaySAChart33',
                                                    width: 400,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 80,
                                                    height: 403,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Total Documents',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#E3EAEF',
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            colors: ['#339933', '#EC3838', '#ff9900', '#0066ff', '#ffff99'],
//                                                            colors: ['#339933', '#EC3838'],
                                                            stacked: false,
                                                            title: ['ARC', 'ASR', 'BSP(Mexico)', 'BSP(Others)' , 'WA'],
                                                            label: {
                                                                field: 'VENDOR',
                                                                calloutLine: false,
//                                                                display: 'inside',
//                                                                display: 'rotate',
//                                                                ontrast: true,
//                                                                font: '12px Arial'
//                                                                calloutLine: {
//                                                                    length: 30,
//                                                                    width: 5,
                //                                                                color: '#FFFFFF',
//                                                                },
//                                                                rotate: {
//                                                                    degrees: 45
//                                                                },
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value.substring(value.indexOf(',') + 1);
                                                                }
                                                            },
//                                                            style: {
//                                                                miterLimit: 5,
//                                                                lineCap: 'miter',
//                                                                lineWidth: 1
//                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
//                                                                    if (ctx.field === 'QMATCH') {
//                                                                        label = 'Match';
//                                                                    } else if (ctx.field === 'QLIQUI') {
//                                                                        label = 'Settlement';
//                                                                    } else if (ctx.field === 'QBANK') {
//                                                                        label = 'Bank';
//                                                                    } else if (ctx.field === 'QDIFF') {
//                                                                        label = 'Diff';
//                                                                    }
//                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    label = record.get('TYPE');
                                                                    if (label === 'SALE'){
                                                                        label = 'SALES';
                                                                    }
                                                                    toolTip.setHtml(label + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
//                                            id: prototype.id + '-panelDisplaySAChart40',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 0 0 5',
                                            border: true,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-displaySAChart40',
                                                    width: 400,
                                                    border: false,
                                                    height: 400,
                                                    background: '#E0F8F7',
//                                                    captions: {
//                                                        title: {
//                                                            text: 'Bank Date',
//                                                            alignTo: 'chart'
//                                                        }
//                                                    },
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
                                                            fields: ['QMATCH', 'tot_Perc4', 'tot_Perc5', 'tot_Perc6'],
                                                            grid: true,
                                                            title: '',
//                                                            minimum: 30,
//                                                            maximum: 110,
                                                            //title: 'Millions of USD',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  ' ' + Ext.util.Format.number(value);
                                                                } else {
                                                                    return '0';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                            grid: true,
                                                            title: {
                                                                text: 'Variation',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Amount', 'Commision', 'Tax', 'YQ + YR'],
                                                            xField: 'strFormatDate',
                                                            yField: ['totQKMS', 'tot_Perc4', 'tot_Perc5', 'tot_Perc6'],
                                                            colors: ['#ffff99', '#339933', '#CC0000', '#ff9900'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 1200
                                                            },
                                                            label: {
                                                                field: ['totQKMS', 'tot_Perc4', 'tot_Perc5', 'tot_Perc6'],
//                                                            display: 'insideEnd',
                                                                display: 'outside',
                                                                calloutLine: {
                                                                    length: 10,
                                                                    width: 0,
//                                                                color: '#FFFFFF',
                                                                },
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutVertical = false;
                                                                    if (value === 100) {
                                                                        return Ext.util.Format.number(value, '0,000');
                                                                    } else {
                                                                        return Ext.util.Format.number(value, '0,000.00');
                                                                    }
                                                                }
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'totQKMS') {
                                                                        label = 'Amount';
                                                                    } else if (ctx.field === 'tot_Perc4') {
                                                                        label = 'Commision';
                                                                    } else if (ctx.field === 'tot_Perc5') {
                                                                        label = 'Tax';
                                                                    } else if (ctx.field === 'tot_Perc6') {
                                                                        label = 'YQ + YR';
                                                                    }
                                                                    toolTip.setHtml(label + ' :  ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // Grafic - Hori
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-byMonth_02',
                            hidden: false,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
//                                    id: prototype.id + '-panelGraficos',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 5',
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-displaySAChart32',
                                            width: 1500,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Total Documents',
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
                                                    fields: ['ACMS', 'ADMS', 'EXCH', 'RFND', 'SALE'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
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
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Tickets',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['ACMS', 'ADMS', 'EXCH', 'RFND', 'SALES'],
                                                    xField: 'mes',
                                                    yField: ['ACMS', 'ADMS', 'EXCH', 'RFND', 'SALE'],
                                                    colors: ['#ff9900', '#0066ff', '#CC0000', '#ffff99', '#339933'],
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
                                                            if (ctx.field === 'ACMS') {
                                                                label = 'ACMS';
                                                            } else if (ctx.field === 'ADMS') {
                                                                label = 'ADMS';
                                                            } else if (ctx.field === 'EXCH') {
                                                                label = 'EXCH';
                                                            } else if (ctx.field === 'RFND') {
                                                                label = 'RFND';
                                                            } else if (ctx.field === 'SALE') {
                                                                label = 'SALES';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 * PANEL DE GRILLA Y GRAFICOS - CHANNELS_1
                 **/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Channels_1',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // Grilla boxChart2 %% 2 Grafic Vert
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxChart2',
                            border: false,
                            margin: '5 0 5 20',
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
                                            id: prototype.id + '-gridData_boxChart2',
                                            width: 402,
                                            height: 203,
                                            columnLines: true,
                                            margin: "5 0 0 0",
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Channel', dataIndex: 'strDescription', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                            return '';
                                                        }
                                                    },
                                                    {text: 'Coupons', dataIndex: 'CUPONS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'CUPONS_PERCENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                            return '<b>' + '100%' + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'AMOUNT_PERCENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                            return '<b>' + '100%' + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 10',
                                            width: 541,
//                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                                    id: prototype.id + '-displaySAChart15',
                                                    width: 541,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 60,
                                                    height: 410,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales per Channels - Coupons',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#E3EAEF'
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'CUPONS_PERCENT',
                                                            colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                            label: {
//                                                            field: 'strDescription'
                                                                field: 'LABEL',
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value.substring(value.indexOf(',') + 1);
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
//                                                                    if (ctx.field === 'QMATCH') {
//                                                                        label = 'Match';
//                                                                    } else if (ctx.field === 'QLIQUI') {
//                                                                        label = 'Settlement';
//                                                                    } else if (ctx.field === 'QBANK') {
//                                                                        label = 'Bank';
//                                                                    } else if (ctx.field === 'QDIFF') {
//                                                                        label = 'Diff';
//                                                                    }
//                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 5',
                                            width: 541,
//                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                                    id: prototype.id + '-displaySAChart16',
                                                    width: 541,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 48,
                                                    height: 410,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales per Channels - Amount \n\ USD',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#E3EAEF'
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AMOUNT_PERCENT',
                                                            colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                            label: {
//                                                            field: 'strDescription'
                                                                field: 'LABEL2',
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value.substring(value.indexOf(',') + 1);
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
//                                                                    if (ctx.field === 'QMATCH') {
//                                                                        label = 'Match';
//                                                                    } else if (ctx.field === 'QLIQUI') {
//                                                                        label = 'Settlement';
//                                                                    } else if (ctx.field === 'QBANK') {
//                                                                        label = 'Bank';
//                                                                    } else if (ctx.field === 'QDIFF') {
//                                                                        label = 'Diff';
//                                                                    }
//                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // Grafic Horiz
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-byMonth_02',
                            hidden: false,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
//                                    id: prototype.id + '-panelGraficos',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 5',
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-displaySAChart20',
                                            width: 1500,
                                            border: false,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Sales per Channels - Coupons',
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
                                                    fields: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
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
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Channels',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['ARC', 'ASR', 'BSP(Mexico)', 'BSP(Others)'],
                                                    xField: 'strFormatDate',
                                                    yField: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    colors: ['#CC0000', '#FFBF00', '#A5DF00', '#F6D8CE'],
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
                                                            if (ctx.field === 'CUPONS_ARC') {
                                                                label = 'ARC';
                                                            } else if (ctx.field === 'CUPONS_ASR') {
                                                                label = 'ASR';
                                                            } else if (ctx.field === 'CUPONS_MEX') {
                                                                label = 'BSP(Mexico)';
                                                            } else if (ctx.field === 'CUPONS_OTHER') {
                                                                label = 'BSP(Others)';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                //********* /** PANEL DE GRILLA Y GRAFICOS - CHANNELS_2
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Channels_2',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // Grilla boxChart2 %% 2 Grafic Vert
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxChart2_2',
                            border: false,
                            margin: '5 0 5 20',
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
                                            id: prototype.id + '-gridData_boxChart2_2',
                                            width: 772,
                                            height: 203,
                                            columnLines: true,
                                            margin: "5 0 0 350",
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Channel', dataIndex: 'strDescription', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                            return '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'CUPONS_PERCENT', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + '100%' + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'AMOUNT_PERCENT', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + '100%' + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Flown',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'QCPNSF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + Ext.util.Format.number(data.TOT_QCPNSF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'CUPONS_PERCENTF', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + '100%' + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNTF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + Ext.util.Format.number(data.TOT_AMOUNTF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'AMOUNT_PERCENTF', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                                    return '<b>' + '100%' + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: '% Used', dataIndex: 'CUPONS_OFF_PERCENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:#DBDBFF";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_PERCENTF, '0,000.00') + '%' + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        // Grafic Horiz
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-byMonth_02',
                            hidden: false,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
//                                    id: prototype.id + '-panelGraficos',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 5',
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-displaySAChart20_2',
                                            width: 1500,
                                            border: false,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Sales per Channels - Coupons',
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
                                                    fields: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
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
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Channels',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['ARC', 'ASR', 'BSP(Mexico)', 'BSP(Others)'],
                                                    xField: 'strFormatDate',
                                                    yField: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    colors: ['#CC0000', '#FFCC66', '#70DB70', '#FF9966'],
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
                                                            if (ctx.field === 'CUPONS_ARC') {
                                                                label = 'ARC';
                                                            } else if (ctx.field === 'CUPONS_ASR') {
                                                                label = 'ASR';
                                                            } else if (ctx.field === 'CUPONS_MEX') {
                                                                label = 'BSP(Mexico)';
                                                            } else if (ctx.field === 'CUPONS_OTHER') {
                                                                label = 'BSP(Others)';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 PANEL DE GRILLA Y GRAFICOS - On/Off - 111
                 **/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_OnOff',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // Grilla boxChart1 %% 2 Grafic Vert
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-boxChart1',
                            border: false,
                            margin: '5 0 5 20',
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
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 10 0 0',
                                            width: 531,
//                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                                    id: prototype.id + '-displaySAChart11',
                                                    width: 531,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 65,
                                                    height: 340,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales On/Off - Coupons',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
//                                                    legend: {
//                                                        docked: 'bottom',
//                                                        background: '#E3EAEF'
//                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'CUPONS_ON_PERCENT',
                                                            colors: ['#009933', '#FFCC00'],
                                                            label: {
                                                                field: 'LABEL',
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value;
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'CUPONS_ON_PERCENT') {
                                                                        label = 'Total On';
                                                                    } else {
                                                                        label = 'Total Off';
                                                                    }
//                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(label + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_boxChart1',
                                            width: 360,
                                            height: 345,
                                            columnLines: true,
                                            border: false,
                                            margin: "5 0 0 0",
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Sales <br> Date', dataIndex: 'strFormatDate', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Qty Cpn', dataIndex: 'CUPONS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'On', dataIndex: 'CUPONS_ON', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_ON, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'Off', dataIndex: 'CUPONS_OFF', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_OFF, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            }
                                        },
//                                        {
//                                            xtype: 'panel',
//                                            id: prototype.id + '-summaryBoxChart1',
//                                            width: 360,
//                                            align: 'left',
//                                            margin: '0 0 0 0 ',
//                                            layout: {
//                                                type: 'hbox',
//                                                align: 'center'
//                                            },
//                                            defaults: {
//                                                xtype: 'label',
//                                                align: 'center',
//                                                html: '' + '&nbsp',
//                                                height: 25,
//                                                padding: '5 5 5 0',
//                                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                            },
//                                            items: [
//                                                {width: 90},
//                                                {width: 90, id: prototype.id + '-totQTY'},
//                                                {width: 90, id: prototype.id + '-totQTY_ON'},
//                                                {width: 90, id: prototype.id + '-totQTY_OFF'}
//                                            ]
//                                        },          
                                        {
                                            xtype: 'panel',
//                                            id: prototype.id + '-panelGraficos',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 0 0 10',
                                            border: true,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-displaySAChart01',
                                                    width: 541,
                                                    border: false,
                                                    height: 340,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales by Month - Coupons',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
//                                                    legend: {
//                                                        docked: 'bottom',
//                                                        background: '#E3EAEF'
//                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['CUPONS'],
                                                            grid: true,
                                                            title: '',
                                                            //title: 'Millions of USD',
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
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            //                                                            fields: 'strFormatDate',
                                                            grid: true,
                                                            title: {
//                                                                text: 'Channels',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
//                                                        title: ['ARC', 'ASR', 'BSP(Mexico)', 'BSP(Others)'],
                                                            xField: 'DESstrFormatDate',
                                                            yField: ['CUPONS'],
                                                            colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
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
//                                                                var label = '';
//                                                                if (ctx.field === 'CUPONS_ARC') {
//                                                                    label = 'ARC';
//                                                                } else if (ctx.field === 'CUPONS_ASR') {
//                                                                    label = 'ASR';
//                                                                } else if (ctx.field === 'CUPONS_MEX') {
//                                                                    label = 'BSP(Mexico)';
//                                                                } else if (ctx.field === 'CUPONS_OTHER') {
//                                                                    label = 'BSP(Others)';
//                                                                }
                                                                    toolTip.setHtml(record.get('strFormatDate') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
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
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-boxChart1_2',
                            border: false,
                            margin: '5 0 5 20',
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
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 10 0 0',
                                            width: 531,
//                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                                    id: prototype.id + '-displaySAChart13',
                                                    width: 531,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 50,
                                                    height: 340,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales On/Off - Amount \n\ USD',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
//                                                    legend: {
//                                                        docked: 'bottom',
//                                                        background: '#E3EAEF'
//                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AMOUNT_ON_PERCENT',
                                                            colors: ['#009933', '#FFCC00'],
                                                            label: {
                                                                field: 'LABEL_AMOUNT',
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value;
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'AMOUNT_ON_PERCENT') {
                                                                        label = 'Total On';
                                                                    } else {
                                                                        label = 'Total Off';
                                                                    }
//                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(label + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_boxChart1_2',
                                            width: 360,
                                            height: 345,
                                            columnLines: true,
                                            border: false,
                                            margin: "5 0 0 0",
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Sales <br> Date', dataIndex: 'strFormatDate', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart1_2').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'On', dataIndex: 'AMOUNT_ON', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart1_2').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_ON, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'Off', dataIndex: 'AMOUNT_OFF', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart1_2').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_OFF, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
//                                            id: prototype.id + '-panelGraficos',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 0 0 10',
                                            border: true,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-displaySAChart14',
                                                    width: 541,
                                                    border: false,
                                                    height: 340,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales by Month - Amount\n\ USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
//                                                    legend: {
//                                                        docked: 'bottom',
//                                                        background: '#E3EAEF'
//                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['AMOUNT'],
                                                            grid: true,
                                                            title: '',
                                                            //title: 'Millions of USD',
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
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            //                                                            fields: 'strFormatDate',
                                                            grid: true,
                                                            title: {
//                                                                text: 'Channels',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
//                                                        title: ['ARC', 'ASR', 'BSP(Mexico)', 'BSP(Others)'],
                                                            xField: 'DESstrFormatDate',
                                                            yField: ['AMOUNT'],
                                                            colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
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
//                                                                var label = '';
//                                                                if (ctx.field === 'CUPONS_ARC') {
//                                                                    label = 'ARC';
//                                                                } else if (ctx.field === 'CUPONS_ASR') {
//                                                                    label = 'ASR';
//                                                                } else if (ctx.field === 'CUPONS_MEX') {
//                                                                    label = 'BSP(Mexico)';
//                                                                } else if (ctx.field === 'CUPONS_OTHER') {
//                                                                    label = 'BSP(Others)';
//                                                                }
                                                                    toolTip.setHtml(record.get('strFormatDate') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
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
                        }
                    ]
                },
                /*************************************************************************
                 PANEL DE GRILLA Y GRAFICOS - On/Off - 2222
                 **/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_OnOff_2',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // Grilla boxChart2_S %% 2 Grafic Vert
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxChart2_S',
                            border: false,
                            margin: '5 0 5 20',
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
                                            id: prototype.id + '-gridData_boxChart2_S',
                                            width: 562,
                                            height: 403,
                                            columnLines: true,
                                            margin: "5 0 0 0",
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Sales <br> Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:right; margin-right:3px;';
                                                            return '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Qty Cpn', dataIndex: 'CUPONS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#ADFFAD';
                                                                    return '<b>' + Ext.util.Format.number(data.TOT_QCPNSF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#ADFFAD';
                                                                    return '<b>' + Ext.util.Format.number(data.TOT_AMOUNTF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Flown',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'QCPNSF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#85C2FF';
                                                                    return '<b>' + Ext.util.Format.number(data.TOT_QCPNSF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNTF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right";
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px;background:#85C2FF';
                                                                    return '<b>' + Ext.util.Format.number(data.TOT_AMOUNTF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: '% Used', dataIndex: 'CUPONS_PERCENTF', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_boxChart2_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#DBDBFF';
                                                            return '<b>' + '100%' + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        },
//                                        {
//                                            xtype: 'panel',
//                                            bodyStyle: 'background-color: #E3EAF9;',
//                                            padding: '5 0 0 10',
//                                            width: 541,
////                                            height: 400,
//                                            border: false,
//                                            layout: {
//                                                type: 'vbox'
//                                            },
//                                            items: [
//                                                {
//                                                    xtype: 'polar',
////                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
//                                                    id: prototype.id + '-displaySAChart15',
//                                                    width: 541,
//                                                    border: true,
//                                                    margin: '0 0 0 5',
//                                                    innerPadding: 60,
//                                                    height: 340,
//                                                    background: '#E0F8F7',
//                                                    captions: {
//                                                        title: {
//                                                            text: 'Sales per Channels - Coupons',
////                                                            fieldStyle: 'font-size:5px',
//                                                            alignTo: 'chart'
//                                                        }
//                                                    },
//                                                    animation: {
//                                                        duration: 200
//                                                    },
//                                                    interactions: ['rotate', 'itemhighlight'],
////                                                    legend: {
////                                                        docked: 'bottom',
////                                                        background: '#E3EAEF'
////                                                    },
//                                                    series: [{
//                                                        type: 'pie3d',
//                                                        angleField: 'CUPONS_PERCENT',
//                                                        colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
//                                                        label: {
////                                                            field: 'strDescription'
//                                                            field: 'LABEL'
//                                                        },
//                                                        highlight: true,
//                                                        tooltip: {
//                                                            trackMouse: true,
//                                                            height: 28,
//                                                            renderer: function(toolTip, record, ctx) {
//                                                                var label = '';
////                                                                    if (ctx.field === 'QMATCH') {
////                                                                        label = 'Match';
////                                                                    } else if (ctx.field === 'QLIQUI') {
////                                                                        label = 'Settlement';
////                                                                    } else if (ctx.field === 'QBANK') {
////                                                                        label = 'Bank';
////                                                                    } else if (ctx.field === 'QDIFF') {
////                                                                        label = 'Diff';
////                                                                    }
////                                                                    toolTip.setHtml(record.get('TOOLTIP'));
//                                                                toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
//                                                            }
//                                                        }
//                                                    }]
//                                                }
//                                            ]
//                                        }, 
                                    ]
                                }
                            ]
                        },
                        // Grafic Horiz
                        {
                            xtype: 'panel',
                            hidden: false,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 5',
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-displaySAChart25',
                                            width: 1500,
                                            border: false,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Sales per Channels - Coupons',
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
                                                    fields: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
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
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Channels',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['ARC', 'ASR', 'BSP(Mexico)', 'BSP(Others)'],
                                                    xField: 'strFormatDate',
                                                    yField: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    colors: ['#CC0000', '#FFBF00', '#A5DF00', '#F6D8CE'],
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
                                                            if (ctx.field === 'CUPONS_ARC') {
                                                                label = 'ARC';
                                                            } else if (ctx.field === 'CUPONS_ASR') {
                                                                label = 'ASR';
                                                            } else if (ctx.field === 'CUPONS_MEX') {
                                                                label = 'BSP(Mexico)';
                                                            } else if (ctx.field === 'CUPONS_OTHER') {
                                                                label = 'BSP(Others)';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 PANEL DE GRILLA Y GRAFICOS - Cabin - 111
                 **/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Cabin_1',
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
                            border: false,
                            margin: '5 0 5 20',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCabin_boxChart1',
                                    width: 450,
                                    height: 355,
                                    columnLines: true,
                                    border: false,
                                    margin: "5 0 0 0",
                                    bodyStyle: 'background-color: #E3EAEF;',
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Coupons',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total', dataIndex: 'CUPONS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#66A3FF;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Offline', dataIndex: 'CUPON_F', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTCUPON_F, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'C(Business)', dataIndex: 'CUPON_J', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTCUPON_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Y(Economy)', dataIndex: 'CUPON_Y', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTCUPON_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'polar',
                                    //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                    id: prototype.id + '-ChartCabin1',
                                    width: 450,
                                    height: 345,
                                    border: false,
                                    hidden: false,
//                                                margin: '0 0 0 5',
                                    innerPadding: 30,
                                    background: '#99CCFF',
                                    captions: {
                                        title: {
                                            text: 'Total Sales by Cabin - Coupon',
                                            //                                                            fieldStyle: 'font-size:5px',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['rotate', 'itemhighlight'],
                                    /*legend: {
                                     docked: 'bottom',
                                     background: '#E3EAEF'
                                     },*/
                                    series: [{
                                            type: 'pie3d',
                                            angleField: 'CUPON',
                                            colors: ['#EC3838', '#FFBF00', '#52df00'],
                                            label: {
                                                field: 'LABEL_C_PER',
                                                renderer: function (value, b, callout) {
                                                    callout.calloutWidth = 1;
                                                    return value;
                                                }
                                            },
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    //                                                                    if (ctx.field === 'QMATCH') {
                                                    //                                                                        label = 'Match';
                                                    toolTip.setHtml(record.get('LABEL') + ' , ' + '<b>' + Ext.util.Format.number(record.get('CUPON'), '0,000') + '' + '</b>');
                                                }
                                            }
                                        }]

                                },
                                {
                                    xtype: 'polar',
                                    //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                    id: prototype.id + '-ChartCabin1_amount',
                                    width: 450,
                                    hidden:true,
                                    height: 345,
                                    border: false,
                                    innerPadding: 30,
                                    background: '#99CCFF',
                                    captions: {
                                        title: {
                                            text: 'Total Sales by Cabin - Amount',
                                            //                                                            fieldStyle: 'font-size:5px',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['rotate', 'itemhighlight'],
                                    /*legend: {
                                     docked: 'bottom',
                                     background: '#E3EAEF'
                                     },*/
                                    series: [{
                                            type: 'pie3d',
                                            angleField: 'AMOUNT',
                                            colors: ['#EC3838', '#FFBF00', '#52df00'],
                                            label: {
                                                field: 'LABEL_A_PER',
                                                renderer: function (value, b, callout) {
                                                    callout.calloutWidth = 1;
                                                    return value;
                                                }
                                            },
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    //                                                                    if (ctx.field === 'QMATCH') {
                                                    //                                                                        label = 'Match';
                                                    toolTip.setHtml(record.get('LABEL') + ' , ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT'), '0,000') + '' + '</b>');
                                                }
                                            }
                                        }]

                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCabin_boxChart2',
                                    width: 450,
                                    height: 355,
                                    columnLines: true,
                                    border: false,
                                    margin: "5 0 0 0",
                                    bodyStyle: 'background-color: #E3EAEF;',
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total', dataIndex: 'AMOUNT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#66A3FF;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Offline', dataIndex: 'AMOUNT_F', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_F, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'C(Business)', dataIndex: 'AMOUNT_J', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Y(Economy)', dataIndex: 'AMOUNT_Y', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-boxChart1_2',
                            border: false,
                            margin: '5 0 5 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_tc',
                                    width: 180,                                   
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">Coupons</b>', inputValue: 'C', name: 'rbgType_tc', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">Amount</b>', inputValue: 'A', name: 'rbgType_tc'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_tc'
                                    }
                                },
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displaySaleCabinChart01',
                                    border: false,
                                    width: 1400,
                                    height: 350,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Sales per Cabin - Coupon',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    /*legend: {
                                     docked: 'bottom',
                                     background: '#E3EAEF'
                                     },*/
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['CUPON_F', 'CUPON_J', 'CUPON_Y'],
                                            minimum: 0,
                                            grid: true,
                                            title: '',
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
                                            type: 'numeric3d',
                                            position: 'right',
                                            fields: 'CUPONS',
                                            minimum: 0,
                                            grid: true,
                                            title: '',
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
                                        , {
                                            type: 'category3d',
                                            position: 'bottom',
                                            grid: true,
                                            title: {
                                                translationX: -30
                                            }
                                        },
                                    ],
                                    series: [
                                        {
                                            type: 'bar3d',
                                            stacked: false,
                                            xField: 'strFormatDate',
                                            yField: ['CUPON_F', 'CUPON_J', 'CUPON_Y'],
                                            title: ['Offline', 'Business', 'Economy'],
                                            colors: ['#CC0000', '#FFBF00', '#A5DF00'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            label: {
                                                field: ['CUPON_F', 'CUPON_J', 'CUPON_Y'],
//                                                            display: 'insideEnd',
                                                /*display: 'outside',
                                                 calloutLine: {
                                                 length: 10,
                                                 width: 0,
                                                 //                                                                color: '#FFFFFF',
                                                 },*/
                                                renderer: function (value, b, callout) {
                                                    //callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    if (ctx.field === 'CUPON_F') {
                                                        label = 'Offline';
                                                    } else if (ctx.field === 'CUPON_J') {
                                                        label = 'Business';
                                                    } else if (ctx.field === 'CUPON_Y') {
                                                        label = 'Economy';
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            //renderer: 'onColumnRender'
                                        },
                                        {
                                            type: 'line',
                                            stacked: true,
                                            xField: 'strFormatDate',
                                            yField: 'CUPONS',
                                            style: {
                                                fill: '#1c50c9',
                                                stroke: '#d4d396',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                radius: 4,
                                                lineWidth: 2
                                            },
                                            label: {
                                                field: 'CUPONS',
                                                display: 'over',
                                                renderer: function (value, b, callout) {
                                                    callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            markerConfig: {
                                                radius: 4
                                            },
                                            highlight: {
                                                fill: '#1c50c9',
                                                radius: 5,
                                                'stroke-width': 2,
                                                stroke: '#fff'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                style: 'background: #FFF',
                                                height: 20,
                                                showDelay: 0,
                                                dismissDelay: 0,
                                                hideDelay: 0,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml('Total Coupons : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            //renderer: 'onColumnRender'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displaySaleCabinChart01_amount',
                                    border: false,
                                    width: 1400,
                                    height: 350,
                                    hidden: true,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Sales per Cabin - Amount',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    /*legend: {
                                     docked: 'bottom',
                                     background: '#E3EAEF'
                                     },*/
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['AMOUNT_F', 'AMOUNT_J', 'AMOUNT_Y'],
                                            minimum: 0,
                                            grid: true,
                                            title: '',
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
                                            type: 'numeric3d',
                                            position: 'right',
                                            fields: 'AMOUNT',
                                            minimum: 0,
                                            grid: true,
                                            title: '',
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
                                        , {
                                            type: 'category3d',
                                            position: 'bottom',
                                            grid: true,
                                            title: {
                                                translationX: -30
                                            }
                                        },
                                    ],
                                    series: [
                                        {
                                            type: 'bar3d',
                                            stacked: false,
                                            xField: 'strFormatDate',
                                            yField: ['AMOUNT_F', 'AMOUNT_J', 'AMOUNT_Y'],
                                            title: ['Offline', 'Business', 'Economy'],
                                            colors: ['#CC0000', '#FFBF00', '#A5DF00'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            label: {
                                                field: ['AMOUNT_F', 'AMOUNT_J', 'AMOUNT_Y'],
//                                                            display: 'insideEnd',
                                                /*display: 'outside',
                                                 calloutLine: {
                                                 length: 10,
                                                 width: 0,
                                                 //                                                                color: '#FFFFFF',
                                                 },*/
                                                renderer: function (value, b, callout) {
                                                    //callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    if (ctx.field === 'AMOUNT_F') {
                                                        label = 'Offline';
                                                    } else if (ctx.field === 'AMOUNT_J') {
                                                        label = 'Business';
                                                    } else if (ctx.field === 'AMOUNT_Y') {
                                                        label = 'Economy';
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            //renderer: 'onColumnRender'
                                        },
                                        {
                                            type: 'line',
                                            stacked: true,
                                            xField: 'strFormatDate',
                                            yField: 'AMOUNT',
                                            style: {
                                                fill: '#1c50c9',
                                                stroke: '#d4d396',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                radius: 4,
                                                lineWidth: 2
                                            },
                                            label: {
                                                field: 'AMOUNT',
                                                display: 'over',
                                                renderer: function (value, b, callout) {
                                                    callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            markerConfig: {
                                                radius: 4
                                            },
                                            highlight: {
                                                fill: '#1c50c9',
                                                radius: 5,
                                                'stroke-width': 2,
                                                stroke: '#fff'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                style: 'background: #FFF',
                                                height: 20,
                                                showDelay: 0,
                                                dismissDelay: 0,
                                                hideDelay: 0,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml('Total Amount : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            //renderer: 'onColumnRender'
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 PANEL DE GRILLA Y GRAFICOS - Cabin - 222
                 **/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Cabin_2',
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
                            border: false,
                            margin: '5 0 5 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCabin_boxChart3',
                                    width: 1170,
                                    height: 368,
                                    columnLines: true,
                                    border: false,
                                    margin: "5 0 0 0",
                                    bodyStyle: 'background-color: #E3EAEF;',
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Coupons',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'CUPONS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'QCPNSF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONSF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'CUPONS_PERCENT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_PERCENTF, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Offline',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'CUPON_F', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'CUPONF_F', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPONF_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'CUPON_F_PER', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_F_PER, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'C(Business)',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'CUPON_J', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'CUPONF_J', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPONF_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'CUPON_J_PER', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_J_PER, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Y(Economy)',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'CUPON_Y', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'CUPONF_Y', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPONF_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'CUPON_Y_PER', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_Y_PER, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCabin_boxChart3_amount',
                                    width: 1194,
                                    height: 345,
                                    columnLines: true,
                                    hidden: true,
                                    border: false,
                                    margin: "5 0 0 0",
                                    bodyStyle: 'background-color: #E3EAEF;',
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'AMOUNT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'AMOUNTF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNTF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'AMOUNT_PERCENT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT_PERCENTF, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Offline',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'AMOUNT_F', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'AMOUNTF_F', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNTF_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'AMOUNT_F_PER', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_F_PER, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'C(Business)',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'AMOUNT_J', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'AMOUNTF_J', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNTF_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'AMOUNT_J_PER', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_J_PER, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Y(Economy)',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'AMOUNT_Y', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Flown', dataIndex: 'AMOUNTF_Y', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNTF_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '% Used', dataIndex: 'AMOUNT_Y_PER', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_Y_PER, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            margin: '5 0 5 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_tc2',
                                    width: 180,                                   
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">Coupons</b>', inputValue: 'C', name: 'rbgType_tc2', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">Amount</b>', inputValue: 'A', name: 'rbgType_tc2'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_tc'
                                    }
                                },
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displaySaleCabinChart02',
                                    border: false,
                                    width: 1194,
                                    height: 350,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Sales per Cabin - Coupons',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    /*legend: {
                                     docked: 'bottom',
                                     background: '#E3EAEF'
                                     },*/
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['CUPON_F', 'CUPONF_F', 'CUPON_J', 'CUPONF_J', 'CUPON_Y', 'CUPONF_Y'],
                                            minimum: 0,
                                            grid: true,
                                            title: '',
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
                                        , {
                                            type: 'category3d',
                                            position: 'bottom',
                                            grid: true,
                                            title: {
                                                translationX: -30
                                            }
                                        },
                                    ],
                                    series: [
                                        {
                                            type: 'bar3d',
                                            stacked: false,
                                            xField: 'strFormatDate',
                                            yField: ['CUPON_F', 'CUPONF_F', 'CUPON_J', 'CUPONF_J', 'CUPON_Y', 'CUPONF_Y'],
                                            title: ['Offline', 'Flown', 'Business', 'Flown', 'Economy', 'Flown'],
                                            colors: ['#CC0000', '#004adf', '#FFBF00', '#004adf', '#A5DF00', '#004adf'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            label: {
                                                field: ['CUPON_F', 'CUPONF_F', 'CUPON_J', 'CUPONF_J', 'CUPON_Y', 'CUPONF_Y'],
//                                                            display: 'insideEnd',
                                                //display: 'outside',
                                                /*calloutLine: {
                                                 length: 10,
                                                 width: 0,
                                                 //                                                                color: '#FFFFFF',
                                                 },*/
                                                renderer: function (value, b, callout) {
                                                    //callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    if (ctx.field === 'CUPON_F') {
                                                        label = 'Offline';
                                                    } else if (ctx.field === 'CUPONF_F') {
                                                        label = 'Flown';
                                                    } else if (ctx.field === 'CUPON_J') {
                                                        label = 'Business';
                                                    } else if (ctx.field === 'CUPONF_J') {
                                                        label = 'Flown';
                                                    } else if (ctx.field === 'CUPON_Y') {
                                                        label = 'Economy';
                                                    } else if (ctx.field === 'CUPONF_Y') {
                                                        label = 'Flown';
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            //renderer: 'onColumnRender'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displaySaleCabinChart02_amount',
                                    border: false,
                                    width: 1194,
                                    height: 350,
                                    hidden: true,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Sales per Cabin - Amount',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    /*legend: {
                                     docked: 'bottom',
                                     background: '#E3EAEF'
                                     },*/
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['AMOUNT_F', 'AMOUNTF_F', 'AMOUNT_J', 'AMOUNTF_J', 'AMOUNT_Y', 'AMOUNTF_Y'],
                                            minimum: 0,
                                            grid: true,
                                            title: '',
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
                                        , {
                                            type: 'category3d',
                                            position: 'bottom',
                                            grid: true,
                                            title: {
                                                translationX: -30
                                            }
                                        },
                                    ],
                                    series: [
                                        {
                                            type: 'bar3d',
                                            stacked: false,
                                            xField: 'strFormatDate',
                                            yField: ['AMOUNT_F', 'AMOUNTF_F', 'AMOUNT_J', 'AMOUNTF_J', 'AMOUNT_Y', 'AMOUNTF_Y'],
                                            title: ['Offline', 'Flown', 'Business', 'Flown', 'Economy', 'Flown'],
                                            colors: ['#CC0000', '#004adf', '#FFBF00', '#004adf', '#A5DF00', '#004adf'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            label: {
                                                field: ['AMOUNT_F', 'AMOUNTF_F', 'AMOUNT_J', 'AMOUNTF_J', 'AMOUNT_Y', 'AMOUNTF_Y'],
//                                                            display: 'insideEnd',
                                                //display: 'outside',
                                                /*calloutLine: {
                                                 length: 10,
                                                 width: 0,
                                                 //                                                                color: '#FFFFFF',
                                                 },*/
                                                renderer: function (value, b, callout) {
                                                    //callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    if (ctx.field === 'AMOUNT_F') {
                                                        label = 'Offline';
                                                    } else if (ctx.field === 'AMOUNTF_F') {
                                                        label = 'Flown';
                                                    } else if (ctx.field === 'AMOUNT_J') {
                                                        label = 'Business';
                                                    } else if (ctx.field === 'AMOUNTF_J') {
                                                        label = 'Flown';
                                                    } else if (ctx.field === 'AMOUNT_Y') {
                                                        label = 'Economy';
                                                    } else if (ctx.field === 'AMOUNTF_Y') {
                                                        label = 'Flown';
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            //renderer: 'onColumnRender'
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 * PANEL DE GRILLA Y GRAFICOS - COUNTRIES
                 **/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Countries_1',
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
                            id: prototype.id + '-boxChart3',
                            border: false,
                            margin: '20 0 5 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: '20 0 5 0',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCountrys',
                                            width: 292,
                                            height: 340,
                                            columnLines: true,
                                            margin: "5 0 0 0",
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Countries', dataIndex: 'COUNTRY_NAME', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '';
//                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridCountrys').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'Coupons', dataIndex: 'CUPONS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridCountrys').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px;background:#52CC7A';
//                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 10',
                                            width: 541,
//                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                                    id: prototype.id + '-displaySAChart17',
                                                    width: 541,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 60,
                                                    height: 380,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales per Channels - Coupons',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#E3EAEF'
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc1',
                                                            colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                            label: {
                                                                field: 'CLASS',
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value.substring(value.indexOf(',') + 1);
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('CLASS'));
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 10',
                                            width: 541,
//                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                                    id: prototype.id + '-displaySAChart18',
                                                    width: 541,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 60,
                                                    height: 380,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales per Channels - Amount',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#E3EAEF'
                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                            label: {
                                                                field: 'COMENTARIO',
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 1;
                                                                    return value.substring(value.indexOf(',') + 1);
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml(record.get('COMENTARIO'));
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // Grafic Horiz
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-byMonth_02',
                            hidden: false,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 5',
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-displaySAChart19',
                                            width: 1500,
                                            border: false,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Sales per Countries - Amount \n\ USD',
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
//                                                    fields: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    fields: ['AMOUNT_ON', 'AMOUNT_OFF'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Countries',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['On', 'Off'],
                                                    xField: 'COUNTRY_NAME',
//                                                yField: ['CUPONS_ARC', 'CUPONS_ASR', 'CUPONS_MEX', 'CUPONS_OTHER'],
                                                    yField: ['AMOUNT_ON', 'AMOUNT_OFF'],
                                                    colors: ['#CC0000', '#FFBF00', '#A5DF00', '#F6D8CE'],
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
                                                            if (ctx.field === 'AMOUNT_ON') {
                                                                label = 'On';
                                                            } else if (ctx.field === 'AMOUNT_OFF') {
                                                                label = 'Off';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Countries_2',
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
                            id: prototype.id + '-BoxChart_2',
                            border: false,
                            margin: '20 0 5 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: '20 0 5 0',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCountrys_S',
                                            width: 532,
                                            height: 680,
                                            columnLines: true,
                                            margin: "5 0 0 0",
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                    {text: 'Countries', dataIndex: 'COUNTRY_NAME', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#ADFFAD";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#ADFFAD";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Flown',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPON_F', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#85C2FF";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNTF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#85C2FF";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: '% Used', dataIndex: 'CUPONS_PERCENTF', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:#DBDBFF";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart28',
                                            margin: '0 10 0 0 ',
                                            flipXY: true,
                                            width: 600,
                                            height: 700,
                                            insetPadding: '20 10',
                                            background: '#E3EAF9',
                                            captions: {
                                                title: {
                                                    text: 'Sales By Countries - Coupons',
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
                                                    fields: ['CUPONS', 'CUPON_F'],
//                                                    title: 'Amount ',
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
                                                            return  ' ' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'category3d',
                                                    position: 'left',
                                                    fields: 'strDescription',
                                                    grid: true,
                                                    label: {
                                                        textAlign: 'left'
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Sales', 'Flown'],
                                                    yField: ['CUPONS', 'CUPON_F'],
                                                    xField: 'strDescription',
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
                                                            if (ctx.field === 'CUPONS') {
                                                                label += ' Sales : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            } else if (ctx.field === 'CUPON_F') {
                                                                label += ' Flown : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            }
                                                            toolTip.setHtml(label);
                                                        }
                                                    }
                                                }]
                                        },
                                        {
                                            xtype: 'slider',
                                            fieldLabel: 'Top',
                                            id: prototype.id + '-SliderChart28',
                                            width: 40,
                                            hideLabel: true,
                                            value: 2,
                                            height: 600,
                                            vertical: true,
                                            minValue: 5,
                                            maxValue: 20,
                                            tipText: function (thumb) {
                                                return Ext.String.format('First {0} Airline', thumb.value);
                                            },
                                            listeners: {
                                                change: 'onChangeTopCountries'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                //********* /** PANEL DE GRILLA Y GRAFICOS - Agente
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Agent',
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
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAgentChart',
                                    width: 575,
                                    height: 700,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sales Agent',
                                                columns: [
                                                    {text: 'Code', dataIndex: 'VENDOR', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'strDescription1', width: 230, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Src', dataIndex: 'strDescription2', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'COUNTRY_NAME', width: 120, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AMOUNT', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAgentChart').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'panel',
                                    width: 660,
                                    height: 700,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    //                                    border: 0.5,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
                                            //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-ChtSalesAnalysis24_PC',
                                            width: '100%',
                                            border: true,
                                            //                                                margin: '0 0 0 5',
                                            innerPadding: 60,
                                            height: '100%',
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'Sales per Agent - Coupons',
                                                    //                                                            fieldStyle: 'font-size:5px',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            //                                                    legend: {
                                            //                                                        docked: 'bottom',
                                            //                                                        background: '#E3EAEF'
                                            //                                                    },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'AMOUNT',
                                                    colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                    label: {
                                                        field: 'strDescription',
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutWidth = 1;
                                                            return value.substring(0,7);
                                                        }
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 30,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            //                                                                    if (ctx.field === 'QMATCH') {
                                                            //                                                                        label = 'Match';
                                                            //                                                                    } else if (ctx.field === 'QLIQUI') {
                                                            //                                                                        label = 'Settlement';
                                                            //                                                                    } else if (ctx.field === 'QBANK') {
                                                            //                                                                        label = 'Bank';
                                                            //                                                                    } else if (ctx.field === 'QDIFF') {
                                                            //                                                                        label = 'Diff';
                                                            //                                                                    }
                                                            //                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                            //                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT'), '0,000.00') + '%' + '</b>');
                                                        }
                                                    }
                                                }]

                                        }
                                    ]
                                }

                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Agent_Used',
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
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAgentChart_S',
                                    width: 885,
                                    height: 700,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sales Agent',
                                                columns: [
                                                    {text: 'Code', dataIndex: 'VENDOR', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'strDescription1', width: 230, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Src', dataIndex: 'strDescription2', width: 40, align: 'center'},
                                            {text: 'Country', dataIndex: 'COUNTRY_NAME', width: 110, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Coupons', dataIndex: 'CUPONS', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAgentChart').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AMOUNT', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAgentChart_S').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Flown',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'QCPNSF', width: 85, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAgentChart').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONSF, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNTF', width: 85, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAgentChart').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_PERCENTF, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '% Used',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'CUPONS_PERCENTF', width: 55, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#CCD4F7";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAgentChart').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px;background:#CCD4F7';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_PERCENTF, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'panel',
                                    width: 650,
                                    height: 700,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    //                                    border: 0.5,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 650,
                                            height: 700,
                                            bodyStyle: 'background-color: #99CCFF;',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            //                                    border: 0.5,
                                            style: {
                                                borderColor: 'black',
//                                                        borderStyle: 'solid'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-ChtSalesAnalysis30MSBC',
                                                    margin: '0 10 0 0 ',
                                                    flipXY: true,
                                                    width: 585,
                                                    height: 700,
                                                    insetPadding: '20 10',
                                                    background: '#99CCFF',
                                                    captions: {
                                                        title: {
                                                            text: 'Sales per Agent Amount',
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
                                                            fields: ['AMOUNT', 'AMOUNTF'],
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
                                                                    return ' ' + Ext.util.Format.number((value / 1000000), '0,000') + 'M ';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'left',
                                                            fields: 'strDescription',
                                                            grid: true,
                                                            label: {
                                                                textAlign: 'left'
                                                            },
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Sales', 'Flown'],
                                                            yField: ['AMOUNT', 'AMOUNTF'],
                                                            xField: 'strDescription',
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
                                                                    //                                                                label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                                    label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT'), '0,000') + '</b>';
                                                                    //                                            } else if (ctx.field === 'VALOR') {
                                                                    //                                                label += ' Invoice : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                                    //                                            }
                                                                    toolTip.setHtml(label);
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    //                                                background: '#99CCFF',
                                                    bodyStyle: 'background-color: #99CCFF;',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {xtype: 'label', text: 'Top', style: "font-size:12px;font-weight:bold;"},
                                                        {xtype: 'tbspacer', height: 5},
                                                        {
                                                            xtype: 'slider',
                                                            fieldLabel: 'Top',
                                                            width: 15,
                                                            hideLabel: true,
                                                            value: 10,
                                                            height: 400,
                                                            vertical: true,
                                                            minValue: 5,
                                                            maxValue: 20,
                                                            tipText: function (thumb) {
                                                                return Ext.String.format('First {0} Routes  ', thumb.value);
                                                            },
                                                            listeners: {
                                                                change: 'onChangeTopAgentBar'
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
            ]
        }
    ]
});