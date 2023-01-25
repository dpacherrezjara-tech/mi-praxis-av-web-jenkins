Ext.define('Ext.Praxis.view.payments.SalesCompensationForm.Info', {
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
                width: 1780,
                height: 600,
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
                            height: 580,
                            width: 1780,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    height: 553,
                                    width: 1768,
                                    hidden: false,
                                    columnLines: true,
                                    features: {
                                        dock: 'bottom',
                                        ftype: 'summary',
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'BSUMDATE', width: 100},
                                                ]
                                            },
                                            {text: 'Ticket', dataIndex: 'ISREFNBR', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-compensation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Associated<br>Ticket', dataIndex: 'A1721FRCA', width: 120,
                                                listeners: {
                                                    click: 'viewTicketAS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-compensation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'SCARDN', width: 125},
                                                    {text: 'Auth.', dataIndex: 'SAUTHOC', width: 60},
                                                ]
                                            },
                                            {text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'TRANSDATE', width: 100},
                                                    {text: 'Cur.', dataIndex: 'PCURRENCY', width: 60},
                                                    {text: 'Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'PAYDATE', width: 100},
                                                    {text: 'Merchant', dataIndex: 'MERCHID', width: 100},
                                                ]
                                            },
                                            {text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'PNR', dataIndex: 'SPNR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Counter', dataIndex: 'A720FRESV', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Orig', dataIndex: 'A720RUTA0', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Dest', dataIndex: 'A720RUTA1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'RFIC', dataIndex: 'RFIC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#AFDBF3;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Number', dataIndex: 'A720NVLO1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#AFDBF3;";
                                                                    return  value;
                                                                }
                                                            },
                                                            {text: 'Date', dataIndex: 'A720FVLO1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background-color:#AFDBF3;";
                                                                    return  value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'descSTVAL', width: 100},
                                            {text: 'Reason', dataIndex: 'desCERROR', width: 100},
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 7, height: 5},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: 1115,
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
                                            width: 1164,
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
                            xtype: 'panel',
                            id: prototype.id + '-panelChartData',
                            bodyStyle: 'background: transparent;',
                            padding: '1',
                            border: false,
                            height: 800,
                            width: 1700,
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelCData',
                                    bodyStyle: 'background: transparent;',
                                    padding: '1',
                                    border: false,
                                    height: 350,
                                    //width: 304,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCData',
                                            border: false,
                                            //height: 280,
                                            width: 362,
                                            hidden: false,
                                            columnLines: true,
                                            features: {
                                                dock: 'bottom',
                                                ftype: 'summary',
                                            },
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Sales Date', dataIndex: 'BSUMDATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Qty Tickets', dataIndex: 'QTY_TRANSACTIONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridCData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY_TRANSACTIONS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Curr.', dataIndex: 'PCURRENCY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Total Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridCData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-displayChart1',
                                            width: 1000,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Total Amount per Month',
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
                                                    fields: ['TGROSAMOUN'],
                                                    grid: true,
                                                    title: '',
                                                    minimum: -1000000,
                                                    maximum: 0,
                                                    //title: 'Millions of USD',
                                                    renderer: function (obj, value) {
                                                        /*if (value > 1) {
                                                         return  ' ' + Ext.util.Format.number(value);
                                                         } else {
                                                         return '0';
                                                         }*/
                                                        return  ' ' + Ext.util.Format.number(value);
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                    grid: true,
//                                                    title: {
//                                                        text: 'Dates',
//                                                        translationX: -30
//                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    //title: ['Amount', 'Commision', 'Tax', 'YQ + YR'],
                                                    xField: 'BSUMDATE',
                                                    yField: ['TGROSAMOUN'],
                                                    colors: ['#43aaf7'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['TGROSAMOUN'],
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
                                                            toolTip.setHtml(record.get('BSUMDATE') + ' :  ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>' + ' ' + record.get('PCURRENCY'));
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelCData1',
                                    bodyStyle: 'background: transparent;',
                                    padding: '1',
                                    border: false,
                                    height: 350,
                                    //width: 444,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCData1',
                                            //height: 350,
                                            width: 443,
                                            hidden: false,
                                            columnLines: true,
                                            features: {
                                                dock: 'bottom',
                                                ftype: 'summary',
                                            },
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Merchant', dataIndex: 'SMERCHID', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'DES_MERCHANT', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        },
                                                    },
                                                    {text: 'Curr.', dataIndex: 'PCURRENCY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Total Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridCData1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-displayChart2',
                                            width: 400,
                                            border: false,
                                            margin: '0 0 0 5',
                                            innerPadding: 40,
                                            height: 290,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Total Amount per Merchant',
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
                                                    angleField: 'TGROSAMOUN',
                                                    colors: ['#43aaf7', '#339933', '#EC3838', '#ff9900', '#0066ff', '#ffff99'],
                                                    label: {
                                                        field: 'DES_MERCHANT',
//                                                            field: 'TYPE',
//                                                                display: 'rotate',
//                                                                contrast: true,
//                                                                font: '12px Arial'
                                                    },
//                                                        style: {
//                                                            miterLimit: 100,
//                                                            lineCap: 'miter',
//                                                            lineWidth: 50
//                                                        },
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
                                                            toolTip.setHtml(record.get('DES_MERCHANT') + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '' + '</b>' + ' ' + record.get('PCURRENCY'));
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                },
                            ]
                        },
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


