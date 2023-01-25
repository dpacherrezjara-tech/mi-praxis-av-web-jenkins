/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.RevenueFlightForm.Prorrateo', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-prorrateo',
    controller: prototype.id + '-ProrrateoController',
    requires: [
        'Ext.Praxis.controller.flown.RevenueFlight.ProrrateoController'
    ],
    title: 'Facsimil',
    header: true,
    width: 1130,
    height: 680,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            xtype: 'panel',
            border: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'tbspacer',
                                    width: 895

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#E6EFF5',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnMasterIndex',
                                            margin: 7,
                                            style: 'background:#02507a',
                                            text: '<b style="color:white">Master Index</b>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#E6EFF5',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnDelivery',
                                            margin: 7,
                                            style: 'background:#02507a',
                                            text: '<b style="color:white">ASR Delivery</b>',
                                            listeners: {
                                                click: 'onBtnDelivery'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: true,
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretchmax'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: true,
                            width: 760,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    layout: 'hbox',
                                    bodyStyle: 'background:white',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1.1,
                                            margin: 0,
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'column',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            margin: '1 2 1 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: 'ISSUEDx BY:'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblNomAer',
                                                            margin: '1 2 1 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: 'AEROMEXICO'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'column',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblCnj',
                                                            margin: '5 2 5  2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: 'CONJUNTION TICKETS'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtConj',
                                                            style: 'font-size: 10px;',
                                                            width: 120,
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            border: false,
                                                            id: prototype.id + '-imgPrev',
                                                            icon: 'resources/img/botones/16x16/prev.png',
                                                            style: 'background:#E6EFF5',
                                                            height: 18,
                                                            margin: 2,
                                                            width: 18,
                                                            listeners: {
                                                                click: 'onBtnPrev'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-imgNext',
                                                            border: false,
                                                            icon: 'resources/img/botones/16x16/next.png',
                                                            style: 'background:#E6EFF5',
                                                            height: 18,
                                                            margin: 2,
                                                            width: 18,
                                                            listeners: {
                                                                click: 'onBtnNext'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            margin: '5 2 5 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: 'ENDORSEMENTS/RESTRICTIONS'
                                                        },
                                                        {
                                                            xtype: 'tbspacer',
                                                            width: 40
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblFuente',
                                                            margin: '5 2 5 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: ''
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            id: prototype.id + '-txtEndors',
                                                            margin: '0 2 0 2',
                                                            style: 'font-size: 10px;',
                                                            fieldStyle: 'font-size: 10px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            flex: 2,
                                                            margin: '1 2 1 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: 'PASSENGER NAME NOT TRANSFERABLE'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            margin: '1 2 1 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                                            text: 'DATE OF ISSUE'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1.5,
                                                            id: prototype.id + '-txtPassenger',
                                                            style: 'font-size: 10px;',
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        },
                                                        {
                                                            xtype: 'tbspacer',
                                                            flex: 0.6
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 0.7,
                                                            id: prototype.id + '-txtDateIssue',
                                                            style: 'font-size: 10px;',
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        },
                                                        {
                                                            xtype: 'tbspacer',
                                                            flex: 0.1
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 0.7,
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'column',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            margin: '1 2 1 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: 'PASSENGER TICKET AND BAGGAGE CHECKED'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'column',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            margin: '5 2 5  2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            width: 120,
                                                            text: 'ORIGIN/DESTINATION'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtOrigDest',
                                                            style: 'font-size: 10px;',
                                                            width: 110,
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            margins: '',
                                                            id: prototype.id + '-txtPNR',
                                                            margin: '0 2 0 2',
                                                            style: 'font-size: 10px;',
                                                            width: 230,
                                                            fieldLabel: 'PNR',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            labelWidth: 80,
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtTourC',
                                                            margin: '0 2 0 2',
                                                            style: 'font-size: 10px;',
                                                            width: 230,
                                                            fieldLabel: 'TOUR CODE',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            labelWidth: 80,
                                                            fieldStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            flex: 1.3,
                                                            margin: '1 2 1 2',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            text: 'ISSUED IN EXCHANGE FOR'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyBorder: true,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            id: prototype.id + '-txtIssExc',
                                                            style: 'font-size: 10px;',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 0.4,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'vbox',
                                                    bodyStyle: 'background:white',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            html: '<br>',
                                                            id: prototype.id + '-lblNomAgente',
                                                            margin: '10 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                                            width: 140,
                                                            text: ''
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            html: '<br>',
                                                            id: prototype.id + '-lblDirAgente',
                                                            margin: '5 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                                            width: 120
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            html: '<br>',
                                                            id: prototype.id + '-lblAgente',
                                                            margin: '5 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 13px;text-align:center',
                                                            width: 120
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //SEGUNDA PARTE - GRILLA
                                {
                                    xtype: 'panel',
                                    border: true,
                                    margin: '0 0 0 0',
                                    layout: 'vbox',
                                    bodyStyle: 'background:#CADAE4',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            width: 760,
                                            padding: '10 0 0 0',
                                            id: prototype.id + '-gridDetFac',
                                            bodyStyle: 'background:#E6EFF5',
                                            height: 120,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    style: 'font-size:8px '
                                                },
                                                items: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'STPO',
                                                        text: '<b style="font-size:9px">X/O</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'ORAC',
                                                        text: '<b style="font-size:9px">FROM</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                                            metaData.style = "font-size:9px !important;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescFrom + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'DSTC',
                                                        text: '<b style="font-size:9px">TO</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                                            metaData.style = "font-size:9px !important;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescTo + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1.4,
                                                        dataIndex: 'CARR',
                                                        text: '<b style="font-size:9px">CARRIER</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                                            metaData.style = "font-size:9px !important;color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1.4,
                                                        dataIndex: 'FTNR',
                                                        text: '<b style="font-size:9px">FLIGHT</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'RBKD',
                                                        text: '<b style="font-size:9px">CL</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'FTDA',
                                                        text: '<b style="font-size:9px">DATE</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'FTDT',
                                                        text: '<b style="font-size:9px">TIME</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'FBST',
                                                        text: '<b style="font-size:9px">ST</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1.8,
                                                        dataIndex: 'FBTD',
                                                        text: '<b style="font-size:9px">FARE BASIS</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1.5,
                                                        dataIndex: 'NBDA',
                                                        text: '<b style="font-size:9px">N. VALID B</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1.5,
                                                        dataIndex: 'NADA',
                                                        text: '<b style="font-size:9px">N.VALID A</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'strUso',
                                                        text: '<b style="font-size:9px">USE</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important;background: #bcdcf8";
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDesUso + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'strFecUso',
                                                        text: '<b style="font-size:9px">DATE</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important;background: #bcdcf8;text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 1,
                                                        dataIndex: 'dblMontoUso',
                                                        text: '<b style="font-size:9px">VALUE</b>',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-size:9px !important;background: #bcdcf8;text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        }

                                    ]
                                },
                                //TERCERA PARTE - FARE
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    border: false,
                                    bodyStyle: 'background:#E6EFF5',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            border: true,
                                            flex: 1,
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFare',
                                                    margin: '0 2 1 2',
                                                    fieldLabel: 'FARE',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtEquivFa',
                                                    margin: '0 2  1 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right',
                                                    fieldLabel: 'EQUIV',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    height: 50,
                                                    id: prototype.id + '-txtTaxes',
                                                    margin: '0 2 1 2',
                                                    fieldLabel: 'TAXES',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'textfield',
                                                    dock: 'bottom',
                                                    id: prototype.id + '-txtTotal',
                                                    margin: '5 2 2 2',
                                                    fieldLabel: 'TOTAL',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 50,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            flex: 3,
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    margins: '0 0 5 0',
                                                    border: true,
                                                    height: 50,
                                                    maxHeight: 50,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        padding: '1 0 1 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            flex: 1,
                                                            height: 50,
                                                            id: prototype.id + '-txtFareCal',
                                                            margin: '0 1 5 1',
                                                            maxHeight: 100,
                                                            fieldLabel: 'FARE CALC',
                                                            labelSeparator: ' ',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            labelWidth: 80,
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    margins: '1 0 1 0',
                                                    border: true,
                                                    height: 50,
                                                    maxHeight: 50,
                                                    bodyStyle: 'background:#E6EFF5',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        padding: '1 0 1 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            flex: 1,
                                                            height: 50,
                                                            id: prototype.id + '-txtFormPay',
                                                            margin: '0 1 5 1',
                                                            maxHeight: 100,
                                                            padding: '2 0 2 0',
                                                            fieldLabel: 'FOP',
                                                            labelSeparator: ' ',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            labelWidth: 80,
                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'panel',
                                                    margins: '0 2 5 2',
                                                    dock: 'bottom',
                                                    bodyStyle: 'background:#E6EFF5',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            id: prototype.id + '-lblTicket',
                                                            margin: '5 5 5 5',
                                                            style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center',
                                                            text: '.....'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 2,
                                                            id: prototype.id + '-txtORIN',
                                                            margin: '0 2 0 2',
                                                            fieldLabel: 'ORIGINAL ISSUE',
                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                            fieldStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;'
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
                            border: true,
                            width: 335,
                            bodyStyle: 'background:#E8F9E8',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    bodyStyle: 'background:#E8F9E8',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margins: '',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtGRUPO',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Group',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.3,
                                                    id: prototype.id + '-txtORIG',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtMONREG',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Cur. Reg',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtMethod',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Method',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.3,
                                                    id: prototype.id + '-txtPRO',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtCNJ',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Cnj',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.7,
                                                    id: prototype.id + '-txtCIUVTA',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Sale City',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.4,
                                                    id: prototype.id + '-txtPAIVTA',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtFEXCH',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Transaction',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 70,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.7,
                                                    id: prototype.id + '-txtCIUEMI',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Issue',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.4,
                                                    id: prototype.id + '-txtPAIEMI',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtFECVTA',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Sale Date',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 70,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtINITRA',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Initial Trip',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.8,
                                                    id: prototype.id + '-txtA1530STPRO',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Status',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 70,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtCODIT',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'IT',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtTARIFA',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'FARE',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.3,
                                                    id: prototype.id + '-txtMONEDA',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtTRFNUC',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'NUC',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtTRFPAG',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'EQV.',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.3,
                                                    id: prototype.id + '-txtMDAPAG',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtROE',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'ROE',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtCSOVER',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'S.Over',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.3,
                                                    id: prototype.id + '-txtQSOVER',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtCPLUSS',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Plus',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtCOMMIS',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Comm.',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.3,
                                                    id: prototype.id + '-txtMDACOM',
                                                    margin: '0 2 0 2',
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtPORCOM',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Dsct',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.9,
                                                    id: prototype.id + '-txtTAJUST',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Adjust',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtTAJUSQ',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'AdjustQ',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1.3,
                                                    id: prototype.id + '-txtRATE',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Local Ex/Rate',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 70,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: prototype.id + '-txtSTAT',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Status',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1.3,
                                                    id: prototype.id + '-txtFARECOBL',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Fare',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 90,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.5,
                                                    id: prototype.id + '-txtCURR',
                                                    margin: '0 10 0 2',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E6EFF5',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1.3,
                                                    id: prototype.id + '-txtPAGO',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'ADC',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 90,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.5,
                                                    id: prototype.id + '-txtPGCURR',
                                                    margin: '0 10 0 2',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:right'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1.3,
                                                    id: prototype.id + '-txtREGIST',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Crt by',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 60,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:center'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.5,
                                                    id: prototype.id + '-txtFREGIS',
                                                    margin: '0 10 0 2',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:center'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margins: '1 0 1 0',
                                            bodyStyle: 'background:#E8F9E8',
                                            layout: {
                                                type: 'hbox',
                                                padding: '1 0 1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1.3,
                                                    id: prototype.id + '-txtREVISA',
                                                    margin: '0 2 0 2',
                                                    fieldLabel: 'Upd by',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 60,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:center'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.5,
                                                    id: prototype.id + '-txtFREVIS',
                                                    margin: '0 10 0 2',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                    labelWidth: 55,
                                                    fieldStyle: 'color: #0B333C; font-size: 10px; text-align:center'
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
                    height: 200,
                    width: 1170,
                    layout: 'fit',
                    bodyStyle: 'background:#E8F9E8',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetCpn',
                            margin: '10 0 5 0',
                            bodyStyle: 'background:#E6EFF5',
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'

                                },
                                items: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 30,
                                        dataIndex: 'A720CONEX',
                                        text: '<b style="font-size:9px;text-align:center">O</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 45,
                                        dataIndex: 'A720RUTAO',
                                        text: '<b style="font-size:9px">From</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            if (record.data.strDescRutaO !== "") {
                                                metaData.tdAttr = 'font-size:9px !important";data-qtip="' + record.data.strDescRutaO + '"';
                                            }
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'A720RUTAD',
                                        text: '<b style="font-size:9px">To</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            if (record.data.strDescRutaD !== "") {
                                                metaData.tdAttr = 'font-size:9px !important";data-qtip="' + record.data.strDescRutaD + '"';
                                            }
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'A720CARRA',
                                        text: '<b style="font-size:9px">Cr</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'A720NVLO',
                                        text: '<b style="font-size:9px">Flt</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 50,
                                        dataIndex: 'A720FVLO',
                                        text: '<b style="font-size:9px">Date</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 30,
                                        dataIndex: 'A720BOOKI',
                                        text: '<b style="font-size:9px">R</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 55,
                                        dataIndex: 'A720FBUSO',
                                        text: '<b style="font-size:9px">F Basis.</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 45,
                                        dataIndex: 'A720FARE',
                                        text: '<b style="font-size:9px">Fare</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'A720TFARE',
                                        text: '<b style="font-size:9px">ST</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'A720SS',
                                        text: '<b style="font-size:9px">Q</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 55,
                                        dataIndex: 'A720VALOR',
                                        text: '<b style="font-size:9px">Value</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        width: 80,
                                        dataIndex: 'A720QIN',
                                        text: '<b style="font-size:9px">Q Surcharge</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        width: 35,
                                        dataIndex: 'A720YQ',
                                        text: '<b style="font-size:9px">YQ</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 45,
                                        dataIndex: 'A720VLSRP',
                                        text: '<b style="font-size:9px">SRP</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? "#FBD705" : (record.data.A720INDPR === 'S' ? '#FBD705' : '#FFFFFF');
                                            metaData.style = "font-size:9px !important;text-align:right; background:" + color;
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 45,
                                        dataIndex: 'A720VLMPA',
                                        text: '<b style="font-size:9px">MPA</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? (record.data.A720INDPR === 'M' ? '#FBD705' : '#FFFFFF') : "#FFFFFF";
                                            metaData.style = "font-size:9px !important;text-align:right; background:" + color;
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 45,
                                        dataIndex: 'A720ACUE',
                                        text: '<b style="font-size:9px">SPA</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? (record.data.A720INDPR === 'A' ? '#FBD705' : '#FFFFFF') : "#FFFFFF";
                                            metaData.style = "font-size:9px !important;text-align:right; background:" + color;
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 45,
                                        dataIndex: 'A720ISC',
                                        text: '<b style="font-size:9px">ISC</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 55,
                                        dataIndex: 'A720AJUST',
                                        text: '<b style="font-size:9px">Adjust</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 55,
                                        dataIndex: 'A720FACT',
                                        text: '<b style="font-size:9px">Factor <br> Millas</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 55,
                                        dataIndex: 'A720PPRO',
                                        text: '<b style="font-size:9px">%<br> Proviso</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 55,
                                        dataIndex: 'A720PROV',
                                        text: '<b style="font-size:9px">Base<br> Amt</b>'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        text: '<b style="font-size:9px">Proration</b>',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                width: 75,
                                                dataIndex: 'A720PRRCM',
                                                text: '<b style="font-size:9px">Commision</b>',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                    return value;
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                width: 75,
                                                dataIndex: 'A720PRSCM',
                                                text: '<b style="font-size:9px">SCM Rev</b>',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                    return value;
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                width: 85,
                                                dataIndex: 'PRORAT_LOCAL_CUR',
                                                text: '<b style="font-size:9px">Local Currency</b>',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                    return value;
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                width: 40,
                                                dataIndex: 'A720LYQ',
                                                text: '<b style="font-size:9px">YQ</b>',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                    return value;
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                width: 40,
                                                dataIndex: 'A720LIV',
                                                text: '<b style="font-size:9px">IVA</b>',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }

                    ]
                }
            ]
        }
    ]

});