/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.RevenueFlightForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    // style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 1295,
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
                    xtype: 'label',
                    id: prototype.id + '-labelTitle',
                    labelAlign: 'center',
                    style: 'color:#231223;font-weight:bold',
                    align: 'center',
                    margin: '10 0 0 0'
                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 500,
                    width: 873,
                    columnLines: true,
                    features: [{
                            ftype: 'summary'
                        }],
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: false,
                            align: 'center'
                        },
                        items: [
                            {text: 'Flight <br>Period', width: 90, dataIndex: 'strFormatDate',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center;';
                                    return '<a href="#flown-revenue-flight-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetailByZone' //click="outerDocument.gridDetailNFlight_clickHandler(data)"
                                }
                            },
                            {text: 'Total  <br> PAX', width: 90, dataIndex: 'SumPAX',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:right;';
                                    return '<a href="#flown-revenue-flight-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TOTSumPAX, '0,000') + '<b>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetail'
                                }
                            },
                            {text: 'Carrier', width: 120, dataIndex: 'strDescCarrier'},
                            {text: 'Type of <br> Flight', width: 120, dataIndex: 'strDescr_FFLOW'},
                            {text: 'Currency', width: 100, dataIndex: 'CURREAM'},
                            {text: 'Total  <br> Price (USD)', width: 120, dataIndex: 'SumING',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TOTSumING, '0,000.00') + '<b>';
                                },
                            },
                            {text: 'EMD ',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Qty ', width: 100, dataIndex: 'QTYEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px;';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TotQTYEMD, '0,000') + '<b>';
                                        },
                                    },
                                    {text: 'Amount ', width: 120, dataIndex: 'TOTEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px;';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TotTOTEMD, '0,000.00') + '<b>';
                                        },
                                    }
                                ]
                            }
                        ]
                    }
                },
