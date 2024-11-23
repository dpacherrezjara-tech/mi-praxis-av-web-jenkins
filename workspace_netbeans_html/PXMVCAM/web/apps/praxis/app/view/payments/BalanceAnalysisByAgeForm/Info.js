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
                                            xtype: 'treepanel',
                                            id: prototype.id + '-gridData',
                                            width: 1315 ,
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
                                                        text: 'Sales',
//                                                id: prototype.id + '-adgTitFecha',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate', width: 150,xtype: 'treecolumn',
//                                                        listeners: {
//                                                            click: 'OnviewDetBank'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
//                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-clarification-dashboard-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                        }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Av Group', dataIndex: 'CCUST', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                            let strCCUST = {
                                                                134: 'AVIANCA',
                                                                133: 'LACSA',
                                                                202: 'TACA',
                                                                547: 'AEROGAL',
                                                            }
                                                           
                                                            
                                                            return  strCCUST[value];
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

                                                                    let perc1 = data.totASALES === 0 ? 0 : (data.ASALES / data.totASALES) * 100;
                                                                    return Ext.util.Format.number(perc1, '0.00%');
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
                                                    console.log('hola mundo');
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


