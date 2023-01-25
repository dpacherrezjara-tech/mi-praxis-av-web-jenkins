/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.RevenueZoneForm.Info', {
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
                            {text: 'Flown <br>Period', width: 90, dataIndex: 'strFormatDate',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center;';
                                    return '<a href="#flown-revenue-zone-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetailByZone'
                                }
                            },
                            {text: 'Document  <br> Type', width: 90, dataIndex: 'strDescTipo',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center;';
                                    return '<a href="#flown-revenue-zone-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetail'
                                }
                            },
                            {text: 'Carrier', width: 120, dataIndex: 'strDescCarrier'},
                            {text: 'Type of <br> Flight', width: 120, dataIndex: 'strDescr_FFLOW'},
                            {text: 'Quantity  <br> Documents', width: 100, dataIndex: 'intQDOC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.intTotQDOC, '0,000') + '<b>';
                                },
                            },
                            {text: 'Total  <br> Price (USD)', width: 120, dataIndex: 'dblDOC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.dblTotDOC, '0,000.00') + '<b>';
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
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TOTEMD, '0,000') + '<b>';
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
                                            return '<b>' + Ext.util.Format.number(data.totTOTEMD, '0,000.00') + '<b>';
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
//                        {width: 90},
//                        {width: 120},
//                        {width: 120},
//                        {width: 100, id: prototype.id + '-intTotQDOC'},
//                        {width: 120, id: prototype.id + '-dblTotDOC'},
//                        {width: 100, id: prototype.id + '-TOTEMD'},
//                        {width: 130, id: prototype.id + '-totTOTEMD'}
//                    ]
//                },
                // --------------------------   GRID DETAIL BY ZONE----------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailByZone',
                    height: 450,
                    width: 1045,
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
                            {text: 'Zone', width: 145, dataIndex: 'strDescZONA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left;font-weight:bold;margin-left:10px;';
                                    return  ' ' + value;
                                }
                            },
                            {text: 'Flight<br> Date', width: 90, dataIndex: 'strFormatDate',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center;';
                                    return '<a href="#flown-revenue-zone-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetailByCityPair'
                                }},
                            {text: 'Flight <br> Count ', width: 90, dataIndex: 'QTYFLIG',
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.intTotQFLIG, '0,000') + '<b>';
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                }
                            },
                            {text: 'PAX',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Qty', width: 90, dataIndex: 'QTYPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.intTotQTYPAX, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'USD ', width: 90, dataIndex: 'TOTPAX',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.dblTotTOTPAX, '0,000.00') + '<b>';
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
                                    {text: 'Qty', width: 90, dataIndex: 'QTYEMD',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.intTotQTYEMD, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'USD ', width: 90, dataIndex: 'TOTEMD',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.dblTotTOTEMD, '0,000.00') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'AM',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Qty', width: 90, dataIndex: 'intQAM',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.intTotQAM, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'USD ', width: 90, dataIndex: 'dblAM',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.dblTotAM, '0,000.00') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        }
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
                                    {text: 'Qty', width: 90, dataIndex: 'QTYPAXO',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.intTotQTYPAXO, '0,000') + '<b>';
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }

                                    },
                                    {text: 'USD ', width: 90, dataIndex: 'TOTPAXO',
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByZone').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.dblTotTOTPAXO, '0,000.00') + '<b>';
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
                    width: 1172,
                    columnLines: true,
                    features: [
                        {
                            ftype: 'summary'
                        }
                    ],
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
                                            return '<a href="#flown-revenue-zone-form" style="color:#008FE3;">' + value + '</a>';
                                        },
                                        listeners: {
                                            click: 'onSetGridDataDetailCoupon'
                                        }
                                    },
                                    {text: 'Number', width: 90, dataIndex: 'NFLIGHT'},
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
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFLIG, '0,000') + '<b>';
                                        }
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
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Amount', width: 90, dataIndex: 'TOTPAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totTOTPAX, '0,000.00') + '<b>';
                                        }
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
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAXO, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Amount', width: 90, dataIndex: 'TOTPAXO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totTOTPAXO, '0,000.00') + '<b>';
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
                                    {text: 'Qty', width: 90, dataIndex: 'QTYEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totQTYEMD, '0,000') + '<b>';
                                        }

                                    },
                                    {text: 'USD ', width: 90, dataIndex: 'TOTEMD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:0px ';
                                            return  Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailCityPair').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.totTOTEMD, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDataDetailCityPairSummary',
                    width: 1172,
                    hidden: true,
                    margin: '0 0 0 0',
                    padding: '0 0 0 0',
                    align: 'left',
                    defaults: {
                        xtype: 'label',
                        align: 'center',
                        html: '' + '&nbsp',
                        height: 25,
                        padding: '0 0 0 0',
                        margin: '0 0 0 0',
                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:11px;padding-top:3px;'
                    },
                    items: [
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 90, id: prototype.id + '-totQTYFLIG'},
                        {width: 90},
                        {width: 90, id: prototype.id + '-totQTYPAX'},
                        {width: 90, id: prototype.id + '-totTOTPAX'},
                        {width: 90, id: prototype.id + '-totQTYPAXO'},
                        {width: 90, id: prototype.id + '-totTOTPAXO'},
                        {width: 90, id: prototype.id + '-totQTYEMD'},
                        {width: 91.5, id: prototype.id + '-totTOTEMD2'}

                    ]
                },
                // --------------------------   GRID DETAIL BY COUPON------------
                //-------------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailByCoupon',
                    height: 575,
                    width: 1332,
                    columnLines: true,
                    features: [
                        {
                            ftype: 'summary'
                        }
                    ],
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
                                    return '<a href="#flown-revenue-zone-form" style="color:#008FE3;">' + value + '</a>';
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
                                            metaData.style = 'text-align:right';
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
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.difVakues, '0,000.00') + '<b>';
                                        }
                                    },
                                    {text: 'Curr', width: 80, dataIndex: 'MDACP',
                                    summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:center; margin-center:3px ';
                                            return '<b>' + 'USD' + '<b>';
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDataDetailByCouponSummary',
                    width: 1332,
                    margin: '2 0 0 0',
                    hidden: true,
                    align: 'left',
                    defaults: {
                        xtype: 'label',
                        align: 'center',
                        html: '' + '&nbsp',
                        height: 25,
                        padding: '5 0 5 0',
                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.1px #4A6371 solid;font-size:10px'
                    },
                    items: [
                        {width: 130},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 60, id: prototype.id + '-totCPN_Aud'},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 90},
                        {width: 80},
                        {width: 80, id: prototype.id + '-difVakues'},
                        {width: 80, text: 'MXN', style: 'background:#A0BFD3;color:#244066;text-align:center;font-weight:bold;border: 0.1px #4A6371 solid;font-size:10px'}


                    ]
                },
                // --------------------------   GRID DETAIL --------------------------
                //-------------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetail',
                    height: 542,
                    width: 820,
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
                            {text: 'Flown <br> Period', width: 100, dataIndex: 'strFormatDate'},
                            {text: 'Document <br> Type', width: 110, dataIndex: 'strDescTipo',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center;';
                                    return '<a href="#flown-revenue-zone-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetDetailByStock'
                                }
                            },
                            {text: 'Carrier', width: 100, dataIndex: 'strDescCarrier'},
                            {text: 'Flag', width: 100, dataIndex: 'strDescr_FFLOW'},
                            {text: 'Quantity <br> Documents', width: 100, dataIndex: 'intQDOC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.intQDOC, '0,000') + '<b>';
                                }
                            },
                            {text: 'Total <br> Priced (USD)', width: 100, dataIndex: 'dblDOC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.dblDOC, '0,000.00') + '<b>';
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
                                            return '<b>' + Ext.util.Format.number(data.QTYEMD, '0,000') + '<b>';
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
                                            return '<b>' + Ext.util.Format.number(data.TOTEMD, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                },
                // --------------------------   GRID DETAIL BY STOCK-----------------
                //-------------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetailByStock',
                    height: 542,
                    width: 710,
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
                            {text: 'Stock', width: 100, dataIndex: 'strDescDetail'},
                            {text: 'Flown <br> Period', width: 100, dataIndex: 'strFormatDate'},
                            {text: 'Document <br> Type', width: 110, dataIndex: 'strDescTipo'},
                            {text: 'Carrier', width: 100, dataIndex: 'strDescCarrier'},
                            {text: 'Carrier', width: 100, dataIndex: 'strDescCarrier'},
                            {text: 'Quantity <br> Documents', width: 100, dataIndex: 'intQDOC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.intTotQDOC, '0,000') + '<b>';
                                }
                            },
                            {text: 'Total <br> Priced (USD)', width: 100, dataIndex: 'dblDOC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                },
                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right';
                                    return '<b>' + Ext.util.Format.number(data.dblTotDOC, '0,000.00') + '<b>';
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

    