//                // --------------------------   GRID MAIN DATA SUMMARY-------------
//                //-----------------------------------------------------------------
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-panelDataSummary',
//                    width: 865,
//                    align: 'left',
//                    defaults: {
//                        xtype: 'label',
//                        align: 'center',
//                        html: '' + '&nbsp',
//                        height: 25,
//                        padding: '5 0 5 0',
//                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                    },
//                    items: [
//                        {width: 90},
//                        {width: 90, id: prototype.id + '-TOTSumPAX'},
//                        {width: 120},
//                        {width: 120},
//                        {width: 100},
//                        {width: 120, id: prototype.id + '-TOTSumING'},
//                        {width: 100, id: prototype.id + '-TotQTYEMD'},
//                        {width: 130, id: prototype.id + '-TotTOTEMD'}
//                    ]
//                },
                // --------------------------   GRID DETAIL BY ZONE----------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailByZone',
                    height: 450,
                    width: 1062,
                    columnLines: true,
                    features: [
                        {
                            ftype: 'summary'
                        }
                    ],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Zone', width: 140, dataIndex: 'strDescZONA'
                            },
                            {text: 'Flight<br> Number', width: 90, dataIndex: 'NFLIGHT',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:center;font-weight:bold;margin-left:10px;';
                                    return '<a href="#flown-revenue-flight-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetailByCityPair'
                                }},
                            {text: 'Totals',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'PAX', width: 90, dataIndex: 'SumPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.SumPAX;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'Amount ', width: 100, dataIndex: 'SumING',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.SumING;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000.00') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Flight ', width: 90, dataIndex: 'TotFLIGHT',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TotFLIGHT;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            },
                            {text: 'PAX',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'AM', width: 90, dataIndex: 'QTYPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.QTYPAX;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'OAL ', width: 90, dataIndex: 'QTYPAXO',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.QTYPAXO;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            },
                            {text: 'Amount',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'AM', width: 90, dataIndex: 'TOTPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TOTPAX;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'OAL ', width: 90, dataIndex: 'TOTPAXO',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TOTPAXO;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            },
                            {text: 'EMD',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Count', width: 90, dataIndex: 'QTYEMD',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.QTYEMD;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'USD ', width: 90, dataIndex: 'TOTEMD',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TOTEMD;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000.00') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                },
                // --------------------------   GRID DETAIL BY ZONE 2----------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailByZone2',
                    height: 550,
                    width: 1050,
                    columnLines: true,
                    features: [
                        {
                            ftype: 'summary'
                        }
                    ],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Zone', width: 140, dataIndex: 'strDescZONA'},
                            {text: 'Flight<br> Number', width: 90, dataIndex: 'NFLIGHT',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left;font-weight:bold;margin-left:10px;';
                                    return '<a href="#flown-revenue-flight-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetailByCityPair'
                                }
                            },
                            {text: 'Totals',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'PAX', width: 90, dataIndex: 'SumPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.SumPAX;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'Amount ', width: 100, dataIndex: 'SumING',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.SumING;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000.00') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Flight ', width: 90, dataIndex: 'TotFLIGHT',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TotFLIGHT;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            },
                            {text: 'PAX',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'AM', width: 90, dataIndex: 'QTYPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.QTYPAX;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'OAL ', width: 90, dataIndex: 'QTYPAXO',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.QTYPAXO;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'Amount',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'AM', width: 90, dataIndex: 'TOTPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TOTPAX;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000.00') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'OAL ', width: 90, dataIndex: 'TOTPAXO',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TOTPAXO;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'EMD',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Count', width: 90, dataIndex: 'QTYEMD',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.QTYEMD;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'USD ', width: 90, dataIndex: 'TOTEMD',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone2').getStore().getData();
                                            var sum = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                sum += data.items[i].data.TOTEMD;
                                            }
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(sum, '0,000.00') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                },
                // --------------------------   GRID DETAIL BY CITY PAIR ------------
                //-------------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailCityPair',
                    height: 575,
                    width: 1082,
                    columnLines: true,
                    features: [{
                            ftype: 'summary'
                        }],
                    border: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Flight',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', width: 90, dataIndex: 'strFormatDate',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:center;';
                                            return '<a href="#flown-revenue-flight-form" style="color:#008FE3;">' + value + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetailCoupon'
                                        }
                                    },
                                    {text: 'Zone', width: 90, dataIndex: 'ZONA'},
                                    {text: 'Orig', width: 90, dataIndex: 'CDEPART'},
                                    {text: 'Dest', width: 90, dataIndex: 'CARRIVA'},
                                    {text: 'Qty', width: 90, dataIndex: 'QTYFLIG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFLIG, '0,000') + '<b>';
                                        },
                                    }
                                ]
                            },
                            {text: 'Currency', width: 90, dataIndex: 'CURREAM'},
                            {text: 'AM',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'PAX', width: 90, dataIndex: 'QTYPAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        },
                                    },
                                    {text: 'Amount', width: 90, dataIndex: 'TOTPAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTOTPAX, '0,000.00') + '<b>';
                                        },
                                    }
                                ]
                            },
                            {text: 'OAL',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'PAX', width: 90, dataIndex: 'QTYPAXO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAXO, '0,000') + '<b>';
                                        },
                                    },
                                    {text: 'Amount', width: 90, dataIndex: 'TOTPAXO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTOTPAXO, '0,000.00') + '<b>';
                                        },
                                    }
                                ]
                            },
                            {text: 'EMD',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'PAX', width: 90, dataIndex: 'QTYEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYEMD, '0,000') + '<b>';
                                        },
                                    },
                                    {text: 'Amount ', width: 90, dataIndex: 'TOTEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTOTEMD, '0,000.00') + '<b>';
                                        },
                                    }
                                ]
                            }
                        ]
                    }

                },
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-panelDataDetailCityPairSummary',
//                    width: 1082,
//                    margin: '0 0 0 0',
//                    padding: '0 0 0 0',
//                    align: 'left',
//                    defaults: {
//                        xtype: 'label',
//                        align: 'center',
//                        html: '' + '&nbsp',
//                        height: 25,
//                        padding: '0 0 0 0',
//                        margin: '0 0 0 0',
//                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:11px;padding-top:3px;'
//                    },
//                    items: [
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90, id: prototype.id + '-totQTYFLIG'},
//                        {width: 90},
//                        {width: 90, id: prototype.id + '-totQTYPAX'},
//                        {width: 90, id: prototype.id + '-totTOTPAX'},
//                        {width: 90, id: prototype.id + '-totQTYPAXO'},
//                        {width: 90, id: prototype.id + '-totTOTPAXO'},
//                        {width: 90, id: prototype.id + '-totQTYEMD'},
//                        {width: 91.5, id: prototype.id + '-totTOTEMD2'}
//
//                    ]
//                },
                // --------------------------   GRID DETAIL BY COUPON------------
                //-------------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailByCoupon',
                    height: 575,
                    width: 1452,
                    columnLines: true,
                    features: [{
                            ftype: 'summary'
                        }],
                    border: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Ticket', width: 130, dataIndex: 'strTicket',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center;';
                                    return '<a href="#flown-revenue-flight-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onFacsimilClick'
                                }
                            },
                            {text: 'Sale',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', width: 90, dataIndex: 'strFormatFVTA'},
                                    {text: 'Country', width: 90, dataIndex: 'PSVVTA'},
                                    {text: 'Agent', width: 90, dataIndex: 'AGTIA'},
                                    {text: 'Fare <br> Basis', width: 90, dataIndex: 'FBASE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left;';
                                            return  value;
                                        }
                                    },
                                    {text: 'PAX', width: 60, dataIndex: 'QTYPAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totCPN_Aud, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: 'Flight',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', width: 90, dataIndex: 'strFormatDate'},
                                    {text: 'Zone', width: 90, dataIndex: 'ZONA'},
                                    {text: 'Orig', width: 90, dataIndex: 'CDEPART'},
                                    {text: 'Dest', width: 90, dataIndex: 'CARRIVA'},
                                    {text: 'Carrier', width: 90, dataIndex: 'CARR'},
                                    {text: 'Cabin', width: 90, dataIndex: 'CABI'}
                                ]
                            },
                            {text: 'Values',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Use Type', width: 80, dataIndex: 'TOPUS'},
                                    {text: 'Value', width: 80, dataIndex: 'VCPN',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.difVakues, '0,000.00') + '<b>';
                                        }
                                    },
                                    {text: 'Curr', width: 80, dataIndex: 'MDACP',
                                    summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:center; ';
                                            return '<b>' + 'USD' + '<b>';
                                        }}
                                ]
                            },
                            {text: 'Status <br> Valoration ', width: 120, dataIndex: 'strDescFVAL'}
                        ]
                    }

                },
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-panelDataDetailByCouponSummary',
//                    width: 1452,
//                    margin: '2 0 0 0',
//                    align: 'left',
//                    defaults: {
//                        xtype: 'label',
//                        align: 'center',
//                        html: '' + '&nbsp',
//                        height: 25,
//                        padding: '5 0 5 0',
//                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:10px'
//                    },
//                    items: [
//                        {width: 130},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 60, id: prototype.id + '-totCPN_Aud'},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 90},
//                        {width: 80},
//                        {width: 80, id: prototype.id + '-difVakues'},
//                        {width: 80, text: 'MXN', style: 'background:#A0BFD3;color:#244066;text-align:center;font-weight:bold;border: 0.1px #4A6371 solid;font-size:10px'},
//                        {width: 120}
//
//
//                    ]
//                },
                // --------------------------   GRID DETAIL -------------------------(OK)
                //-------------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetail',
                    height: 542,
                    width: 1020,
                    columnLines: true,
                    border: false,
                    features: [
                        {
                            ftype: 'summary'
                        }
                    ],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Flight <br> Date', width: 100, dataIndex: 'strFormatDate'},
                            {text: 'Type <br> Information', width: 110, dataIndex: 'strDescTipo',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center;';
                                    return '<a href="#flown-revenue-flight-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetDetailType'
                                }
                            },
                            {text: 'Carrier', width: 100, dataIndex: 'strDescCarrier'},
                            {text: 'Type of <br> Flight', width: 100, dataIndex: 'strDescr_FFLOW'},
                            {text: 'Total PAX', width: 100, dataIndex: 'SumPAX',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.TOTPAX, '0,000') + '<b>';
                                }
                            },
                            {text: 'Currency', width: 100, dataIndex: 'CURREAM'},
                            {text: 'Total <br> Amount ', width: 100, dataIndex: 'SumING',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.TOTSumING, '0,000.00') + '<b>';
                                }
                            },
                            {text: 'Flight <br> Count ', width: 100, dataIndex: 'TotQTYFLIG',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.TotFLIGHT, '0,000.00') + '<b>';
                                }
                            },
                            {text: 'EMD',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Qty', width: 90, dataIndex: 'QTYEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TotQTYEMD, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Amount', width: 120, dataIndex: 'TOTEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TotTOTEMD, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                },
                // --------------------------   GRID DETAIL BY TYPE-----------------(OK)
                //-------------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailType',
                    height: 542,
                    width: 810,
                    columnLines: true,
                    border: false,
                    features: [
                        {
                            ftype: 'summary'
                        }
                    ],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Stock', width: 100, dataIndex: 'strDescStock'},
                            {text: 'Flight <br> Date', width: 100, dataIndex: 'strFormatDate'},
                            {text: 'Type <br> Information', width: 110, dataIndex: 'strDescTipo'},
                            {text: 'Carrier', width: 100, dataIndex: 'strDescCarrier'},
                            {text: 'Type of <br> Flight', width: 100, dataIndex: 'strDescr_FFLOW'},
                            {text: 'Total  PAX', width: 100, dataIndex: 'QTYPAX',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailType').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.SumPAX, '0,000') + '<b>';
                                }
                            },
                            {text: 'Currency', width: 100, dataIndex: 'CURREAM'},
                            {text: 'Total <br> Amount', width: 100, dataIndex: 'TOTPAX',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailType').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.SumING, '0,000.00') + '<b>';
                                }
                            }
                        ]
                    }

                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1180,
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
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

    