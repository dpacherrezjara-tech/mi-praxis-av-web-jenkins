valor = '0';
Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #F4F7FD;',
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
                width: 1800,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #F4F7FD;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            hidden: true,
                            width: 1800,
                            margin: '20 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
//                            margin: '20 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
//                                            margin: '0 0 0 25',
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'treepanel',
                                                    id: prototype.id + '-gridData',
                                                    width: 1315,
//                                            height: 337 ,
                                                    reserveScrollbar: true,
                                                    useArrows: true,
                                                    rootVisible: false,
                                                    multiSelect: true,
                                                    columnLines: true,
                                                    rowLines: true,

//                                            columnLines: true,
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
                                                                text: 'Sales<br>Date', dataIndex: 'strFormatDate', width: 150, xtype: 'treecolumn',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    console.log(record.data, 'sales dateeeee')
                                                                    let valor = '';

                                                                    if (record.data.children && record.data.children[0].FCHILD === '1') {
                                                                        valor = value;
                                                                    } else if (record.data.children && record.data.children[0].FCHILD === '0') {
                                                                        valor = value;
                                                                    } else {
                                                                        valor = ' ';
                                                                    }
                                                                    return valor;
                                                                },
//                                                id: prototype.id + '-adgTitFecha',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                            },
                                                            {
                                                                text: 'Av Group', dataIndex: 'CCUST', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
//                                                                        metaData.style = "text-align:right;color:#057ECB";
                                                                    console.log(record, 'record')
                                                                    let strCCUST = {
                                                                        134: 'AVIANCA',
                                                                        133: 'LACSA',
                                                                        202: 'TACA',
                                                                        547: 'AEROGAL',

                                                                    }
                                                                    let styleHref = '<u><a href="#payments-balance-analysis-by-age-form" style="color:#008FE3;text-decoration:underline;">';
                                                                    let styleHref2 = '</a></u>';

                                                                    if (Ext.getCmp(prototype.id + '-cmbAviancaGroup').getValue() !== '') {
                                                                        return styleHref + strCCUST[record.data.children[0].CCUST] + styleHref2;
                                                                    } else {
                                                                        return  strCCUST[value] ? styleHref + strCCUST[value] + styleHref2 : 'AV GROUP';
                                                                    }
                                                                },

                                                                listeners: {
                                                                    click: 'onGridCountryTotal'
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
//                                                id: prototype.id + '-adgSalDate',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tickets', dataIndex: 'QSALES', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totQSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount<br>USD', dataIndex: 'ASALES', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totASALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            let data = record.data;

//                                                                    let perc1 = data.totASALES === 0 ? 0 : (data.ASALES / data.totASALES) * 100;
                                                                            return Ext.util.Format.number(value, '0.00%');
                                                                        }
                                                                    }
                                                                ]
                                                            },

                                                            {
                                                                text: 'Payed',
                                                                id: prototype.id + '-headMonthAcc',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tickets', dataIndex: 'QMATCH', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totQMATCH, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount<br>USD', dataIndex: 'AMATCH', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAMATCH, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },

                                                            {
                                                                text: 'Pending',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tickets', dataIndex: 'QPEND', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#ee7070;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totQPEND, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount<br>USD', dataIndex: 'APEND', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#ee7070;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAPEND, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#ee7070;";
                                                                            let data = record.data;
                                                                            let perc3 = data.ASALES === 0 ? 0 : (data.APEND / data.ASALES) * 100;
                                                                            return  Ext.util.Format.number(perc3, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Accounted',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Processed',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Tickets', dataIndex: 'QPOLIC', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.totQPOLIC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount<br>USD', dataIndex: 'APOLIC', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.totAPOLIC, '0,000');
                                                                                }

                                                                            },
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Pending',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Tickets', dataIndex: 'QPOLIPE', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ee7070;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.totQPOLIPE, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount<br>USD', dataIndex: 'APOLIPE', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ee7070;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.totAPOLIPE, '0,000');
                                                                                }
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-SummaryCardData',
                                                    width: 1315,
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

                                                        {width: 330, id: prototype.id + '-totQSALES'},
                                                        {width: 100, id: prototype.id + '-totASALES'},
                                                        {width: 60, id: prototype.id + '-perc1'},
                                                        {width: 90, id: prototype.id + '-totQMATCH'},
                                                        {width: 100, id: prototype.id + '-totAMATCH'},
                                                        {width: 90, id: prototype.id + '-totQPEND'},
                                                        {width: 100, id: prototype.id + '-totAPEND'},
                                                        {width: 60, id: prototype.id + '-perc3'},
                                                        {width: 90, id: prototype.id + '-totQPOLIC'},
                                                        {width: 100, id: prototype.id + '-totAPOLIC'},
                                                        {width: 90, id: prototype.id + '-totQPOLIPE'},
                                                        {width: 100, id: prototype.id + '-totAPOLIPE'},
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            margin: '0 0 0 25',
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        pack: 'center'
                                                    },
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST',
                                                            width: 450,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#ea0000', '#5dd92d'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal_T',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: false,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST_T',
                                                            width: 450,
                                                            border: true,
                                                            margin: '0 0 0 5',
                                                            hidden: false,
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#ea0000', '#5dd92d'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal2',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST2',
                                                            width: 450,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#5dd92d', '#ea0000'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal2_T',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: false,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST2_T',
                                                            width: 450,
                                                            border: true,
                                                            margin: '0 0 0 5',
                                                            hidden: false,
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#5dd92d', '#ea0000'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 0 2 0',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        margin: '4 0'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 800},
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbgFlagaa',
                                            margin: '0 0 0 500',
                                            items: [
                                                {boxLabel: '<b style="color:#046AAA;">Tickets</b>', inputValue: 'Cpn', name: 'rbgFlag', checked: true},
                                                {xtype: 'tbspacer', width: 20},
                                                {boxLabel: '<b style="color:#046AAA;">Amounts</b>', inputValue: 'Amt', name: 'rbgFlag', width: 80}
                                            ],
                                            listeners: {
                                                change: 'displayChart_ByMonth'
                                            }
                                        }
                                    ]
                                },
                                //PANEL DE GRAFICOS
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
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            padding: '5 0 0 5',
                                            border: true,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-graficosAños',
                                                    width: 1500,
                                                    border: false,
                                                    height: 400,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Totals Tickets by Sales Date ',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'
                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['QSALES', 'QMATCH', 'QPEND'],
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
                                                                text: 'Sales Date',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Sales', 'Paid', 'Pending'],
                                                            xField: 'strFormatDate',
                                                            yField: ['QSALES', 'QMATCH', 'QPEND'],

                                                            colors: ['#0066ff', '#5dd92d', '#ea0000'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 1000
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'QSALES') {
                                                                        label = 'Sales';
                                                                    } else if (ctx.field === 'QMATCH') {
                                                                        label = 'Conciliation';
                                                                    } else if (ctx.field === 'QPEND') {
                                                                        label = 'Pending';
                                                                    }
                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-graficosAñosAmount',
                                                    width: 1500,
                                                    hidden: true,
                                                    border: false,
                                                    height: 400,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Totals Amount by Sales Date \n\ USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'
                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['ASALES', 'AMATCH', 'APEND'],
                                                            grid: true,
                                                            title: '',
                                                            //title: 'Millions of USD',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    if ((value / 1000).toString().length > 3) {
                                                                        return  ' $' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                                                    } else {
                                                                        return  ' $' + Ext.util.Format.number((value / 1000), '0') + 'K';
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
                                                                text: 'Sales Date',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Sales', 'Conciliation', 'Pending'],
                                                            xField: 'strFormatDate',
                                                            yField: ['ASALES', 'AMATCH', 'APEND'],
                                                            colors: ['#0066ff', '#5dd92d', '#ea0000'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 1000
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'ASALES') {
                                                                        label = 'Sales';
                                                                    } else if (ctx.field === 'AMATCH') {
                                                                        label = 'Conciliation';
                                                                    } else if (ctx.field === 'APEND') {
                                                                        label = 'Pending';
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
                            bodyStyle: 'background-color: #F4F7FD;',
                            id: prototype.id + '-panelGridCountryTotal',
                            border: false,
                            height: 'auto',
                            hidden: true,
//                            margin: '10 0 10 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCountryTotal',
                                            width: 1225,
//                                            height: 337 ,
                                            columnLines: true,
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
                                                        text: 'Country', dataIndex: 'descSCOUNTRY', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";

                                                            return  value;
                                                        },
//                                                id: prototype.id + '-adgTitFecha',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                    },

                                                    {
                                                        text: 'Sales',
//                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QSALES', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQSALES, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount<br>USD', dataIndex: 'ASALES', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totASALES, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'perc1', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    let data = record.data;

                                                                    let perc1 = data.totASALES === 0 ? 0 : (data.ASALES / data.totASALES) * 100;
                                                                    return Ext.util.Format.number(perc1, '0.00%');
                                                                }
                                                            }
                                                        ]
                                                    },

                                                    {
                                                        text: 'Payed',
//                                                id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QMATCH', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQMATCH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount<br>USD', dataIndex: 'AMATCH', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totAMATCH, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },

                                                    {
                                                        text: 'Pending',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QPEND', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ee7070;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQPEND, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount<br>USD', dataIndex: 'APEND', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ee7070;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totAPEND, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'perc3', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ee7070;";
                                                                    let data = record.data;
                                                                    let perc3 = data.ASALES === 0 ? 0 : (data.APEND / data.ASALES) * 100;
                                                                    return  Ext.util.Format.number(perc3, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Accounted',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Processed',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tickets', dataIndex: 'QPOLIC', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totQPOLIC, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount<br>USD', dataIndex: 'APOLIC', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAPOLIC, '0,000');
                                                                        }

                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Pending',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tickets', dataIndex: 'QPOLIPE', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#ee7070;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totQPOLIPE, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount<br>USD', dataIndex: 'APOLIPE', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#ee7070;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridCountryTotal').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totAPOLIPE, '0,000');
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGrafCountryTotal',
                                                    width: 520,
                                                    border: false,

                                                    height: 550,
                                                    background: '#E0F8F7',
                                                    margin: '30 0 0 5',
                                                    flipXY: true,
                                                    //                                                    width: 260,
                                                    //                                                    height: 520,

                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart',
                                                            text: 'Country',
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'

                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'bottom',
                                                            fields: ['AMOUNT'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            },

                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'left',
                                                            grid: true,
                                                            fields: 'strDescription',
                                                            title: {
                                                                translationX: -30
                                                            },
                                                            label: {
                                                                textAlign: 'left'
                                                            },
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            //xField: ['AMOUNT'],
                                                            xField: 'strDescription',
                                                            yField: ['AMOUNT'],
                                                            colors: ['#5dd92d'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        }
                                    ]
                                }


                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            height: 'auto',
                            width: 1672,
                            margin: '10 0 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid',
