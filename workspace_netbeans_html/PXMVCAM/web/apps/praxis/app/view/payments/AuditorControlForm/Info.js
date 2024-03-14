
Ext.define('Ext.Praxis.view.payments.AuditorControlForm.Info', {
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
            id: prototype.id + '-boxConsultas',
            width: '100%',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-vskMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background: transparent;',
                            hidden: false,
                            border: false,
                            margin: "10 10 10 10",
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 500
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background: transparent;',
                                    width: 900,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Process <br> Date', width: 100, dataIndex: 'FEUP',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridDataDetailAll'
                                                }
                                            },
                                            {text: 'AUDITOR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'USEAC', width: 100, dataIndex: 'UAUDIT',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:left;text-decoration:underline;';
                                                            return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onSetGridDataDetail'
                                                        }
                                                    },
                                                    {text: 'Name', width: 150, dataIndex: 'NOMB', align: 'left'},
                                                    {text: 'Last Name', width: 150, dataIndex: 'APE', align: 'left'}
                                                ]
                                            },
                                            {text: 'Produced',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Total', width: 80, dataIndex: 'TQMATCH', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:center;';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:center;';
                                                            return '<b>' + Ext.util.Format.number(data.totPRODUS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Days', width: 70, dataIndex: 'DIASL', align: 'center',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            console.log(data.totDIASL);
                                                            metaData.style = 'text-align:center; margin-center:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDIASL, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Percentage', width: 80, dataIndex: 'PORCENTAJE', align: 'center'},
                                                    {text: 'Total<br>Production', width: 85, dataIndex: 'TOTAL', align: 'center'}
                                                ]
                                            },
                                            {text: 'Average<br>Transaction<br>by Team ', width: 85, dataIndex: 'PROMET', align: 'center'}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            margin: "10 10 10 10",
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
//                                height: 550
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridDataDetail',
                                    bodyStyle: 'background: transparent;',
                                    width: 915,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Process <br> Date', width: 100, dataIndex: 'FECAC',
                                                listeners: {
                                                    click: 'onSetGridDataDetailDay'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                }
                                            },
