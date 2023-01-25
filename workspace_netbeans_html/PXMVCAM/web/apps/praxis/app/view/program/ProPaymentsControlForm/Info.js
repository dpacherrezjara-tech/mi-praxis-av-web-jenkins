valor = '0';
Ext.define('Ext.Praxis.view.program.ProPaymentsControlForm.Info', {
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
                width: 1770,
//                height: 900,
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
                        // <editor-fold defaultstate="collapsed" desc="panelGridData">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
//                            height: 800,
                            width: 1500,
                            margin: '20 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 1012,
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
                                                text: 'Sales',
//                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
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
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 60},
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
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation',
                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Accepted',
                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c9daf5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
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
                                                        text: 'Tickets', dataIndex: 'diff1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: '', dataIndex: 'strDescription4', width: 20,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === '1')
                                                        return '<img src="resources/img/botones/check.png">';
                                                    else
                                                        return '<img src="resources/img/botones/restricted_folder_symbol_stop-16.png">';
                                                }
                                            },
                                            {
                                                text: '  ',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Comment', dataIndex: 'strDescription', width: 110}
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary',
                                    width: 1012,
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
                                        {width: 60},
                                        {width: 100, id: prototype.id + '-totQTY1'},
                                        {width: 100, id: prototype.id + '-totSVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totperc1'},
                                        {width: 100, id: prototype.id + '-totQTYA'},
                                        {width: 100, id: prototype.id + '-totSVFOPUSA'},
                                        {width: 100, id: prototype.id + '-totdiff1'},
                                        {width: 100, id: prototype.id + '-totdiff2'},
                                        {width: 60, id: prototype.id + '-totperc3'},
                                        {width: 20},
                                        {width: 110}
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
                                                            text: 'Total Tickets by Sales Date ',
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
                                                            fields: ['QTY1', 'QTYA', 'diff1'],
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
                                                            title: ['Sales', 'Conciliation', 'Pending'],
                                                            xField: 'strFormatDate',
                                                            yField: ['QTY1', 'QTYA', 'diff1'],
                                                            colors: ['#c6f7cd', '#0066ff', '#CC0000'],
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
                                                                    if (ctx.field === 'QTY1') {
                                                                        label = 'Sales';
                                                                    } else if (ctx.field === 'QTYA') {
                                                                        label = 'Conciliation';
                                                                    } else if (ctx.field === 'diff1') {
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
                                                            text: 'Total Amount by Sales Date \n\ USD',
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
                                                            fields: ['SVFOPUS1', 'SVFOPUSA', 'diff2'],
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
                                                            yField: ['SVFOPUS1', 'SVFOPUSA', 'diff2'],
                                                            colors: ['#c6f7cd', '#0066ff', '#CC0000'],
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
                                                                    if (ctx.field === 'SVFOPUS1') {
                                                                        label = 'Sales';
                                                                    } else if (ctx.field === 'SVFOPUSA') {
                                                                        label = 'Conciliation';
                                                                    } else if (ctx.field === 'diff2') {
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
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataCountry">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 497,
                            width: 1024,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCountry',
                                    width: 1024,
                                    columnLines: true,
                                    height: 468,
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
                                                text: 'Country',
//                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCOUNTRY', width: 50},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription', width: 170,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
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
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation',
                                                id: prototype.id + '-headCountryConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Accepted',
                                                        id: prototype.id + '-headCountryAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
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
                                                        text: 'Tickets', dataIndex: 'diff1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummaryCountry',
                                    width: 1012,
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
                                        {width: 240},
//                                        {width: 70},
                                        {width: 100, id: prototype.id + '-totQTY1_CO'},
                                        {width: 100, id: prototype.id + '-totSVFOPUS1_CO'},
                                        {width: 60, id: prototype.id + '-totperc1_CO'},
                                        {width: 100, id: prototype.id + '-totQTYA_CO'},
                                        {width: 100, id: prototype.id + '-totSVFOPUSA_CO'},
                                        {width: 100, id: prototype.id + '-totdiff1_CO'},
                                        {width: 100, id: prototype.id + '-totdiff2_CO'},
                                        {width: 60, id: prototype.id + '-totperc3_CO'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataCard">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 497,
                            width: 1079,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCard',
                                    width: 1079,
                                    columnLines: true,
                                    height: 468,
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
//                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCARCOD', width: 50},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription', width: 225,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
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
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation',
                                                id: prototype.id + '-headCardConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Accepted',
                                                        id: prototype.id + '-headCardAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
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
                                                        text: 'Tickets', dataIndex: 'diff1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummaryCard',
                                    width: 1079,
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
                                        {width: 295},
//                                        {width: 70},
                                        {width: 100, id: prototype.id + '-totQTY1_CA'},
                                        {width: 100, id: prototype.id + '-totSVFOPUS1_CA'},
                                        {width: 60, id: prototype.id + '-totperc1_CA'},
                                        {width: 100, id: prototype.id + '-totQTYA_CA'},
                                        {width: 100, id: prototype.id + '-totSVFOPUSA_CA'},
                                        {width: 100, id: prototype.id + '-totdiff1_CA'},
                                        {width: 100, id: prototype.id + '-totdiff2_CA'},
                                        {width: 60, id: prototype.id + '-totperc3_CA'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataChannel">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataChannel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 852,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataChannel',
                                    width: 852,
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
                                            {text: 'Source', dataIndex: 'strDescription', width: 70},
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 60},
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
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation',
                                                id: prototype.id + '-headChannelConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Accepted',
                                                        id: prototype.id + '-headChannelAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
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
                                                        text: 'Tickets', dataIndex: 'diff1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataChannel',
                                    width: 852,
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
                                        {width: 70},
                                        {width: 60},
                                        {width: 100, id: prototype.id + '-totQTY1_CH'},
                                        {width: 100, id: prototype.id + '-totSVFOPUS1_CH'},
                                        {width: 60, id: prototype.id + '-totperc1_CH'},
                                        {width: 100, id: prototype.id + '-totQTYA_CH'},
                                        {width: 100, id: prototype.id + '-totSVFOPUSA_CH'},
                                        {width: 100, id: prototype.id + '-totdiff1_CH'},
                                        {width: 100, id: prototype.id + '-totdiff2_CH'},
                                        {width: 60, id: prototype.id + '-totperc3_CH'}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '10 0 0 0',
                                    width: 852,
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-displayChart06_Channel',
                                            width: 852,
                                            border: false,
                                            margin: '0 0 0 0',
                                            innerPadding: 60,
                                            height: 383,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Channels',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'perc1',
                                                    colors: ['#EC3838', '#ff9900', '#339933', '0066ff'],
//                                                colors: ['#c6f7cd', '#0066ff', '#CC0000'],
                                                    label: {
                                                        field: 'strDescription',
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutWidth = 0;
                                                            return value.substring(value.indexOf(',') + 1);
                                                        }
                                                    },
                                                    highlight: true,
//                                                tooltip: {
//                                                    trackMouse: true,
//                                                    height: 28,
//                                                    renderer: function(toolTip, record, ctx) {
//                                                        console.log(ctx.field);
//                                                        var label = '';
//                                                            if (ctx.field.includes('ASR')) {
//                                                                label = 'ASR';
//                                                            } else if (ctx.field.includes('BSP')) {
//                                                                label = 'BSP';
//                                                            } else if (ctx.field.includes('ASR')) {
//                                                                label = 'ASR';
//                                                            } else if (ctx.field.includes('Manual')) {
//                                                                label = 'Manual';
//                                                            }
//                                                        toolTip.setHtml(label + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
//                                                    }
//                                                }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainIata">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainIata',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 497,
                            width: 1249,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataIata',
                                    width: 1249,
                                    columnLines: true,
                                    height: 468,
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
                                                text: 'IATA',
//                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SAGENT', width: 75},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription', width: 240,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sub',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'strDescription2', width: 65}
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 75}
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 60},
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
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation',
                                                id: prototype.id + '-headIataConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Accepted',
                                                        id: prototype.id + '-headIataAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
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
                                                        text: 'Tickets', dataIndex: 'diff1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummaryIata',
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
                                        {width: 515},
                                        {width: 100, id: prototype.id + '-totQTY1_IA'},
                                        {width: 100, id: prototype.id + '-totSVFOPUS1_IA'},
                                        {width: 60, id: prototype.id + '-totperc1_IA'},
                                        {width: 100, id: prototype.id + '-totQTYA_IA'},
                                        {width: 100, id: prototype.id + '-totSVFOPUSA_IA'},
                                        {width: 100, id: prototype.id + '-totdiff1_IA'},
                                        {width: 100, id: prototype.id + '-totdiff2_IA'},
                                        {width: 60, id: prototype.id + '-totperc3_IA'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxPayDelay">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxPayDelay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1322,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPayDelay',
                                    width: 1322,
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 120}
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 1-5',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY5', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY5', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 6 - 10',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY10', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY10', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 11 - 15',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY15', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY15', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Over 16',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QOTHER', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AOTHER', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total Pending',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'diff1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataPayDelay',
                                    width: 1322,
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
                                        {width: 120},
                                        {width: 80, id: prototype.id + '-totQSALES'},
                                        {width: 100, id: prototype.id + '-totASALES'},
                                        {width: 60, id: prototype.id + '-totPERC'},
                                        {width: 80, id: prototype.id + '-totQDAY5'},
                                        {width: 100, id: prototype.id + '-totADAY5'},
                                        {width: 80, id: prototype.id + '-totQDAY10'},
                                        {width: 100, id: prototype.id + '-totADAY10'},
                                        {width: 80, id: prototype.id + '-totQDAY15'},
                                        {width: 100, id: prototype.id + '-totADAY15'},
                                        {width: 80, id: prototype.id + '-totQOTHER'},
                                        {width: 100, id: prototype.id + '-totAOTHER'},
                                        {width: 80, id: prototype.id + '-totQTOTAL'},
                                        {width: 100, id: prototype.id + '-totATOTAL'},
                                        {width: 60, id: prototype.id + '-totPERTOT'}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panel%',
                                    width: 1322,
                                    align: 'left',
                                    margin: '5 0 0 0 ',
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
                                        {text: '%', width: 120, style: 'background:#A0BFD3;color:#244066;text-align:center;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 80},
                                        {width: 100},
                                        {text: '100%', width: 60, id: prototype.id + '-100%'},
                                        {width: 180, id: prototype.id + '-lblTotPERC_5'},
                                        {width: 180, id: prototype.id + '-lblTotPERC_10'},
                                        {width: 180, id: prototype.id + '-lblTotPERC_15'},
                                        {width: 180, id: prototype.id + '-lblTotPERC_O20'},
                                        {width: 240, id: prototype.id + '-lblTotPERC_PEND'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxPayDelayCountry">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxPayDelayCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1444,
                            height: 530,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPayDelayCountry',
                                    width: 1444,
                                    height: 468,
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
                                                text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCOUNTRY', width: 60},
                                                    {text: 'Name', dataIndex: 'strDescription', width: 170, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
//                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 1-5',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY5', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY5', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 6 - 10',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY10', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY10', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 11 - 15',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY15', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY15', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Over 16',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QOTHER', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AOTHER', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total Pending',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'diff1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataPayDelayCountry',
                                    width: 1432,
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
                                        {width: 230},
                                        {width: 80, id: prototype.id + '-totC_QSALES'},
                                        {width: 100, id: prototype.id + '-totC_ASALES'},
                                        {width: 60, id: prototype.id + '-totC_PERC'},
                                        {width: 80, id: prototype.id + '-totC_QDAY5'},
                                        {width: 100, id: prototype.id + '-totC_ADAY5'},
                                        {width: 80, id: prototype.id + '-totC_QDAY10'},
                                        {width: 100, id: prototype.id + '-totC_ADAY10'},
                                        {width: 80, id: prototype.id + '-totC_QDAY15'},
                                        {width: 100, id: prototype.id + '-totC_ADAY15'},
                                        {width: 80, id: prototype.id + '-totC_QOTHER'},
                                        {width: 100, id: prototype.id + '-totC_AOTHER'},
                                        {width: 80, id: prototype.id + '-totC_QTOTAL'},
                                        {width: 100, id: prototype.id + '-totC_ATOTAL'},
                                        {width: 60, id: prototype.id + '-totC_PERTOT'}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panel%Country',
                                    width: 1432,
                                    align: 'left',
                                    margin: '5 0 0 0 ',
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
                                        {text: '%', width: 230, style: 'background:#A0BFD3;color:#244066;text-align:center;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 80},
                                        {width: 100},
                                        {text: '100%', width: 60, id: prototype.id + '-100%Country'},
                                        {width: 180, id: prototype.id + '-lblTotC_PERC_5'},
                                        {width: 180, id: prototype.id + '-lblTotC_PERC_10'},
                                        {width: 180, id: prototype.id + '-lblTotC_PERC_15'},
                                        {width: 180, id: prototype.id + '-lblTotC_PERC_O20'},
                                        {width: 240, id: prototype.id + '-lblTotC_PERC_PEND'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxPayDelayCountry">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxPayDelayCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1444,
                            height: 530,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPayDelayCard',
                                    width: 1444,
                                    height: 468,
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
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCARCOD', width: 60},
                                                    {text: 'Name', dataIndex: 'strDescription', width: 170,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
//                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 1-5',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY5', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY5', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 6 - 10',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY10', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY10', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days 11 - 15',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QDAY15', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'ADAY15', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Over 16',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QOTHER', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AOTHER', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffffff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total Pending',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'diff1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataPayDelayCard',
                                    width: 1432,
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
                                        {width: 230},
                                        {width: 80, id: prototype.id + '-totCC_QSALES'},
                                        {width: 100, id: prototype.id + '-totCC_ASALES'},
                                        {width: 60, id: prototype.id + '-totCC_PERC'},
                                        {width: 80, id: prototype.id + '-totCC_QDAY5'},
                                        {width: 100, id: prototype.id + '-totCC_ADAY5'},
                                        {width: 80, id: prototype.id + '-totCC_QDAY10'},
                                        {width: 100, id: prototype.id + '-totCC_ADAY10'},
                                        {width: 80, id: prototype.id + '-totCC_QDAY15'},
                                        {width: 100, id: prototype.id + '-totCC_ADAY15'},
                                        {width: 80, id: prototype.id + '-totCC_QOTHER'},
                                        {width: 100, id: prototype.id + '-totCC_AOTHER'},
                                        {width: 80, id: prototype.id + '-totCC_QTOTAL'},
                                        {width: 100, id: prototype.id + '-totCC_ATOTAL'},
                                        {width: 60, id: prototype.id + '-totCC_PERTOT'}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panel%Card',
                                    width: 1432,
                                    align: 'left',
                                    margin: '5 0 0 0 ',
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
                                        {text: '%', width: 230, style: 'background:#A0BFD3;color:#244066;text-align:center;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 80},
                                        {width: 100},
                                        {text: '100%', width: 60, id: prototype.id + '-100%Card'},
                                        {width: 180, id: prototype.id + '-lblTotCC_PERC_5'},
                                        {width: 180, id: prototype.id + '-lblTotCC_PERC_10'},
                                        {width: 180, id: prototype.id + '-lblTotCC_PERC_15'},
                                        {width: 180, id: prototype.id + '-lblTotCC_PERC_O20'},
                                        {width: 240, id: prototype.id + '-lblTotCC_PERC_PEND'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataStates">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataStates',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 497,
                            width: 1144,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataStates',
                                    width: 1144,
                                    height: 468,
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
                                                text: 'States',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Numeric', dataIndex: 'SAGENT', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#557ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            },
                                                            {text: 'Alphanumeric', dataIndex: 'strDescription2', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#557ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none">' + value + '</a>';
                                                                }
                                                            },
                                                            {text: 'Description', dataIndex: 'strDescription1', width: 180,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {text: 'Source', dataIndex: 'FTE', width: 50},
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 60},
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
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation',
                                                id: prototype.id + '-headStateConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Accepted',
                                                        id: prototype.id + '-headStateAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPUSA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
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
                                                        text: 'Tickets', dataIndex: 'diff1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'diff2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataStates',
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
                                        {width: 60},
                                        {width: 60},
                                        {width: 180},
                                        {width: 50},
                                        {width: 60},
                                        {width: 100, id: prototype.id + '-totQTY1_ST'},
                                        {width: 100, id: prototype.id + '-totSVFOPUS1_ST'},
                                        {width: 60, id: prototype.id + '-totperc1_ST'},
                                        {width: 100, id: prototype.id + '-totQTYA_ST'},
                                        {width: 100, id: prototype.id + '-totSVFOPUSA_ST'},
                                        {width: 100, id: prototype.id + '-totdiff1_ST'},
                                        {width: 100, id: prototype.id + '-totdiff2_ST'},
                                        {width: 60, id: prototype.id + '-totperc3_ST'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainFareTax">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainFareTax',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 802,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataFareTax',
                                    width: 802,
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 120}
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTY1', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount USD', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Fare USD', dataIndex: 'FARE', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: 'FEEs USD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'YQ', dataIndex: 'AYQ1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'YR', dataIndex: 'AYR1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'TAX USD', dataIndex: 'TAX1', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                }
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataFareTax',
                                    width: 802,
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
                                        {width: 120},
                                        {width: 90, id: prototype.id + '-lblFT_QTY1'},
                                        {width: 110, id: prototype.id + '-lblFT_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-lblFT_Perc1'},
                                        {width: 110, id: prototype.id + '-lblFT_FARE'},
                                        {width: 100, id: prototype.id + '-lblFT_AYQ1'},
                                        {width: 100, id: prototype.id + '-lblFT_AYR1'},
                                        {width: 110, id: prototype.id + '-lblFT_TAX1'}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panel%FareTax',
                                    width: 802,
                                    align: 'left',
                                    margin: '5 0 0 0 ',
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
                                        {text: '%',
                                            width: 120,
                                            id: prototype.id + '-label%',
                                            style: 'background:#A0BFD3;color:#244066;text-align:center;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 90},
                                        {width: 110},
                                        {width: 60, text: '100%', id: prototype.id + '-100%FareTax'},
                                        {width: 110, id: prototype.id + '-lblTotFARE'},
                                        {width: 100, id: prototype.id + '-lblTotAYQ1'},
                                        {width: 100, id: prototype.id + '-lblTotAYR1'},
                                        {width: 110, id: prototype.id + '-lblTotTAX1'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataPOS">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataPOS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 722,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPOS',
                                    width: 722,
                                    columnLines: true,
//                                    height: 468,
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
                                                text: 'POS Entry Mode',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'PEM', width: 50},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription', width: 260,
                                                        listeners: {
                                                            click: 'OnGridDetBank'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transactions',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTY1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummaryPOS',
                                    width: 722,
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
                                        {width: 260},
                                        {width: 110, id: prototype.id + '-totPO_QTY1'},
                                        {width: 60, id: prototype.id + '-totPO_Perc1'},
                                        {width: 70},
                                        {width: 110, id: prototype.id + '-totPO_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totPO_Perc2'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataPEM">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataPEM',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 854,
                            height: 497,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPEM',
                                    width: 854,
                                    height: 468,
                                    columnLines: true,
//                                    height: 468,
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 120,
                                                        listeners: {
                                                            click: 'OnGridDetBank'
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
                                                text: 'POS Entry Mode',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'PEM', width: 50},
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription', width: 260,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (value === 'Total') ? metaData.style = "text-align:left; color:#0B5114" : metaData.style = "text-align:left; color:#244066";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transactions',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTY1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescription === 'Total') ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#0B5114" : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    (record.data.strDescription === 'Total') ? metaData.style = "text-align:center; color:#0B5114" : metaData.style = "text-align:center; color:#244066";
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescription === 'Total') ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#0B5114" : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummaryPEM',
                                    width: 842,
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
                                        {width: 120},
                                        {width: 50},
                                        {width: 260},
                                        {width: 110, id: prototype.id + '-totP_QTY1'},
                                        {width: 60, id: prototype.id + '-totP_Perc1'},
                                        {width: 70},
                                        {width: 110, id: prototype.id + '-totP_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totP_Perc2'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDetPEMBank">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetPEMBank',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 497,
                            width: 984,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPEMBank',
                                    width: 984,
                                    columnLines: true,
                                    height: 468,
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
                                                    {text: 'Code', dataIndex: 'CODEBANK', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return '<b>' + value + '<b>';
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'strDescription1', width: 200,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return '<b>' + value + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                        listeners: {
                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription2', width: 260,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (value === 'Total') ? metaData.style = "text-align:left; color:#0B5114" : metaData.style = "text-align:left; color:#244066";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transactions',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTY1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescription2 === 'Total') ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#0B5114"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    (record.data.strDescription2 === 'Total') ? metaData.style = "text-align:center; color:#0B5114"
                                                            : metaData.style = "text-align:center; color:#244066";
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescription2 === 'Total') ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#0B5114"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummaryPEMBank',
                                    width: 972,
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
                                        {width: 200},
                                        {width: 50},
                                        {width: 260},
                                        {width: 110, id: prototype.id + '-totPB_QTY1'},
                                        {width: 60, id: prototype.id + '-totPB_Perc1'},
                                        {width: 70},
                                        {width: 110, id: prototype.id + '-totPB_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totPB_Perc2'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDetPEMAgent">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetPEMAgent',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 497,
                            width: 784,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPEMAgent',
                                    width: 784,
                                    columnLines: true,
                                    height: 468,
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
                                                text: 'IATA',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SAGENT', width: 100,
//                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription3', width: 260,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (value === 'Total') ? metaData.style = "text-align:left; color:#0B5114"
                                                                    : metaData.style = "text-align:left; color:#244066";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transactions',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTY1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescription2 === 'Total') ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#0B5114"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    (record.data.strDescription2 === 'Total') ? metaData.style = "text-align:center; color:#0B5114"
                                                            : metaData.style = "text-align:center; color:#244066";
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescription2 === 'Total') ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#0B5114"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummaryPEMAgent',
                                    width: 784,
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
                                        {width: 260},
                                        {width: 110, id: prototype.id + '-totPA_QTY1'},
                                        {width: 60, id: prototype.id + '-totPA_Perc1'},
                                        {width: 70},
                                        {width: 110, id: prototype.id + '-totPA_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totPA_Perc2'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataPhases">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataPhases',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 997,
                            width: 1434,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPhasesStatus',
                                    width: 1434,
                                    height: 395,
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
                                                text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCOUNTRY', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription', width: 200,
                                                        listeners: {
                                                            click: 'OnGridDetPhasesBank'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
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
                                                        text: 'Qty', dataIndex: 'QTY1', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Global',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '%', dataIndex: 'perc4', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Ticket (Phase 1)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTY2', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS2', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'strImagen1', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Card (Phase 2)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSA', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'x', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen2 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Bank (Phase 3)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYSABO', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSABO', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'xxxxx', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen3 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataPhasesStatus',
                                    width: 1434,
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
                                        {width: 270},
                                        {width: 90, id: prototype.id + '-totPP_QTY1'},
                                        {width: 110, id: prototype.id + '-totPP_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totPP_Perc4'},
                                        {width: 90, id: prototype.id + '-totPP_QTY2'},
                                        {width: 110, id: prototype.id + '-totPP_SVFOPUS2'},
                                        {width: 60, id: prototype.id + '-totPP_Perc1'},
                                        {width: 20},
                                        {width: 90, id: prototype.id + '-totPP_QTYA'},
                                        {width: 110, id: prototype.id + '-totPP_SVFOPUSA'},
                                        {width: 60, id: prototype.id + '-totPP_Perc2'},
                                        {width: 20},
                                        {width: 90, id: prototype.id + '-totPP_QTYSABO'},
                                        {width: 110, id: prototype.id + '-totPP_SVFOPUSABO'},
                                        {width: 60, id: prototype.id + '-totPP_Perc3'},
                                        {width: 20}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '10 0 0 0',
                                    width: 1434,
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-displayChart08_Country',
                                            width: 1454,
                                            border: false,
                                            margin: '0 0 0 0',
                                            innerPadding: 50,
                                            height: 383,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Sales by Country',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'perc4',
                                                    colors: ['#EC3838', '#ff9900', '#339933'],
                                                    label: {
                                                        field: 'strDescription',
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutWidth = 0;
                                                            return value.substring(value.indexOf(',') + 1);
                                                        }
                                                    },
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
                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDetPhasesBank">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetPhasesBank',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 497,
                            width: 1422,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPhasesBank',
                                    width: 1422,
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
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODEBANK', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription1', width: 200,
                                                        listeners: {
                                                            click: 'OnGridDetPhasesCard'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
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
                                                        text: 'Qty', dataIndex: 'QTY1', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Global',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '%', dataIndex: 'perc4', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Ticket (Phase 1)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTY2', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS2', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'strImagen1', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Card (Phase 2)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSA', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'x', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen2 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Bank (Phase 3)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYSABO', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSABO', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'xxxxx', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen3 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataPhasesBank',
                                    width: 1422,
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
                                        {width: 270},
                                        {width: 90, id: prototype.id + '-totPPB_QTY1'},
                                        {width: 110, id: prototype.id + '-totPPB_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc4'},
                                        {width: 90, id: prototype.id + '-totPPB_QTY2'},
                                        {width: 110, id: prototype.id + '-totPPB_SVFOPUS2'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc1'},
                                        {width: 20},
                                        {width: 90, id: prototype.id + '-totPPB_QTYA'},
                                        {width: 110, id: prototype.id + '-totPPB_SVFOPUSA'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc2'},
                                        {width: 20},
                                        {width: 90, id: prototype.id + '-totPPB_QTYSABO'},
                                        {width: 110, id: prototype.id + '-totPPB_SVFOPUSABO'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc3'},
                                        {width: 20}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDetPhasesCard">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetPhasesCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 497,
                            width: 1422,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPhasesCard',
                                    width: 1422,
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
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription2', width: 200,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
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
                                                        text: 'Qty', dataIndex: 'QTY1', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS1', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Global',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '%', dataIndex: 'perc4', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Ticket (Phase 1)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTY2', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUS2', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'strImagen1', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Card (Phase 2)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSA', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e6f4ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'x', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen2 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Conciliation Bank (Phase 3)',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QTYSABO', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPUSABO', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {text: '', dataIndex: 'xxxxx', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen3 + '"' + '>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataPhasesCard',
                                    width: 1422,
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
                                        {width: 270},
                                        {width: 90, id: prototype.id + '-totPPC_QTY1'},
                                        {width: 110, id: prototype.id + '-totPPC_SVFOPUS1'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc4'},
                                        {width: 90, id: prototype.id + '-totPPC_QTY2'},
                                        {width: 110, id: prototype.id + '-totPPC_SVFOPUS2'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc1'},
                                        {width: 20},
                                        {width: 90, id: prototype.id + '-totPPC_QTYA'},
                                        {width: 110, id: prototype.id + '-totPPC_SVFOPUSA'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc2'},
                                        {width: 20},
                                        {width: 90, id: prototype.id + '-totPPC_QTYSABO'},
                                        {width: 110, id: prototype.id + '-totPPC_SVFOPUSABO'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc3'},
                                        {width: 20}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDataPhases1">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataPhases1',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 497,
                            width: 1764,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPhasesStatus1',
                                    width: 1764,
                                    height: 468,
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
                                                text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription', width: 180,
                                                        listeners: {
                                                            click: 'OnGridDetPhasesBank'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
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
                                                        text: 'Tkts', dataIndex: 'QTY1', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Global',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '%', dataIndex: 'perc4', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 1: Ticket Conciliation',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTY2', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales without ACCB',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff1', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff1 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci1', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci1 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 2: Credit Card Conciliation',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTYA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUSA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Differences',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff2', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff2 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci2 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 3: Payments',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTYSABO', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUSABO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Differences',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff3', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff3 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci3', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci3 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
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
                                    id: prototype.id + '-panelDataPhasesStatus1',
                                    width: 1764,
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
                                        {width: 180},
                                        {width: 90, id: prototype.id + '-totPP_QTY11'},
                                        {width: 100, id: prototype.id + '-totPP_SVFOPUS11'},
                                        {width: 60, id: prototype.id + '-totPP_Perc41'},
//                                        
                                        {width: 90, id: prototype.id + '-totPP_QTY21'},
                                        {width: 100, id: prototype.id + '-totPP_SVFOPUS21'},
                                        {width: 60, id: prototype.id + '-totPP_Perc11'},
                                        {width: 90, id: prototype.id + '-totdiff11', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci1', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 90, id: prototype.id + '-totPP_QTYA1'},
                                        {width: 100, id: prototype.id + '-totPP_SVFOPUSA1'},
                                        {width: 60, id: prototype.id + '-totPP_Perc21'},
                                        {width: 90, id: prototype.id + '-totdiff21', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci2', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 90, id: prototype.id + '-totPP_QTYSABO1'},
                                        {width: 100, id: prototype.id + '-totPP_SVFOPUSABO1'},
                                        {width: 60, id: prototype.id + '-totPP_Perc31'},
                                        {width: 90, id: prototype.id + '-totdiff31', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci3', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'}
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
//                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            padding: '5 0 0 5',
                                            border: true,
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                                    id: prototype.id + '-displayPayChart01',
                                                    width: 1300,
                                                    border: false,
                                                    height: 400,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Country percent',
                                                            alignTo: 'center'
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
                                                            fields: ['perc4'],
                                                            grid: true,
                                                            title: '',
                                                            //title: 'Millions of USD',
//                                                            renderer: function (obj, value) {
//                                                                if (value > 1) {
//                                                                    if ((value / 1000).toString().length > 3) {
//                                                                        return  ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
//                                                                    } else {
//                                                                        return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
//                                                                    }
//                                                                } else {
//                                                                    return value;
//                                                                }
//                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            //                                                            fields: 'strFormatDate',
                                                            grid: true,
                                                            title: {
                                                                text: 'Country',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Country'],
                                                            xField: 'strDescription',
                                                            yField: ['perc4'],
                                                            colors: ['#0066ff'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 1000
                                                            },
//                                                            tooltip: {
//                                                                trackMouse: true,
//                                                                height: 28,
//                                                                renderer: function (toolTip, record, ctx) {
//                                                                    var label = '';
//                                                                    if (ctx.field === 'perc4') {
////                                                                        label = 'ChargedBack';
//                                                                    } else if (ctx.field === 'AMTCHGBU') {
////                                                                        label = 'Received';
//                                                                    }
//                                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
//                                                                }
//                                                            }
                                                        }]
                                                },
                                            ]
                                        },
                                    ]
                                }

                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDetPhasesBank1">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetPhasesBank1',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 497,
                            width: 1762,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPhasesBank1',
                                    width: 1762,
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
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CODEBANK', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription1', width: 150,
                                                        listeners: {
                                                            click: 'OnGridDetPhasesCard'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
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
                                                        text: 'Tkts', dataIndex: 'QTY1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Global',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '%', dataIndex: 'perc4', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 1: Ticket Conciliation',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTY2', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales without ACCB',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff1 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci1', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci1 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 2: Credit Card Conciliation',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTYA', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUSA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Differences',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff2', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff2 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci2 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 3: Payments',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTYSABO', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUSABO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Differences',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff3', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff3 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci3', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci3 > -1) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
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
                                    id: prototype.id + '-panelDataPhasesBank1',
                                    width: 1762,
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
                                        {width: 150},
                                        {width: 60},
                                        {width: 80, id: prototype.id + '-totPPB_QTY11'},
                                        {width: 100, id: prototype.id + '-totPPB_SVFOPUS11'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc41'},
//                                        
                                        {width: 80, id: prototype.id + '-totPPB_QTY21'},
                                        {width: 100, id: prototype.id + '-totPPB_SVFOPUS21'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc11'},
                                        {width: 80, id: prototype.id + '-totdiff111', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci11', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 80, id: prototype.id + '-totPPB_QTYA1'},
                                        {width: 100, id: prototype.id + '-totPPB_SVFOPUSA1'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc21'},
                                        {width: 80, id: prototype.id + '-totdiff211', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci21', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 80, id: prototype.id + '-totPPB_QTYSABO1'},
                                        {width: 100, id: prototype.id + '-totPPB_SVFOPUSABO1'},
                                        {width: 60, id: prototype.id + '-totPPB_Perc31'},
                                        {width: 80, id: prototype.id + '-totdiff311', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci31', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="boxMainDetPhasesCard1">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetPhasesCard1',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 497,
                            width: 1762,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox'
//                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPhasesCard1',
                                    width: 1762,
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
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescription2', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
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
                                                        text: 'Tkts', dataIndex: 'QTY1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Global',
//                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '%', dataIndex: 'perc4', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 1: Ticket Conciliation',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTY2', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUS2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc1', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales without ACCB',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff1 > 0) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci1', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci1 > 0) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 2: Credit Card Conciliation',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTYA', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUSA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc2', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Differences',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff2', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff2 > 0) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci2 > 0) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Phase 3: Payments',
//                                                id: prototype.id + '-headMonthConc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'QTYSABO', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'SVFOPUSABO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'perc3', width: 60,
                                                        listeners: {
//                                                            click: 'OnGridDetAgent'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Differences',
                                                        //                                                id: prototype.id + '-headMonthConc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tkts', dataIndex: 'diff3', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.diff3 > 0) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'DiffConci3', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    (record.data.DiffConci3 > 0) ? metaData.style = "text-align:right;background-color:#c8c3d5;color:#008000"
                                                                            : metaData.style = "text-align:right;background-color:#c8c3d5;color:#800000";
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
                                    id: prototype.id + '-panelDataPhasesCard1',
                                    width: 1762,
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
                                        {width: 150},
                                        {width: 60},
                                        {width: 80, id: prototype.id + '-totPPC_QTY11'},
                                        {width: 100, id: prototype.id + '-totPPC_SVFOPUS11'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc41'},
//                                        
                                        {width: 80, id: prototype.id + '-totPPC_QTY21'},
                                        {width: 100, id: prototype.id + '-totPPC_SVFOPUS21'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc11'},
                                        {width: 80, id: prototype.id + '-totdiff1111', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci111', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 80, id: prototype.id + '-totPPC_QTYA1'},
                                        {width: 100, id: prototype.id + '-totPPC_SVFOPUSA1'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc21'},
                                        {width: 80, id: prototype.id + '-totdiff2111', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci211', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 80, id: prototype.id + '-totPPC_QTYSABO1'},
                                        {width: 100, id: prototype.id + '-totPPC_SVFOPUSABO1'},
                                        {width: 60, id: prototype.id + '-totPPC_Perc31'},
                                        {width: 80, id: prototype.id + '-totdiff3111', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'},
                                        {width: 100, id: prototype.id + '-totDiffConci311', style: 'background:#A0BFD3;color:#800000;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'}
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
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
                        // <editor-fold defaultstate="collapsed" desc="boxDetailBank">
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
                        // </editor-fold>,

                        // ---------------------------------------------------------------
                        // <editor-fold defaultstate="collapsed" desc="boxNewAmex">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxNewAmex',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1527,
                            margin: '20 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridNewAmex',
//                                    width: 1342,
                                    width: 1462,
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
                                                text: 'Sales',
//                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                        listeners: {
                                                            click: 'OnviewNewAmexDetCountry'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#program-pro-payments-control-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                        metaData.style = "text-align:right;background-color:#c9daf5;";
//                                                        value = Ext.util.Format.number(value, '0,000');
                                                    return  'USD';
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
                                                        text: 'Tickets', dataIndex: 'QTYSALES', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNTS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'percSales', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + '100' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Cash',
//                                                        id: prototype.id + '-headMonthAcc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYSALCA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYSALCA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNTCA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'percCA', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totpercCA , '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Credit Card',
//                                                        id: prototype.id + '-headMonthAcc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYSALCC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYSALCC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNTCC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'percCC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totpercCC , '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
//                                                        id: prototype.id + '-headMonthAcc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Payment Sales',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYSALBA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSALBA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'AMOUNTBA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTBA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'percBA', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totpercBA , '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Pending',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'diffQTYSALCC', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffAMOUNTCC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'diffAMOUNTCC', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },                                                                
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffAMOUNTCC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'percPE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmex').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totpercPE, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    }
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
                                                    id: prototype.id + '-grafNewCC',
                                                    width: 1400,
                                                    border: false,
                                                    height: 400,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: 'Total Tickets by Sales Date ',
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
                                                            fields: ['QTYSALES', 'QTYSALCA', 'QTYSALCC', 'diffQTYSALCC'],
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
                                                            title: ['Sales', 'Cash', 'Credit Card', 'Pending'],
                                                            xField: 'strFormatDate',
                                                            yField: ['QTYSALES', 'QTYSALCA', 'QTYSALCC', 'diffQTYSALCC'],
                                                            colors: ['#c6f7cd', '#828CE1', '#CC0000', '#0066ff'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 800
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'QTYSALES') {
                                                                        label = 'Sales';
                                                                    } else if (ctx.field === 'QTYSALCA') {
                                                                        label = 'Cash';
                                                                    } else if (ctx.field === 'QTYSALCC') {
                                                                        label = 'Credit Card';
                                                                    } else if (ctx.field === 'diffQTYSALCC') {
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
                        // </editor-fold>                        
                        // <editor-fold defaultstate="collapsed" desc="boxNewAmexByCountry">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxNewAmexByCountry',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            width: 1527,
                            height: 897,
                            margin: '20 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridNewAmexByCountry',
//                                    width: 1342,
                                    width: 1476,
                                    height: 468,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 100, },
                                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                        metaData.style = "text-align:right;background-color:#c9daf5;";
//                                                        value = Ext.util.Format.number(value, '0,000');
                                                    return  'USD';
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
                                                        text: 'Tickets', dataIndex: 'QTYSALES', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYSALES, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNTS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'percSales', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + '100' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Cash',
//                                                        id: prototype.id + '-headMonthAcc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYSALCA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYSALCA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNTCA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'percCA', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c9daf5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totpercCA, '0,000')+ '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Credit Card',
//                                                        id: prototype.id + '-headMonthAcc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYSALCC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYSALCC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNTCC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'percCC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#eddfdf;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totpercCC, '0,000')+ '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
//                                                        id: prototype.id + '-headMonthAcc',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Payment Sales',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTYSALBA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYSALBA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'AMOUNTBA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTBA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'percBA', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totpercBA, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Pending',
//                                                        id: prototype.id + '-headMonthAcc',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'diffQTYSALCC', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffQTYSALCC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'diffAMOUNTCC', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totdiffAMOUNTCC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'percPE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridNewAmexByCountry').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totpercPE, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '10 0 0 0',
                                    width: 1434,
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
//                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-chart_NewCC_Country',
                                            width: 1454,
                                            border: false,
                                            margin: '0 0 0 0',
                                            innerPadding: 50,
                                            height: 383,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Sales by Country',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'percSales',
                                                    colors: ['#339933', '#EC3838', '#ff9900'],
                                                    label: {
                                                        field: 'SCOUNTRY',
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutWidth = 0;
                                                            return value.substring(value.indexOf(',') + 1);
                                                        }
                                                    },
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
                                                            toolTip.setHtml(record.get('SCOUNTRY'));
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                },
                            ]
                        },
                        
                        
                        
                        // Pie                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1249,
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
                                    width: 1249,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
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