//                                    text: '2024 - All Countries',
                                    labelAlign: 'center',
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1672,
                                    columnLines: true,
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
//                                            {text: 'Nbr.', dataIndex: 'RN', width: 40},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    let data = record.data;
//                                                    let descScountry = data.descSCOUNTRY != undefined
                                                    metaData.tdAttr = 'data-qtip="' + data.descSCOUNTRY + '"';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                    return '<b>' + 'Total' + '<b>';
                                                },
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Name', dataIndex: 'descSAGENT', width: 340,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTOTAL, '0,000') + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'SCURREVEN', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '10 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT10', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT10, '0,000') + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS10', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD10, '0,000') + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '30 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT30', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT30, '0,000') + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS30', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD30, '0,000') + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '60 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT60', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fffc90;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT60, '0,000') + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS60', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fffc90;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD60, '0,000') + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '90 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT90', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fffc90;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT90, '0,000') + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS90', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fffc90;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD90, '0,000') + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '120 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT120', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ff745b;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT120, '0,000') + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS120', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ff745b;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD120, '0,000') + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: '999 DAYS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYTKT999', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ff745b;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT999, '0,000') + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS999', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ff745b;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD999, '0,000') + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxPendingData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            height: 'auto',
//                            width: 1222,
                            hidden: true,
                            margin: '10 0 10 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid2',
                                    labelAlign: 'center',
                                    hidden: true,
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [

                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridPendingData',
                                            width: 1242,
                                            columnLines: true,
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
                                                    {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        },
                                                    },
                                                    {text: 'Days<br>old', dataIndex: 'DIFFDAYS', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            let data = record.data;
//                                                    let descScountry = data.descSCOUNTRY != undefined
                                                            metaData.tdAttr = 'data-qtip="' + data.descSCOUNTRY + '"';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                        listeners: {
                                                            click: 'clickColumnFilters'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<a href="#payments-balance-analysis-by-age-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Canal', dataIndex: 'CANAL', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Name', dataIndex: 'descSAGENT', width: 340,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            console.log('hola mundo');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Total USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKT', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSD', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paid USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKTP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKTP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDP, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Pending USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDPENDING', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridPendingData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDPENDING, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Percentage %',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: '% Paid', dataIndex: 'PERCPAID', width: 60, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    let data = record.data;
//                                                                    if (data.PERCPENDING >= 80) {
//                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
//                                                                    } else {
                                                                    metaData.style = "text-align:right;background-color:#84ff7a;";
//                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                            {
                                                                text: '% Pending', dataIndex: 'PERCPENDING', width: 75, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value >= 80) {
                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#84ff7a;";
                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        pack: 'center'
                                                    },
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittlePaid',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            align: 'center',
                                                            margin: '5 0 5 135',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolar',
                                                            width: 520,
                                                            border: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 30,
                                                            height: 260,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#d82c2c', '#5dd92d'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                    ]
                                                },

                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGraf',
                                                    width: 520,
                                                    border: false,
                                                    height: 260,
                                                    background: '#E0F8F7',
                                                    margin: '5 0 0 5',
                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['AMOUNT'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            grid: true,
                                                            title: {
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            xField: 'strDescription',
                                                            yField: ['AMOUNT'],
                                                            colors: ['#d82c2c'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
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
                            xtype: 'panel',
                            id: prototype.id + '-boxSumaryMonthData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            height: 'auto',
//                            width: 1222,
//                            width: 1080,
                            hidden: true,
                            margin: '10 0 10 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid3',
                                    labelAlign: 'center',
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridSumaryMonthData',
                                            width: 1130,
                                            columnLines: true,
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
                                                    {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                        listeners: {
                                                            click: 'clickColumnFilters'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<a href="#payments-balance-analysis-by-age-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';

                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        },

                                                    },
                                                    {text: 'Canal', dataIndex: 'CANAL', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Name', dataIndex: 'descSAGENT', width: 340,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            console.log('hola mundo');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Total USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKT', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMonthData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSD', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMonthData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'SVFOPUSD', width: 60, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    let data = record.data;
                                                                    console.log(data.totSVFOPUSD, 'total en el info')
                                                                    value = data.totSVFOPUSD == 0 ? 0 : (value / data.totSVFOPUSD) * 100;
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paid USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKTP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMonthData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKTP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMonthData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDP, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Pending USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDPENDING', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryMonthData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDPENDING, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Percentage %',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: '% Paid', dataIndex: 'PERCPAID', width: 60, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    let data = record.data;
//                                                                    if (data.PERCPENDING >= 80) {
//                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
//                                                                    } else {
                                                                    metaData.style = "text-align:right;background-color:#84ff7a;";
//                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                            {
                                                                text: '% Pending', dataIndex: 'PERCPENDING', width: 75, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value >= 80) {
                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#84ff7a;";
                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolar2',
                                                    width: 520,
                                                    border: true,
                                                    hidden: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 30,
                                                    height: 260,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Total Amount USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            colors: ['#2ca7d8', '#5dd92d'],
                                                            stacked: false,
                                                            label: {
                                                                field: 'VENDOR',
                                                                calloutLine: true,
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
                                                                    label = record.get('VENDOR');
                                                                    if (label === 'Pending') {
                                                                        label = 'Pending';
                                                                    } else {
                                                                        label = 'Paid';
                                                                    }
                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGraf2',
                                                    width: 520,
                                                    border: false,

                                                    height: 550,
                                                    background: '#E0F8F7',
                                                    margin: '5 0 0 5',
                                                    flipXY: true,
//                                                    width: 260,
//                                                    height: 520,

                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart',
                                                            text: 'Agents - Canal',
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'

                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'bottom',
                                                            fields: ['AMOUNT'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            },

                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'left',
                                                            grid: true,
                                                            fields: 'strDescription',
                                                            title: {
                                                                translationX: -30
                                                            },
                                                            label: {
                                                                textAlign: 'left'
                                                            },
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            //xField: ['AMOUNT'],
                                                            xField: 'strDescription',
                                                            yField: ['AMOUNT'],
                                                            colors: ['#d82c2c'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSumaryCanalData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            height: 'auto',
//                            width: 1222,
//                            width: 1080,
                            hidden: true,
                            margin: '10 0 10 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid4',
                                    labelAlign: 'center',
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [

                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridSumaryCanalData',
                                            width: 660,
                                            columnLines: true,
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
                                                    {text: 'Canal', dataIndex: 'CANAL', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        },
                                                    },
                                                    {
                                                        text: 'Total USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKT', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCanalData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT, '0,000') + '<b>';
                                                                },

                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSD', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCanalData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paid USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKTP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCanalData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKTP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCanalData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDP, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Pending USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDPENDING', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCanalData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDPENDING, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Percentage %',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: '% Paid', dataIndex: 'PERCPAID', width: 60, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    let data = record.data;
//                                                                    if (data.PERCPENDING >= 80) {
//                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
//                                                                    } else {
                                                                    metaData.style = "text-align:right;background-color:#84ff7a;";
//                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                            {
                                                                text: '% Pending', dataIndex: 'PERCPENDING', width: 75, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value >= 80) {
                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#84ff7a;";
                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolar3',
                                                    width: 520,
                                                    border: true,
                                                    hidden: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 30,
                                                    height: 260,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Total Amount USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            colors: ['#2ca7d8', '#5dd92d'],
                                                            stacked: false,
                                                            label: {
                                                                field: 'VENDOR',
                                                                calloutLine: true,
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
                                                                    label = record.get('VENDOR');
                                                                    if (label === 'Pending') {
                                                                        label = 'Pending';
                                                                    } else {
                                                                        label = 'Paid';
                                                                    }
                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGraf3',
                                                    width: 520,
                                                    border: false,

                                                    height: 550,
                                                    background: '#E0F8F7',
                                                    margin: '5 0 0 5',
                                                    flipXY: true,
//                                                    width: 260,
//                                                    height: 520,

                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart',
                                                            text: 'Agents - Canal',
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'

                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'bottom',
                                                            fields: ['AMOUNT'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            },

                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'left',
                                                            grid: true,
                                                            fields: 'strDescription',
                                                            title: {
                                                                translationX: -30
                                                            },
                                                            label: {
                                                                textAlign: 'left'
                                                            },
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            //xField: ['AMOUNT'],
                                                            xField: 'strDescription',
                                                            yField: ['AMOUNT'],
                                                            colors: ['#d82c2c'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSumaryCompanyData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            height: 'auto',
//                            width: 1222,
//                            width: 1080,
                            hidden: true,
                            margin: '10 0 10 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid5',
                                    labelAlign: 'center',
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'panel',

                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridSumaryCompanyData',
                                                    width: 752,
                                                    columnLines: true,
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
                                                            {text: 'Code', dataIndex: 'CCUST', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + 'Total' + '<b>';
                                                                },
                                                            },
                                                            {text: 'Avianca Group', dataIndex: 'CCUST', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";

                                                                    switch (value) {
                                                                        case '134':
                                                                            value = 'AVIANCA'
                                                                            break;
                                                                        case '133':
                                                                            value = 'LACSA'
                                                                            break;
                                                                        case '202':
                                                                            value = 'TACA'
                                                                            break;
                                                                        case '547':
                                                                            value = 'AEROGAL'
                                                                            break;

                                                                    }
                                                                    return value;
                                                                },
                                                            },
                                                            {
                                                                text: 'Total USD',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tkt', dataIndex: 'QTYTKT', width: 80, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryCompanyData').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOPUSD', width: 95, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryCompanyData').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                                        },
                                                                        listeners: {
                                                                            headerclick: 'clickColumn'
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Paid USD',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tkt', dataIndex: 'QTYTKTP', width: 80, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryCompanyData').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKTP, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOPUSDP', width: 95, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryCompanyData').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSDP, '0,000') + '<b>';
                                                                        },
                                                                        listeners: {
                                                                            headerclick: 'clickColumn'
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Pending USD',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOPUSDPENDING', width: 95, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridSumaryCompanyData').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSDPENDING, '0,000') + '<b>';
                                                                        },
                                                                        listeners: {
                                                                            headerclick: 'clickColumn'
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Percentage %',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: '% Paid', dataIndex: 'PERCPAID', width: 60, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            let data = record.data;
//                                                                            if (data.PERCPENDING >= 80) {
//                                                                                metaData.style = "text-align:right;background-color:#fe5342;";
//                                                                            } else {
                                                                            metaData.style = "text-align:right;background-color:#84ff7a;";
//                                                                            }
                                                                            return Ext.util.Format.number(value, '0.00%');
                                                                        },
                                                                        listeners: {
                                                                            headerclick: 'clickColumn'
                                                                        }
                                                                    },
                                                                    {
                                                                        text: '% Pending', dataIndex: 'PERCPENDING', width: 75, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if (value >= 80) {
                                                                                metaData.style = "text-align:right;background-color:#fe5342;";
                                                                            } else {
                                                                                metaData.style = "text-align:right;background-color:#84ff7a;";
                                                                            }
                                                                            return Ext.util.Format.number(value, '0.00%');
                                                                        },
                                                                        listeners: {
                                                                            headerclick: 'clickColumn'
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGraf4',
                                                    width: 752,
                                                    border: false,
                                                    hidden: false,
                                                    background: '#E0F8F7',
                                                    margin: '5 0 0 0',
                                                    height: 400,
                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart',
                                                            text: 'AVIANCA GROUP',
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'

                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['TOTAL', 'PENDING', 'PAID'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            },

                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            grid: true,
                                                            fields: 'strDescription',
                                                            title: {
                                                                translationX: -30
                                                            },
                                                            label: {
                                                                textAlign: 'left'
                                                            },
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            xField: 'strDescription',
                                                            yField: ['TOTAL', 'PENDING', 'PAID'],
                                                            colors: ['#859dfe', '#d82c2c', '#5dd92d'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    hidden: true,
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: {
                                                                type: 'vbox',
                                                                pack: 'center'
                                                            },
                                                            hidden: true,
                                                            border: false,
                                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-lblTittlePaid4_1',
                                                                    labelAlign: 'center',
                                                                    border: true,
                                                                    align: 'center',
                                                                    width: 190,
                                                                    margin: '5 5 5 90',
                                                                    style: {
                                                                        fontSize: '10px',
                                                                        fontWeight: 'bold',
                                                                        color: '#231223',
                                                                        fontFamily: '"Open Sans", sans-serif',
                                                                        textAlign: 'center',
                                                                        border: '2px solid #000000', // Borde del marco
                                                                        padding: '5px', // Espacio interno
                                                                        borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'polar',
                                                                    id: prototype.id + '-displayPolar4_1',
                                                                    width: 370,
                                                                    border: true,
                                                                    hidden: false,
                                                                    margin: '0 0 0 5',
                                                                    innerPadding: 30,
                                                                    height: 180,
                                                                    background: '#E0F8F7',
                                                                    captions: {
                                                                        title: {
//                                                                          text: 'Total Amount USD',
                                                                            alignTo: 'chart',

                                                                        }
                                                                    },
                                                                    animation: {
                                                                        duration: 200
                                                                    },
                                                                    interactions: ['rotate', 'itemhighlight'],
                                                                    series: [{
                                                                            type: 'pie3d',
                                                                            angleField: 'Perc2',
                                                                            colors: ['#d82c2c', '#5dd92d'],
                                                                            stacked: false,
                                                                            label: {
                                                                                rotation: 90,
                                                                                field: 'VENDOR',
                                                                                calloutLine: true,
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
                                                                                    label = record.get('VENDOR');
                                                                                    if (label === 'Pending') {
                                                                                        label = 'Pending';
                                                                                    } else {
                                                                                        label = 'Paid';
                                                                                    }
                                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                                }
                                                                            }
                                                                        }]
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: {
                                                                type: 'vbox',
                                                                pack: 'center'
                                                            },
                                                            hidden: true,
                                                            border: false,
                                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-lblTittlePaid4_2',
                                                                    labelAlign: 'center',
                                                                    border: true,
                                                                    align: 'center',
                                                                    margin: '5 5 5 90',
                                                                    width: 190,
                                                                    style: {
                                                                        fontSize: '10px',
                                                                        fontWeight: 'bold',
                                                                        color: '#231223',
                                                                        fontFamily: '"Open Sans", sans-serif',
                                                                        textAlign: 'center',
                                                                        border: '2px solid #000000', // Borde del marco
                                                                        padding: '5px', // Espacio interno
                                                                        borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'polar',
                                                                    id: prototype.id + '-displayPolar4_2',
                                                                    width: 370,
                                                                    border: true,
                                                                    hidden: false,
                                                                    margin: '0 0 0 5',
                                                                    innerPadding: 30,
                                                                    height: 180,
                                                                    background: '#E0F8F7',
                                                                    captions: {
                                                                        title: {
//                                                            text: 'Total Amount USD',
                                                                            alignTo: 'chart',
//                                                            id: prototype.id + '-tittlePaidCompany',
                                                                        }
                                                                    },
                                                                    animation: {
                                                                        duration: 200
                                                                    },
                                                                    interactions: ['rotate', 'itemhighlight'],
                                                                    series: [{
                                                                            type: 'pie3d',
                                                                            angleField: 'Perc2',
                                                                            colors: ['#d82c2c', '#5dd92d'],
                                                                            stacked: false,
                                                                            label: {
                                                                                rotation: 90,
                                                                                field: 'VENDOR',
                                                                                calloutLine: true,
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
                                                                                    label = record.get('VENDOR');
                                                                                    if (label === 'Pending') {
                                                                                        label = 'Pending';
                                                                                    } else {
                                                                                        label = 'Paid';
                                                                                    }
                                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                                }
                                                                            }
                                                                        }]
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'cartesian',
                                                            id: prototype.id + '-displayGraf4_1',
                                                            width: 370,
                                                            border: false,
                                                            height: 180,
                                                            background: '#E0F8F7',
                                                            margin: '5 0 0 5',
                                                            captions: {
                                                                title: {
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['itemhighlight'],
                                                            axes: [{
                                                                    type: 'numeric3d',
                                                                    position: 'left',
                                                                    fields: ['PENDING', 'PAID'],
                                                                    grid: true,
                                                                    title: '',
                                                                    renderer: function (obj, value) {
                                                                        return Ext.util.Format.number(value);
                                                                    }
                                                                },
                                                                {
                                                                    type: 'category3d',
                                                                    position: 'bottom',
                                                                    grid: true,
                                                                    title: {
                                                                        translationX: -30
                                                                    }
                                                                }],
                                                            series: [{
                                                                    type: 'bar3d',
                                                                    stacked: false,
                                                                    xField: 'strDescription',
                                                                    yField: ['PENDING', 'PAID'],
                                                                    colors: ['#d82c2c', '#5dd92d'],
                                                                    highlight: true,
                                                                    style: {
                                                                        inGroupGapWidth: -7,
                                                                        minGapWidth: 2,
                                                                        maxBarWidth: 900
                                                                    },
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        height: 28,
                                                                        renderer: function (toolTip, record, ctx) {

                                                                            if (ctx.field === 'PAID') {
                                                                                toolTip.setHtml('Paid' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            } else {
                                                                                toolTip.setHtml('Pending' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            }

                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'cartesian',
                                                            id: prototype.id + '-displayGraf4_2',
                                                            width: 370,
                                                            border: false,
                                                            height: 180,
                                                            background: '#E0F8F7',
                                                            margin: '5 0 0 5',
                                                            captions: {
                                                                title: {
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['itemhighlight'],
                                                            axes: [{
                                                                    type: 'numeric3d',
                                                                    position: 'left',
                                                                    fields: ['PENDING', 'PAID'],
                                                                    grid: true,
                                                                    title: '',
                                                                    renderer: function (obj, value) {
                                                                        return Ext.util.Format.number(value);
                                                                    }
                                                                },
                                                                {
                                                                    type: 'category3d',
                                                                    position: 'bottom',
                                                                    grid: true,
                                                                    title: {
                                                                        translationX: -30
                                                                    }
                                                                }],
                                                            series: [{
                                                                    type: 'bar3d',
                                                                    stacked: false,
                                                                    xField: 'strDescription',
                                                                    yField: ['PENDING', 'PAID'],
                                                                    colors: ['#d82c2c', '#5dd92d'],
                                                                    highlight: true,
                                                                    style: {
                                                                        inGroupGapWidth: -7,
                                                                        minGapWidth: 2,
                                                                        maxBarWidth: 900
                                                                    },
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        height: 28,
                                                                        renderer: function (toolTip, record, ctx) {
                                                                            if (ctx.field === 'PAID') {
                                                                                toolTip.setHtml('Paid' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            } else {
                                                                                toolTip.setHtml('Pending' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            }
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    hidden: true,
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: {
                                                                type: 'vbox',
                                                                pack: 'center'
                                                            },
                                                            hidden: true,
                                                            border: false,
                                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-lblTittlePaid4_3',
                                                                    labelAlign: 'center',
                                                                    border: true,
                                                                    align: 'center',
                                                                    margin: '5 5 5 90',
                                                                    width: 190,
                                                                    style: {
                                                                        fontSize: '10px',
                                                                        fontWeight: 'bold',
                                                                        color: '#231223',
                                                                        fontFamily: '"Open Sans", sans-serif',
                                                                        textAlign: 'center',
                                                                        border: '2px solid #000000', // Borde del marco
                                                                        padding: '5px', // Espacio interno
                                                                        borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'polar',
                                                                    id: prototype.id + '-displayPolar4_3',
                                                                    width: 370,
                                                                    border: true,
                                                                    hidden: false,
                                                                    margin: '0 0 0 5',
                                                                    innerPadding: 30,
                                                                    height: 180,
                                                                    background: '#E0F8F7',
                                                                    captions: {
                                                                        title: {
//                                                            text: 'Total Amount USD',
                                                                            alignTo: 'chart',
//                                                            id: prototype.id + '-tittlePaidCompany',
                                                                        }
                                                                    },
                                                                    animation: {
                                                                        duration: 200
                                                                    },
                                                                    interactions: ['rotate', 'itemhighlight'],
                                                                    series: [{
                                                                            type: 'pie3d',
                                                                            angleField: 'Perc2',
                                                                            colors: ['#d82c2c', '#5dd92d'],
                                                                            stacked: false,
                                                                            label: {
                                                                                rotation: 90,
                                                                                field: 'VENDOR',
                                                                                calloutLine: true,
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
                                                                                    label = record.get('VENDOR');
                                                                                    if (label === 'Pending') {
                                                                                        label = 'Pending';
                                                                                    } else {
                                                                                        label = 'Paid';
                                                                                    }
                                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                                }
                                                                            }
                                                                        }]
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: {
                                                                type: 'vbox',
                                                                pack: 'center'
                                                            },
                                                            hidden: true,
                                                            border: false,
                                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id + '-lblTittlePaid4_4',
                                                                    labelAlign: 'center',
                                                                    border: true,
                                                                    align: 'center',
                                                                    margin: '5 5 5 90',
                                                                    width: 190,
                                                                    style: {
                                                                        fontSize: '10px',
                                                                        fontWeight: 'bold',
                                                                        color: '#231223',
                                                                        fontFamily: '"Open Sans", sans-serif',
                                                                        textAlign: 'center',
                                                                        border: '2px solid #000000', // Borde del marco
                                                                        padding: '5px', // Espacio interno
                                                                        borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'polar',
                                                                    id: prototype.id + '-displayPolar4_4',
                                                                    width: 370,
                                                                    border: true,
                                                                    hidden: false,
                                                                    margin: '0 0 0 5',
                                                                    innerPadding: 30,
                                                                    height: 180,
                                                                    background: '#E0F8F7',
                                                                    captions: {
                                                                        title: {
//                                                            text: 'Total Amount USD',
                                                                            alignTo: 'chart',

                                                                        }
                                                                    },
                                                                    animation: {
                                                                        duration: 200
                                                                    },
                                                                    interactions: ['rotate', 'itemhighlight'],
                                                                    series: [{
                                                                            type: 'pie3d',
                                                                            angleField: 'Perc2',
                                                                            colors: ['#d82c2c', '#5dd92d'],
                                                                            stacked: false,
                                                                            label: {

                                                                                field: 'VENDOR',
                                                                                calloutLine: true,
                                                                                rotateAroundCenter: true,
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
                                                                                    label = record.get('VENDOR');
                                                                                    if (label === 'Pending') {
                                                                                        label = 'Pending';
                                                                                    } else {
                                                                                        label = 'Paid';
                                                                                    }
                                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                                }
                                                                            }
                                                                        }]
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'cartesian',
                                                            id: prototype.id + '-displayGraf4_3',
                                                            width: 370,
                                                            border: false,
                                                            height: 180,
                                                            background: '#E0F8F7',
                                                            margin: '5 0 0 5',
                                                            captions: {
                                                                title: {
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['itemhighlight'],
                                                            axes: [{
                                                                    type: 'numeric3d',
                                                                    position: 'left',
                                                                    fields: ['PENDING', 'PAID'],
                                                                    grid: true,
                                                                    title: '',
                                                                    renderer: function (obj, value) {
                                                                        return Ext.util.Format.number(value);
                                                                    }
                                                                },
                                                                {
                                                                    type: 'category3d',
                                                                    position: 'bottom',
                                                                    grid: true,
                                                                    title: {
                                                                        translationX: -30
                                                                    }
                                                                }],
                                                            series: [{
                                                                    type: 'bar3d',
                                                                    stacked: false,
                                                                    xField: 'strDescription',
                                                                    yField: ['PENDING', 'PAID'],
                                                                    colors: ['#d82c2c', '#5dd92d'],
                                                                    highlight: true,
                                                                    style: {
                                                                        inGroupGapWidth: -7,
                                                                        minGapWidth: 2,
                                                                        maxBarWidth: 900
                                                                    },
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        height: 28,
                                                                        renderer: function (toolTip, record, ctx) {
                                                                            if (ctx.field === 'PAID') {
                                                                                toolTip.setHtml('Paid' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            } else {
                                                                                toolTip.setHtml('Pending' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            }
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'cartesian',
                                                            id: prototype.id + '-displayGraf4_4',
                                                            width: 370,
                                                            border: false,
                                                            height: 180,
                                                            background: '#E0F8F7',
                                                            margin: '5 0 0 5',
                                                            captions: {
                                                                title: {
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['itemhighlight'],
                                                            axes: [{
                                                                    type: 'numeric3d',
                                                                    position: 'left',
                                                                    fields: ['PENDING', 'PAID'],
                                                                    grid: true,
                                                                    title: '',
                                                                    renderer: function (obj, value) {
                                                                        return Ext.util.Format.number(value);
                                                                    }
                                                                },
                                                                {
                                                                    type: 'category3d',
                                                                    position: 'bottom',
                                                                    grid: true,
                                                                    title: {
                                                                        translationX: -30
                                                                    }
                                                                }],
                                                            series: [{
                                                                    type: 'bar3d',
                                                                    stacked: false,
                                                                    xField: 'strDescription',
                                                                    yField: ['PENDING', 'PAID'],
                                                                    colors: ['#d82c2c', '#5dd92d'],
                                                                    highlight: true,
                                                                    style: {
                                                                        inGroupGapWidth: -7,
                                                                        minGapWidth: 2,
                                                                        maxBarWidth: 900
                                                                    },
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        height: 28,
                                                                        renderer: function (toolTip, record, ctx) {
                                                                            if (ctx.field === 'PAID') {
                                                                                toolTip.setHtml('Paid' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            } else {
                                                                                toolTip.setHtml('Pending' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                            }
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                    ]
                                                },
                                            ]
                                        },

                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-lblTittlePaid4',
                                                    labelAlign: 'center',
                                                    border: true,
                                                    align: 'center',
                                                    margin: '5 0 5 120',
                                                    style: {
                                                        fontSize: '18px',
                                                        fontWeight: 'bold',
                                                        color: '#231223',
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        textAlign: 'center',
                                                        border: '2px solid #000000', // Borde del marco
                                                        padding: '10px', // Espacio interno
                                                        borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                    }
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolar4',
                                                    width: 520,
                                                    border: true,
                                                    hidden: false,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 30,
                                                    height: 260,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
//                                                            text: 'Total Amount USD',
                                                            alignTo: 'chart',
//                                                            id: prototype.id + '-tittlePaidCompany',
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            colors: ['#d82c2c', '#5dd92d'],
                                                            stacked: false,
                                                            label: {

                                                                field: 'VENDOR',
                                                                calloutLine: true,
                                                                style: {
                                                                    fontWeight: 'bold',

                                                                },
                                                                renderer: function (value, b, callout, label) {
                                                                    callout.calloutWidth = 1;
                                                                    if (value === 'Paid') {
                                                                        label.setAttributes({
                                                                            rotationRads: Ext.draw.Draw.degreesToRadians(0) // Ajuste horizontal
                                                                        });
                                                                    }
                                                                    return value;
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    label = record.get('VENDOR');
                                                                    if (label === 'Pending') {
                                                                        label = 'Pending';
                                                                    } else {
                                                                        label = 'Paid';
                                                                    }
                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
//                                                {
//                                                    xtype: 'cartesian',
//                                                    id: prototype.id + '-displayGraf4',
//                                                    width: 520,
//                                                    border: false,
//                                                    hidden: false,
////                                                    height: 550,
//                                                    background: '#E0F8F7',
//                                                    margin: '5 0 0 5',
//                                                    flipXY: true,
//                                                    height: 260,
////                                                    height: 520,
//
//                                                    captions: {
//                                                        title: {
//                                                            alignTo: 'chart',
//                                                            text: 'AVIANCA GROUP',
//                                                        }
//                                                    },
//                                                    animation: {
//                                                        duration: 200
//                                                    },
//                                                    interactions: ['itemhighlight'],
//                                                    legend: {
//                                                        docked: 'bottom',
//                                                        background: '#F4F7FD'
//
//                                                    },
//                                                    axes: [{
//                                                            type: 'numeric3d',
//                                                            position: 'bottom',
//                                                            fields: ['PENDING', 'PAID'],
//                                                            grid: true,
//                                                            title: '',
//                                                            renderer: function (obj, value) {
//                                                                return Ext.util.Format.number(value);
//                                                            },
//
//                                                        },
//                                                        {
//                                                            type: 'category3d',
//                                                            position: 'left',
//                                                            grid: true,
//                                                            fields: 'strDescription',
//                                                            title: {
//                                                                translationX: -30
//                                                            },
//                                                            label: {
//                                                                textAlign: 'left'
//                                                            },
//                                                        }],
//                                                    series: [{
//                                                            type: 'bar3d',
//                                                            stacked: false,
//                                                            //xField: ['AMOUNT'],
//                                                            xField: 'strDescription',
//                                                            yField: ['PENDING', 'PAID'],
//                                                            colors: ['#d82c2c', '#5dd92d'],
//                                                            highlight: true,
//                                                            style: {
//                                                                inGroupGapWidth: -7,
//                                                                minGapWidth: 2,
//                                                                maxBarWidth: 900
//                                                            },
//                                                            tooltip: {
//                                                                trackMouse: true,
//                                                                height: 28,
//                                                                renderer: function (toolTip, record, ctx) {
//                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
//                                                                }
//                                                            }
//                                                        }]
//                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSumaryCountryData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            height: 'auto',
//                            width: 1222,
//                            width: 1080,
                            hidden: true,
                            margin: '10 0 10 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleGrid6',
                                    labelAlign: 'center',
                                    border: true,
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#231223',
                                        fontFamily: '"Open Sans", sans-serif',
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [

                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridSumaryCountryData',
                                            width: 810,
                                            columnLines: true,
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
                                                    {text: 'Code', dataIndex: 'SCOUNTRY', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        },
                                                    },
                                                    {text: 'Name', dataIndex: 'descSCOUNTRY', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Total USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKT', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCountryData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT, '0,000') + '<b>';
                                                                },

                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSD', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a1cbf6;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCountryData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paid USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkt', dataIndex: 'QTYTKTP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCountryData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKTP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDP', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCountryData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDP, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Pending USD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSDPENDING', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridSumaryCountryData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDPENDING, '0,000') + '<b>';
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Percentage %',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: '% Paid', dataIndex: 'PERCPAID', width: 60, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    let data = record.data;
//                                                                    if (data.PERCPENDING >= 80) {
//                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
//                                                                    } else {
                                                                    metaData.style = "text-align:right;background-color:#84ff7a;";
//                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                            {
                                                                text: '% Pending', dataIndex: 'PERCPENDING', width: 75, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value >= 80) {
                                                                        metaData.style = "text-align:right;background-color:#fe5342;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#84ff7a;";
                                                                    }
                                                                    return Ext.util.Format.number(value, '0.00%');
                                                                },
                                                                listeners: {
                                                                    headerclick: 'clickColumn'
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPolar5',
                                                    width: 520,
                                                    border: true,
                                                    hidden: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 30,
                                                    height: 260,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Total Amount USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            colors: ['#2ca7d8', '#5dd92d'],
                                                            stacked: false,
                                                            label: {
                                                                field: 'VENDOR',
                                                                calloutLine: true,
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
                                                                    label = record.get('VENDOR');
                                                                    if (label === 'Pending') {
                                                                        label = 'Pending';
                                                                    } else {
                                                                        label = 'Paid';
                                                                    }
                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayGraf5',
                                                    width: 520,
                                                    border: false,

                                                    height: 550,
                                                    background: '#E0F8F7',
                                                    margin: '5 0 0 5',
                                                    flipXY: true,
//                                                    width: 260,
//                                                    height: 520,

                                                    captions: {
                                                        title: {
                                                            alignTo: 'chart',
                                                            text: 'Country',
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'

                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'bottom',
                                                            fields: ['AMOUNT'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                return Ext.util.Format.number(value);
                                                            },

                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'left',
                                                            grid: true,
                                                            fields: 'strDescription',
                                                            title: {
                                                                translationX: -30
                                                            },
                                                            label: {
                                                                textAlign: 'left'
                                                            },
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            //xField: ['AMOUNT'],
                                                            xField: 'strDescription',
                                                            yField: ['AMOUNT'],
                                                            colors: ['#d82c2c'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 900
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Amount' + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataCLAtot">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataCLAtot',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: true,
//                            height: 497,
                            width: 1282,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCLAtot',
                                    width: 1282,
//                                    height: 468,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Reception',
                                                id: prototype.id + '-adgTitFechatot',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 100}
                                                ]
                                            },
                                            {
                                                text: 'Clarifications',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Received',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYCLAR', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'dblAMTCLARU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Answered',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYCLARP', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'perAnsw', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '%' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Not Answered',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYCLARS', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'perNoAnsw', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '%' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Notice',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCHGBK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a4c5f5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTCHGBU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#a4c5f5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Reverse ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCLARR', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTREVCU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Net ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'dblAMTBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'per', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '%' + '</b>';
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
                                    id: prototype.id + '-panelDataSummaryCLAtot',
                                    width: 1282,
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
                                        style: 'background:#A0BFD3;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
                                    },
                                    items: [
                                        {width: 100},
                                        {width: 100, id: prototype.id + '-lblTotQTYCLARtot'},
                                        {width: 100, id: prototype.id + '-lblTotAMTCLARtot'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCLARPtot'},
                                        {width: 60, id: prototype.id + '-lblTotperAns'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCLARStot'},
                                        {width: 60, id: prototype.id + '-lblTotperNoAns'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCHGBKtot'},
                                        {width: 100, id: prototype.id + '-lblTotAMTCHGBUtot'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCLARRtot'},
                                        {width: 100, id: prototype.id + '-lblTotAMTREVCUtot'},
                                        {width: 100, id: prototype.id + '-lngTotQTYBANKtot'},
                                        {width: 100, id: prototype.id + '-dblTotAMTBANKtot'},
                                        {width: 60, id: prototype.id + '-lblTotper'}
                                    ]
                                },
                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    hidden: false,
                                    margin: '5 0 5 0',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        aling: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            padding: '5 0 0 5',
                                            border: true,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-displayChart_ByClarification01',
                                                    width: 800,
                                                    border: false,
                                                    height: 400,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Total Amount \n\ USD ',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'
                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['dblAMTCLARU', 'AMTCHGBU'],
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
                                                                text: '',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['ChargedBack', 'Received'],
                                                            xField: 'strFormatDate',
                                                            yField: ['dblAMTCLARU', 'AMTCHGBU'],
                                                            colors: ['#c6f7cd', '#0066ff'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 1000
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'dblAMTCLARU') {
                                                                        label = 'ChargedBack';
                                                                    } else if (ctx.field === 'AMTCHGBU') {
                                                                        label = 'Received';
                                                                    }
                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                            ]
                                        },
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
                                                    id: prototype.id + '-displayChart_ByClarification02',
                                                    width: 531,
                                                    border: true,
                                                    margin: '0 0 0 5',
                                                    innerPadding: 90,
                                                    height: 350,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Total - Amount USD',
//                                                            fieldStyle: 'font-size:5px',
                                                            alignTo: 'center'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
//                                                    legend: {
//                                                        docked: 'bottom',
//                                                        background: '#F4F7FD'
//                                                    },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AMOUNT_ON_PERCENT',
                                                            colors: ['#50d464', '#0066ff'],
                                                            label: {
                                                                field: 'LABEL',
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutWidth = 0;
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
                                                                        label = 'Total Received';
                                                                    } else {
                                                                        label = 'Total ChargedBack';
                                                                    }
                                                                    toolTip.setHtml(label + ' - ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxGroupDataCLAtot">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxGroupDataCLAtot',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: true,
                            height: 'auto',
                            width: 1237,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridGroupCLAtot',
                                    width: 1237,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Credit Card',
                                                id: prototype.id + '-adgTitGrouptot',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SENTDATE', width: 50},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescripcion', width: 225,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Clarifications',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Received',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYCLAR', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'dblAMTCLARU', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Answered',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYCLARP', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'perAnsw', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '%' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Not Answered',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYCLARS', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'perNoAnsw', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '%' + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Notice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ChargeBack',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCHGBK', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTCHGBU', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Reverse ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCLARR', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTREVCU', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Net ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYBANK', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'dblAMTBANK', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
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
                                    id: prototype.id + '-panelDataSummaryGroupCLAtot',
                                    width: 1237,
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
                                        style: 'background:#A0BFD3;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
                                    },
                                    items: [
                                        {width: 275},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLAR_Gt'},
                                        {width: 90, id: prototype.id + '-lblTotAMTCLAR_Gt'},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLARP_Gt'},
                                        {width: 60, id: prototype.id + '-lblTotperAnsGt'},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLARS_Gt'},
                                        {width: 60, id: prototype.id + '-lblTotperNoAnsGt'},
                                        {width: 80, id: prototype.id + '-lblTotQTYCHGBK_Gt'},
                                        {width: 90, id: prototype.id + '-lblTotAMTCHGBU_Gt'},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLARR_Gt'},
                                        {width: 90, id: prototype.id + '-lblTotAMTREVCU_Gt'},
                                        {width: 80, id: prototype.id + '-lngTotQTYBANK_Gt'},
                                        {width: 90, id: prototype.id + '-dblTotAMTBANK_Gt'},
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataCLA">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataCLA',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: true,
                            height: 'auto',
                            width: 1132,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCLA',
                                    width: 1132,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Reception',
                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                        listeners: {
                                                            click: 'viewDetBank'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Clarifications',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Stand By', dataIndex: 'lngQTYCLARS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'On Process', dataIndex: 'lngQTYCLARP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Not Found', dataIndex: 'lngQNMATCH', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.lngQNMATCH > 0) ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#800000"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTYCLAR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'dblAMTCLARU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Notice',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCHGBK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTCHGBU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Reverse ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCLARR', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTREVCU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Net ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'dblAMTBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
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
                                    id: prototype.id + '-panelDataSummaryCLA',
                                    width: 1132,
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
                                        style: 'background:#A0BFD3;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
                                    },
                                    items: [
                                        {width: 100},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLARS'},
                                        {width: 90, id: prototype.id + '-lblTotQTYCLARP'},
                                        {width: 80, id: prototype.id + '-lblTotQNMATCH'},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLAR'},
                                        {width: 100, id: prototype.id + '-lblTotAMTCLAR'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCHGBK'},
                                        {width: 100, id: prototype.id + '-lblTotAMTCHGBU'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCLARR'},
                                        {width: 100, id: prototype.id + '-lblTotAMTREVCU'},
                                        {width: 100, id: prototype.id + '-lngTotQTYBANK'},
                                        {width: 100, id: prototype.id + '-dblTotAMTBANK'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxGroupDataCLA">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxGroupDataCLA',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: true,
                            height: 'auto',
                            width: 1307,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridGroupDataCLA',
                                    width: 1307,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Credit Card',
                                                id: prototype.id + '-adgTitGroup',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SENTDATE', width: 50},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescripcion', width: 225,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Clarifications',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Stand By', dataIndex: 'lngQTYCLARS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'On Process', dataIndex: 'lngQTYCLARP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Not Found', dataIndex: 'lngQNMATCH', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.lngQNMATCH > 0) ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#800000"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTYCLAR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'dblAMTCLARU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Notice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ChargeBack',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCHGBK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTCHGBU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Reverse ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCLARR', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTREVCU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Net ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'dblAMTBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
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
                                    id: prototype.id + '-panelGroupDataSummaryCLA',
                                    width: 1307,
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
                                        style: 'background:#A0BFD3;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
                                    },
                                    items: [
                                        {width: 50},
                                        {width: 225},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLARS_G'},
                                        {width: 90, id: prototype.id + '-lblTotQTYCLARP_G'},
                                        {width: 80, id: prototype.id + '-lblTotQNMATCH_G'},
                                        {width: 80, id: prototype.id + '-lblTotQTYCLAR_G'},
                                        {width: 100, id: prototype.id + '-lblTotAMTCLAR_G'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCHGBK_G'},
                                        {width: 100, id: prototype.id + '-lblTotAMTCHGBU_G'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCLARR_G'},
                                        {width: 100, id: prototype.id + '-lblTotAMTREVCU_G'},
                                        {width: 100, id: prototype.id + '-lngTotQTYBANK_G'},
                                        {width: 100, id: prototype.id + '-dblTotAMTBANK_G'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>,
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetailBank',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: true,
                            height: 'auto',
                            width: 1307,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetBank',
                                    width: 1307,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODEBANK', width: 50},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescripcion', width: 225,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Clarifications',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Stand By', dataIndex: 'lngQTYCLARS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'On Process', dataIndex: 'lngQTYCLARP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Not Found', dataIndex: 'lngQNMATCH', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.lngQNMATCH > 0) ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#800000"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTYCLAR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'dblAMTCLARU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Notice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ChargeBack',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCHGBK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTCHGBU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#fff7d9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Reverse ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'QTYCLARR', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMTREVCU', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#e0f5ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Net ChargeBack',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTYBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'dblAMTBANK', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffccbf;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
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
                                    id: prototype.id + '-panelSummaryDetailBank',
                                    width: 1307,
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
                                        style: 'background:#A0BFD3;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
                                    },
                                    items: [
                                        {width: 50},
                                        {width: 225},
                                        {width: 80, id: prototype.id + '-lblTotDB_QTYCLARS'},
                                        {width: 90, id: prototype.id + '-lblTotDB_QTYCLARP'},
                                        {width: 80, id: prototype.id + '-lblTotDB_QNMATCH'},
                                        {width: 80, id: prototype.id + '-lblTotDB_QTYCLAR'},
                                        {width: 100, id: prototype.id + '-lblTotDB_AMTCLAR'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCHGBK_DB'},
                                        {width: 100, id: prototype.id + '-lblTotAMTCHGBU_DB'},
                                        {width: 100, id: prototype.id + '-lblTotQTYCLARR_DB'},
                                        {width: 100, id: prototype.id + '-lblTotAMTREVCU_DB'},
                                        {width: 100, id: prototype.id + '-lngTotQTYBANK_DB'},
                                        {width: 100, id: prototype.id + '-dblTotAMTBANK_DB'}
                                    ]
                                }
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="boxDataProvisions">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDataProvisions',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            height: 'auto',
                            width: 1800,
                            margin: '10 0 0 80 ',
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxGrill',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    height: 'auto',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataProvisions',
                                            height: 400,
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            width: 1722,
                                            border: false,
                                            hidden: false,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Value<br>Date',
                                                        width: 100,
                                                        dataIndex: 'VALDATE',
                                                        align: 'center',
                                                        style: ' background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; background: #6C87A8;color: white; ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }

                                                    },
                                                    {
                                                        text: 'Statement Information',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8;',
                                                        columns: [
                                                            {
                                                                text: 'Match',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_MF1',
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_MF1, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_MF1',
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF1, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Pending',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_PF1',
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_PF1, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_PF1',
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_PF1, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Total',
                                                                menuDisabled: true,
                                                                style: 'background: #6C87A8;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_TF1',
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_TF1, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_TF1',
                                                                        align: 'center',
                                                                        style: ' background: #6C87A8;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_TF1, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement Information',
                                                        menuDisabled: true,
                                                        style: 'background: #7D9F7D;',
                                                        columns: [
                                                            {
                                                                text: 'Match',
                                                                menuDisabled: true,
                                                                style: 'background: #7D9F7D;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_MF2',
                                                                        align: 'center',
                                                                        style: ' background: #7D9F7D;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_MF2',
                                                                        align: 'center',
                                                                        style: ' background: #7D9F7D;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Pending',
                                                                menuDisabled: true,
                                                                style: 'background: #7D9F7D;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_PF2',
                                                                        align: 'center',
                                                                        style: ' background: #7D9F7D;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_PF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_PF2',
                                                                        align: 'center',
                                                                        style: ' background: #7D9F7D;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_PF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Total',
                                                                menuDisabled: true,
                                                                style: 'background: #7D9F7D;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_TF2',
                                                                        align: 'center',
                                                                        style: ' background: #7D9F7D;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_TF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_TF2',
                                                                        align: 'center',
                                                                        style: ' background: #7D9F7D;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_TF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Accounting Information',
                                                        menuDisabled: true,
                                                        style: 'background: #D18F77;',
                                                        columns: [
                                                            {
                                                                text: 'Send',
                                                                menuDisabled: true,
                                                                style: 'background: #D18F77;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_SE',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77 ;color: white;';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_SE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_SE',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77 ;color: white;';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_SE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Pending',
                                                                menuDisabled: true,
                                                                style: 'background: #D18F77;',
                                                                columns: [
                                                                    {
                                                                        text: 'Qty',
                                                                        width: 70,
                                                                        dataIndex: 'QTY_PE',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_PE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount',
                                                                        width: 110,
                                                                        dataIndex: 'AMOUNT_PE',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_PE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Provision',
                                                        menuDisabled: true,
                                                        style: 'background: #8A99A6;',
                                                        columns: [
                                                            {
                                                                text: 'Qty',
                                                                width: 70,
                                                                dataIndex: 'QTY_PR',
                                                                align: 'center',
                                                                style: ' background: #8A99A6;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #8A99A6 ;color: white;';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY_PR, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount',
                                                                width: 110,
                                                                dataIndex: 'AMOUNT_PR',
                                                                align: 'center',
                                                                style: ' background: #8A99A6;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #8A99A6 ;color: white;';
                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNT_PR, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxGraf',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    height: 'auto',
                                    hidden: true,
                                    width: 500,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-displayProvisions',
                                            width: 531,
                                            border: true,

                                            margin: '0 0 0 10',
                                            innerPadding: 15,
                                            height: 200,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Settlement Information',
                                                    fieldStyle: 'font-size:5px',
                                                    alignTo: 'center'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'QTY',
                                                    colors: ['#5B86D3', '#94B5E0'],

                                                    label: {
                                                        field: 'LABEL',
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutWidth = 0;
                                                            return value;
                                                        }
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = 'Total';
                                                            toolTip.setHtml(label + ' - ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    }
                                                }]
                                        },
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-displayProvisions2',
                                            width: 531,
                                            border: true,
                                            margin: '5 0 0 10',
                                            innerPadding: 15,
                                            height: 200,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Accounting Information',
                                                    fieldStyle: 'font-size:5px',
                                                    alignTo: 'center'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'QTY',
                                                    colors: ['#8BC69C', '#C8E0C8'],
                                                    label: {
                                                        field: 'LABEL',
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutWidth = 0;
                                                            return value;
                                                        }
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = 'Total';
                                                            toolTip.setHtml(label + ' - ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Pantalla Total by conciliation">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridConciliation',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            hidden: true,
//                            width: 1800,
//                            margin: '20 0 0 0 ',
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'treepanel',
                                                    id: prototype.id + '-gridDataConciZ',
                                                    width: 1300,
                                                    style: 'margin-top:40px',
                                                    reserveScrollbar: true,
                                                    useArrows: true,
                                                    rootVisible: false,
                                                    multiSelect: true,
                                                    columnLines: true,
                                                    rowLines: true,
                                                    features: [{
                                                        ftype: 'summary'
                                                    }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Month',
                                                                width: 110,
                                                                dataIndex: 'strFormatDate',
                                                                xtype: 'treecolumn',
                                                                align: 'center',
                                                                style: ' background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    console.log(record.data, 'sales dateeeee')
                                                                    let valor = '';

                                                                    if (record.data.children && record.data.children[0].FCHILD === '1') {
                                                                        valor = value;
                                                                    } else if (record.data.children && record.data.children[0].FCHILD === '0') {
                                                                        valor = value;
                                                                    } else {
                                                                        valor = ' ';
                                                                    }
                                                                    return valor;
                                                                },
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                }
                                                            },
                                                            {
                                                                text: 'Av Group',
                                                                width: 90,
                                                                dataIndex: 'CCUST',
                                                                align: 'center',
                                                                style: ' background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#c9daf5;";
                                                                    let strCCUST = {
                                                                        134: 'AVIANCA',
                                                                        133: 'LACSA',
                                                                        202: 'TACA',
                                                                        547: 'AEROGAL',

                                                                    }
                                                                    let styleHref = '<u><a href="#payments-balance-analysis-by-age-form" style="color:#008FE3;text-decoration:underline;">';
                                                                    let styleHref2 = '</a></u>';

                                                                    if (Ext.getCmp(prototype.id + '-cmbAviancaGroup').getValue() !== '') {
                                                                        return styleHref + strCCUST[record.data.children[0].CCUST] + styleHref2;
                                                                    } else {
                                                                        return  strCCUST[value] ? styleHref + strCCUST[value] + styleHref2 : 'AV GROUP';
                                                                    }
                                                                },
                                                                listeners: {
                                                                    click: 'onGridCountryTotal'
                                                                }
                                                            },
                                                            {
                                                                text: 'Currency',
                                                                width: 65,
                                                                dataIndex: 'CURRENCY',
                                                                align: 'center',
                                                                style: ' background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    let data = record.data;
                                                                    console.log(data.QRATECON, 'RATECON!!')
                                                                    let perc1 = data.QRATECON === 0 ? 0 : data.QRATECON;
                                                                    return '<b style="font-size:14px;">USD</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale Information',
                                                                menuDisabled: true,
                                                                style: 'background: #5dd92d;',
                                                                columns: [
                                                                            {
                                                                                text: 'Total',
                                                                                width: 120,
                                                                                dataIndex: 'QSVFOPUSDS',
                                                                                align: 'center',
                                                                                style: ' background: #5dd92d;',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;font-size:14px";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return '<b style="font-size:14px;">' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataConciZ').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQSALES, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match',
                                                                                width: 120,
                                                                                dataIndex: 'QSVFOPUSDC',
                                                                                align: 'center',
                                                                                style: ' background: #5dd92d;',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                   return '<b style="font-size:14px;">' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataConciZ').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDS, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '% Match',
                                                                                width: 65,
                                                                                dataIndex: 'QRATECON',
                                                                                align: 'center',
                                                                                style: ' background: #5dd92d;',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    let data = record.data;
                                                                                    console.log(data.QRATECON, 'RATECON!!')
                                                                                    let perc1 = data.QRATECON === 0 ? 0 : data.QRATECON;
                                                                                    return '<b style="font-size:14px;">' + Ext.util.Format.number(perc1, '0.00%') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataConciZ').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF1, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Settlement Information',
                                                                menuDisabled: true,
                                                                style: 'background: #0066ff;',
                                                                columns: [
                                                                    {
                                                                        text: '% Match',
                                                                        width: 65,
                                                                        dataIndex: 'QRATECONL',
                                                                        align: 'center',
                                                                        style: ' background: #0066ff;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            let data = record.data;
                                                                            console.log(data.QRATECONL, 'RATECON!!')
                                                                            let perc2 = data.QRATECONL === 0 ? 0 : data.QRATECONL;
                                                                            return '<b style="font-size:14px;">' + Ext.util.Format.number(perc2, '0.00%') + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        width: 120,
                                                                        dataIndex: 'QSVFOPUSDLT',
                                                                        align: 'center',
                                                                        style: ' background: #0066ff;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Match',
                                                                        width: 120,
                                                                        dataIndex: 'QSVFOPUSDL',
                                                                        align: 'center',
                                                                        style: ' background: #0066ff;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'W/O Sales',
                                                                        width: 90,
                                                                        dataIndex: 'QSVFOPUSDP',
                                                                        align: 'center',
                                                                        style: ' background: #0066ff;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Others Information',
                                                                menuDisabled: true,
                                                                style: 'background: #D18F77;',
                                                                columns: [
                                                                    {
                                                                        text: 'Comision <br> TC',
                                                                        width: 100,
                                                                        dataIndex: 'QCOMISION',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77 ;color: white;';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_SE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Taxes / <br> Expenses',
                                                                        width: 100,
                                                                        dataIndex: 'QRTEIVA',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77 ;color: white;';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_SE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Net',
                                                                width: 120,
                                                                dataIndex: 'QNETO',
                                                                align: 'center',
                                                                style: ' background: #8A99A6;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b style="font-size:14px;">' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #8A99A6 ;color: white;';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY_PR, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-SummaryCardDataCon',
                                                    width: 1300,
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
                                                        style: 'background:#7F98A8;color:white;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:13px'
                                                    },
                                                    items: [
                                                        {width: 265, id: prototype.id + '-totQSALES_CONZ', value:'Totals'},
                                                        {width: 120, id: prototype.id + '-totQSALES_CON'},
                                                        {width: 120, id: prototype.id + '-totSVFOPUSDS_CON'},
                                                        {width: 65, id: prototype.id + '-perc2_CON'},
                                                        {width: 65, id: prototype.id + '-perc3_CON'},
                                                        {width: 120, id: prototype.id + '-totSVFOPUSDC_CONT'},
                                                        
                                                        {width: 120, id: prototype.id + '-totSVFOPUSDC_CON'},
                                                        {width: 90, id: prototype.id + '-totSVFOPUSDL_CON'},
                                                        {width: 100, id: prototype.id + '-totCOMISION_CON'},
                                                        {width: 100, id: prototype.id + '-totTAXES_CON'},
                                                        {width: 120, id: prototype.id + '-totNet_CON'}
                                                    ]
                                                },
                                                //PANEL DE GRAFICOS
                                {
                                    xtype: 'panel',
                                    hidden: false,
                                    margin: '15 0 5 0',
                                    border: false,
                                    layout: {
                                        type: 'vbox',
                                        aling: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #F4F7FD;',
                                            padding: '5 0 0 5',
                                            border: true,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
    xtype: 'cartesian',
    id: prototype.id + '-graficosAñosC',
    width: 1300,
    border: false,
    height: 400,
    background: '#E0F8F7',
    captions: {
        title: {
            text: 'Totals Sales And Settlement Match',
            alignTo: 'chart'
        }
    },
    animation: {
        duration: 200
    },
    interactions: ['itemhighlight'],
    legend: {
        docked: 'bottom',
        background: '#F4F7FD'
    },
    axes: [{
        type: 'numeric3d',
        position: 'left',
        fields: ['QSVFOPUSDS', 'QSVFOPUSDC', 'SVFOPUSDLT', 'QSVFOPUSDL'],
        grid: true,
        title: '',
        renderer: function (obj, value) {
            return Ext.util.Format.number(value, '0.0');
        }
    }, {
        type: 'category3d',
        position: 'bottom',
        title: {
            text: 'Sales Date',
            translationX: -30
        }
    }],
    series: [{
        type: 'bar3d',
        stacked: false,
        title: ['Total Sales', 'Match Sales', 'Total Sett.', 'Match Sett.'],
        xField: 'strFormatDate',
        yField: ['QSVFOPUSDS', 'QSVFOPUSDC', 'SVFOPUSDLT', 'QSVFOPUSDL'],
        highlight: true,
        style: {
            inGroupGapWidth: -7,
            minGapWidth: 2,
            maxBarWidth: 1000
        },
        subStyle: {
            fill: [
                '#00FF00',  // Total Sales - azul medio
                '#5dd92d',  // Match Sales - azul claro
                '#0000FF',  // Total Sett. - verde medio
                '#0066ff'   // Match Sett. - verde claro
            ]
        },
        tooltip: {
            trackMouse: true,
            height: 28,
            renderer: function (toolTip, record, ctx) {
                var label = '';
                switch (ctx.field) {
                    case 'QSVFOPUSDS':
                        label = 'Total Sales';
                        break;
                    case 'QSVFOPUSDC':
                        label = 'Match Sales';
                        break;
                    case 'SVFOPUSDLT':
                        label = 'Total Sett.';
                        break;
                    case 'QSVFOPUSDL':
                        label = 'Match Sett.';
                        break;
                }
                toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
            }
        }
    }]
}
,
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-graficosAñosAmountC',
                                                    width: 1500,
                                                    hidden: true,
                                                    border: false,
                                                    height: 400,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Totals Amount by Sales Date \n\ USD',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    legend: {
                                                        docked: 'bottom',
                                                        background: '#F4F7FD'
                                                    },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['ASALES', 'AMATCH', 'APEND'],
                                                            grid: true,
                                                            title: '',
                                                            //title: 'Millions of USD',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    if ((value / 1000).toString().length > 3) {
                                                                        return  ' $' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                                                    } else {
                                                                        return  ' $' + Ext.util.Format.number((value / 1000), '0') + 'K';
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
                                                                text: 'Sales Date',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Sales', 'Conciliation', 'Pending'],
                                                            xField: 'strFormatDate',
                                                            yField: ['ASALES', 'AMATCH', 'APEND'],
                                                            colors: ['#0066ff', '#5dd92d', '#ea0000'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 1000
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'ASALES') {
                                                                        label = 'Sales';
                                                                    } else if (ctx.field === 'AMATCH') {
                                                                        label = 'Conciliation';
                                                                    } else if (ctx.field === 'APEND') {
                                                                        label = 'Pending';
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
                                        // <editor-fold defaultstate="collapsed" desc="Pie Totales">
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            hidden: false,
                                            margin: '10 0 0 60',
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-lblTittleGlobalMatch',
                                                    labelAlign: 'center',
                                                    border: true,
                                                    hidden: false,
                                                    align: 'center',
                                                    margin: '5 0 20 100',
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        color: '#231223',
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        textAlign: 'center',
                                                        border: '2px solid #000000',
                                                        padding: '10px',
                                                        borderRadius: '5px'
                                                    }
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPieGlobalMatch',
                                                    width: 400, // antes 450
                                                    height: 200, // antes 260
                                                    innerPadding: 20, // antes 40
                                                    background: '#F4F6F6',
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                        type: 'pie3d',
                                                        angleField: 'value',
                                                        label: {
                                                            field: 'texto',
                                                            distance: 20, // antes 40
                                                            avoidOverlap: true,
                                                            calloutLine: true,
                                                            renderer: function (value, b, callout) {
                                                                callout.calloutWidth = 1;
                                                                return value;
                                                            }
                                                        },
                                                        highlight: true,
                                                        rotation: 70,
                                                        tooltip: {
                                                            trackMouse: true,
                                                            height: 28,
                                                            renderer: function (toolTip, record, ctx) {
                                                                toolTip.setHtml(record.get('label') + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                            }
                                                        },
                                                        colors: ['#F44336', '#58E02E']
                                                    }]
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-lblTitleSettlement',
                                                    labelAlign: 'center',
                                                    border: true,
                                                    hidden: false,
                                                    align: 'center',
                                                    margin: '15 0 20 100',
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        color: '#231223',
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        textAlign: 'center',
                                                        border: '2px solid #000000',
                                                        padding: '10px',
                                                        borderRadius: '5px'
                                                    }
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPieSettlement',
                                                    width: 400, // antes 450
                                                    height: 200, // antes 260
                                                    innerPadding: 20, // antes 40
                                                    background: '#F4F6F6',
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                        type: 'pie3d',
                                                        angleField: 'value',
                                                        label: {
                                                            field: 'texto',
                                                            distance: 20, // antes 40
                                                            avoidOverlap: true,
                                                            calloutLine: true,
                                                            renderer: function (value, b, callout) {
                                                                callout.calloutWidth = 1;
                                                                return value;
                                                            }
                                                        },
                                                        highlight: true,
                                                        rotation: 70,
                                                        tooltip: {
                                                            trackMouse: true,
                                                            height: 28,
                                                            renderer: function (toolTip, record, ctx) {
                                                                toolTip.setHtml(record.get('label') + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                            }
                                                        },
                                                        colors: ['#F44336', '#58E02E']
                                                    }]
                                                }
                                            ]
                                        }
                                        // </editor-fold>

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            hidden:false,
                                            margin: '40 0 0 25',
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        pack: 'center'
                                                    },
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotalC',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarSTC',
                                                            width: 400,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#ea0000', '#5dd92d'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal_TC',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST_TC',
                                                            width: 400,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#ea0000', '#5dd92d'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal2C',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST2C',
                                                            width: 450,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#5dd92d', '#ea0000'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    hidden:true,
                                    margin: '10 0 2 0',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        margin: '4 0'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 800},
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbgFlagaaC',
                                            margin: '0 0 0 500',
                                            items: [
                                                {boxLabel: '<b style="color:#046AAA;">Tickets</b>', inputValue: 'Cpn', name: 'rbgFlag', checked: true},
                                                {xtype: 'tbspacer', width: 20},
                                                {boxLabel: '<b style="color:#046AAA;">Amounts</b>', inputValue: 'Amt', name: 'rbgFlag', width: 80}
                                            ],
                                            listeners: {
                                                change: 'displayChart_ByMonthC'
                                            }
                                        }
                                    ]
                                },
                                
                            ]
                        },
                        // </editor-fold>
                         // <editor-fold defaultstate="collapsed" desc="Pantalla Total by MDP">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridConciliationMDP',
                            bodyStyle: 'background-color: #F4F7FD;',
                            border: false,
                            hidden: false,
//                            width: 1800,
//                            margin: '20 0 0 0 ',
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'treepanel',
                                                    id: prototype.id + '-gridDataConciMDP',
                                                    width: 1365,
                                                    style: 'margin-top:40px',
                                                    reserveScrollbar: true,
                                                    useArrows: true,
                                                    rootVisible: false,
                                                    multiSelect: true,
                                                    columnLines: true,
                                                    rowLines: true,
                                                    features: [{
                                                        ftype: 'summary'
                                                    }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Month',
                                                                width: 110,
                                                                dataIndex: 'strFormatDate',
                                                                xtype: 'treecolumn',
                                                                align: 'center',
                                                                style: ' background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    console.log(record.data, 'sales dateeeee')
                                                                    let valor = '';

                                                                    if (record.data.children && record.data.children[0].FCHILD === '1') {
                                                                        valor = value;
                                                                    } else if (record.data.children && record.data.children[0].FCHILD === '0') {
                                                                        valor = value;
                                                                    } else {
                                                                        valor = ' ';
                                                                    }
                                                                    return valor;
                                                                },
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                }
                                                            },
                                                            {
                                                                text: 'Av Group',
                                                                width: 90,
                                                                dataIndex: 'CCUST',
                                                                align: 'center',
                                                                style: ' background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#c9daf5;";
                                                                    let strCCUST = {
                                                                        134: 'AVIANCA',
                                                                        133: 'LACSA',
                                                                        202: 'TACA',
                                                                        547: 'AEROGAL',

                                                                    }
                                                                    let styleHref = '<u><a href="#payments-balance-analysis-by-age-form" style="color:#008FE3;text-decoration:underline;">';
                                                                    let styleHref2 = '</a></u>';

                                                                    if (Ext.getCmp(prototype.id + '-cmbAviancaGroup').getValue() !== '') {
                                                                        return styleHref + strCCUST[record.data.children[0].CCUST] + styleHref2;
                                                                    } else {
                                                                        return  strCCUST[value] ? styleHref + strCCUST[value] + styleHref2 : 'AV GROUP';
                                                                    }
                                                                },
                                                                listeners: {
                                                                    click: 'onGridCountryTotal'
                                                                }
                                                            },
                                                            {
                                                                text: 'Currency',
                                                                width: 65,
                                                                dataIndex: 'CURRENCY',
                                                                align: 'center',
                                                                style: ' background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    let data = record.data;
                                                                    console.log(data.QRATECON, 'RATECON!!')
                                                                    let perc1 = data.QRATECON === 0 ? 0 : data.QRATECON;
                                                                    return '<b style="font-size:14px;">USD</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale Information',
                                                                menuDisabled: true,
                                                                style: 'background: #EA454B;',
                                                                columns: [
                                                                            {
                                                                                text: 'Total',
                                                                                width: 120,
                                                                                dataIndex: 'QSVFOPUSDS',
                                                                                align: 'center',
                                                                                style: ' background: #EA454B;',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;font-size:14px";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return '<b style="font-size:14px;">' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataConciZ').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQSALES, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match',
                                                                                width: 120,
                                                                                dataIndex: 'QSVFOPUSDC',
                                                                                align: 'center',
                                                                                style: ' background: #EA454B;',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                   return '<b style="font-size:14px;">' + value + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataConciZ').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPUSDS, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '% Match',
                                                                                width: 65,
                                                                                dataIndex: 'QRATECON',
                                                                                align: 'center',
                                                                                style: ' background: #EA454B;',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    let data = record.data;
                                                                                    console.log(data.QRATECON, 'RATECON!!')
                                                                                    let perc1 = data.QRATECON === 0 ? 0 : data.QRATECON;
                                                                                    return '<b style="font-size:14px;">' + Ext.util.Format.number(perc1, '0.00%') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataConciZ').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF1, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Settlement Information',
                                                                menuDisabled: true,
                                                                style: 'background: #00B0F0;',
                                                                columns: [
                                                                    {
                                                                        text: '% Match',
                                                                        width: 65,
                                                                        dataIndex: 'QRATECONL',
                                                                        align: 'center',
                                                                        style: ' background: #00B0F0;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            let data = record.data;
                                                                            console.log(data.QRATECONL, 'RATECON!!')
                                                                            let perc2 = data.QRATECONL === 0 ? 0 : data.QRATECONL;
                                                                            return '<b style="font-size:14px;">' + Ext.util.Format.number(perc2, '0.00%') + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        width: 120,
                                                                        dataIndex: 'QSVFOPUSDLT',
                                                                        align: 'center',
                                                                        style: ' background: #00B0F0;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Match',
                                                                        width: 120,
                                                                        dataIndex: 'QSVFOPUSDL',
                                                                        align: 'center',
                                                                        style: ' background: #00B0F0;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'W/O Sales',
                                                                        width: 90,
                                                                        dataIndex: 'QSVFOPUSDP',
                                                                        align: 'center',
                                                                        style: ' background: #00B0F0;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_MF2, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            
                                                            {
                                                                text: 'Others Information',
                                                                menuDisabled: true,
                                                                style: 'background: #D18F77;',
                                                                columns: [
                                                                    {
                                                                        text: 'Comision <br> TC',
                                                                        width: 100,
                                                                        dataIndex: 'QCOMISION',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77 ;color: white;';
                                                                            return '<b>' + Ext.util.Format.number(data.totQTY_SE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Taxes / <br> Expenses',
                                                                        width: 100,
                                                                        dataIndex: 'QRTEIVA',
                                                                        align: 'center',
                                                                        style: ' background: #D18F77;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; background: #D18F77 ;color: white;';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT_SE, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Net',
                                                                width: 120,
                                                                dataIndex: 'QNETO',
                                                                align: 'center',
                                                                style: ' background: #8A99A6;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b style="font-size:14px;">' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #8A99A6 ;color: white;';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY_PR, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                      text: '% Send',
                                                                      width: 70,
                                                                      dataIndex: 'RATEACCOU',
                                                                      align: 'center',
                                                                      style: ' background: #92a5ab;',
                                                                      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                          metaData.style = "text-align:right;";
                                                                          let data = record.data;
                                                                          console.log(data.RATEACCOU, 'RATEACCOU!!')
                                                                          let perc1 = data.RATEACCOU === 0 ? 0 : data.RATEACCOU;
                                                                          return '<b style="font-size:14px;">' + Ext.util.Format.number(perc1, '0.00%') + '</b>';
                                                                      },
                                                                  },
                                                             {
                                                                text: '% Send',
                                                                menuDisabled: true,
                                                                hidden: true,
                                                                style: 'background: #92a5ab;',
                                                                columns: [
                                                                    {
                                                                        text: 'Total',
                                                                        width: 100,
                                                                        dataIndex: 'SVFOPACCO',
                                                                        align: 'center',
                                                                        style: ' background: #92a5ab;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                    },
                                                                    {
                                                                        text: 'Send',
                                                                        width: 100,
                                                                        dataIndex: 'SVFOPACCC',
                                                                        align: 'center',
                                                                        style: ' background: #92a5ab;',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return '<b style="font-size:14px;">' + value + '</b>';
                                                                        },
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-SummaryCardDataConMDP',
                                                    width: 1365,
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
                                                        style: 'background:#7F98A8;color:white;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:13px'
                                                    },
                                                    items: [
                                                        {width: 265, id: prototype.id + '-totQSALES_CONZMDP', value:'Totals'},
                                                        {width: 120, id: prototype.id + '-totQSALES_CONMDP'},
                                                        {width: 120, id: prototype.id + '-totSVFOPUSDS_CONMDP'},
                                                        {width: 65, id: prototype.id + '-perc2_CONMDP'},
                                                        {width: 65, id: prototype.id + '-perc3_CONMDP'},
                                                        {width: 120, id: prototype.id + '-totSVFOPUSDC_CONTMDP'},
                                                        
                                                        {width: 120, id: prototype.id + '-totSVFOPUSDC_CONMDP'},
                                                        {width: 90, id: prototype.id + '-totSVFOPUSDL_CONMDP'},
                                                        {width: 100, id: prototype.id + '-totCOMISION_CONMDP'},
                                                        {width: 100, id: prototype.id + '-totTAXES_CONMDP',},
                                                        {width: 120, id: prototype.id + '-totNet_CONMDP'},
                                                        {width: 80, id: prototype.id + '-totPerce_CONMP'}
                                                    ]
                                                },
                                                //PANEL DE GRAFICOS
                                                {
                                                    xtype: 'panel',
                                                    hidden: false,
                                                    margin: '15 0 5 0',
                                                    border: false,
                                                    layout: {
                                                        type: 'vbox',
                                                        aling: 'center'
                                                    },
                                                    bodyStyle: 'background-color: transparent;',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background-color: #F4F7FD;',
                                                            padding: '5 0 0 5',
                                                            border: true,
                                                            layout: {
                                                                type: 'vbox'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'cartesian',
                                                                    id: prototype.id + '-graficosAñosCMDP',
                                                                    width: 1300,
                                                                    border: false,
                                                                    height: 400,
                                                                    background: '#E0F8F7',
                                                                    captions: {
                                                                        title: {
                                                                            text: 'Sales, Settlements & Accounting Match',
                                                                            alignTo: 'chart'
                                                                        }
                                                                    },
                                                                    animation: {
                                                                        duration: 200
                                                                    },
                                                                    interactions: ['itemhighlight'],
                                                                    legend: {
                                                                        docked: 'bottom',
                                                                        background: '#F4F7FD'
                                                                    },
                                                                    axes: [{
                                                                        type: 'numeric3d',
                                                                        position: 'left',
                                                                        fields: ['QSVFOPUSDS', 'QSVFOPUSDC', 'SVFOPUSDLT', 'QSVFOPUSDL'],
//                                                                        fields: ['QSVFOPUSDS', 'QSVFOPUSDC', 'SVFOPUSDLT', 'QSVFOPUSDL','SVFOPACCO','SVFOPACCC'],
                                                                        grid: true,
                                                                        title: '',
                                                                        renderer: function (obj, value) {
                                                                            return Ext.util.Format.number(value, '0.0');
                                                                        }
                                                                    }, {
                                                                        type: 'category3d',
                                                                        position: 'bottom',
                                                                        title: {
                                                                            text: 'Sales Date',
                                                                            translationX: -30
                                                                        }
                                                                    }],
                                                                series: [{
                                                                    type: 'bar3d',
                                                                    stacked: false,
                                                                    title: ['Total Sales', 'Match Sales', 'Total Sett.', 'Match Sett.'],
//                                                                    title: ['Total Sales', 'Match Sales', 'Total Sett.', 'Match Sett.','Total Accounting','Send Accounting'],
                                                                    xField: 'strFormatDate',
                                                                    yField: ['QSVFOPUSDS', 'QSVFOPUSDC', 'SVFOPUSDLT', 'QSVFOPUSDL'],
//                                                                    yField: ['QSVFOPUSDS', 'QSVFOPUSDC', 'SVFOPUSDLT', 'QSVFOPUSDL','SVFOPACCO','SVFOPACCC'],
                                                                    highlight: true,
                                                                    style: {
                                                                        inGroupGapWidth: -7,
                                                                        minGapWidth: 2,
                                                                        maxBarWidth: 1000
                                                                    },
                                                                    subStyle: {
                                                                        fill: [
                                                                            '#E51C23',  // Total Sales - azul medio
                                                                            '#F36C72',  // Match Sales - azul claro
                                                                            '#00B0F0',  // Total Sett. - verde medio
                                                                            '#66CCF5',   // Match Sett. - verde claro
//                                                                            '#C9C9C9',  // Total Sett. - verde medio
//                                                                            '#8C8C8C', 
                                                                        ]
                                                                    },
                                                                    tooltip: {
                                                                        trackMouse: true,
                                                                        height: 28,
                                                                        renderer: function (toolTip, record, ctx) {
                                                                            var label = '';
                                                                            switch (ctx.field) {
                                                                                case 'QSVFOPUSDS':
                                                                                    label = 'Total Sales';
                                                                                    break;
                                                                                case 'QSVFOPUSDC':
                                                                                    label = 'Match Sales';
                                                                                    break;
                                                                                case 'SVFOPUSDLT':
                                                                                    label = 'Total Sett.';
                                                                                    break;
                                                                                case 'QSVFOPUSDL':
                                                                                    label = 'Match Sett.';
                                                                                    break;
                                                                                case 'SVFOPACCO':
                                                                                    label = 'Accounting Total.';
                                                                                    break;
                                                                                case 'SVFOPACCC':
                                                                                    label = 'Accounting Send.';
                                                                                    break;
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                            }
                ,
                                                                {
                                                                    xtype: 'cartesian',
                                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                                    id: prototype.id + '-graficosAñosAmountCMDP',
                                                                    width: 1550,
                                                                    hidden: true,
                                                                    border: false,
                                                                    height: 400,
                                                                    background: '#E0F8F7',
                                                                    captions: {
                                                                        title: {
                                                                            text: 'Totals Amount by Sales Date \n\ USD',
                                                                            alignTo: 'chart'
                                                                        }
                                                                    },
                                                                    animation: {
                                                                        duration: 200
                                                                    },
                                                                    interactions: ['itemhighlight'],
                                                                    legend: {
                                                                        docked: 'bottom',
                                                                        background: '#F4F7FD'
                                                                    },
                                                                    axes: [{
                                                                            type: 'numeric3d',
                                                                            position: 'left',
                                                                            fields: ['ASALES', 'AMATCH', 'APEND'],
                                                                            grid: true,
                                                                            title: '',
                                                                            //title: 'Millions of USD',
                                                                            renderer: function (obj, value) {
                                                                                if (value > 1) {
                                                                                    if ((value / 1000).toString().length > 3) {
                                                                                        return  ' $' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                                                                    } else {
                                                                                        return  ' $' + Ext.util.Format.number((value / 1000), '0') + 'K';
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
                                                                                text: 'Sales Date',
                                                                                translationX: -30
                                                                            }
                                                                        }],
                                                                    series: [{
                                                                            type: 'bar3d',
                                                                            stacked: false,
                                                                            title: ['Sales', 'Conciliation', 'Pending'],
                                                                            xField: 'strFormatDate',
                                                                            yField: ['ASALES', 'AMATCH', 'APEND'],
                                                                            colors: ['#0066ff', '#5dd92d', '#ea0000'],
                                                                            highlight: true,
                                                                            style: {
                                                                                inGroupGapWidth: -7,
                                                                                minGapWidth: 2,
                                                                                maxBarWidth: 1000
                                                                            },
                                                                            tooltip: {
                                                                                trackMouse: true,
                                                                                height: 28,
                                                                                renderer: function (toolTip, record, ctx) {
                                                                                    var label = '';
                                                                                    if (ctx.field === 'ASALES') {
                                                                                        label = 'Sales';
                                                                                    } else if (ctx.field === 'AMATCH') {
                                                                                        label = 'Conciliation';
                                                                                    } else if (ctx.field === 'APEND') {
                                                                                        label = 'Pending';
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
                                        // <editor-fold defaultstate="collapsed" desc="Pie Totales">
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            hidden: false,
                                            margin: '10 0 0 60',
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-lblTittleGlobalMatchMDP',
                                                    labelAlign: 'center',
                                                    border: true,
                                                    hidden: false,
                                                    align: 'center',
                                                    margin: '5 0 20 100',
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        color: '#231223',
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        textAlign: 'center',
                                                        border: '2px solid #000000',
                                                        padding: '10px',
                                                        borderRadius: '5px'
                                                    }
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPieGlobalMatchMDP',
                                                    width: 400, // antes 450
                                                    height: 200, // antes 260
                                                    innerPadding: 20, // antes 40
                                                    background: '#F4F6F6',
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                        type: 'pie3d',
                                                        angleField: 'value',
                                                        label: {
                                                            field: 'texto',
                                                            distance: 20, // antes 40
                                                            avoidOverlap: true,
                                                            calloutLine: true,
                                                            renderer: function (value, b, callout) {
                                                                callout.calloutWidth = 1;
                                                                return value;
                                                            }
                                                        },
                                                        highlight: true,
                                                        rotation: 70,
                                                        tooltip: {
                                                            trackMouse: true,
                                                            height: 28,
                                                            renderer: function (toolTip, record, ctx) {
                                                                toolTip.setHtml(record.get('label') + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                            }
                                                        },
                                                        colors: ['#F44336', '#58E02E']
                                                    }]
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-lblTitleSettlementMDP',
                                                    labelAlign: 'center',
                                                    border: true,
                                                    hidden: false,
                                                    align: 'center',
                                                    margin: '15 0 20 100',
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        color: '#231223',
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        textAlign: 'center',
                                                        border: '2px solid #000000',
                                                        padding: '10px',
                                                        borderRadius: '5px'
                                                    }
                                                },
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayPieSettlementMDP',
                                                    width: 400, // antes 450
                                                    height: 200, // antes 260
                                                    innerPadding: 20, // antes 40
                                                    background: '#F4F6F6',
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                        type: 'pie3d',
                                                        angleField: 'value',
                                                        label: {
                                                            field: 'texto',
                                                            distance: 20, // antes 40
                                                            avoidOverlap: true,
                                                            calloutLine: true,
                                                            renderer: function (value, b, callout) {
                                                                callout.calloutWidth = 1;
                                                                return value;
                                                            }
                                                        },
                                                        highlight: true,
                                                        rotation: 70,
                                                        tooltip: {
                                                            trackMouse: true,
                                                            height: 28,
                                                            renderer: function (toolTip, record, ctx) {
                                                                toolTip.setHtml(record.get('label') + ' : <b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                            }
                                                        },
                                                        colors: ['#F44336', '#58E02E']
                                                    }]
                                                }
                                            ]
                                        }
                                        // </editor-fold>

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            hidden:false,
                                            margin: '40 0 0 25',
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        pack: 'center'
                                                    },
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotalCMDP',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarSTCMDP',
                                                            width: 400,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#ea0000', '#5dd92d'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal_TCMDP',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST_TCMDP',
                                                            width: 400,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#ea0000', '#5dd92d'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTittleSalesTotal2CMDP',
                                                            labelAlign: 'center',
                                                            border: true,
                                                            hidden: true,
                                                            align: 'center',
                                                            margin: '5 0 5 100',
                                                            style: {
                                                                fontSize: '15px',
                                                                fontWeight: 'bold',
                                                                color: '#231223',
                                                                fontFamily: '"Open Sans", sans-serif',
                                                                textAlign: 'center',
                                                                border: '2px solid #000000', // Borde del marco
                                                                padding: '10px', // Espacio interno
                                                                borderRadius: '5px' // Esquinas redondeadas para un marco más suave (opcional)
                                                            }
                                                        },
                                                        {
                                                            xtype: 'polar',
                                                            id: prototype.id + '-displayPolarST2CMDP',
                                                            width: 450,
                                                            border: true,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
                                                            innerPadding: 10,
                                                            height: 200,
                                                            background: '#E0F8F7',
                                                            captions: {
                                                                title: {
//                                                                    text: 'Total Amount USD',
                                                                    alignTo: 'chart'
                                                                }
                                                            },
                                                            animation: {
                                                                duration: 200
                                                            },
                                                            interactions: ['rotate', 'itemhighlight'],
                                                            series: [{
                                                                    type: 'pie3d',
                                                                    angleField: 'Perc2',
                                                                    colors: ['#5dd92d', '#ea0000'],
                                                                    stacked: false,
                                                                    label: {
                                                                        field: 'VENDOR',
                                                                        calloutLine: true,
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
                                                                            label = record.get('VENDOR');
                                                                            if (label === 'Pending') {
                                                                                label = 'Pending';
                                                                            } else {
                                                                                label = 'Paid';
                                                                            }
                                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                        }
                                                                    }
                                                                }]
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    hidden:true,
                                    margin: '10 0 2 0',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        margin: '4 0'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 800},
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbgFlagaaC',
                                            margin: '0 0 0 500',
                                            items: [
                                                {boxLabel: '<b style="color:#046AAA;">Tickets</b>', inputValue: 'Cpn', name: 'rbgFlag', checked: true},
                                                {xtype: 'tbspacer', width: 20},
                                                {boxLabel: '<b style="color:#046AAA;">Amounts</b>', inputValue: 'Amt', name: 'rbgFlag', width: 80}
                                            ],
                                            listeners: {
                                                change: 'displayChart_ByMonthC'
                                            }
                                        }
                                    ]
                                },
                                
                            ]
                        },
                        // </editor-fold>
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1617,
                            id: prototype.id + '-panelGridSumaryMain',
                            bodyStyle: 'background-color: #F4F7FD;margin-top:8px',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                 {
                                     xtype: 'panel',
                                    bodyStyle: 'background-color: #F4F7FD;',
                                    border: false,
//                                    margin: '0 0 0 20',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                                xtype: 'container',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                padding: '0 10 3 10',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'middle'
                                                        },
                                                        padding: '0 10 5 10',
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                text: 'All View',
                                                                margin: '0 5 0 0',
                                                                width: 50,
                                                                id: prototype.id + '-COL'
                                                            },
                                                            {
                                                                xtype: 'component',
                                                                id: prototype.id + '-btnToggleSwitchPending',
                                                                margin: '0 5 0 0',
                                                                html: `<style>
                                                                    .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                                    .toggle-input{opacity:0;width:0;height:0;}
                                                                    .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                                    .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                                    .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                                    .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                                                </style>
                                                                <label class="toggle-container">
                                                                    <input type="checkbox" class="toggle-input">
                                                                    <span class="toggle-slider"></span>
                                                                </label>`,
                                                                tooltip: 'Export to Report',
                                                                listeners: {
                                                                    change: 'chgBash',
                                                                    click: 'chgBash'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                text: 'Pending View',
                                                                margin: '0 0 0 5',
                                                                width: 80,
                                                                id: prototype.id + '-EXT'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        {
                                    xtype: 'treepanel',
                                    id: prototype.id + '-gridSumaryMain',
                                    width: 1617,
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
                                                text: '<span style="color:black;font-weight:bold;">Valdate</span>', style:'background:#c9daf5;color:black !important',
                                                dataIndex: 'strFormatDate', width: 100, align: 'center', xtype: 'treecolumn',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    value = '<b>' + value + '</b>';
                                                    return  !record.data.children ? ' ' : value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">AV GROUP</span>', style:'background:#c9daf5;color:black !important',
                                                dataIndex: 'CCUST',
                                                width: 85,
                                                align: 'center', // centra a nivel de columna (por defecto)
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:center; color:#1A1A1A; display:block; text-align:center;";

                                                    const strCCUST = {
                                                        '547': 'AEROGAL',
                                                        '134': 'AVIANCA',
                                                        '133': 'LACSA',
                                                        '202': 'TACA'
                                                    };

                                                    const displayText = strCCUST[value] || 'AV GROUP';
                                                    return displayText;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">F1 - Settlement</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                columns: [
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">Received</span>', dataIndex: 'F1_TOTAL', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                         renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                             metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                        columns: [
                                                                {
                                                            text: '<span style="color:black;font-weight:bold;">W/O Settl</span>', dataIndex: 'F1_TOTAL_STVAL3', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                            listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_WSETT']
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
                                                            text: '<span style="color:black;font-weight:bold;">Completed</span>', dataIndex: 'F1_TOTAL_STVAL1', width: 80, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                 metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                            text: '<span style="color:black;font-weight:bold;">Taxes</span>', dataIndex: 'F1_TOTAL_TAXES', width: 80, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                             listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_TAXES']
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
                                                            text: '<span style="color:black;font-weight:bold;">Error</span>', dataIndex: 'F1_TOTAL_ERROR', width: 80, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                               listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_ERROR']
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
                                                        ]
                                                    },
                                                     {
                                                        text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true,style:'background:#FBD2D1;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F1_PERCENT', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                               
                                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                      metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
                                                                     return '<b>' + value + '</b>';
                                                                 },
                                                                 summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                     var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                     metaData.style = 'text-align:right; margin-right:3px ';
                                                                     return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                 }
                                                             }
                                                        ]
                                                    },
                                                     {
                                                        text: '<span style="color:black;font-weight:bold;align: center">Pending <br> to F2</span>', dataIndex: 'F1_TOTAL_PENDING_TO_F2', width: 70, style:'background:#FBD2D1;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                            listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_PENDING_F2']
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
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">F2 - Sales</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                columns: [
                                                            {
                                                            text: '<span style="color:black;font-weight:bold;">F1 Completed</span>', dataIndex: 'F2_F1_TOTAL_COMPLETED', width: 90, style:'background:#D1FBD2;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                            
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                 metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                         {
                                                            text: '<span style="color:black;font-weight:bold;">W/O Sales</span>', dataIndex: 'F2_TOTAL_PENDING_OVER50', width: 70, style:'background:#D1FBD2;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_WSALES']
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
                                                            text: '<span style="color:black;font-weight:bold;">F2 Completed</span>', dataIndex: 'F2_TOTAL_MATCH_OVER50', width: 90, style:'background:#D1FBD2;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                           
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'text-align:right; margin-right:3px ';
                                                                 value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                 return value;
                                                             },
                                                             summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                 var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                                 return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                             }
                                                         },
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true,style:'background:#D1FBD2;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F2_PERCENT', width: 70, style:'background:#D1FBD2;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                              
                                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                     metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A;";
                                                                     return '<b>' + value + '</b>';
                                                                 },
                                                                 summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                     var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                     metaData.style = 'text-align:right; margin-right:3px ';
                                                                     return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                 }
                                                             }
                                                        ]
                                                    },
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;align: center">Pending <br> to Acc</span>', dataIndex: 'F3_TOTAL_WO_ACC', width: 70, style:'background:#D1FBD2;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                           listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_PENDING_ACC']
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
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Accounted</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                columns: [
                                                    {
                                                            text: '<span style="color:black;font-weight:bold;">F2 Completed</span>', dataIndex: 'F3_F2_TOTAL_COMPLETED', width: 100, style:'background:#D6D6D6;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                            
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                 metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
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
                                                        text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                        columns: [
                                                            
                                                    {
                                                        text: '<span style="color:black;font-weight:bold;align: center">Pending <br> to Sent</span>', dataIndex: 'F3_TOTAL_PENDING_SENT', width: 70, style:'background:#D6D6D6;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                         listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_PENDING_SENT']
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
                                                            text: '<span style="color:black;font-weight:bold;">SENT</span>', dataIndex: 'F3_TOTAL_COMPLETED', width: 100, style:'background:#D6D6D6;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                             listeners: {
                                                                click: 'onClickDetailAvianca',
                                                                args: ['IN_SENT']
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
                                                            text: '<span style="color:black;font-weight:bold;">W/O  Acc</span>', dataIndex: 'F3_TOTAL_WO_ACC', width: 90, style:'background:#D6D6D6;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                             listeners: {
                                                                 click: 'onGridDataDetail'
                                                             },
                                                             hidden:true,
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                 metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                 value = '<b>' + Ext.util.Format.number(value, '0') + '</b>';
                                                                 return value;
                                                             },
                                                             summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                 var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                                 return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                             }
                                                         },
                                                        ]
                                                    },
                                                    {
                                                            text: '<span style="color:black;font-weight:bold;">SAP</span>', dataIndex: 'F3_TOTAL_COMPLETED_SAP', width: 90, style:'background:#D6D6D6;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                           
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'text-align:right; margin-right:3px ';
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
                                                        text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true,style:'background:#D6D6D6;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F3_PERCENT', width: 70, style:'background:#D6D6D6;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                               
                                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                     metaData.style = "color:#057ECB;text-align:right;color:#1A1A1A";
                                                                     return '<b>' + value + '</b>';
                                                                 },
                                                                 summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                     var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                     metaData.style = 'text-align:right; margin-right:3px ';
                                                                     return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                                 }
                                                             }
                                                        ]
                                                    },
                                                     {
                                                            text: '<span style="color:black;font-weight:bold;">Return Error</span>', dataIndex: 'F3_TOTAL_ERROR', width: 90, style:'background:#D6D6D6;color:black !important',align: 'center', menuDisabled: true, //flex: 1
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
                                                ]
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Sent to AV</span>', menuDisabled: true,style:'background:#DCD1F7;color:black !important',
                                                columns: [
                                                    {
                                                        hidden:true,text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true,style:'background:#DCD1F7;color:black !important',
                                                        columns: [
                                                            {
                                                            text: '<span style="color:black;font-weight:bold;">Completed Acc</span>', dataIndex: 'F1_TOTAL_STVAL3', width: 100, style:'background:#DCD1F7;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                             listeners: {
                                                                 click: 'onGridDataDetail'
                                                             },
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                 metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                 value = '<b>' + Ext.util.Format.number(value, '0') + '</b>';
                                                                 return value;
                                                             },
                                                             summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                 var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                                 return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                             }
                                                         },
                                                        ]
                                                    },
                                                    {
                                                        hidden:true,text: '<span style="color:black;font-weight:bold;">Pending</span>', menuDisabled: true,style:'background:#DCD1F7;color:black !important',
                                                        columns: [
                                                            {
                                                            text: '<span style="color:black;font-weight:bold;">To Sent</span>', dataIndex: 'F3_TOTAL_PENDING_SENT', width: 90, style:'background:#DCD1F7;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                             listeners: {
                                                                 click: 'onGridDataDetail'
                                                             },
                                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                 metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                 value = '<b>' + Ext.util.Format.number(value, '0') + '</b>';
                                                                 return value;
                                                             },
                                                             summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                 var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                                 return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
                                                             }
                                                         },
                                                        ]
                                                    },
                                                    {
                                                        hidde:true,text: '<span style="color:black;font-weight:bold;">Total</span>', menuDisabled: true,style:'background:#DCD1F7;color:black !important',
                                                        columns: [
                                                        
                                                        ]
                                                    },
                                                    {
                                                        hidden:true,text: '<span style="color:black;font-weight:bold;">%</span>', menuDisabled: true,style:'background:#DCD1F7;color:black !important',
                                                        columns: [
                                                            {
                                                                text: '<span style="color:black;font-weight:bold;">Progress</span>', dataIndex: 'F1_PERCENT', width: 70, style:'background:#DCD1F7;color:black !important',align: 'center', menuDisabled: true, //flex: 1
                                                                 listeners: {
                                                                     click: 'onGridDataDetail'
                                                                 },
                                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                     metaData.style = "color:#057ECB;text-align:right;color:#057ECB;text-decoration:underline;cursor:pointer";
                                                                     return '<b>' + value + '</b>';
                                                                 },
                                                                 summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                     var data = Ext.getCmp(prototype.id + '-gridSumaryMain').getStore().getData().items[0].data;
                                                                     metaData.style = 'text-align:right; margin-right:3px ';
                                                                     return '<b>' + Ext.util.Format.number(data.totQRMATCH, '0,000') + '<b>';
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
                                        id: prototype.id + '-SummaryMainData',
                                        align: 'left',
                                        margin: '0 0 0 0 ',
                                        layout: {
                                            type: 'hbox',
                                            align: 'left'
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
                                            {width: 70, id: prototype.id + '-F1_TOTAL_GLOBAL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 70, id: prototype.id + '-F1_TOTAL_STVAL3_GLOBAL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 80, id: prototype.id + '-F1_TOTAL_STVAL1_GLOBAL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 80, id: prototype.id + '-F1_TOTAL_TAXES_GLOBAL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 80, id: prototype.id + '-F1_TOTAL_ERROR_GLOBAL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 70, id: prototype.id + '-F1_PERCENT_GLOBAL',style:'background: #FBD2D1;text-align:right'},
                                            {width: 70, id: prototype.id + '-F1_TOTAL_PENDING_TO_F2_GLOBAL',style:'background: #FBD2D1;text-align:right'},
                                            
                                            {width: 90, id: prototype.id + '-F2_TOTAL_GLOBAL',style:'background: #D1FBD2;text-align:right'},
                                            {width: 70, id: prototype.id + '-F2_TOTAL_STVAL3_GLOBAL',style:'background: #D1FBD2;text-align:right'},
                                            {width: 90, id: prototype.id + '-F2_TOTAL_STVAL1_GLOBAL',style:'background: #D1FBD2;text-align:right'},
                                            {width: 70, id: prototype.id + '-F2_PERCENT_GLOBAL',style:'background: #D1FBD2;text-align:right'},
                                            {width: 70, id: prototype.id + '-SENT_TOTAL_STVAL3_GLOBAL',style:'background: #D1FBD2;text-align:right'},
                                            
                                            {width: 100, id: prototype.id + '-SENT_TOTAL_GLOBAL',style:'background: #D6D6D6;text-align:right'},
                                            {width: 70, id: prototype.id + '-SENT_TOTAL_SENT_GLOBAL',style:'background: #D6D6D6;text-align:right'},
                                            {width: 100, id: prototype.id + '-SENT_TOTAL_STVAL1_GLOBAL',style:'background: #D6D6D6;text-align:right'},
                                            {width: 90, id: prototype.id + '-SAP_TOTAL_STVAL1_GLOBAL',style:'background: #D6D6D6;text-align:right'},
                                            {width: 70, id: prototype.id + '-SENT_PERCENT_GLOBAL',style:'background: #D6D6D6;text-align:right'},
                                            {width: 90, id: prototype.id + '-RETURN_ERROR_GLOBAL',style:'background: #D6D6D6;text-align:right'},
                                            
                                            
                                            {hidden:true,width: 100, id: prototype.id + '-SAP_TOTAL_GLOBAL',style:'background: #DCD1F7;text-align:right'},
                                            {hidden:true,width: 90, id: prototype.id + '-SAP_TOTAL_STVAL3_GLOBAL',style:'background: #DCD1F7;text-align:right'},
                                            {hidden:true,width: 90, id: prototype.id + '-SAP_PERCENT_GLOBAL',style:'background: #DCD1F7;text-align:right'},
                                            {hidden:true,width: 70, id: prototype.id + '-SAP_PERCENT_GLOBAL1',style:'background: #DCD1F7;text-align:right'},
                                        ]
                                    },
                                    ]
                                },
                                  {
                                        xtype: 'panel',
                                        bodyStyle: 'background-color: #F4F7FD;',
                                        border: false,
                                        margin: '20 0 0 0',
                                        height:390,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'center'
                                        },
                                        items: [
                                            // ==========================
                                            // 🟢 PIE 1 - F1 Settlement
                                            // ==========================
                                            {
                                                xtype: 'panel',
                                                flex: 1,
                                                id: prototype.id + '-pieF1',
                                                bodyStyle: 'background-color: #F4F7FD;',
                                                border: false,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'component',
                                                          html: `
                                                                <div 
                                                                    style="
                                                                        font-size:18px; 
                                                                        font-weight:600; 
                                                                        color:#4C8ED9;
                                                                        text-decoration: underline; 
                                                                        cursor: pointer; 
                                                                        margin-bottom:10px;
                                                                    ">
                                                                    F1 - Settlement
                                                                </div>
                                                            `,
                                                        style: { textAlign: 'center' }
                                                    },
                                                    {
                                                        xtype: 'polar',
                                                        id: prototype.id + '-displayPolarSM',
                                                        width: 420,
                                                        height: 310,
                                                        innerPadding: 20,
//                                                        insetPadding: { bottom: 40 },
                                                        background: '#FFFFFF',
                                                        border: false,
                                                        bodyBorder: false,
                                                        bodyStyle: { background: '#FFFFFF', border: 'none' },
                                                        animation: { duration: 400, easing: 'easeOut' },
                                                        interactions: ['rotate', 'itemhighlight'],

                                                        legend: {
                                                            docked: 'bottom',
                                                            itemSpacing: 10,
                                                            marker: { size: 14 },
                                                            label: { fontSize: 13 }
                                                        },

                                                        series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            donut: 0, // sin hueco
                                                            distortion: 0.5,
                                                            highlightCfg: { margin: 6 },
                                                            colors: ['#A3E4A6', '#E31C24'], // verde pastel = avance, rojo pastel = pendiente

                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'rotate',
                                                                contrast: true,
                                                                font: '13px Arial',
                                                                fontWeight: 'bold',
                                                                calloutLine: { length: 25, width: 1 }
                                                            },

                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                    },
                                                ]
                                            },
                                            {  id: prototype.id + '-spacef2',xtype: 'container', width: 40 },
                                            // ==========================
                                            // 🔵 PIE 2 - F2 Sales
                                            // ==========================
                                            {
                                                xtype: 'panel',
                                                  id: prototype.id + '-pieF2',
                                                flex: 1,
                                                bodyStyle: 'background-color: #F4F7FD;',
                                                border: false,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'component',
                                                        html: `
                                                                <div 
                                                                    style="
                                                                        font-size:18px; 
                                                                        font-weight:600; 
                                                                        color:#4C8ED9;
                                                                        text-decoration: underline; 
                                                                        cursor: pointer; 
                                                                        margin-bottom:10px;
                                                                    ">
                                                                    F2 - Sales
                                                                </div>
                                                            `,
                                                        style: { textAlign: 'center' }
                                                    },
                                                    {
                                                        xtype: 'polar',
                                                        id: prototype.id + '-displayPolarF2',
                                                        width: 420,
                                                        height: 310,
                                                        innerPadding: 20,
                                                        background: '#FFFFFF',
                                                        border: false,
                                                        bodyBorder: false,
                                                        bodyStyle: { background: '#FFFFFF', border: 'none' },
                                                        animation: { duration: 400, easing: 'easeOut' },
                                                        interactions: ['rotate', 'itemhighlight'],

                                                        legend: {
                                                            docked: 'bottom',
                                                            itemSpacing: 10,
                                                            marker: { size: 14 },
                                                            label: { fontSize: 13 }
                                                        },

                                                        series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            donut: 0,
                                                            distortion: 0.5,
                                                            highlightCfg: { margin: 8 },
                                                            colors: ['#A3E4A6', '#E31C24'], // mismos colores pastel

                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'rotate',
                                                                contrast: true,
                                                                font: '13px Arial',
                                                                fontWeight: 'bold',
                                                                calloutLine: { length: 25, width: 1 }
                                                            },

                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                    }
                                                ]
                                            },
                                            { id: prototype.id + '-spacef1',xtype: 'container', width: 40 },
                                             // ==========================
                                            // 🔵 PIE 3 - aCCOUNTED
                                            // ==========================
                                            {
                                                xtype: 'panel',
                                                flex: 1,
                                                bodyStyle: 'background-color: #F4F7FD;',
                                                  id: prototype.id + '-pieAcc',
                                                border: false,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'component',
                                                        html: `
                                                                <div 
                                                                    style="
                                                                        font-size:18px; 
                                                                        font-weight:600; 
                                                                        color:#4C8ED9;
                                                                        text-decoration: underline; 
                                                                        cursor: pointer; 
                                                                        margin-bottom:10px;
                                                                    ">
                                                                    Accounted
                                                                </div>
                                                            `,
                                                        style: { textAlign: 'center' }
                                                    },
                                                    {
                                                        xtype: 'polar',
                                                        id: prototype.id + '-displayPolarF3',
                                                       width: 420,
                                                        height: 310,
                                                        innerPadding: 20,
                                                        background: '#FFFFFF',
                                                        border: false,
                                                        bodyBorder: false,
                                                        bodyStyle: { background: '#FFFFFF', border: 'none' },
                                                        animation: { duration: 400, easing: 'easeOut' },
                                                        interactions: ['rotate', 'itemhighlight'],

                                                        legend: {
                                                            docked: 'bottom',
                                                            itemSpacing: 10,
                                                            marker: { size: 14 },
                                                            label: { fontSize: 13 }
                                                        },

                                                        series: [{
                                                            type: 'pie3d',
                                                            angleField: 'Perc2',
                                                            legendField: 'LABEL',
                                                            donut: 0,
                                                            distortion: 0.5,
                                                            highlightCfg: { margin: 8 },
                                                            colors: ['#A3E4A6', '#E31C24'], // mismos colores pastel

                                                            label: {
                                                                field: 'VENDOR',
                                                                display: 'rotate',
                                                                contrast: true,
                                                                font: '13px Arial',
                                                                fontWeight: 'bold',
                                                                calloutLine: { length: 25, width: 1 }
                                                            },

                                                            tooltip: {
                                                                trackMouse: true,
                                                                renderer: function (toolTip, record) {
                                                                    toolTip.setHtml(record.get('VENDOR').replace(/\n/g, '<br>'));
                                                                }
                                                            }
                                                        }]
                                                    }
                                                ]
                                            },
                                            // ==========================
                                            //F1 CODES
                                            // ==========================
                                            {
                                                xtype: 'panel',
                                                id: prototype.id + '-codeF1',
                                                layout: {
                                                    type: 'vbox',
                                                    pack: 'center'
                                                },
                                                border: false,
                                                 background: '#FFFFFF',
                                                hidden: true,
                                                bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                                items: [
                                                    {
                                                        xtype: 'cartesian',
                                                        id: prototype.id + '-displayF1',
                                                        width: 1000,
                                                        height: 300,
                                                        border: false,
                                                        background: '#F4F7FD',
                                                        margin: '0 0 0 5',
                                                        flipXY: true,

                                                        captions: {
                                                            title: {
                                                                alignTo: 'chart',
                                                                text: 'Pending',
                                                                fontSize: 22,
                                                                color: '#333',
                                                                fontWeight: 'bold'
                                                            }
                                                        },
                                                        animation: { duration: 300 },
                                                        interactions: ['itemhighlight'],
                                                        legend: {
                                                            docked: 'bottom',
                                                            background: '#F4F7FD'
                                                        },
                                                        axes: [
                                                            {
                                                                type: 'numeric3d',
                                                                position: 'bottom',
                                                                fields: ['QUANTITY_OF_DEPOSITS'],
                                                                grid: true,
                                                                renderer: function (obj, value) {
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                type: 'category3d',
                                                                position: 'left',
                                                                fields: 'strDescription',
                                                                grid: true,
                                                                label: {
                                                                textAlign: 'left',
                                                                font: 'bold 16px',
                                                                color: '#333'
                                                            }

                                                            }
                                                        ],
                                                        series: [
                                                            {
                                                                type: 'bar3d',
                                                                stacked: false,
                                                                xField: 'strDescription',
                                                                yField: ['QUANTITY_OF_DEPOSITS'],
                                                                colors: ['#E31C24'], // verde suave
                                                                highlight: true,
                                                                style: {
                                                                    inGroupGapWidth: 10,
                                                                    minGapWidth: 5,
                                                                    maxBarWidth: 120,
                                                                    thickness: 8 // 👈 reduce la profundidad del 3D
                                                                },
                                                                distortion: 0.25, // 👈 suaviza el ángulo del 3D
                                                                tooltip: {
                                                                    trackMouse: true,
                                                                    renderer: function (toolTip, record, ctx) {
                                                                        toolTip.setHtml(
                                                                            'QUANTITY OF DEPOSITS: <b>' +
                                                                                Ext.util.Format.number(
                                                                                    record.get(ctx.field),
                                                                                    '0,000'
                                                                                ) +
                                                                                '</b>'
                                                                        );
                                                                    }
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
                            width: 1700,
                            id: prototype.id + '-panelGridSumaryDetail',
                            bodyStyle: 'background-color: #F4F7FD;margin-top:20px',
                            padding: '1',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetail',
//                                    title: '<span style="font-size:15px; font-weight:bold; color:#1a3e75;">📊 Grilla Detalle</span>',
                                    height: 515,
                                    width: 1610,
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
                                            {text: '<span style="color:black;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 40,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Client</span>', dataIndex: 'CCUST', width: 60,style: 'padding:2px; background: #c9daf5;border-color:white',
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
                                            {text: '<span style="color:black;font-weight:bold;">Scountry</span>', dataIndex: 'SCOUNTRY', width: 80,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Valdate</span>', dataIndex: 'VALDATE', width: 80,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Bandoc</span>', dataIndex: 'BANDOC', width: 80,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Refer</span>', dataIndex: 'REFER', width: 140,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Texto Largo</span>', dataIndex: 'TEXTOLAR', width: 230,style: 'padding:2px; background: #c9daf5;border-color:white',
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:left;";
                                                return  value;
                                            }},
                                            {text: '<span style="color:black;font-weight:bold;">Days Pending</span>', dataIndex: 'DAYS_PENDING', width: 100,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                      
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Code Error</span>',
                                                dataIndex: 'CERROR',
                                                width: 80,
                                                style: 'padding:2px; background: #c9daf5;border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    var desc = record.get('DESCRIPTION_CERROR') || ''; 
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(desc) + '"';
                                                    return value;
                                                }
                                            },
                                            
                                          {text: '<span style="color:black;font-weight:bold;">Corep</span>', dataIndex: 'COREP', width: 60,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Codpro</span>', dataIndex: 'CODPRO', width: 60,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Qty Total</span>', dataIndex: 'QTY100_TOTAL', width: 80,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">QTY Match</span>', dataIndex: 'QTY100_MATCH', width: 80,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">QTY Pending</span>', dataIndex: 'QTY100_PENDING', width: 90,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Header</span>', dataIndex: 'A4545HEADE', width: 100,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {text: '<span style="color:black;font-weight:bold;">Scurrency</span>', dataIndex: 'SCURRENCY', width: 80,style: 'padding:2px; background: #c9daf5;border-color:white'},
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Net</span>',
                                                dataIndex: 'NETO',
                                                width: 120,
                                                style: 'padding:2px; background:#c9daf5; border-color:white;',
                                                renderer: function (value, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    // Si el valor es nulo o vacío, mostramos 0.00
                                                    if (value == null || value === '') return '0.00';
                                                    // Formatea con 2 decimales y separador de miles
                                                    return Ext.util.Format.number(value, '0,0.00');
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
                    hidden: true,
                    height: 30,
                    margin: '15 0 18 0',
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
    ]
}
);


