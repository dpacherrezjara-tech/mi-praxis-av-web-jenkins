Ext.define('Ext.Praxis.view.payments.CargoGuideForm.Info', {
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
                            id: prototype.id + '-panelGridDataDashboard',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDashboard',
                                    width: 945,
                                    columnLines: true,
                                    features: [{ftype: 'summary'}],
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
                                                        width: 110,
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "background:#c9daf5;color:black !important;text-align:center;";
                                                            return '<b>TOTAL</b>';
                                                        },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:center; color:#057ECB; text-decoration: underline; cursor: pointer;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                    }
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Settlement Reconciliation</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [

                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
                                                        dataIndex: 'VL_QTY_TOTAL_SETT', width: 80, align: 'center',
                                                        style: 'background:#F9D88C;color:black !important',
                                                        stval: '',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                            var items = store.getData().items;
                                                            var data = items[items.length - 1].data;
                                                            metaData.style = 'text-align:right; background:#F9D88C;color:black !important';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_TOTAL_SETT, '0,000') + '</b>';
                                                        },
                                                        listeners: { click: 'onDashboardSettClick' }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match</span>',
                                                        style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>',
                                                                dataIndex: 'VL_QTY_MATCH_AUTO_SETT', width: 80, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                stval: '1',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_MATCH_AUTO_SETT, '0,000') + '</b>';
                                                                },
                                                                listeners: { click: 'onDashboardSettClick' }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
                                                                dataIndex: 'PCT_SETT', width: 70, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (v, meta) {
                                                                    meta.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(v, '0.00') + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_PCT_SETT, '0.00') + ' %</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>',
                                                                dataIndex: 'VL_QTY_MATCH_MANUAL_SETT', width: 80, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                stval: '5',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_MATCH_MANUAL_SETT, '0,000') + '</b>';
                                                                },
                                                                listeners: { click: 'onDashboardSettClick' }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Settlement</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">W/O Sales</span>',
                                                                dataIndex: 'VL_QTY_PENDING_MANUAL_SETT', width: 100, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                stval: '3',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#FFA8A8;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_PENDING_MANUAL_SETT, '0,000') + '</b>';
                                                                },
                                                                listeners: { click: 'onDashboardSettClick' }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Sales Reconciliation</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [

                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
                                                        dataIndex: 'VL_QTY_TOTAL_SALE', width: 80, align: 'center',
                                                        style: 'background:#F9D88C;color:black !important',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                            var items = store.getData().items;
                                                            var data = items[items.length - 1].data;
                                                            metaData.style = 'text-align:right; background:#F9D88C;color:black !important';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_TOTAL_SALE, '0,000') + '</b>';
                                                        },
                                                        listeners: { click: 'onDashboardSaleClick' }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match</span>',
                                                        style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>',
                                                                dataIndex: 'VL_QTY_MATCH_AUTO_SALE', width: 80, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_MATCH_AUTO_SALE, '0,000') + '</b>';
                                                                },
                                                                listeners: { click: 'onDashboardSaleClick' }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
                                                                dataIndex: 'PCT_SALE', width: 70, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (v, meta) {
                                                                    meta.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(v, '0.00') + ' %</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_PCT_SALE, '0.00') + ' %</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>',
                                                                dataIndex: 'VL_QTY_MATCH_MANUAL_SALE', width: 80, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#D1FBD2;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_MATCH_MANUAL_SALE, '0,000') + '</b>';
                                                                },
                                                                listeners: { click: 'onDashboardSaleClick' }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Sales</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">W/O Reconcili.</span>',
                                                                dataIndex: 'VL_QTY_PENDING_MANUAL_SALE', width: 110, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline; cursor:pointer;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var store = Ext.getCmp(prototype.id + '-gridDataDashboard').getStore();
                                                                    var items = store.getData().items;
                                                                    var data = items[items.length - 1].data;
                                                                    metaData.style = 'text-align:right; background:#FFA8A8;color:black !important';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QTY_PENDING_MANUAL_SALE, '0,000') + '</b>';
                                                                },
                                                                listeners: { click: 'onDashboardSaleClick' }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-dashboardDashboard',
                                    border: false,
                                    width: 1200,
                                    margin: '15 0 8 0',
                                    bodyStyle: 'background: transparent;',
                                    layout: {type: 'hbox', align: 'stretch', pack: 'center'},
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            title: 'Settlement Reconciliation',
                                            titleAlign: 'center',
                                            header: {
                                                style: 'background:#c9daf5; color:#1a4d8f; font-weight:bold; font-size:12px;'
                                            },
                                            bodyStyle: 'background: transparent;',
                                            layout: {type: 'vbox', align: 'stretch'},
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-chartDashboard',
                                                    height: 240,
                                                    border: false,
                                                    style: 'background: transparent;',
                                                    colors: ['#F9D88C', '#D1FBD2', '#FFA8A8'],
                                                    store: {
                                                        fields: ['mes', 'totalSett', 'matchSett', 'pendSett'],
                                                        data: []
                                                    },
                                                    axes: [
                                                        {
                                                            type: 'numeric',
                                                            position: 'left',
                                                            renderer: function (axis, label) {
                                                                return Ext.util.Format.number(label, '0,000');
                                                            }
                                                        },
                                                        {type: 'category', position: 'bottom'}
                                                    ],
                                                    series: [{
                                                            type: 'bar',
                                                            xField: 'mes',
                                                            yField: ['totalSett', 'matchSett', 'pendSett'],
                                                            stacked: false,
                                                            title: ['Total', 'Match', 'Pending'],
                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (tooltip, record, item) {
                                                                    var labels = {totalSett: 'Total', matchSett: 'Match', pendSett: 'Pending'};
                                                                    tooltip.setHtml((labels[item.field] || item.field) + ': ' + Ext.util.Format.number(record.get(item.field), '0,000'));
                                                                }
                                                            }
                                                        }],
                                                    legend: {docked: 'bottom'}
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    margin: '8 0 0 0',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: {type: 'hbox', align: 'stretch', pack: 'center'},
                                                    defaults: {border: false, margin: '0 4 0 4'},
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-dashTotalSettDashboard',
                                                            flex: 1,
                                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#F9D88C;',
                                                            html: '<div style="text-align:center;">' +
                                                                    '<div style="font-size:11px;font-weight:bold;color:#7a6000;text-transform:uppercase;letter-spacing:1px;">Total Liq.</div>' +
                                                                    '<div id="' + prototype.id + '-dashTotalSettVal" style="font-size:22px;font-weight:bold;color:#7a6000;margin-top:4px;">0</div>' +
                                                                    '</div>'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-dashMatchSettDashboard',
                                                            flex: 1,
                                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#D1FBD2;',
                                                            html: '<div style="text-align:center;">' +
                                                                    '<div style="font-size:11px;font-weight:bold;color:#1a5e1a;text-transform:uppercase;letter-spacing:1px;">Match Liq.</div>' +
                                                                    '<div id="' + prototype.id + '-dashMatchSettVal" style="font-size:22px;font-weight:bold;color:#1a5e1a;margin-top:4px;">0</div>' +
                                                                    '</div>'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-dashPendSettDashboard',
                                                            flex: 1,
                                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#FFA8A8;',
                                                            html: '<div style="text-align:center;">' +
                                                                    '<div style="font-size:11px;font-weight:bold;color:#7a0000;text-transform:uppercase;letter-spacing:1px;">Pend. Liq.</div>' +
                                                                    '<div id="' + prototype.id + '-dashPendSettVal" style="font-size:22px;font-weight:bold;color:#7a0000;margin-top:4px;">0</div>' +
                                                                    '</div>'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: true,
                                            title: 'Sales Reconciliation',
                                            titleAlign: 'center',
                                            header: {
                                                style: 'background:#c9daf5; color:#1a4d8f; font-weight:bold; font-size:12px;'
                                            },
                                            bodyStyle: 'background: transparent;',
                                            layout: {type: 'vbox', align: 'stretch'},
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-chartDashboardSale',
                                                    height: 240,
                                                    border: true,
                                                    style: 'background: transparent;',
                                                    colors: ['#F9D88C', '#D1FBD2', '#FFA8A8'],
                                                    store: {
                                                        fields: ['mes', 'totalSale', 'matchSale', 'pendSale'],
                                                        data: []
                                                    },
                                                    axes: [
                                                        {
                                                            type: 'numeric',
                                                            position: 'left',
                                                            renderer: function (axis, label) {
                                                                return Ext.util.Format.number(label, '0,000');
                                                            }
                                                        },
                                                        {type: 'category', position: 'bottom'}
                                                    ],
                                                    series: [{
                                                            type: 'bar',
                                                            xField: 'mes',
                                                            yField: ['totalSale', 'matchSale', 'pendSale'],
                                                            stacked: false,
                                                            title: ['Total', 'Match', 'Pending'],
                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (tooltip, record, item) {
                                                                    var labels = {totalSale: 'Total', matchSale: 'Match', pendSale: 'Pending'};
                                                                    tooltip.setHtml((labels[item.field] || item.field) + ': ' + Ext.util.Format.number(record.get(item.field), '0,000'));
                                                                }
                                                            }
                                                        }],
                                                    legend: {docked: 'bottom'}
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    margin: '8 0 0 0',
                                                    bodyStyle: 'background: transparent;',
                                                    layout: {type: 'hbox', align: 'stretch', pack: 'center'},
                                                    defaults: {border: false, margin: '0 4 0 4'},
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-dashTotalSaleDashboard',
                                                            flex: 1,
                                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#c9daf5;',
                                                            html: '<div style="text-align:center;">' +
                                                                    '<div style="font-size:11px;font-weight:bold;color:#1a3d6b;text-transform:uppercase;letter-spacing:1px;">Total Tickets</div>' +
                                                                    '<div id="' + prototype.id + '-dashTotalSaleVal" style="font-size:22px;font-weight:bold;color:#1a3d6b;margin-top:4px;">0</div>' +
                                                                    '</div>'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-dashMatchSaleDashboard',
                                                            flex: 1,
                                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#D1FBD2;',
                                                            html: '<div style="text-align:center;">' +
                                                                    '<div style="font-size:11px;font-weight:bold;color:#1a5e1a;text-transform:uppercase;letter-spacing:1px;">Match Tickets</div>' +
                                                                    '<div id="' + prototype.id + '-dashMatchSaleVal" style="font-size:22px;font-weight:bold;color:#1a5e1a;margin-top:4px;">0</div>' +
                                                                    '</div>'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-dashPendSaleDashboard',
                                                            flex: 1,
                                                            bodyStyle: 'border-radius:8px; padding:10px 14px; background:#FFA8A8;',
                                                            html: '<div style="text-align:center;">' +
                                                                    '<div style="font-size:11px;font-weight:bold;color:#7a0000;text-transform:uppercase;letter-spacing:1px;">Pend. Tickets</div>' +
                                                                    '<div id="' + prototype.id + '-dashPendSaleVal" style="font-size:22px;font-weight:bold;color:#7a0000;margin-top:4px;">0</div>' +
                                                                    '</div>'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
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
                                    height: 558,
                                    width: 1028,
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
                                            {text: '<span style="color:white;font-weight:bold;">Abono <br> Date</span>', dataIndex: 'ADATE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">File <br> Adate </span>', dataIndex: 'PAYDAY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Cycle </span>', dataIndex: 'NCICLO', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">FUENTEMON</span>', dataIndex: 'FUENTEMON', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },

                                            {text: '<span style="color:white;font-weight:bold;">Page <br> Number</span>', dataIndex: 'NPAGE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },

                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Bandoc</span>', dataIndex: 'BANDOC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Amount</span>',
                                                dataIndex: 'MONTO',
                                                width: 100,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right; ";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Edit</span>',
                                                width: 60,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');
                                                    return `<img src="resources/img/botones/1326498593_018.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onEditClick'
                                                }
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1420,
                            id: prototype.id + '-panelGridDataARC',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            // CAMBIO: Cambiamos a layout 'fit' para que el TabPanel ocupe todo el espacio
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: prototype.id + '-mainTabPanelARC',
                                    activeTab: 0,
                                    plain: true,
                                    height: 590,
                                    listeners: {
                                        tabchange: 'onTabChangeARC'
                                    },
                                    items: [
                                        {
                                            title: '1. DAILY',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataDetailARC', // Grilla de la Pestaña 1. DAILY
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
                                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">AWBNO</span>', dataIndex: 'AWBNO', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Org Cod</span>', dataIndex: 'ORGCOD', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Dst Cod</span>', dataIndex: 'DSTCOD', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Chg Wgt</span>', dataIndex: 'CHGWGT', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Imp/Exp<br>Flg</span>', dataIndex: 'IMPEXPFLG', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cus Cod</span>', dataIndex: 'CUSCOD', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cus Nam</span>', dataIndex: 'CUSNAM', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">CCA Ref Num</span>', dataIndex: 'CCAREFNUM', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Pay Adv Num</span>', dataIndex: 'PAYADVNUM', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Pay Typ</span>', dataIndex: 'PAYTYP', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Fnl Amt</span>', dataIndex: 'FNLAMT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Fcchd Amt</span>', dataIndex: 'FCCHDAMT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Oth Chg Amt</span>', dataIndex: 'OTHCHGAMT', width: 95, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Agt Com</span>', dataIndex: 'AGTCOM', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Discount</span>', dataIndex: 'DISCOUNT', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">PA Cur<br>Cod</span>', dataIndex: 'PACURCOD', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">AWB Cur<br>Cod</span>', dataIndex: 'AWBCURCOD', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Exc Rat</span>', dataIndex: 'EXCRAT', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Pay Mtd</span>', dataIndex: 'PAYMTD', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Flt Num</span>', dataIndex: 'FLTNUM', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        // PESTAÑA 2: LIBERA
                                        {
                                            title: '2. LIBERA',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridLiberaARC',
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
                                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Bandoc</span>', dataIndex: 'BANDOC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Res Pay</span>', dataIndex: 'RESPAY', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Ref Cli</span>', dataIndex: 'REFCLI', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Lug Com</span>', dataIndex: 'LUGCOM', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Num Fac</span>', dataIndex: 'NUMFAC', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Neto</span>', dataIndex: 'NETO', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Inf Sales</span>', dataIndex: 'INFSALES', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Material</span>', dataIndex: 'MATERIAL', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Desc Pos</span>', dataIndex: 'DESCPOS', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Centro</span>', dataIndex: 'CENTRO', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Importe</span>', dataIndex: 'IMPORTE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Ref Guia</span>', dataIndex: 'REFGUIA', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Guia</span>', dataIndex: 'GUIA', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        // PESTAÑA 3: OPEN
                                        {
                                            title: '3. OPEN',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridOpenARC',
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
                                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Society</span>', dataIndex: 'SOCIETY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">LCom</span>', dataIndex: 'LCOM', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Div</span>', dataIndex: 'DIV', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cen Ben</span>', dataIndex: 'CENBEN', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Bloc Pag</span>', dataIndex: 'BLOCPAG', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Clav Ref 1</span>', dataIndex: 'CLAVREF1', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Clav Ref 3</span>', dataIndex: 'CLAVREF3', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Nombre 1</span>', dataIndex: 'NOMBRE1', width: 160, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'left'},
                                                            {text: '<span style="color:white;font-weight:bold;">Num Leg</span>', dataIndex: 'NUMLEG', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Account</span>', dataIndex: 'ACCOUNT', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Bandoc Car</span>', dataIndex: 'BANDOCCAR', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Adate</span>', dataIndex: 'ADATE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Texto</span>', dataIndex: 'TEXTO', width: 160, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'left'},
                                                            {text: '<span style="color:white;font-weight:bold;">Pay Met</span>', dataIndex: 'PAYMET', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Fcont</span>', dataIndex: 'FCONT', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cls Doc</span>', dataIndex: 'CLSDOC', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Fec Base</span>', dataIndex: 'FECBASE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Delay Day</span>', dataIndex: 'DELAYDAY', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Fec Venc</span>', dataIndex: 'FECVENC', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Con Pay</span>', dataIndex: 'CONPAY', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">CME</span>', dataIndex: 'CME', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Clave Cont</span>', dataIndex: 'CLAVECONT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Neto Loc</span>', dataIndex: 'NETOLOC', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Importe Loc</span>', dataIndex: 'IMPORTELOC', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Import Loc 2</span>', dataIndex: 'IMPORTLOC2', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">Mon Loc</span>', dataIndex: 'MONLOC', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Mon Suc</span>', dataIndex: 'MONSUC', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Mon Suc 2</span>', dataIndex: 'MONSUC2', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Doc Comp</span>', dataIndex: 'DOCCOMP', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Prda</span>', dataIndex: 'PRDA', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Tran</span>', dataIndex: 'TRAN', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Bandoc</span>', dataIndex: 'BANDOC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Seq</span>', dataIndex: 'SEQ', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Acc Number</span>', dataIndex: 'ACCNUMBER', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">FRegla</span>', dataIndex: 'FREGLA', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">CBatch</span>', dataIndex: 'CBATCH', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">TPeriod</span>', dataIndex: 'TPERIOD', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">DCycle</span>', dataIndex: 'DCYCLE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        // PESTAÑA 4: PSE
                                        {
                                            title: '4. PSE',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridPseARC',
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
                                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">FDate</span>', dataIndex: 'FDATE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">ID Uni</span>', dataIndex: 'IDUNI', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Comercio</span>', dataIndex: 'COMERCIO', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">TDoc</span>', dataIndex: 'TDOC', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">NRut</span>', dataIndex: 'NRUT', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">ID Taq</span>', dataIndex: 'IDTAQ', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cod Apli</span>', dataIndex: 'CODAPLI', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Doc</span>', dataIndex: 'DOC', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">NDoc</span>', dataIndex: 'NDOC', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Nombre</span>', dataIndex: 'NOM', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'left'},
                                                            {text: '<span style="color:white;font-weight:bold;">Telf</span>', dataIndex: 'TELF', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Concepto</span>', dataIndex: 'CONCEPTO', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'left'},
                                                            {text: '<span style="color:white;font-weight:bold;">Monto</span>', dataIndex: 'MONTO', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'right'},
                                                            {text: '<span style="color:white;font-weight:bold;">T. Payment</span>', dataIndex: 'TPAYMENT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Refer Pay</span>', dataIndex: 'REFERPAY', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">F. Payment</span>', dataIndex: 'FPAYMENT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">State</span>', dataIndex: 'STATE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cuotas</span>', dataIndex: 'CUOTAS', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">T. Tarjet</span>', dataIndex: 'TTARJET', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Msg Resp</span>', dataIndex: 'MSGRESP', width: 150, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'left'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cod Auth</span>', dataIndex: 'CODAUTH', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cyc PSE</span>', dataIndex: 'CYCPSE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">CUS</span>', dataIndex: 'CUS', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Mul Fact</span>', dataIndex: 'MULFACT', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Camp 1</span>', dataIndex: 'CAMP1', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Camp 2</span>', dataIndex: 'CAMP2', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Camp 3</span>', dataIndex: 'CAMP3', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Camp 4</span>', dataIndex: 'CAMP4', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Camp 5</span>', dataIndex: 'CAMP5', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Status Val</span>', dataIndex: 'STVAL', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        // PESTAÑA 5: GUIAS
                                        {
                                            title: '5. GUIAS',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridGuiasARC',
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
                                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">AWB No</span>', dataIndex: 'AWBNO', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Cycle</span>', dataIndex: 'NCICLO', width: 65, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Pay<br>Method</span>', dataIndex: 'METPAGO', width: 65, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:center;";
                                                                    if (value === 'P') {
                                                                        return 'PSE';
                                                                    } else if (value === 'B') {
                                                                        return 'DAVIVIENDA';
                                                                    } else if (value === 'N') {
                                                                        return 'NEQUI';
                                                                    } else if (value === 'O') {
                                                                        return 'OTROS';
                                                                    }
                                                                    return value;
                                                                }
                                                            },
                                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 65, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Abono<br>Date</span>', dataIndex: 'ADATE', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">File (SFILE)</span>', dataIndex: 'SFILE', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'left'},
                                                            {text: '<span style="color:white;font-weight:bold;">Page<br>Nbr</span>', dataIndex: 'NPAGE', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">PRDA</span>', dataIndex: 'PRDA', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Pay Day</span>', dataIndex: 'PAYDAY', width: 75, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 65, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Bandoc</span>', dataIndex: 'BANDOC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                                            {text: '<span style="color:white;font-weight:bold;">Monto</span>', dataIndex: 'MONTO', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
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
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    width: 1380,
                    id: prototype.id + '-panelGridDataMPF291',
                    bodyStyle: 'background-color: #F4F7FD;',
                    padding: '1',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataMPF291',
                            height: 520,
                            width: 1215,
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
                                    {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 65, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">AWB No</span>', dataIndex: 'AWBNO', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">Cycle</span>', dataIndex: 'NCICLO', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">Payment Method</span>', dataIndex: 'METPAGO', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white',
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            if (value === 'P') {
                                                return 'PSE';
                                            } else if (value === 'B') {
                                                return 'DAVIVIENDA';
                                            } else if (value === 'N') {
                                                return 'NEQUI';
                                            } else if (value === 'O') {
                                                return 'OTROS';
                                            }
                                            return value;
                                        }
                                    },
                                    {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">Abono Date</span>', dataIndex: 'ADATE', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">File (SFILE)</span>', dataIndex: 'SFILE', width: 220, style: 'padding:2px; background: #6C87A8;border-color:white', align: 'center'},
                                    {text: '<span style="color:white;font-weight:bold;">Page<br>Number</span>', dataIndex: 'NPAGE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">PRDA</span>', dataIndex: 'PRDA', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {text: '<span style="color:white;font-weight:bold;">Pay Day</span>', dataIndex: 'PAYDAY', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white'},
                                    {
                                        text: '<span style="color:white;font-weight:bold;">Monto</span>',
                                        dataIndex: 'MONTO',
                                        width: 100,
                                        style: 'padding:2px; background: #6C87A8;border-color:white',
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
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
                    bodyStyle: 'background: #6C87A8; border-radius: 5px;',
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
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        }
                    ]
                }
            ]
        }
    ]
}
);
Ext.util.CSS.createStyleSheet(`
    .section-title {
        font-weight: bold;
        font-size: 13px;
        color: #0B333C;
        text-decoration: underline;
        background-color: #E5ECEF;
        padding: 4px 8px;
        border-radius: 3px;
        display: block;
        margin: 8px 0 4px 8px;
    }
`, 'section-title-style');