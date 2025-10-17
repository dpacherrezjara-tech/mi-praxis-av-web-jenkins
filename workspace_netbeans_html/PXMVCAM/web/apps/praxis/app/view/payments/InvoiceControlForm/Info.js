Ext.define('Ext.Praxis.view.payments.InvoiceControlForm.Info', {
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
                            width: 1327,
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
                                    id: prototype.id + '-gridDataDetail',
                                    height: 510,
                                    width: 910,
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
                                            
                                            {text: '<span style="color:black;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40,style: 'padding:2px; background: #c9daf5;border-color:white',},
                                            {text: '<span style="color:black;font-weight:bold;">Sale Date</span>', dataIndex: 'SDATE', width: 80,style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:black;font-weight:bold;">Invoice</span>', dataIndex: 'INVOICE', width: 160,style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:black;font-weight:bold;">Currency</span>', dataIndex: 'CURRENCY', width: 70,style: 'padding:2px; background: #c9daf5;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var data = record.data;
                                                                metaData.style = "text-align:center;";

                                                                return  value;
                                                            }
                                                        },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Avianca</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                 menuDisabled: true,
                                                columns: [
                                                    
                                                       
                                                        {text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'SVFOPL', align: 'center',width: 110,style: 'background: #FBD2D1;border-color:white',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                }},
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Praxis</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                 menuDisabled: true,
                                                columns: [
                                                    {text:  '<span style="color:black;font-weight:bold;">Amount</span>', align: 'center',dataIndex: 'SUM_MPF100', width: 90,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },},
                                                    {text:  '<span style="color:black;font-weight:bold;">Difference</span>' ,align: 'center', dataIndex: 'DIFFERENCE_100', width: 90,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },}
                                                ]
                                            },
                                             {
                                                text: '<span style="color:black;font-weight:bold;">Accounting</span>', menuDisabled: true,style:'background:#CFE9F6;color:black !important',
                                                 menuDisabled: true,
                                                columns: [
                                                    {text:  '<span style="color:black;font-weight:bold;">Amount</span>',align: 'center', dataIndex: 'SUM_ACTIVE', width: 90,style: 'background: #CFE9F6;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },},
                                                    {text:  '<span style="color:black;font-weight:bold;">Difference</span>' ,align: 'center', dataIndex: 'DIFFERENCE', width: 90,style: 'background: #CFE9F6;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },}
                                                ]
                                            },
                                             {
                                                text: '<span style="color:black;font-weight:bold;">Praxis</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                 menuDisabled: true,
                                                columns: [
                                                    {text:  '<span style="color:black;font-weight:bold;">Pending</span>', align: 'center',dataIndex: 'PENDING_MPF100', width: 90,style: 'background: #D1FBD2;border-color:white',renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },},
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1445,
                            id: prototype.id + '-panelGridDataHistoric',
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
                                    id: prototype.id + '-gridDataHistoric',
                                    height: 510,
                                    width: 1445,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            
                                            {text: 'Nbr', dataIndex: 'RN', width: 40,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Merchant Code', dataIndex: 'CMERCHAN', width: 145,style: 'padding:2px; background: #3F5675;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Merchant Branch', dataIndex: 'SUCMERCH', width: 128,style: 'padding:2px; background: #3F5675;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Process',style: 'background: #3F5675;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODE', width: 90,style: 'background: #3F5675;border-color:white',},
                                                    {text: 'Name', dataIndex: 'CORE', width: 140, align: 'left',style: 'background: #3F5675;border-color:white', }
                                                ]
                                            },
                                            {text: 'Mode Down Report', dataIndex: 'DREPORT', width: 240,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 1', dataIndex: 'FRANC1', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 2', dataIndex: 'FRANC2', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 3', dataIndex: 'FRANC3', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 4', dataIndex: 'FRANC4', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Effective Date',style: 'background: #3F5675;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date Init', dataIndex: 'DEFFEC', width: 80, align: 'center',style: 'background: #3F5675;border-color:white'},
                                                    {text: 'Date End', dataIndex: 'DFINAL', width: 80, align: 'center',style: 'background: #3F5675;border-color:white'},
                                                    {text: 'Secuence', dataIndex: 'SEQ', width: 80, align: 'center',style: 'background: #3F5675;border-color:white'}
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEdit2',
                                                width: 60,
                                                text: 'View',
                                                align: 'center',
                                                style: 'padding:2px; background: #3F5675;border-color:white',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onViewMirror'
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
                            width: 1200,
                            id: prototype.id + '-panelGridSumaryMain',
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
                                    width: 587,
                                    useArrows: true,
                                    rootVisible: false,
                                    multiSelect: true,
                                    columnLines: true,
                                    rowLines: true,
                                    scrollable: true,
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
                                                text: '<span style="color:black;font-weight:bold;">Month</span>', style:'background:#c9daf5;color:black !important',
                                                dataIndex: 'strFormatDate', width: 100, align: 'center', xtype: 'treecolumn',
                                                listeners: {
                                                    click: 'onGridCountry'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    value = '<b>' + value + '</b>';
                                                    return  !record.data.children ? ' ' : value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Society</span>', style:'background:#c9daf5;color:black !important',
                                                dataIndex: 'CCUST',
                                                width: 85,
                                                align: 'center', // centra a nivel de columna (por defecto)
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center; color:#008FE3; text-decoration:underline; display:block; text-align:center;cursor:pointer";

                                                    const strCCUST = {
                                                        '2K01': 'AEROGAL',
                                                        'AB01': 'BRASIL',
                                                        'AV01': 'AVIANCA',
                                                        'LR01': 'LACSA',
                                                        'TA01': 'TACA'
                                                    };

                                                    const displayText = strCCUST[value] || 'AV GROUP';
                                                    return displayText;
                                                },
                                                listeners: {
                                                    click: 'onGridDataDetail'
                                                }
                                            },
                                            {
                                                        text: '<span style="color:black;font-weight:bold;">Total Invoice </span>', menuDisabled: true,style:'background:#c9daf5;color:black !important',
                                                        columns: [
                                                             {
                                                                text: '<span style="color:black;font-weight:bold;">Avianca</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                                 menuDisabled: true,
                                                                columns: [
                                                                    {
                                                               text: '<span style="color:black;font-weight:bold;">Currency</span>', dataIndex: 'CURRENCY', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                                
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:center;";
                                                                    return '<b>USD<b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>USD<b>';
                                                                }
                                                            },
                                                            {
                                                               text: '<span style="color:black;font-weight:bold;">Qty</span>', dataIndex: 'QTY_INVOICES', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDataDetail'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Amount</span>', dataIndex: 'SVFOPL',
                                                                style:'background:#FBD2D1;color:black !important',width: 120, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                                ]
                                                            },
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Praxis</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                                 menuDisabled: true,
                                                                columns: [
                                                                    
                                                                         {
                                                                text:  '<span style="color:black;font-weight:bold;">Qty</span>' , dataIndex: 'QTY_100_ALL',
                                                                style:'background:#D1FBD2;color:black !important',width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                                         {
                                                                  text:  '<span style="color:black;font-weight:bold;">Pending</span>' ,
                                                                 dataIndex: 'QTY_100_PENDING', width: 70, style:'background:#F9D88C;color:black !important',align: 'center ', menuDisabled: true, //flex: 1

                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                     metaData.style = "color:#2B2B2B;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totARMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                                ]
                                                            },
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
                                            align: 'center',
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
                                            {width: 70, id: prototype.id + '-CURRENCY',style:'background: #FBD2D1;text-align:right'},
                                            {width: 70, id: prototype.id + '-QTY_INVOICES',style:'background: #FBD2D1;text-align:right'},
                                            {width: 120, id: prototype.id + '-SVFOPL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 70, id: prototype.id + '-QTY_100_ALL',style:'background: #D1FBD2;text-align:right'},
                                            {width: 70, id: prototype.id + '-QTY_100_PENDING',style:'background: #F9D88C;text-align:right'}
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
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolarSM',
                                                    width: 490,
                                                    hidden: true,
                                                    border: false,
                                                    bodyBorder: false,
                                                    bodyStyle: {
                                                        border: 'none',
                                                        background: '#FFFFFF'
                                                    },
                                                    innerPadding: 28,
                                                    height: 260,
                                                    background: '#FFFFFF',
                                                    animation: { duration: 200 },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    legend: {
                                                        docked: 'right',
                                                        itemSpacing: 10,
                                                        marker: { size: 16 },
                                                        label: { fontSize: 13 },
                                                        style: { background: '#FFFFFF' }
                                                    },
                                                    series: [{
                                                        type: 'pie3d',
                                                        angleField: 'Perc2',
                                                        legendField: 'LABEL',
                                                        distortion: 0.7,
                                                        colors: ['#A7C7F2', '#B8E986', '#F9D88C'],
                                                        label: {
                                                            field: 'VENDOR',
                                                            display: 'outside',
                                                            font: '11px Arial',
                                                            calloutLine: { length: 25, width: 1 },
                                                            renderer: function (value) {
                                                                return value.split('\n')[1];
                                                            }
                                                        },
                                                        highlightCfg: { margin: 10 },
                                                        tooltip: {
                                                            trackMouse: true,
                                                            renderer: function (toolTip, record) {
                                                                toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                            }
                                                        }
                                                    }]
                                                },
                                        {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayBarSM',
                                                    width: 1100,
                                                    height: 260,
                                                    insetPadding: 10,
                                                    border: false,
                                                    background: '#FFFFFF',
                                                    legend: { docked: 'bottom' },
                                                    axes: [
                                                        { type: 'numeric', position: 'left', title: 'Cantidad', grid: true },
                                                        { type: 'category', position: 'bottom', title: 'Mes' }
                                                    ],
                                                    series: [{
                                                        type: 'bar',
                                                        xField: 'month',
                                                        yField: ['Avianca', 'PraxisTotal', 'PraxisPend'],
                                                        title: ['Avianca', 'Praxis Total', 'Praxis Pendiente'],
                                                        stacked: false, // Barras agrupadas
                                                        style: { opacity: 0.95 },
                                                        colors: ['#A7C7F2', '#B8E986', '#F9D88C'], // 🎨 tonos pastel
                                                        highlightCfg: { fillStyle: '#FFF2A8' },
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
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:black'
                        }
                    ]
                }
            ]
        }
    ]
}
);