//                                            {text: 'USEAC', width: 90, dataIndex: 'USEAC', align: 'center'},
                                            {text: 'Produced', width: 80, dataIndex: 'PRODUS', align: 'center',
                                                listeners: {
                                                    click: 'onSetGridDataDetailDay'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:center;';
                                                    return '<b>' + Ext.util.Format.number(data.totPRODUS, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Working<br>Days', width: 80, dataIndex: 'DIASL', align: 'center'},
                                            {text: 'Type',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Movement', width: 80, dataIndex: 'desTMOTI', align: 'center'},
                                                    {text: 'Emission', width: 70, dataIndex: 'desTEMI', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }},
                                                    {text: 'Rfnd', width: 60, dataIndex: 'desTRFND', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
//                                            {text: 'Average<br>Day', width: 65, dataIndex: 'PROMED', align: 'center'},
//                                            {text: 'Total<br>Production', width: 85, dataIndex: 'TOTALP', align: 'center'},
                                            {text: 'Weekday', width: 85, dataIndex: 'DIAAC', align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Entry<br>Time', width: 90, dataIndex: 'HORAI', align: 'center'},
                                            {text: 'HORASR', width: 90, dataIndex: 'HORASR', align: 'center'},
                                            {text: 'HORAIR', width: 90, dataIndex: 'HORAIR', align: 'center'},
                                            {text: 'Departure<br>Time', width: 90, dataIndex: 'HORAS', align: 'center'}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetailDay',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            margin: "10 10 10 10",
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
//                                height: 450
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridDataDetailDay',
                                    bodyStyle: 'background: transparent;',
                                    width: 1350,
                                    columnLines: true,
                                    enableColumnMove: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Load<br>Date', width: 80, dataIndex: 'FCARG'},
                                            {text: 'Assignment<br>Date', width: 95, dataIndex: 'FASIG'},
                                            {text: 'Audit<br>Date', width: 80, dataIndex: 'FECAC', align: 'center'},
                                            {text: 'Weekday', width: 90, dataIndex: 'DIAAC', align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            },
//                                            {text: 'Auditor', width: 90, dataIndex: 'USEAC', align: 'center'},
                                            {text: 'Entry<br>Time', width: 80, dataIndex: 'HORAI', align: 'center'},
                                            {text: 'HORASR', width: 80, dataIndex: 'HORASR', align: 'center'},
                                            {text: 'HORAIR', width: 80, dataIndex: 'HORAIR', align: 'center'},
                                            {text: 'Departure<br>Time', width: 90, dataIndex: 'HORAS', align: 'center'},
                                            {text: 'Document<br>Type', width: 80, dataIndex: 'TIPO', align: 'center'},
                                            {text: 'Type',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Motive', width: 80, dataIndex: 'desTMOTI', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }},
                                                    {text: 'Emission', width: 100, dataIndex: 'desTEMI', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Rfnd', width: 60, dataIndex: 'desTRFND', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            {text: 'Ticket', width: 110, dataIndex: 'TKT', align: 'center'},
                                            {text: 'HORAC', width: 80, dataIndex: 'HORAC', align: 'center'},
                                            {text: 'Minutes<br>Calculated', width: 80, dataIndex: 'MINCAL', align: 'center'},
                                            {text: 'Minutes<br>SLA', width: 80, dataIndex: 'MINDET', align: 'center'},
                                            {text: 'Rules<br>Batch', width: 80, dataIndex: '', align: 'center'},
                                            {text: 'Hours<br>Perm.', width: 80, dataIndex: 'HORCAL', align: 'center'}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetailAll',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            margin: "10 10 10 10",
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
//                                height: 550
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridDataDetailAll',
                                    bodyStyle: 'background: transparent;',
                                    width: 1005,
                                    columnLines: true,
                                    enableColumnMove: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Process <br> Date', width: 100, dataIndex: 'FECAC',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridDataDetailDay'
                                                }
                                            },
                                            {text: 'USEAC', width: 90, dataIndex: 'USEAC', align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Produced', width: 80, dataIndex: 'PRODUS', align: 'center'},
                                            {text: 'Working<br>Days', width: 80, dataIndex: 'DIASL', align: 'center'},
                                            {text: 'Type',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Movement', width: 80, dataIndex: 'desTMOTI', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }},
                                                    {text: 'Emission', width: 70, dataIndex: 'desTEMI', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }},
                                                    {text: 'Rfnd', width: 60, dataIndex: 'desTRFND', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }}
                                                ]
                                            },
//                                            {text: 'Average<br>Day', width: 65, dataIndex: 'PROMED', align: 'center'},
//                                            {text: 'Total<br>Production', width: 85, dataIndex: 'TOTALP', align: 'center'},
                                            {text: 'Weekday', width: 85, dataIndex: 'DIAAC', align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Entry<br>Time', width: 90, dataIndex: 'HORAI', align: 'center'},
                                            {text: 'HORASR', width: 90, dataIndex: 'HORASR', align: 'center'},
                                            {text: 'HORAIR', width: 90, dataIndex: 'HORAIR', align: 'center'},
                                            {text: 'Departure<br>Time', width: 90, dataIndex: 'HORAS', align: 'center'}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataAsigMonth',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            margin: "10 10 10 10",
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
//                                height: 550
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridDataAsigMonth',
                                    bodyStyle: 'background: transparent;',
                                    width: 820,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Assignment <br> Date', width: 100, dataIndex: 'FASIG',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSearchByAsigDateAll'
                                                }
                                            },
                                            {text: 'Auditor', width: 120, dataIndex: 'UASIG', align: 'left',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:left;text-decoration:underline;';
                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSearchByAsigDate'
                                                }
                                            },
//                                            {text: 'Name', width: 150, dataIndex: 'NOMB', align: 'left'},
//                                            {text: 'Last Name', width: 150, dataIndex: 'APE', align: 'left'},
                                            {text: 'Qty',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Audited', width: 80, dataIndex: 'qtyAUDITADOS', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAsigMonth').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(data.totAUDITADOS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Pending', width: 80, dataIndex: 'qtyPENDING', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAsigMonth').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(data.totPENDING, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 80, dataIndex: 'qtyTotal', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAsigMonth').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(data.totAsig, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Working<br>Days', width: 80, dataIndex: 'DIAS_LABORADOS', align: 'center'},
                                            {text: 'Differences<br>Days', width: 80, dataIndex: 'DIF_DIAS', align: 'center'},
                                            {text: 'Start Date', width: 100, dataIndex: 'minFECAC', align: 'center'},
                                            {text: 'Final Date', width: 100, dataIndex: 'maxFECAC', align: 'center'}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataAsig',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            margin: "10 10 10 10",
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
//                                height: 550
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridDataAsig',
                                    bodyStyle: 'background: transparent;',
                                    width: 700,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Assignment <br> Date', width: 100, dataIndex: 'FASIG',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
//                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
//                                                },
//                                                listeners: {
//                                                    click: 'onSetGridDataDetailAll'
//                                                }
                                            },
