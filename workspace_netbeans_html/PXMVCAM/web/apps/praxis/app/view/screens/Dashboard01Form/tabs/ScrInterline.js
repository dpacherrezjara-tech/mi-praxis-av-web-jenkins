Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.ScrInterline', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrInterline',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.ScrInterlineController'
    ],
    controller: 'ScrInterlineController',
//    layout: 'fit',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainData_interline',
            width: '100%',
            hidden: false,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 15 0 0"  // (top, right, bottom, left)
            },
            items: [

                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_interline',
                            width: 103,
                            columnLines: true,
                            margin: "5 0 0 0",
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
                                        text: ' &nbsp ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Billing <br> Date', dataIndex: 'strFormatDate', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#D1E0E0;";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                ]
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataP1_interline',
                            width: 603,
                            columnLines: true,
                            margin: "5 0 0 0",
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
                                        text: ' &nbsp ',
                                        id: prototype.id + '-HD_LASTYEAR',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: ' Outgoing Billing ',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'USD', dataIndex: 'TNETOCAR_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#CCE6FF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', dataIndex: 'QITEMSCAR_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#CCE6FF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSSI_LY, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: ' Incoming Billing ',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'USD', dataIndex: 'TNETO_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTNETO_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', dataIndex: 'QITEMS_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQITEMS_LY, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: ' Balance',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'USD', dataIndex: 'diffTNETO_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', dataIndex: 'diffQITEMS_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var strDescripcion2 = record.data.strDescripcion2;
                                                            var color = '';
                                                            if (strDescripcion2 === 'rojo') {
                                                                color = '#fa0505';
                                                            } else {
                                                                color = '#020202';
                                                            }

                                                            metaData.style = "text-align:right;color:" + color + ";";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXI_LY, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataP2_interline',
                            width: 603,
                            columnLines: true,
                            margin: "5 0 0 0",
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
                                        text: ' &nbsp ',
                                        id: prototype.id + '-HD_CURRENTYEAR',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: ' Outgoing Billing ',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'USD', dataIndex: 'TNETOCAR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#CCE6FF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', dataIndex: 'QITEMSCAR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#CCE6FF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSSI, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: ' Incoming Billing ',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'USD', dataIndex: 'TNET', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTNETO, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', dataIndex: 'NUMREC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQITEMS, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: ' Balance',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'USD', dataIndex: 'diffTNETO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSISCI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', dataIndex: 'diffQITEMS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var strDescripcion2 = record.data.strDescripcion2;
                                                            var color = '';
                                                            if (strDescripcion2 === 'rojo') {
                                                                color = '#fa0505';
                                                            } else {
                                                                color = '#020202';
                                                            }

                                                            metaData.style = "text-align:right;color:" + color + ";";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1_interline').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXI, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            }
                        },
                    ]
                }

            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainData_interline2',
            width: 1350, //1350 para ocultar la ultima columna 
            hidden: false,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 15 0 0"  // (top, right, bottom, left)
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '5 0 0 5',
                    hidden: false,
                    border: true,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-ChtExchangeMB_01112',
                            width: 1480,
                            border: false,
                            height: 280,
                            background: '#D1E8FE',
                            captions: {
                                title: {
                                    text: ' Billing 2022 - USD ',
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
                                    fields: ['TNETOCARGRA', 'TNETGRA'],
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
                                }, {
                                    type: 'category3d',
                                    position: 'bottom',
                                    grid: true,
                                    title: {
                                        text: '',
                                        translationX: -30
                                    }
                                }],
                            series: [{
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Outgoing', 'Incoming'],
                                    xField: 'strFormatDateGRA',
                                    yField: ['TNETOCARGRA', 'TNETGRA'],
                                    colors: ['#67BFFF', '#ffff99'],
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
                                            if (ctx.field === 'TNETOCARGRA') {
                                                label = 'Outgoing Billing';
                                            } else if (ctx.field === 'TNETGRA') {
                                                label = 'Incoming Billing';
                                            }
                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                        }
                                    },
                                }]
                        }
                    ]
                }
            ]
        }
        ,
        {
            xtype: 'panel',
            id: prototype.id + '-boxInt_Month_1',
            width: '100%',
            hidden: false,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 15 0 0"  // (top, right, bottom, left)
            },
            items: [

                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [

                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_INT_1',
                            width: 683,
                            columnLines: true,
                            margin: "5 0 0 0",
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
                                    {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "";
                                            value = '<b>' + value + '</b>';
                                            return value;
                                        }
                                    },
                                    {
                                        text: ' Outgoing Billing ',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QTY', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_1').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTY, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:center";
                                                    return value;
                                                }
                                            },
                                            {text: 'Gross', dataIndex: 'A050ACEPTA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_1').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Isc', dataIndex: 'A050COMISI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_1').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Tax', dataIndex: 'A050TUA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_1').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Net', dataIndex: 'A050NETO', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_1').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                ]
                            }
                        },
                        {xtype: 'tbspacer', width: 20},

                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_INT_2',
                            width: 683,
                            columnLines: true,
                            margin: "5 0 0 0",
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
                                    {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "";
                                            value = '<b>' + value + '</b>';
                                            return value;
                                        }
                                    },
                                    {
                                        text: ' Outgoing Reject ',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Documents', dataIndex: 'QTY2', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_2').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTY2, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:center";
                                                    return value;
                                                }
                                            },
                                            {text: 'Gross', dataIndex: 'A050ACEPTA2', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_2').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA2, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Isc', dataIndex: 'A050COMISI2', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_2').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI2, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Tax', dataIndex: 'A050TUA2', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_2').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA2, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Net', dataIndex: 'A050NETO2', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT_2').getStore().getData().items[0].data;
                                                    console.log(data);
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA2, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                ]
                            }
                        },
                    ]
                }

            ]
        }
    ]
});