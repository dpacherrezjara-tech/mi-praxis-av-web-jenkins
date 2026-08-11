Ext.define('Ext.Praxis.view.payments.DirectSalesForm.Info', {
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
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGridWithWarning',
                                    border: false,
                                    width: 1300,
                                    bodyStyle: 'background: transparent;',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            // Fase 1 / Fase 2: por ahora solo visual, sin
                                            // funcionalidad todavía (Fase 1 activo por defecto).
                                            // Mismo patrón horizontal que el switch Dashboard/Detail.
                                            xtype: 'container',
                                            id: prototype.id + '-panelFaseToggle',
                                            width: 160,
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle',
                                                pack: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Fase 1',
                                                    margin: '0 5 0 0',
                                                    width: 40,
                                                    style: 'font-weight:bold; font-size:11px; color:#1a4d8f;'
                                                },
                                                {
                                                    xtype: 'component',
                                                    id: prototype.id + '-btnToggleSwitchFase',
                                                    margin: '0 5 0 0',
                                                    html: `<style>
                                                        .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                        .toggle-input{opacity:0;width:0;height:0;}
                                                        .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                        .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                        .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                        .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                                    </style>
                                                    <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Fase 2',
                                                    width: 50,
                                                    style: 'font-weight:bold; font-size:11px; color:#1a4d8f;'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelFxWarning',
                                            hidden: true,
                                            width: 130,
                                            margin: '0 10 0 0',
                                            bodyStyle: 'background:#FDEBD0; border:1px solid #e67e22; border-radius:6px;',
                                            html: '<div id="' + prototype.id + '-fxWarningBox" style="padding:8px; text-align:center; cursor:default;" data-qtip="">'
                                                    + '<div style="color:#a04000;font-size:22px;">&#9888;</div>'
                                                    + '<div style="color:#a04000;font-size:11px;font-weight:bold;margin-top:4px;">Missing exchange rate for some sales dates</div>'
                                                    + '</div>'
                                        },
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-gridDataDetail',
                                    width: 980,
                                    rootVisible: false,
                                    useArrows: true,
                                    columnLines: true,
                                    viewConfig: {enableTextSelection: true},
                                    columns: {
                                        defaults: {menuDisabled: true, sortable: true, align: 'center'},
                                        items: [
                                            {
                                                xtype: 'treecolumn',
                                                text: '<span style="color:black;font-weight:bold;">Month</span>',
                                                dataIndex: 'strFormatDate',
                                                style: 'background:#c9daf5;color:black !important',
                                                align: 'center',
                                                width: 110,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:left;";
                                                    return '<b>' + (value || '') + '</b>';
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Airline</span>',
                                                dataIndex: 'CCUST',
                                                style: 'background:#c9daf5;color:black !important',
                                                align: 'center',
                                                width: 80,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center; color:#057ECB; text-decoration:underline;";
                                                    if (!value) {
                                                        return '<b>Group</b>';
                                                    }
                                                    var names = {'133': 'Lacsa', '134': 'Avianca', '202': 'Taca', '547': 'Aerogal', '729': 'Tampa'};
                                                    return '<b>' + (names[value] || value) + '</b>';
                                                },
                                                listeners: {
                                                    click: 'onGridDetDirectSales'
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Bank Settlement Reconciliation</span>',
                                                style: 'background:#c9daf5;color:black !important',
                                                columns: [

                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
                                                        style: 'background:#F9D88C;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Qty</span>',
                                                                dataIndex: 'VL_QTY_TOTAL', width: 50, align: 'center',
                                                                style: 'background:#F9D88C;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetDirectSales'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_TOTAL', width: 140, align: 'center',
                                                                style: 'background:#F9D88C;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            },
                                                        ]
                                                    },

                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match</span>',
                                                        style: 'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>',
                                                                dataIndex: 'VL_QTY_MATCH', width: 70, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetDirectSales'
                                                                }
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
                                                                dataIndex: 'VL_QTY_MANUAL', width: 70, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetDirectSales'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_MATCH', width: 130, align: 'center',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Settlement</span>',
                                                        style: 'background:#FFA8A8;color:black !important',
                                                        columns: [
                                                            {
                                                                // Fase 1: "W/O Statement"; Fase 2: "W/O Sales" (ver
                                                                // syncWOStatementLabel en el controller).
                                                                id: prototype.id + '-colWOStatement',
                                                                text: '<span style="color:black;font-weight:bold;">W/O Statement</span>',
                                                                dataIndex: 'VL_QTY_PEND', width: 120, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline;";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDetDirectSales'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Monto USD</span>',
                                                                dataIndex: 'VL_AMT_PEND', width: 138, align: 'center',
                                                                style: 'background:#FFA8A8;color:black !important',
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
                                                    id: prototype.id + '-fakeSummaryDashboard',
                                                    border: false,
                                                    width: 980,
                                                    bodyStyle: 'background:#c9daf5; border-top: 1px solid #b0c4e0;',
                                                    layout: {type: 'hbox', align: 'middle'},
                                                    defaults: {xtype: 'label', border: false},
                                                    items: [
                                                        {text: 'TOTAL', width: 190, style: 'text-align:center; font-weight:bold; color:black; font-size:11px; padding:3px 6px; background:#c9daf5;'},
                                                        {id: prototype.id + '-sum-DSQTOTAL', width: 50, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#F9D88C;', text: '0'},
                                                        {id: prototype.id + '-sum-DSAMTTOTAL', width: 140, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#F9D88C;', text: '0.00'},
                                                        {id: prototype.id + '-sum-DSQMATCH', width: 70, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0'},
                                                        {id: prototype.id + '-sum-DSPCT', width: 70, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0.00 %'},
                                                        {id: prototype.id + '-sum-DSQMANUAL', width: 70, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0'},
                                                        {id: prototype.id + '-sum-DSAMTMATCH', width: 130, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#D1FBD2;', text: '0.00'},
                                                        {id: prototype.id + '-sum-DSQPEND', width: 120, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0'},
                                                        {id: prototype.id + '-sum-DSAMTPEND', width: 138, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 4px; background:#FFA8A8;', text: '0.00'}
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
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
                            width: 1300,
                            id: prototype.id + '-panelDetailDirectSales',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailDirectSales',
                                    height: 530,
                                    width: 1300,
                                    hidden: false,
                                    columnLines: true,
                                    title: 'Loading detail...',
                                    titleAlign: 'center',
                                    header: {
                                        style: 'background-color: #e8e8e8; color: #333; font-weight: bold;'
                                    },
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
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'NBR', width: 55, style: 'padding:4px; background: #6C87A8;border-color:white;'},
                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            
                                            {text: '<span style="color:white;font-weight:bold;">Abono Date</span>', dataIndex: 'ADATE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    // Abono Date no debería ser anterior a la Sales Date: se
                                                    // pinta de amarillo en ambas columnas para que se note.
                                                    if (record.get('ADATE') && record.get('SDATE') && record.get('ADATE') < record.get('SDATE')) {
                                                        metaData.style += "background:#FFF176;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Sales Date</span>', dataIndex: 'SDATE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center;";
                                                    if (record.get('ADATE') && record.get('SDATE') && record.get('ADATE') < record.get('SDATE')) {
                                                        metaData.style += "background:#FFF176;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            
                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Neto</span>', dataIndex: 'NETO', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Payamou</span>', dataIndex: 'PAYAMOU', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                // Solo Fase 2 y solo bajando por Auto/Manual (ver
                                                // toggleQtyColumns en el controller).
                                                id: prototype.id + '-colQtyTicket',
                                                hidden: true,
                                                text: '<span style="color:white;font-weight:bold;">Qty Ticket</span>', dataIndex: 'QTYTICKET', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline;";
                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                },
                                                listeners: {
                                                    click: 'onQtyTicketClick'
                                                }
                                            },
                                            {
                                                id: prototype.id + '-colQtyLiqui',
                                                hidden: true,
                                                text: '<span style="color:white;font-weight:bold;">Qty Liqui</span>', dataIndex: 'QTYLIQUI', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right; color:#057ECB; text-decoration:underline;";
                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                },
                                                listeners: {
                                                    click: 'onQtyLiquiClick'
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">SFile</span>', dataIndex: 'SFILE', width: 310, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Npag</span>', dataIndex: 'NPAG', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEditDirectSales',
                                                width: 60,
                                                style: 'padding:2px; background: #6C87A8;',
                                                text: '<span style="color:white;font-weight:bold;">Edit</span>',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditDirectSalesClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            // Subnivel de Detail: tickets (MPF300) vinculados a la fila por
                            // DATEC+TRANC, vía MPS783. Se llega con drill-down (push/pop en
                            // me.drillDown, igual que Dashboard->Detail), no con el DataEntry.
                            xtype: 'panel',
                            border: false,
                            width: 1300,
                            id: prototype.id + '-panelTicketDetailDirectSales',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridTicketDetailDirectSales',
                                    height: 513,
                                    width: 1043,
                                    margin: 0,
                                    hidden: false,
                                    columnLines: true,
                                    title: 'Linked Tickets',
                                    titleAlign: 'center',
                                    header: {
                                        style: 'background-color: #e8e8e8; color: #333; font-weight: bold;'
                                    },
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
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Ticket</span>', dataIndex: 'strTicket', width: 120, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 120, style: 'padding:2px; background: #6C87A8;',
                                                renderer: function (value) {
                                                    if (value === '1') {
                                                        return 'Match';
                                                    } else if (value === '5') {
                                                        return 'Match Manual';
                                                    }
                                                    return 'Sales Without Liqui.';
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Source</span>', dataIndex: 'CFUENTE', width: 60, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Type</span>', dataIndex: 'strPEM', width: 80, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Form Payment</span>', dataIndex: 'SPAYMENT', width: 100, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Sales Date</span>', dataIndex: 'SDATE', width: 80, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 90, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Days Pending</span>', dataIndex: 'DIFFDAYS', width: 94, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 75, style: 'padding:2px; background: #6C87A8;'},
                                            {text: '<span style="color:white;font-weight:bold;">Amount</span>', dataIndex: 'SVFOPNETR', width: 110, align: 'right', style: 'padding:2px; background: #6C87A8;',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
                                                    return '<span>' + Ext.util.Format.number(value, '0,000.00') + '</span>';
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    // Totales sobre TODO el resultado filtrado (no solo la página
                                    // actual), vía el 1er result set de MPS783. Ver setGridTicketDetail.
                                    // Mismo patrón visual que -fakeSummaryDashboard: celdas-label con
                                    // su propio padding/background/border-right, para que se vea como
                                    // una fila más de la grilla (columnas alineadas con las de arriba).
                                    xtype: 'panel',
                                    id: prototype.id + '-fakeSummaryTicketDetail',
                                    border: false,
                                    width: 1043,
                                    margin: 0,
                                    bodyStyle: 'background:#c9daf5; border-top: 1px solid #b0c4e0;',
                                    layout: {type: 'hbox', align: 'middle'},
                                    defaults: {xtype: 'label', border: false},
                                    items: [
                                        {width: 40, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},
                                        {width: 120, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''}, // Ticket
                                        {width: 120, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''}, // Status
                                        {width: 60, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Source
                                        {width: 80, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Type
                                        {width: 100, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''}, // Form Payment
                                        {width: 80, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Sales Date
                                        {width: 70, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Country
                                        {width: 90, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Agent
                                        {width: 94, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Days Pending
                                        {width: 75, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Currency
                                        {id: prototype.id + '-lblTicketTotAmount', width: 110, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 6px; background:#c9daf5;', text: '0.00'}
                                    ]
                                }
                            ]
                        },
                        {
                            // Subnivel de Detail: liquidaciones (MPF190, filas hermanas por
                            // DATEC+TRANC+CCUST con Auto/Manual) vinculadas a la fila. Mismas
                            // columnas que el grid principal de Detail. Se llega con drill-down
                            // (push/pop en me.drillDown), reutiliza MPS775 (no un proc nuevo).
                            xtype: 'panel',
                            border: false,
                            width: 1300,
                            id: prototype.id + '-panelLiquiDetailDirectSales',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridLiquiDetailDirectSales',
                                    height: 510,
                                    width: 1300,
                                    hidden: false,
                                    columnLines: true,
                                    title: 'Linked Liquidations',
                                    titleAlign: 'center',
                                    header: {
                                        style: 'background-color: #e8e8e8; color: #333; font-weight: bold;'
                                    },
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
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'NBR', width: 55, style: 'padding:4px; background: #6C87A8;border-color:white;'},
                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Abono Date</span>', dataIndex: 'ADATE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Sales Date</span>', dataIndex: 'SDATE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Neto</span>', dataIndex: 'NETO', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Payamou</span>', dataIndex: 'PAYAMOU', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFERENCE', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">SFile</span>', dataIndex: 'SFILE', width: 310, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Npag</span>', dataIndex: 'NPAG', width: 60, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    // Totales sobre TODO el resultado filtrado (no solo la página
                                    // actual), vía el 1er result set de MPS775. Ver setGridLiquiDetail.
                                    // Mismo patrón que -fakeSummaryTicketDetail: celdas alineadas a
                                    // las columnas de la grilla de arriba. Qty no se muestra: ya se ve
                                    // en el paginador.
                                    xtype: 'panel',
                                    id: prototype.id + '-fakeSummaryLiquiDetail',
                                    border: false,
                                    width: 1300,
                                    margin: 0,
                                    bodyStyle: 'background:#c9daf5; border-top: 1px solid #b0c4e0;',
                                    layout: {type: 'hbox', align: 'middle'},
                                    defaults: {xtype: 'label', border: false},
                                    items: [
                                        {width: 55, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Nbr
                                        {width: 70, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Country
                                        {width: 80, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Agent
                                        {width: 90, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Abono Date
                                        {width: 90, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Sales Date
                                        {width: 80, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''},  // Currency
                                        {id: prototype.id + '-lblLiquiTotNeto', width: 130, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 6px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: '0.00'},   // Neto
                                        {id: prototype.id + '-lblLiquiTotPayamou', width: 130, style: 'text-align:right; font-weight:bold; color:black; font-size:11px; padding:3px 6px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: '0.00'}, // Payamou
                                        {width: 120, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''}, // Reference
                                        {width: 310, style: 'padding:3px 4px; background:#c9daf5; border-right:1px solid #b0c4e0;', text: ''}, // SFile
                                        {width: 60, style: 'padding:3px 4px; background:#c9daf5;', text: ''} // Npag
                                    ]
                                }
                            ]
                        }
                    ]
                },
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