//                                            {text: 'Auditor', width: 120, dataIndex: 'UASIG', align: 'left'},
                                            {text: 'Qty',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Audited', width: 80, dataIndex: 'qtyAUDITADOS', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAsig').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(data.totAUDITADOS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Pending', width: 80, dataIndex: 'qtyPENDING', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAsig').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(data.totPENDING, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total', width: 80, dataIndex: 'qtyTotal', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAsig').getStore().getData().items[0].data;
                                                            console.log(data);
                                                            metaData.style = 'text-align:right;';
                                                            return '<b>' + Ext.util.Format.number(data.totAsig, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Working<br>Days', width: 80, dataIndex: 'DIAS_LABORADOS', align: 'center'},
                                            {text: 'Differences<br>Days', width: 80, dataIndex: 'DIF_DIAS', align: 'center'},
                                            {text: 'Start Date', width: 100, dataIndex: 'minFECAC', align: 'center'},
                                            {text: 'Final Date', width: 100, dataIndex: 'maxFECAC', align: 'center'}
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelProcess',
                    hidden: true,
                    margin: '20 0 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainProcess',
                            bodyStyle: 'background: transparent;',
                            width: 1300,
                            hidden: false,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
//                                height: 460
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridDataProcess',
                                    bodyStyle: 'background: transparent;',
                                    width: 1300,
                                    height: 560,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    hidden: false,
//                                    enableLocking: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom' //top
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'User', width: 90, dataIndex: 'USEAC', align: 'center', locked: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Total<br>Audit', width: 90, dataIndex: 'totDIA', align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.longTotDIA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: '%', width: 90, dataIndex: 'totPorcDIA', align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Produced',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Day', id: prototype.id + '-dia01',
                                                        columns: [
                                                            {text: '01', width: 90, dataIndex: 'DIA01', align: 'center',id: prototype.id + '-d01',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA01, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA01', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia02',
                                                        columns: [
                                                            {text: '02', width: 90, dataIndex: 'DIA02', align: 'center',id: prototype.id + '-d02',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA02, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA02', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia03',
                                                        columns: [
                                                            {text: '03', width: 90, dataIndex: 'DIA03', align: 'center', id: prototype.id + '-d03',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA03, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA03', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia04',
                                                        columns: [
                                                            {text: '04', width: 90, dataIndex: 'DIA04', align: 'center',id: prototype.id + '-d04',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA04, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA04', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia05',
                                                        columns: [
                                                            {text: '05', width: 90, dataIndex: 'DIA05', align: 'center',id: prototype.id + '-d05',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA05, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA05', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia06',
                                                        columns: [
                                                            {text: '06', width: 90, dataIndex: 'DIA06', align: 'center',id: prototype.id + '-d06',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA06, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA06', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia07',
                                                        columns: [
                                                            {text: '07', width: 90, dataIndex: 'DIA07', align: 'center',id: prototype.id + '-d07',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA07, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA07', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia08',
                                                        columns: [
                                                            {text: '08', width: 90, dataIndex: 'DIA08', align: 'center',id: prototype.id + '-d08',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA08, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA08', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia09',
                                                        columns: [
                                                            {text: '09', width: 90, dataIndex: 'DIA09', align: 'center',id: prototype.id + '-d09',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA09, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA09', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia10',
                                                        columns: [
                                                            {text: '10', width: 90, dataIndex: 'DIA10', align: 'center', id: prototype.id + '-d10',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA10, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA10', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia11',
                                                        columns: [
                                                            {text: '11', width: 90, dataIndex: 'DIA11', align: 'center',id: prototype.id + '-d11',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA11, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA11', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia12',
                                                        columns: [
                                                            {text: '12', width: 90, dataIndex: 'DIA12', align: 'center',id: prototype.id + '-d12',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA12, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA12', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia13',
                                                        columns: [
                                                            {text: '13', width: 90, dataIndex: 'DIA13', align: 'center',id: prototype.id + '-d13',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA13, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA13', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia14',
                                                        columns: [
                                                            {text: '14', width: 90, dataIndex: 'DIA14', align: 'center',id: prototype.id + '-d14',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA14, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA14', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia15',
                                                        columns: [
                                                            {text: '15', width: 90, dataIndex: 'DIA15', align: 'center',id: prototype.id + '-d15',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA15, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA15', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia16',
                                                        columns: [
                                                            {text: '16', width: 90, dataIndex: 'DIA16', align: 'center',id: prototype.id + '-d16',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA16, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA16', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia17',
                                                        columns: [
                                                            {text: '17', width: 90, dataIndex: 'DIA17', align: 'center',id: prototype.id + '-d17',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA17, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA17', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia18',
                                                        columns: [
                                                            {text: '18', width: 90, dataIndex: 'DIA18', align: 'center',id: prototype.id + '-d18',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA18, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA18', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia19',
                                                        columns: [
                                                            {text: '19', width: 90, dataIndex: 'DIA19', align: 'center',id: prototype.id + '-d19',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA19, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA19', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia20',
                                                        columns: [
                                                            {text: '20', width: 90, dataIndex: 'DIA20', align: 'center',id: prototype.id + '-d20',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA20, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA20', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia21',
                                                        columns: [
                                                            {text: '21', width: 90, dataIndex: 'DIA21', align: 'center',id: prototype.id + '-d21',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA21, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA21', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia22',
                                                        columns: [
                                                            {text: '22', width: 90, dataIndex: 'DIA22', align: 'center',id: prototype.id + '-d22',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA22, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA22', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia23',
                                                        columns: [
                                                            {text: '23', width: 90, dataIndex: 'DIA23', align: 'center',id: prototype.id + '-d23',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA23, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA23', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia24',
                                                        columns: [
                                                            {text: '24', width: 90, dataIndex: 'DIA24', align: 'center',id: prototype.id + '-d24',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA24, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA24', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia25',
                                                        columns: [
                                                            {text: '25', width: 90, dataIndex: 'DIA25', align: 'center',id: prototype.id + '-d25',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA25, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA25', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia26',
                                                        columns: [
                                                            {text: '26', width: 90, dataIndex: 'DIA26', align: 'center',id: prototype.id + '-d26',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA26, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA26', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia27',
                                                        columns: [
                                                            {text: '27', width: 90, dataIndex: 'DIA27', align: 'center',id: prototype.id + '-d27',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA27, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA27', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia28',
                                                        columns: [
                                                            {text: '28', width: 90, dataIndex: 'DIA28', align: 'center',id: prototype.id + '-d28',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA28, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA28', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia29',
                                                        columns: [
                                                            {text: '29', width: 90, dataIndex: 'DIA29', align: 'center',id: prototype.id + '-d29',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA29, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA29', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia30',
                                                        columns: [
                                                            {text: '30', width: 90, dataIndex: 'DIA30', align: 'center',id: prototype.id + '-d30',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA30, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA30', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
                                                    },
                                                    {text: 'Day', id: prototype.id + '-dia31',
                                                        columns: [
                                                            {text: '31', width: 90, dataIndex: 'DIA31', align: 'center',id: prototype.id + '-d31',
                                                                listeners: {
                                                                    click: 'onProcessDay'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#" style="color:#008FE3;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-center:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIA31, '0,000') + '<b>';
                                                                }
                                                            },
//                                                            {text: '%', width: 80, dataIndex: 'porcDIA31', align: 'center',
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = 'text-align:right';
//                                                                    return value;
//                                                                },
////                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                                    var data = Ext.getCmp(prototype.id + '-gridDataProcess').getStore().getData().items[0].data;
////                                                                    metaData.style = 'text-align:right; margin-center:3px ';
////                                                                    return '<b>' + '100%' + '<b>';
////                                                                }
//                                                            }
                                                        ]
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
                            id: prototype.id + '-boxProcessDay',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            margin: "10 10 10 10",
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
//                                height: 450
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    cls: 'gridCss',
                                    id: prototype.id + '-gridProcessDay',
                                    bodyStyle: 'background: transparent;',
                                    width: 1350,
                                    columnLines: true,
                                    enableColumnMove: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Load',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'FCARG', align: 'center'}
                                                ]
                                            },
                                            {text: 'Assignment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 95, dataIndex: 'FASIG', align: 'center'}
                                                ]
                                            },
                                            {text: 'Audit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'FECAC', align: 'center'}
                                                ]
                                            },
                                            {text: 'Weekday', width: 90, dataIndex: 'DIAAC', align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            },
//                                            {text: 'Auditor', width: 90, dataIndex: 'USEAC', align: 'center'},
                                            {text: 'Entry Time', width: 80, dataIndex: 'HORAI', align: 'center'},
                                            {text: 'HORASR', width: 80, dataIndex: 'HORASR', align: 'center'},
                                            {text: 'HORAIR', width: 80, dataIndex: 'HORAIR', align: 'center'},
                                            {text: 'Departure Time', width: 90, dataIndex: 'HORAS', align: 'center'},
                                            {text: 'Document',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Type', width: 80, dataIndex: 'TIPO', align: 'center'}
                                                ]
                                            },
                                            {text: 'Type',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Motive', width: 80, dataIndex: 'desTMOTI', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }},
                                                    {text: 'Emission', width: 100, dataIndex: 'desTEMI', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Rfnd', width: 60, dataIndex: 'desTRFND', align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            {text: 'Ticket', width: 110, dataIndex: 'TKT', align: 'center'},
                                            {text: 'HORAC', width: 80, dataIndex: 'HORAC', align: 'center'},
                                            {text: 'Minutes',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Calculated', width: 80, dataIndex: 'MINCAL', align: 'center'}
                                                ]
                                            },
                                            {text: 'Minutes',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'SLA', width: 80, dataIndex: 'MINDET', align: 'center'}
                                                ]
                                            },
//                                            {text: 'Rules',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'Batch', width: 80, dataIndex: '', align: 'center'}
//                                                ]
//                                            },
                                            {text: 'Hours',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Perm', width: 80, dataIndex: 'HORCAL', align: 'center'}
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxPag',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    hidden: true,
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            height: '100%',
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
                // </editor-fold>
            ]
        }
    ]
});

