Ext.define('Ext.Praxis.view.payments.CargoStatusForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1400,
                            id: prototype.id + '-panelGridDataDetail',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetail',
                                    width: 1000,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    viewConfig: {enableTextSelection: true},
                                    columns: {
                                        defaults: {menuDisabled: true, sortable: true, align: 'center'},
                                        items: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Payment</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Date</span>',
                                                        dataIndex: 'strFormatDate',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 100,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b>TOTAL</b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        listeners: {
                                                            click: 'onGridDetBankChargue'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Bank Statement Reconciliation</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [

                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
                                                        style: 'background:#F9D88C;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Cantidad</span>',
                                                                dataIndex: 'VL_QTY_TOTAL', width: 100, align: 'center',
                                                                style: 'background:#F9D88C;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;

                                                                    // Obtenemos el último elemento restando 1 al tamaño
                                                                    var data = items[items.length - 1].data;

                                                                    metaData.style = 'text-align:right; background:#F9D88C;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QTOTAL, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetBankChargue'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_TOTAL', width: 140, align: 'center',
                                                                style: 'background:#F9D88C;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#F9D88C;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTTOTAL, '0,000.00') + '</b>';
                                                                },
                                                            },
                                                        ]
                                                    },

                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match</span>',
                                                        style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>',
                                                                dataIndex: 'VL_QTY_MATCH', width: 100, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;

                                                                    // Obtenemos el último elemento restando 1 al tamaño
                                                                    var data = items[items.length - 1].data;

                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QMATCH, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetBankChargue'
                                                                }

                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
                                                                dataIndex: 'PCT_PROCESADO', width: 70, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (v, meta) {
                                                                    meta.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(v, '0.00') + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;

                                                                    // Obtenemos el último elemento restando 1 al tamaño
                                                                    var data = items[items.length - 1].data;

                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_PCT, '0.00') + ' %</b>';
                                                                }

                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>',
                                                                dataIndex: 'VL_QTY_MANUAL', width: 100, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;

                                                                    // Obtenemos el último elemento restando 1 al tamaño
                                                                    var data = items[items.length - 1].data;

                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QMANUAL, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetBankChargue'
                                                                }

                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_MATCH', width: 130, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTMATCH, '0,000.00') + '</b>';
                                                                },

                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Statement</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">W/O Settlement</span>',
                                                                dataIndex: 'VL_QTY_PEND', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;

                                                                    var data = items[items.length - 1].data;

                                                                    metaData.style = 'text-align:right; background:#FFA8A8;color:black !important ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QPEND, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetBankChargue'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_PEND', width: 138, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDetail').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#FFA8A8;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTPEND, '0,000.00') + '</b>';
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
                                    xtype: 'cartesian',
                                    id: prototype.id + '-chartBSP',
                                    width: 1400,
                                    height: 220,
                                    margin: '15 0 8 0',
                                    border: false,
                                    style: 'background: transparent;',
                                    // AQUÍ ESTÁ LA MAGIA: Definimos los colores a nivel global del gráfico
                                    colors: ['#F9D88C', '#D1FBD2', '#FFA8A8'],
                                    store: {
                                        fields: ['mes', 'total', 'match', 'pending'],
                                        data: []
                                    },
                                    axes: [
                                        {
                                            type: 'numeric',
                                            position: 'left',
                                            title: {text: 'Cantidad', fontSize: 11},
                                            renderer: function (axis, label) {
                                                return Ext.util.Format.number(label, '0,000');
                                            }
                                        },
                                        {
                                            type: 'category',
                                            position: 'bottom',
                                            title: {text: 'Mes', fontSize: 11}
                                        }
                                    ],
                                    series: [
                                        {
                                            type: 'bar',
                                            xField: 'mes',
                                            yField: ['total', 'match', 'pending'],
                                            stacked: false,
                                            title: ['Total', 'Match', 'Pending'],
                                            // Se eliminó el "subStyle" para que herede los de "colors"
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    var field = item.field;
                                                    var label = field === 'total' ? 'Total' : field === 'match' ? 'Match' : 'Pending';
                                                    tooltip.setHtml(label + ': ' + Ext.util.Format.number(record.get(field), '0,000'));
                                                }
                                            }
                                        }
                                    ],
                                    legend: {
                                        docked: 'bottom'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-dashboardBSP',
                                    border: false,
                                    width: 600,
                                    margin: '8 0 4 0',
                                    bodyStyle: 'background: transparent;',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        border: false,
                                        margin: '0 6 0 6',
                                        bodyStyle: 'border-radius:8px; padding: 10px 14px;'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-dashTotal',
                                            flex: 1,
                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#F9D88C;',
                                            html: '<div style="text-align:center;">' +
                                                    '<div style="font-size:11px;font-weight:bold;color:#7a6000;text-transform:uppercase;letter-spacing:1px;">Total</div>' +
                                                    '<div id="' + prototype.id + '-dashTotalVal" style="font-size:22px;font-weight:bold;color:#7a6000;margin-top:4px;">0</div>' +
                                                    '</div>'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-dashMatch',
                                            flex: 1,
                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#D1FBD2;',
                                            html: '<div style="text-align:center;">' +
                                                    '<div style="font-size:11px;font-weight:bold;color:#1a6b1e;text-transform:uppercase;letter-spacing:1px;">Match</div>' +
                                                    '<div id="' + prototype.id + '-dashMatchVal" style="font-size:22px;font-weight:bold;color:#1a6b1e;margin-top:4px;">0</div>' +
                                                    '</div>'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-dashPend',
                                            flex: 1,
                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#FFA8A8;',
                                            html: '<div style="text-align:center;">' +
                                                    '<div style="font-size:11px;font-weight:bold;color:#7a0000;text-transform:uppercase;letter-spacing:1px;">W/O Settlement</div>' +
                                                    '<div id="' + prototype.id + '-dashPendVal" style="font-size:22px;font-weight:bold;color:#7a0000;margin-top:4px;">0</div>' +
                                                    '</div>'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1152,
                            id: prototype.id + '-boxDetBank',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridBoxDetBank',
                                    width: 1155,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    viewConfig: {enableTextSelection: true},
                                    columns: {
                                        defaults: {menuDisabled: true, sortable: true, align: 'center'},
                                        items: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Detail</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">RN</span>',
                                                        dataIndex: 'RN',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 50,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Country</span>',
                                                        dataIndex: 'SCOUNTRY',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Doctype</span>',
                                                        dataIndex: 'descTDOC',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Status</span>',
                                                        dataIndex: 'descSTVAL',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 160,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Merchant</span>',
                                                        dataIndex: 'MERCHAND',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 100,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Bandoc</span>',
                                                        dataIndex: 'BANDOC',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 100,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Conciliacion - Fase I</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Abono Date</span>',
                                                        dataIndex: 'VALDATE',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 100,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Currency</span>',
                                                        dataIndex: 'SCURRENCY',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Neto EECC</span>',
                                                        dataIndex: 'NETO', width: 120, align: 'center',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var store = Ext.getCmp(prototype.id + '-gridBoxDetBank').getStore();
                                                            var items = store.getData().items;

                                                            var data = items[items.length - 1].data;

                                                            metaData.style = 'text-align:right; background:#c9daf5;color:black !important ';
                                                            return '<b>' + Ext.util.Format.number(data.SUM_NETO, '0,000.00') + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Neto Settlement</span>',
                                                        dataIndex: 'NETOC', width: 120, align: 'center',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var store = Ext.getCmp(prototype.id + '-gridBoxDetBank').getStore();
                                                            var items = store.getData().items;

                                                            var data = items[items.length - 1].data;

                                                            metaData.style = 'text-align:right; background:#c9daf5;color:black !important ';
                                                            return '<b>' + Ext.util.Format.number(data.SUM_NETOC, '0,000.00') + '</b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Qty</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Sett.</span>',
                                                        dataIndex: 'QTYTRAN1',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Pen. Days</span>',
                                                        dataIndex: 'PENDINGDAYS',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
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
                            border: false,
                            width: 1152,
                            id: prototype.id + '-boxDetDirectBank',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridBoxDetDirectBank',
                                    width: 1155,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    viewConfig: {enableTextSelection: true},
                                    columns: {
                                        defaults: {menuDisabled: true, sortable: true, align: 'center'},
                                        items: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Detail</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">RN</span>',
                                                        dataIndex: 'RN',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 50,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Country</span>',
                                                        dataIndex: 'SCOUNTRY',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Doctype</span>',
                                                        dataIndex: 'descTDOC',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Status</span>',
                                                        dataIndex: 'descSTVAL',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 160,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Merchant</span>',
                                                        dataIndex: 'MERCHAND',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 100,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Bandoc</span>',
                                                        dataIndex: 'BANDOC',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 100,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Conciliacion - Fase I</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Abono Date</span>',
                                                        dataIndex: 'VALDATE',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 100,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Currency</span>',
                                                        dataIndex: 'SCURRENCY',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Neto EECC</span>',
                                                        dataIndex: 'NETO', width: 120, align: 'center',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var store = Ext.getCmp(prototype.id + '-gridBoxDetDirectBank').getStore();
                                                            var items = store.getData().items;

                                                            var data = items[items.length - 1].data;

                                                            metaData.style = 'text-align:right; background:#c9daf5;color:black !important ';
                                                            return '<b>' + Ext.util.Format.number(data.SUM_NETO, '0,000.00') + '</b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Neto Settlement</span>',
                                                        dataIndex: 'NETOC', width: 120, align: 'center',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var store = Ext.getCmp(prototype.id + '-gridBoxDetDirectBank').getStore();
                                                            var items = store.getData().items;

                                                            var data = items[items.length - 1].data;

                                                            metaData.style = 'text-align:right; background:#c9daf5;color:black !important ';
                                                            return '<b>' + Ext.util.Format.number(data.SUM_NETOC, '0,000.00') + '</b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Qty</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Sett.</span>',
                                                        dataIndex: 'QTYTRAN1',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Pen. Days</span>',
                                                        dataIndex: 'PENDINGDAYS',
                                                        style: 'background:#c9daf5;color:black !important',
                                                        align: 'center',
                                                        width: 80,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b></b>';
                                                        },
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
                            border: false,
                            width: 2550,
                            id: prototype.id + '-panelGridDataARC',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-treeDataDetailARC',
                                    width: 2532,
                                    hidden: false,
                                    columnLines: true,
                                    useArrows: true,
                                    rootVisible: false,
                                    viewConfig: {enableTextSelection: true},
                                    columns: {
                                        defaults: {menuDisabled: true, sortable: true, align: 'center'},
                                        items: [
                                            {
                                                xtype: 'treecolumn',
                                                text: '<span style="color:black;font-weight:bold;">Date</span>',
                                                dataIndex: 'strFormatDate',
                                                style: 'background:#c9daf5;color:black !important',
                                                align: 'center',
                                                width: 100,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                    return '<b>' + (value || '') + '</b>';
                                                },
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Name</span>',
                                                dataIndex: 'NOMBRE1',
                                                style: 'background:#c9daf5;color:black !important',
                                                align: 'center',
                                                width: 120,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:left;";
                                                    return value || '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Bank Statement Reconciliation</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
                                                        style: 'background:#F9D88C;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Cantidad</span>',
                                                                dataIndex: 'VL_QTY_TOTAL', width: 100, align: 'center',
                                                                style: 'background:#F9D88C;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                listeners: {click: 'onGridDetBankChargue'}
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_TOTAL', width: 120, align: 'center',
                                                                style: 'background:#F9D88C;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match</span>',
                                                        style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>',
                                                                dataIndex: 'VL_QTY_MATCH', width: 100, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                listeners: {click: 'onGridDetBankChargue'}
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
                                                                dataIndex: 'PCT_PROCESADO', width: 70, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (v, meta) {
                                                                    meta.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(v, '0.00') + ' %</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>',
                                                                dataIndex: 'VL_QTY_MANUAL', width: 100, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                listeners: {click: 'onGridDetBankChargue'}
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_MATCH', width: 120, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Falta</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;"> Pago</span>',
                                                                dataIndex: 'VL_QTY_FALTA_PAGO', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_FALTA_PAGO', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Falta</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Factura</span>',
                                                                dataIndex: 'VL_QTY_FALTA_FACTURA', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_FALTA_FACTURA', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Factura</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;"> Pendiente</span>',
                                                                dataIndex: 'VL_QTY_FACTURA_PENDIENTE', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_FACTURA_PENDIENTE', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Pendiente</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;"> Pago</span>',
                                                                dataIndex: 'VL_QTY_PENDIENTE_PAGO', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_PENDIENTE_PAGO', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">No Esta</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;"> en Libera</span>',
                                                                dataIndex: 'VL_QTY_NO_ESTA_EN_LIBERA', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_NO_ESTA_EN_LIBERA', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Falta Pago /</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;"> Diferencia en Libera</span>',
                                                                dataIndex: 'VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA', width: 130, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA', width: 130, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match con </span>',
                                                        style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Observaciones</span>',
                                                                dataIndex: 'VL_QTY_MATCH_CON_OBSERVACIONES', width: 120, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_MATCH_CON_OBSERVACIONES', width: 120, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
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
                                    id: prototype.id + '-fakeSummaryARC',
                                    border: false,
                                    width: 2530,
                                    bodyStyle: 'background:#c9daf5; border-top: 1px solid #b0c4e0;',
                                    layout: {type: 'hbox', align: 'middle'},
                                    defaults: {xtype: 'label', border: false},
                                    items: [
                                        {text: 'TOTAL', width: 220, style: 'text-align:center; font-weight:bold; color:black; font-size:11px; padding:3px 6px; background:#c9daf5;'},
                                        {id: prototype.id + '-sum-ARCQTOTAL',           width: 100, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#F9D88C;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTTOTAL',         width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#F9D88C;', text: '0'},
                                        {id: prototype.id + '-sum-ARCQMATCH',           width: 100, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0'},
                                        {id: prototype.id + '-sum-ARCPCT',              width: 70,  style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0 %'},
                                        {id: prototype.id + '-sum-ARCQMANUAL',          width: 100, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTMATCH',         width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0'},
                                        {id: prototype.id + '-sum-ARCFALTAPAGO',        width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTFALTAPAGO',     width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCFALTAFACT',        width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTFALTAFACT',     width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCFACTPEND',         width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTFACTPEND',      width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCPENDPAGO',         width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTPENDPAGO',      width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCNOLIB',            width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTNOLIB',         width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCFALTAPAGODIF',     width: 130, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTFALTAPAGODIF',  width: 130, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                        {id: prototype.id + '-sum-ARCMATCHOBS',         width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0'},
                                        {id: prototype.id + '-sum-ARCAMTMATCHOBS',      width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0'}
                                    ]
                                },
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-chartARC',
                                    width: 1400,
                                    height: 220,
                                    margin: '12 0 8 0',
                                    border: false,
                                    style: 'background: transparent;',
                                    colors: ['#F9D88C', '#D1FBD2', '#FFA8A8'],
                                    store: {
                                        fields: ['mes', 'total', 'match', 'pending'],
                                        data: []
                                    },
                                    axes: [
                                        {
                                            type: 'numeric',
                                            position: 'left',
                                            title: {text: 'Cantidad', fontSize: 11},
                                            renderer: function (axis, label) {
                                                return Ext.util.Format.number(label, '0,000');
                                            }
                                        },
                                        {
                                            type: 'category',
                                            position: 'bottom',
                                            title: {text: 'Mes', fontSize: 11}
                                        }
                                    ],
                                    series: [
                                        {
                                            type: 'bar',
                                            xField: 'mes',
                                            yField: ['total', 'match', 'pending'],
                                            stacked: false,
                                            title: ['Total', 'Match', 'Pending'],
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    var field = item.field;
                                                    var label = field === 'total' ? 'Total' : field === 'match' ? 'Match' : 'Pending';
                                                    tooltip.setHtml(label + ': ' + Ext.util.Format.number(record.get(field), '0,000'));
                                                }
                                            }
                                        }
                                    ],
                                    legend: {
                                        docked: 'bottom'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-dashboardARC',
                                    border: false,
                                    width: 600,
                                    margin: '8 0 4 0',
                                    bodyStyle: 'background: transparent;',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        border: false,
                                        margin: '0 6 0 6',
                                        bodyStyle: 'border-radius:8px; padding: 10px 14px;'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#F9D88C;',
                                            html: '<div style="text-align:center;">' +
                                                    '<div style="font-size:11px;font-weight:bold;color:#7a6000;text-transform:uppercase;letter-spacing:1px;">Total</div>' +
                                                    '<div id="' + prototype.id + '-dashTotalValARC" style="font-size:22px;font-weight:bold;color:#7a6000;margin-top:4px;">0</div>' +
                                                    '</div>'
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#D1FBD2;',
                                            html: '<div style="text-align:center;">' +
                                                    '<div style="font-size:11px;font-weight:bold;color:#1a6b1e;text-transform:uppercase;letter-spacing:1px;">Match</div>' +
                                                    '<div id="' + prototype.id + '-dashMatchValARC" style="font-size:22px;font-weight:bold;color:#1a6b1e;margin-top:4px;">0</div>' +
                                                    '</div>'
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#FFA8A8;',
                                            html: '<div style="text-align:center;">' +
                                                    '<div style="font-size:11px;font-weight:bold;color:#7a0000;text-transform:uppercase;letter-spacing:1px;">Pending</div>' +
                                                    '<div id="' + prototype.id + '-dashPendValARC" style="font-size:22px;font-weight:bold;color:#7a0000;margin-top:4px;">0</div>' +
                                                    '</div>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1420,
                            id: prototype.id + '-panelGridDataICCS',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailICCS',
                                    height: 543,
                                    width: 1090,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45, style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    if (value == 'TA01') {
                                                        return  '202';
                                                    } else if (value == 'AV01') {
                                                        return  '134';
                                                    } else if (value == 'LR01') {
                                                        return  '133';
                                                    } else if (value == '2K01') {
                                                        return  '547';
                                                    }

                                                    return  value;
                                                }},
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Settlement Date</span>',
                                                dataIndex: 'DATESETT',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";

                                                    if (!value || value.length !== 8)
                                                        return value;

                                                    var year = value.substring(0, 4);
                                                    var month = value.substring(4, 6);
                                                    var day = value.substring(6, 8);

                                                    return day + "/" + month + "/" + year;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">File Name</span>', dataIndex: 'NAMEFILE', width: 503, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Upload Date</span>',
                                                dataIndex: 'FECR',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Upload By</span>',
                                                dataIndex: 'USCR',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value ? value.toUpperCase() : '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Download File</span>',
                                                width: 100,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');

                                                    return `<img src="resources/img/botones/excel-png-office-xlsx-icon-3.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onDownloadICCS'
                                                }
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
            region: 'south',
            xtype: 'panel',
            id: prototype.id + '-pie',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: false,
            height: 30,
            margin: '5 0 18 0',
            defaults: {
                border: false
            },
            items: [
                {
                    bodyStyle: 'background: #c9daf5; border-radius: 5px;',
                    xtype: 'panel',
                    width: '30%',
                    height: '100%',
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
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold;'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold;'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold;'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:black;font-weight:bold;'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:black;font-weight:bold;'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:black;font-weight:bold;'
                        }
                    ]
                }
            ]
        }
    ]
}
);
