Ext.define('Ext.Praxis.view.payments.AccountingTransactAmexForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1700,
                height: 700,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 'auto',
                            width: 1500,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainAcountTransact',
                                    height: 'auto',
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
                                            {text: 'Payment <br> Date ', dataIndex: 'strFormatDate', width: 120,
                                                listeners: {
                                                    click: 'onGridDetByDay'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Accounting Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Accounted', dataIndex: 'TGROSAMOUN_ACCOUNTED', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#42f59e";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN_ACCOUNTED, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Qty Accounted', dataIndex: 'QTY_ACCOUNTED', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#42f59e";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a>' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_ACCOUNTED, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Pending', dataIndex: 'TGROSAMOUN_PENDING', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FFBF00";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN_PENDING, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Qty Pending', dataIndex: 'QTY_PENDING', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FFBF00";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a>' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_PENDING, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', dataIndex: 'TGROSAMOUN', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#68EAFB";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Qty Total', dataIndex: 'QTY_TOTAL', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#68EAFB";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_TOTAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transaction AMEX',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Total Amount', dataIndex: 'TGROSAMOUN_ALL', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#88FF89";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN_ALL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Qty Total', dataIndex: 'QTY_ALL', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#88FF89";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a>' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_ALL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Differences',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amount', dataIndex: 'TGROSAMOUN_DIFF', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#F0FF88";
                                                            if (value < 0) {
                                                                value = Ext.util.Format.number(value, '0,000.00');
                                                                return '<a style="color:#cb0519;">' + value + '</a>';
                                                            } else {
                                                                value = Ext.util.Format.number(value, '0,000.00');
                                                                return '<a style="color:#057ECB;">' + value + '</a>';
                                                            }
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:right; margin-right:3px ;';
                                                            if (value < 0) {
                                                                var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                                return '<b style="color:#cb0519>' + Ext.util.Format.number(data.totTGROSAMOUN_DIFF, '0,000.00') + '<b>';
                                                            } else {
                                                                var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                                return '<b >' + Ext.util.Format.number(data.totTGROSAMOUN_DIFF, '0,000.00') + '<b>';
                                                            }
                                                        }
                                                    },
                                                    {text: 'Qty', dataIndex: 'QTY_DIFF', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value < 0) {
                                                                metaData.style = "text-align:right; color:#cb0519;background-color:#F0FF88";
                                                                value = Ext.util.Format.number(value, '0,000');
                                                                return value;
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#F0FF88";
                                                                value = Ext.util.Format.number(value, '0,000');
                                                                return value;
                                                            }
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            if (value < 0) {
                                                                var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right; margin-right:3px ;color:#cb0519';
                                                                return '<b>' + Ext.util.Format.number(data.totQTY_DIFF, '0,000') + '<b>';
                                                            } else {
                                                                var data = Ext.getCmp(prototype.id + '-gridMainAcountTransact').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right; margin-right:3px ;';
                                                                return '<b>' + Ext.util.Format.number(data.totQTY_DIFF, '0,000') + '<b>';
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChart',
                                    hidden: true,
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
                                                {boxLabel: '<b style="color:#148D28;">Amount</b>', inputValue: 'A', name: 'rbgType_tc', checked: true},
                                                {boxLabel: '<b style="color:#148D28;">Tickets</b>', inputValue: 'T', name: 'rbgType_tc'},
                                            ],
                                            listeners: {
                                                change: 'rbChangeType_tc'
                                            }
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayChart01',
                                            border: false,
                                            width: 1400,
                                            height: 350,
                                            hidden: false,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Accounting Transaction AMEX',
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
                                                    position: 'left',
                                                    fields: ['TGROSAMOUN_ACCOUNTED', 'TGROSAMOUN_PENDING'],
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
                                                    yField: ['TGROSAMOUN_ACCOUNTED', 'TGROSAMOUN_PENDING'],
                                                    title: ['Accounted', 'Pending'],
                                                    colors: ['#42f59e', '#FFBF00'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['TGROSAMOUN_ACCOUNTED', 'TGROSAMOUN_PENDING'],
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
                                                            if (ctx.field === 'TGROSAMOUN_ACCOUNTED') {
                                                                label = 'Accounted';
                                                            } else if (ctx.field === 'TGROSAMOUN_PENDING') {
                                                                label = 'Pending';
                                                            }
                                                            toolTip.setHtml(label + ' Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    },
                                                    //renderer: 'onColumnRender'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayChart02',
                                            border: false,
                                            width: 1400,
                                            height: 350,
                                            hidden: true,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Accounting Transaction AMEX',
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
                                                    position: 'left',
                                                    fields: ['QTY_ACCOUNTED', 'QTY_PENDING'],
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
                                                    yField: ['QTY_ACCOUNTED', 'QTY_PENDING'],
                                                    title: ['Accounted', 'Pending'],
                                                    colors: ['#42f59e', '#FFBF00'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['QTY_ACCOUNTED', 'QTY_PENDING'],
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
                                                            if (ctx.field === 'QTY_ACCOUNTED') {
                                                                label = 'Accounted';
                                                            } else if (ctx.field === 'QTY_PENDING') {
                                                                label = 'Pending';
                                                            }
                                                            toolTip.setHtml(label + ' Tickets: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataByDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            //height: 'auto',
                            width: 1310,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-gridMainDataByDay',
                                    height: 550,
                                    width: 1034,
                                    reserveScrollbar: true,
                                    useArrows: true,
                                    rootVisible: false,
                                    multiSelect: true,
                                    columnLines: true,
                                    rowLines: true,
                                    features: [{
//                                        dock: 'bottom',
                                            ftype: 'summary'
                                        }],
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Payment<br>Date',
                                                xtype: 'treecolumn',
                                                dataIndex: 'PAYDATE', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'BSUMDATE', width: 120,
                                                listeners: {
                                                    click: 'onGridDetByDate'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Accounting Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Accounted', dataIndex: 'TGROSAMOUN_ACCOUNTED', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#42f59e";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN_ACCOUNTED, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Qty Accounted', dataIndex: 'QTY_ACCOUNTED', width: 120,
                                                        listeners: {
                                                            click: 'onGridDetByAcount'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#42f59e";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_ACCOUNTED, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Pending', dataIndex: 'TGROSAMOUN_PENDING', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FFBF00";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN_PENDING, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Qty Pending', dataIndex: 'QTY_PENDING', width: 120,
                                                        listeners: {
                                                            click: 'onGridDetByPending'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FFBF00";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_PENDING, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', dataIndex: 'TGROSAMOUN', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#68EAFB";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Qty Total', dataIndex: 'QTY_TOTAL', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#68EAFB";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_TOTAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataByDate',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 'auto',
                            width: 1720,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataByDate',
                                    height: 'auto',
                                    width: 1660,
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
                                            {text: 'Payment <br> Date', dataIndex: 'PAYDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Document Type', dataIndex: 'TDOC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'descSTVAL', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Accounting',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'ID', dataIndex: 'IDCONL', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetByAccounting'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#c0f0af";
                                                            return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'FCONTL', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c0f0af";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Status', dataIndex: 'descSTCONL', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c0f0af";
                                                            return value;
                                                        }
                                                    },
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
                                                    {text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Auth.', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'BSUMDATE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    if (data.SVFOPS === data.TGROSAMOUN) {
                                                        metaData.style = "text-align:right;";
                                                    } else {
                                                        metaData.style = "text-align:right;color:#cb0519";
                                                    }
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataByDate').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.SVFOPS_TOTAL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Transaction<br>Amount ', dataIndex: 'TGROSAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataByDate').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Qty.<br>Tkts', dataIndex: 'QTYTKT', width: 60,
                                                listeners: {
                                                    click: 'onGridDetByQty'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Indust. Speci. Ref. Nbr.<br>TKT', dataIndex: 'ISREFNBR', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Error',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CERROR', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'DES_CERROR', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Rule', dataIndex: 'descFREGLA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataByQty',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 'auto',
                            width: 1680,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataByQty',
                                    height: 'auto',
                                    width: 1680,
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
                                            {text: 'Payment <br> Date', dataIndex: 'PAYDATE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'descSTVAL', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'TKT', width: 120,
                                                listeners: {
                                                    click: 'viewTKT'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Seq', dataIndex: 'SEQ', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'SCARDN', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Auth.', dataIndex: 'SAUTHOC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
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
                                                    {text: 'PNR', dataIndex: 'SPNR', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'BSUMDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount<br>Total Transact.', dataIndex: 'totSVFOPS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            if (rowIndex > 0) {
                                                                return ''
                                                            } else {
                                                                return value;
                                                            }
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'SVFOPS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByQty').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPS, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Accounting Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Status', dataIndex: 'descSTCONL', width: 80, hidden: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'FCONT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Id', dataIndex: 'IDCON', width: 270,
                                                        /*listeners: {
                                                         click: 'onGridDetByAccounting'
                                                         },*/
                                                        /*renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                         value = '<b>' + value + '</b>';
                                                         metaData.style = "text-align:center;background-color:#FCF6DC";
                                                         return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                         }*/
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Accounting Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'FCONTL', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Id', dataIndex: 'IDCONL', width: 270,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
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
                            id: prototype.id + '-panelGridDataByAccounting',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 'auto',
                            width: 1680,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataByAccounting',
                                    height: 550,
                                    width: 1680,
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
                                            {text: 'Ticket', dataIndex: 'A4183TICKET', width: 120,
                                                listeners: {
                                                    click: 'viewTKTconSEQ'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    if (data.A4183SEQ === '001') {
                                                        this.a = value;
                                                        value = '<b>' + value + '</b>';
                                                        return '<a href="#payments-accounting-transact-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    } else {
                                                        return value;
                                                    }
                                                }
                                            },
                                            {text: 'Mode', dataIndex: 'A4183MODO', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    var rtn = '';
                                                    switch (data.A4183MODO.trim()) {
                                                        case 'S':
                                                            rtn = 'SALE';
                                                            break;
                                                        case 'M':
                                                            rtn = 'MEMO';
                                                            break;
                                                        case 'J':
                                                            rtn = 'EXCH';
                                                            break;
                                                        case 'I':
                                                            rtn = 'TAXC';
                                                            break;
                                                        case 'R':
                                                            rtn = 'RFND';
                                                            break;
                                                        case 'F':
                                                            rtn = 'FLWN';
                                                            break;
                                                        case 'C':
                                                            rtn = 'EXPI';
                                                            break;
                                                        case 'L':
                                                            rtn = 'IPAY';
                                                            break;
                                                        default:
                                                            rtn = data.A4183MODO.trim();
                                                    }

                                                    return rtn;
                                                }
                                            },
                                            {text: 'SRC', dataIndex: 'A4183FUENT', width: 45,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Sub <br> SRC', dataIndex: 'A4183SUBFU', width: 45,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'FOP', dataIndex: 'A4183FP', width: 45,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'CPN', dataIndex: 'A4183CUPON', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'SEQ', dataIndex: 'A4183SEQ', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Accounting Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'A4183FPRO', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Period', dataIndex: 'A4183FCONT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Account Number', dataIndex: 'A4183CUENT', width: 240,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Local Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Cur', dataIndex: 'A4183CUR', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Debit', dataIndex: 'A4183ACTIV', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByAccounting').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totA4183ACTIV, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Credit', dataIndex: 'A4183PASIV', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByAccounting').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totA4183PASIV, '0,000.00') + '<b>';
                                                        }
                                                    }

                                                ]
                                            },
                                            {
                                                text: 'Revenue Amount',
                                                hidden:true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Debit', dataIndex: 'A4183ACTRV', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByAccounting').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totA4183ACTRV, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Credit', dataIndex: 'A4183PASRV', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataByAccounting').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totA4183PASRV, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Concept', dataIndex: 'A4183TITU', width: 240,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Client', dataIndex: 'A4183COPE', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Provider', dataIndex: 'A4183PROV', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Jornal <br> Entry', dataIndex: 'A4183IDCON', width: 240,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
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
                            width: 420,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 450,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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


