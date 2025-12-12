Ext.define('Ext.Praxis.view.payments.CashForm.Info', {
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
                    id: prototype.id + '-vskMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="SUMARIO PRINCIPAL">
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1000,
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-gridSumaryMain',
                                    width: 878,
                                    useArrows: true,
                                    rootVisible: false,
                                    multiSelect: true,
                                    columnLines: true,
                                    rowLines: true,
                                    scrollable: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Month</span>', style: 'background:#c9daf5;color:black !important',
                                                dataIndex: 'strFormatDate', width: 100, align: 'center', xtype: 'treecolumn',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    value = '<b>' + value + '</b>';
                                                    return  !record.data.children ? ' ' : value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Society</span>', style: 'background:#c9daf5;color:black !important',
                                                dataIndex: 'CCUST',
                                                width: 85,
                                                align: 'center', // centra a nivel de columna (por defecto)
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center; color:#008FE3; text-decoration:underline; display:block; text-align:center;cursor:pointer";
                                                    const strCCUST = {
                                                        '133': 'LACSA',
                                                        '134': 'AVIANCA',
                                                        '202': 'TACA',
                                                        '547': 'AEROGAL'
                                                    };
                                                    const displayText = strCCUST[value] || 'AV GROUP';
                                                    return displayText;
                                                },
                                                listeners: {
                                                    click: 'onGridDataDetailSource'
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Tickets</span>', menuDisabled: true, style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
                                                        dataIndex: 'QSALES', width: 100, style: 'background:#F9D88C;color:black !important', align: 'center ', menuDisabled: true, //flex: 1

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value;
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>', dataIndex: 'QMATCH',
                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
                                                                dataIndex: 'PCT_MATCH',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                width: 70,
                                                                align: 'center',
                                                                menuDisabled: true,

                                                                renderer: function (value, metaData, record) {

                                                                    metaData.style = "color:#2B2B2B;text-align:right;";

                                                                    if (value === null || value === undefined) {
                                                                        return '<b>0.00 %</b>';
                                                                    }

                                                                    // Formatear con 2 decimales
                                                                    let pct = Ext.util.Format.number(value, '0.00');

                                                                    return '<b>' + pct + ' %</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>', dataIndex: 'QMANUAL',
                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">W/O Settlement</span>', dataIndex: 'QPEND',
                                                                style: 'background:#FFA8A8;color:black !important', width: 120, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetailPrincipal',
                                                                    args: ['']
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounted</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending</span>', dataIndex: 'QPOLIPE',
                                                                style: 'background:#FFA8A8;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetailPrincipal',
                                                                    args: ['C']
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Processed</span>', dataIndex: 'QPOLIC',
                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },
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
                                    id: prototype.id + '-SummaryMainData',
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'left',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:11px'
                                    },
                                    items: [
                                        {
                                            width: 185,
                                            id: prototype.id + '-SPACE1',
                                            style: 'background:#c9daf5; text-align:center; font-weight:bold; color:black;',
                                            html: 'Totals'
                                        },
                                        {width: 100, id: prototype.id + '-TOTAL_QSALES', style: 'background: #F9D88C;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QMATCH', style: 'background: #D1FBD2;text-align:right'},
                                        {width: 70, id: prototype.id + '-TOTAL_PCT_MATCH', style: 'background: #D1FBD2;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QMANUAL', style: 'background: #D1FBD2;text-align:right'},
                                        {width: 120, id: prototype.id + '-TOTAL_QPEND', style: 'background: #FFA8A8;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QPOLIPE', style: 'background: #FFA8A8;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QPOLIC', style: 'background: #D1FBD2;text-align:right'}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    margin: '20 0 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayBarSM',
                                            width: 1100,
                                            height: 260,
                                            insetPadding: 10,
                                            border: false,
                                            background: '#FFFFFF',
                                            legend: {docked: 'bottom'},
                                            axes: [
                                                {type: 'numeric', position: 'left', title: 'Cantidad', grid: true},
                                                {type: 'category', position: 'bottom', title: 'Mes'}
                                            ],
                                            series: [{
                                                    type: 'bar',
                                                    xField: 'month',
                                                    yField: ['TicketTotal', 'TicketMatch', 'TicketPending'],
                                                    title: ['Ticket Total', 'Ticket Match', 'Ticket Pending'],
                                                    stacked: false, // Barras agrupadas
                                                    style: {opacity: 0.95},
                                                    colors: ['#F9D88C', '#B8E986', '#FFA8A8'], // 🎨 tonos pastel
                                                    highlightCfg: {fillStyle: '#FFF2A8'},
                                                    tooltip: {
                                                        trackMouse: true,
                                                        renderer: function (tooltip, record, item) {
                                                            tooltip.setHtml(
                                                                    item.series.getTitle()[item.series.getYFieldIndex(item.field)] + ': ' +
                                                                    Ext.util.Format.number(record.get(item.field), '0,0')
                                                                    );
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="SUMARIO AGRUPADO POR FUENTE">
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1000,
                            id: prototype.id + '-panelGridDataDetail',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailSource',
                                    minHeight: 200,
                                    width: 795,
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
                                            {text: '<span style="color:black;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40, style: 'padding:2px; background: #c9daf5;'},
                                            {text: '<span style="color:black;font-weight:bold;">Source</span>', dataIndex: 'CFUENTE', width: 60, style: 'padding:2px; background: #c9daf5;',
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
                                                text: '<span style="color:black;font-weight:bold;">Tickets</span>', menuDisabled: true, style: 'background:#c9daf5;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
                                                        dataIndex: 'QSALES', width: 100, style: 'background:#F9D88C;color:black !important', align: 'center ', menuDisabled: true, //flex: 1

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value;
                                                        },
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Match</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>', dataIndex: 'QMATCH',
                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
                                                                dataIndex: 'PCT_MATCH',
                                                                style: 'background:#D1FBD2;color:black !important',
                                                                width: 70,
                                                                align: 'center',
                                                                menuDisabled: true,

                                                                renderer: function (value, metaData, record) {

                                                                    metaData.style = "color:#2B2B2B;text-align:right;";

                                                                    if (value === null || value === undefined) {
                                                                        return '<b>0.00 %</b>';
                                                                    }

                                                                    // Formatear con 2 decimales
                                                                    let pct = Ext.util.Format.number(value, '0.00');

                                                                    return '<b>' + pct + ' %</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>', dataIndex: 'QMANUAL',
                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">W/O Settlement</span>', dataIndex: 'QPEND',
                                                                style: 'background:#FFA8A8;color:black !important', width: 120, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetailPrincipalSource',
                                                                    args: ['']
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Accounted</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
                                                        menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Pending</span>', dataIndex: 'QPOLIPE',
                                                                style: 'background:#FFA8A8;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                listeners: {
                                                                    click: 'onGridDataDetailPrincipalSource',
                                                                    args: ['C']
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Processed</span>', dataIndex: 'QPOLIC',
                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },
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
                                    id: prototype.id + '-SummaryMainDataSource',
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'left',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:11px'
                                    },
                                    items: [
                                        {
                                            width: 102,
                                            id: prototype.id + '-SPACESOURCE',
                                            style: 'background:#c9daf5; text-align:center; font-weight:bold; color:black;',
                                            html: 'Totals'
                                        },
                                        {width: 100, id: prototype.id + '-TOTAL_QSALES_SOURCE', style: 'background: #F9D88C;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QMATCH_SOURCE', style: 'background: #D1FBD2;text-align:right'},
                                        {width: 70, id: prototype.id + '-TOTAL_PCT_MATCH_SOURCE', style: 'background: #D1FBD2;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QMANUAL_SOURCE', style: 'background: #D1FBD2;text-align:right'},
                                        {width: 120, id: prototype.id + '-TOTAL_QPEND_SOURCE', style: 'background: #FFA8A8;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QPOLIPE_SOURCE', style: 'background: #FFA8A8;text-align:right'},
                                        {width: 100, id: prototype.id + '-TOTAL_QPOLIC_SOURCE', style: 'background: #D1FBD2;text-align:right'}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    margin: '20 0 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayBarSMSource',
                                            width: 1100,
                                            height: 260,
                                            insetPadding: 10,
                                            border: false,
                                            background: '#FFFFFF',
                                            legend: {docked: 'bottom'},
                                            axes: [
                                                {type: 'numeric', position: 'left', title: 'Cantidad', grid: true},
                                                {type: 'category', position: 'bottom', title: 'Source'}
                                            ],
                                            series: [{
                                                    type: 'bar',
                                                    xField: 'source',
                                                    yField: ['TicketTotal', 'TicketMatch', 'TicketPending'],
                                                    title: ['Ticket Total', 'Ticket Match', 'Ticket Pending'],
                                                    stacked: false,
                                                    style: {opacity: 0.95},
                                                    colors: ['#F9D88C', '#B8E986', '#FFA8A8'],
                                                    highlightCfg: {fillStyle: '#FFF2A8'},
                                                    tooltip: {
                                                        trackMouse: true,
                                                        renderer: function (tooltip, record, item) {
                                                            tooltip.setHtml(
                                                                    item.series.getTitle()[item.series.getYFieldIndex(item.field)]
                                                                    + ': ' +
                                                                    Ext.util.Format.number(record.get(item.field), '0,0')
                                                                    );
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="DETALLE PENDIENTE PRINCIPAL">
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1200,
                            id: prototype.id + '-panelGridDataDetailPrincipal',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailPrincipal',
                                    minHeight: 200,
                                    width: 1000,
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
                                            {text: '<span style="color:black;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40, style: 'padding:2px; background: #c9daf5;'},
                                            {text: '<span style="color:black;font-weight:bold;">Ticket</span>', dataIndex: 'strTicket', width: 120, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 120, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    if (value == "1") {
                                                        return "Match"
                                                    } else if (value == "5") {
                                                        return "Match Manual"
                                                    } else {
                                                        return  "Sales Without Liqui.";
                                                    }
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Source</span>', dataIndex: 'CFUENTE', width: 60, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'strPEM', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Sales Date</span>', dataIndex: 'SDATE', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 90, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Transaction</span>', dataIndex: 'TRNCU', width: 90, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Days Pending</span>', dataIndex: 'DIFFDAYS', width: 94, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 75, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'SVFOP', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value;
                                                }
                                            },
//                                            {
//                                                text: '<span style="color:black;font-weight:bold;">Tickets</span>', menuDisabled: true, style: 'background:#c9daf5;color:black !important',
//                                                columns: [
//                                                    {
//                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
//                                                        dataIndex: 'QSALES', width: 100, style: 'background:#F9D88C;color:black !important', align: 'center ', menuDisabled: true, //flex: 1
//
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#2B2B2B;text-align:right;";
//                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                            return  value;
//                                                        },
//                                                    },
//                                                    {
//                                                        text: '<span style="color:black;font-weight:bold;">Match</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
//                                                        menuDisabled: true,
//                                                        columns: [
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>', dataIndex: 'QMATCH',
//                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return  value;
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
//                                                                dataIndex: 'PCT_MATCH',
//                                                                style: 'background:#D1FBD2;color:black !important',
//                                                                width: 70,
//                                                                align: 'center',
//                                                                menuDisabled: true,
//
//                                                                renderer: function (value, metaData, record) {
//
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//
//                                                                    if (value === null || value === undefined) {
//                                                                        return '<b>0.00 %</b>';
//                                                                    }
//
//                                                                    // Formatear con 2 decimales
//                                                                    let pct = Ext.util.Format.number(value, '0.00');
//
//                                                                    return '<b>' + pct + ' %</b>';
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>', dataIndex: 'QMANUAL',
//                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return  value;
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">W/O Settlement</span>', dataIndex: 'QPEND',
//                                                                style: 'background:#FFA8A8;color:black !important', width: 120, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return value;
//                                                                },
//                                                                listeners: {
//                                                                    click: 'onGridDataDetail'
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
//                                                    {
//                                                        text: '<span style="color:black;font-weight:bold;">Accounted</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
//                                                        menuDisabled: true,
//                                                        columns: [
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Pending</span>', dataIndex: 'QPOLIPE',
//                                                                style: 'background:#FFA8A8;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return value;
//                                                                },
//                                                                listeners: {
//                                                                    click: 'onGridDataDetail'
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Processed</span>', dataIndex: 'QPOLIC',
//                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return  value;
//                                                                },
//                                                            }
//                                                        ]
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="DETALLE SECUNDARIO">
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1400,
                            id: prototype.id + '-panelGridDataDetailSecundary',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailSecundary',
                                    minHeight: 200,
                                    width: 1160,
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
                                            {text: '<span style="color:black;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40, style: 'padding:2px; background: #c9daf5;'},
                                            {text: '<span style="color:black;font-weight:bold;">Ticket</span>', dataIndex: 'strTicket', width: 120, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 120, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    if (value == "1") {
                                                        return "Match"
                                                    } else if (value == "5") {
                                                        return "Match Manual"
                                                    } else {
                                                        return  "Sales Without Liqui.";
                                                    }
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Source</span>', dataIndex: 'CFUENTE', width: 60, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'strPEM', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Sales Date</span>', dataIndex: 'SDATE', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 90, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Transaction</span>', dataIndex: 'TRNCU', width: 90, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Days Pending</span>', dataIndex: 'DIFFDAYS', width: 94, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Amount</span>',
                                                style: 'text-align:center; background:#c9daf5;',
                                                columns: [
                                                    {text: '<span style="color:black;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 75, style: 'padding:2px; background: #c9daf5;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }},
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">SVFOP</span>',
                                                        dataIndex: 'SVFOP',
                                                        width: 90,
                                                        align:'center',
                                                        style: 'background:#c9daf5;',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">SVFOPNETR</span>',
                                                        dataIndex: 'SVFOPNETR',
                                                        width: 90,
                                                        align:'center',
                                                        style: 'background:#c9daf5;',
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "color:#2B2B2B;text-align:right;";
                                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEdit_SECUNDARY',
                                                width: 60,
                                                style: 'padding:2px; background: #c9daf5;',
                                                text: '<span style="color:black;font-weight:bold;">View</span>',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'View',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
//                                            {
//                                                text: '<span style="color:black;font-weight:bold;">Tickets</span>', menuDisabled: true, style: 'background:#c9daf5;color:black !important',
//                                                columns: [
//                                                    {
//                                                        text: '<span style="color:black;font-weight:bold;">Total</span>',
//                                                        dataIndex: 'QSALES', width: 100, style: 'background:#F9D88C;color:black !important', align: 'center ', menuDisabled: true, //flex: 1
//
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#2B2B2B;text-align:right;";
//                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                            return  value;
//                                                        },
//                                                    },
//                                                    {
//                                                        text: '<span style="color:black;font-weight:bold;">Match</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
//                                                        menuDisabled: true,
//                                                        columns: [
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Auto</span>', dataIndex: 'QMATCH',
//                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return  value;
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">%</span>',
//                                                                dataIndex: 'PCT_MATCH',
//                                                                style: 'background:#D1FBD2;color:black !important',
//                                                                width: 70,
//                                                                align: 'center',
//                                                                menuDisabled: true,
//
//                                                                renderer: function (value, metaData, record) {
//
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//
//                                                                    if (value === null || value === undefined) {
//                                                                        return '<b>0.00 %</b>';
//                                                                    }
//
//                                                                    // Formatear con 2 decimales
//                                                                    let pct = Ext.util.Format.number(value, '0.00');
//
//                                                                    return '<b>' + pct + ' %</b>';
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Manual</span>', dataIndex: 'QMANUAL',
//                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return  value;
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">W/O Settlement</span>', dataIndex: 'QPEND',
//                                                                style: 'background:#FFA8A8;color:black !important', width: 120, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return value;
//                                                                },
//                                                                listeners: {
//                                                                    click: 'onGridDataDetail'
//                                                                }
//                                                            }
//                                                        ]
//                                                    },
//                                                    {
//                                                        text: '<span style="color:black;font-weight:bold;">Accounted</span>', menuDisabled: true, style: 'background:#D1FBD2;color:black !important',
//                                                        menuDisabled: true,
//                                                        columns: [
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Pending</span>', dataIndex: 'QPOLIPE',
//                                                                style: 'background:#FFA8A8;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return value;
//                                                                },
//                                                                listeners: {
//                                                                    click: 'onGridDataDetail'
//                                                                }
//                                                            },
//                                                            {
//                                                                text: '<span style="color:black;font-weight:bold;">Processed</span>', dataIndex: 'QPOLIC',
//                                                                style: 'background:#D1FBD2;color:black !important', width: 100, align: 'center', menuDisabled: true,
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                    return  value;
//                                                                },
//                                                            }
//                                                        ]
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="DETALLE PENDIENTE PRINCIPAL SOURCE">
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1200,
                            id: prototype.id + '-panelGridDataDetailPrincipalSource',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailPrincipalSource',
                                    minHeight: 200,
                                    width: 1000,
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
                                            {text: '<span style="color:black;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40, style: 'padding:2px; background: #c9daf5;'},
                                            {text: '<span style="color:black;font-weight:bold;">Ticket</span>', dataIndex: 'strTicket', width: 120, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 120, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    if (value == "1") {
                                                        return "Match"
                                                    } else if (value == "5") {
                                                        return "Match Manual"
                                                    } else {
                                                        return  "Sales Without Liqui.";
                                                    }
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Source</span>', dataIndex: 'CFUENTE', width: 60, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Type</span>', dataIndex: 'strPEM', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Sales Date</span>', dataIndex: 'SDATE', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 90, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Transaction</span>', dataIndex: 'TRNCU', width: 90, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Days Pending</span>', dataIndex: 'DIFFDAYS', width: 94, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 75, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'SVFOP', width: 80, style: 'padding:2px; background: #c9daf5;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return  value;
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                                // </editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: 430,
                    height: 30,
                    margin: '18 0 0 0 ',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            bodyStyle: 'background: #c9daf5; border-radius: 5px;',
                            xtype: 'panel',
                            width: '100%',
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
                                    style: 'margin-top: 7px;color:black;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50,
                                    style: 'margin-top: 7px;color:black;font-weight:bold'
                                },
                                {
                                    text: 'OF',
                                    width: 45,
                                    style: 'margin-top: 7px;color:black;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50,
                                    style: 'margin-top: 7px;color:black;font-weight:bold'
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    text: 'Total Found',
                                    width: 80,
                                    style: 'margin-top: 7px;color:black;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 40,
                                    style: 'margin-top: 7px;color:black;font-weight:bold'
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



