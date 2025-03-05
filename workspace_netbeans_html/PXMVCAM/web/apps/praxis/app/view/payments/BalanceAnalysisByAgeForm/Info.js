valor = '0';
Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
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
                width: 1800,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
//                            height: 800,
                            width: 1800,
                            margin: '20 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
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
                                                        background: '#E3EAEF'
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
                                                        background: '#E3EAEF'
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                        background: '#E3EAEF'

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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                        background: '#E3EAEF'

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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                        background: '#E3EAEF'

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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                        background: '#E3EAEF'

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
//                                                        background: '#E3EAEF'
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                        background: '#E3EAEF'

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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                                                        background: '#E3EAEF'
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
//                                                        background: '#E3EAEF'
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                            bodyStyle: 'background-color: #E3EAEF;',
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
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1004,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxGrill',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 'auto',
                                    width: 500,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataProvisions',
                                            height: 400,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            width: 502,
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
                                                        style: 'padding: 6px; background: #6C87A8;',
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
                                                        text: 'Settlement Information',
                                                        menuDisabled: true,
                                                        style: 'background: #6C87A8;',
                                                        columns: [
                                                            {
                                                                text: 'Qty',
                                                                width: 100,
                                                                dataIndex: 'QTY_LF2',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY_LF2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Qty Match',
                                                                width: 100,
                                                                dataIndex: 'QTY_CF2',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #6C87A8;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #6C87A8;color: white; ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY_CF2, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Accounting Information',
                                                        menuDisabled: true,
                                                        style: 'background: #7D9F7D;',
                                                        columns: [
                                                            {
                                                                text: 'Qty Send',
                                                                width: 100,
                                                                dataIndex: 'QTY_SE',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #7D9F7D ;color: white;';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY_SE, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Qty Pend',
                                                                width: 100,
                                                                dataIndex: 'QTY_PE',
                                                                align: 'center',
                                                                style: 'padding: 6px; background: #7D9F7D;',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProvisions').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; background: #7D9F7D;color: white; ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY_PE, '0,000') + '<b>';
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
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 'auto',
                                    width: 500,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'vbox'
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 1192,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                            padding: '10px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1192,
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


