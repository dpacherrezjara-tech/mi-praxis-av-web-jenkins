/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.interline.PassengerInvoicesIpForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            //width: 1550,
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
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   PANEL MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 570,
                                    width: 1212,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Billing<br> Date', width: 100, dataIndex: 'strFormatDate',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataDetailSFI30'
                                                }
                                            },
                                            {text: 'Period', width: 100, dataIndex: 'PERNUM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDetailCIA'
                                                }
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'VAT', width: 100, dataIndex: 'TNETOCAR', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.TNETOCAR_LY, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Export',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'IS-IDEC',
                                                        xtype: 'actioncolumn',
                                                        width: 60,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                                tooltip: 'Export Information IS-IDEC',
                                                                handler: 'openExport'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Download',
                                                xtype: 'actioncolumn',
                                                width: 75,
                                                align: 'center',
                                                items: [
                                                    {
                                                        icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                        handler: 'openExportManyExcels'
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Download <br> by Month',
                                                xtype: 'actioncolumn',
                                                width: 75,
                                                align: 'center',
                                                items: [
                                                    {
                                                        icon: 'resources/img/botones/16x16/txt.png',
//                                                        isDisabled: function (grid, rowIndex, colIndex, items, record) {
//                                                            var rec = grid.getStore().getAt(rowIndex).data;
//                                                            if (rec.PERNUM === '04') {
//                                                                 return false;
//                                                            } else {
//                                                                return true;
//                                                            }
//                                                        },
                                                        getClass: function(v, meta, rec) {
                                                            if (rec.data.PERNUM !== '04') {
//                                                                meta.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                                metaData.unselectableAttr = "unselectable='off'";
                                                                metaData.css = 'x-hide-display';
                                                                return v;
                                                            }
                                                        },
                                                        handler: 'openExportManyExcels'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN2 DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData2',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle2',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData2',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 570,
                                    width: 902,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Billing<br> Date', width: 100, dataIndex: 'strFormatDate',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataSource'
                                                }
                                            },
                                            {text: 'Period', width: 100, dataIndex: 'PERNUM'},
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL30 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle3',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetailSFI30',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1202,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Source<br> Code', width: 100, dataIndex: 'SOURCOD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDetail'
                                                }
                                            },
                                            {text: 'Source <br>Desciption', width: 300, dataIndex: 'IN_FECHA_FROM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:left;';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'VAT', width: 100, dataIndex: 'TNETOCAR', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.TNETOCAR_LY, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSFI30').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL20_1 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail20_1',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle4',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail20_1',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1202,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataDetailSFI20'
                                                }
                                            },
                                            {text: 'Airline Name', width: 300, dataIndex: 'DES_BAIR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:left;';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'ISCAMT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        },
                                                        listeners: {
                                                            click: 'onViewDataDetailSFI41'
                                                        }
                                                    },
                                                    {text: 'VAT', width: 100, dataIndex: 'VATAMT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.TOTHCD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'OTHCOMAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'UATPAMT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'CPNTAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL20 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail20',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle7',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail20',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1532,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
//                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
//                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
//                                                },
//                                                listeners: {
//                                                    click: 'onViewDataDetailSFI20_1'
//                                                }
//                                            },

                                            {text: '-', id: prototype.id + '-titleGridDataDetail20',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ticket Number', width: 150, dataIndex: 'TKT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                    },
                                                    {text: 'Flight<br>Date', width: 80, dataIndex: 'DES_SOURCOD'},
                                                    {text: 'Elect<br>Tkt Ind.', width: 60, dataIndex: 'ETKTIND'},
                                                    {text: 'Currency', width: 60, dataIndex: 'ACURREN'},
                                                    {text: 'GROSS', width: 70, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 70, dataIndex: 'ISCCH', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 70, dataIndex: 'ISCAMT', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TAX', width: 70, dataIndex: 'TAX',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                            return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000.00') + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'onViewDataDetailSFI41'
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other Commision',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 70, dataIndex: 'OTHCOMPER', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 70, dataIndex: 'OTHCOMAM', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'FEE', width: 70, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 70, dataIndex: 'UATPPER', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 70, dataIndex: 'UATPAMT', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'NET', width: 70, dataIndex: 'CPNTAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'From - To', width: 80, dataIndex: 'FROMTO'},
                                                    {text: 'Att.Ind.', width: 60, dataIndex: 'ATTINDOR'},
                                                    {text: 'PMI<br>Validated', width: 60, dataIndex: 'VALDPMI'},
                                                    {text: 'Accounting',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 70, dataIndex: 'AccountingDate'},
                                                            {text: 'ID', width: 210, dataIndex: 'AccountingID'}

                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL21_1 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail21_1',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle5',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail21_1',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1502,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataDetailSFI21'
                                                }
                                            },
                                            {text: 'Airline Name', width: 200, dataIndex: 'DES_BAIR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:left;';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Your Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSB', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 75, dataIndex: 'TISCAL', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXB', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 75, dataIndex: 'THDFAL', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPAL', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'We Accept',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSSA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 75, dataIndex: 'TISCA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISCA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAXA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 75, dataIndex: 'THDFA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAMA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATPA, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Difference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 75, dataIndex: 'TISCD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISCD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAXD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 75, dataIndex: 'THDFD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAMD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATPD, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'NET', width: 75, dataIndex: 'TNETR', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL21 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail21',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail21',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1372,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '-', id: prototype.id + '-titleGridDataDetail21',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Rejection<br> Number', width: 100, dataIndex: 'REJNUM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            //click: 'onViewDataDetailSFI21'
                                                            click: 'viewDetailSFI031'
                                                        }
                                                    },
                                                    {text: 'Reason<br>Code', width: 70, dataIndex: 'REASCOD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' text-align:left;';
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Your Billing',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'GROSS', width: 75, dataIndex: 'TGROSSB', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'ISC', width: 75, dataIndex: 'TISCAL', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'TAX', width: 75, dataIndex: 'TTAXB', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'FEE', width: 75, dataIndex: 'THDFAL', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 75, dataIndex: 'TUATPAL', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'We Accept',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'GROSS', width: 75, dataIndex: 'TGROSSA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTGROSSA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'ISC', width: 75, dataIndex: 'TISCA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISCA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'TAX', width: 75, dataIndex: 'TTAXA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTTAXA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'FEE', width: 75, dataIndex: 'THDFA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totHFEEAMA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 75, dataIndex: 'TUATPA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATPA, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Difference',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'GROSS', width: 75, dataIndex: 'TGROSSD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTGROSSD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'ISC', width: 75, dataIndex: 'TISCD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISCD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'TAX', width: 75, dataIndex: 'TTAXD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTTAXD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'FEE', width: 75, dataIndex: 'THDFD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totHFEEAMD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 75, dataIndex: 'TUATPD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATPD, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'NET', width: 75, dataIndex: 'TNETR', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL22_1 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail22_1',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle6',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail22_1',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1102,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDataDetailSFI22'
                                                }
                                            },
                                            {text: 'Airline Name', width: 300, dataIndex: 'DES_BAIR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:left;';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'NET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL22 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail22',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle8',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail22',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1172,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'BM<br> Number', width: 100, dataIndex: 'BCMNUM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
//                                                     click: 'onViewDetail'
                                                    click: 'viewDetailSFI031_1'
                                                }
                                            },
                                            {text: 'Reason<br>Code', width: 70, dataIndex: 'REASCOD'},
                                            {text: 'Correspondence<br>Ref.Number', width: 100, dataIndex: 'REFNUM'},
                                            {text: 'FM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', width: 80, dataIndex: 'FIMNUM', renderer: 'getInt'},
                                                    {text: 'Coupon', width: 70, dataIndex: 'FIMCPNUM', renderer: 'getInt'}
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'NET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Att.Ind.', width: 50, dataIndex: 'ATTINDOR', //renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center';
//                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL30 BY CIA ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetailbyCIA',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle9',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetailByCIA',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1202,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDetailbySOURCE'
                                                }
                                            },
                                            {text: 'Airline Name', width: 300, dataIndex: 'IN_FECHA_FROM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:left;';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'VAT', width: 100, dataIndex: 'TVAT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXI_LY, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailByCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL30 BY SOURCE ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetailbySOURCE',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle10',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetailBySOURCE',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1202,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Source<br> Code', width: 100, dataIndex: 'SOURCOD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onViewDetailbyCIASOURCE'
                                                }
                                            },
                                            {text: 'Source <br>Desciption', width: 300, dataIndex: 'IN_FECHA_FROM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:left;';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'VAT', width: 100, dataIndex: 'TVAT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXI_LY, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL20 BY SO ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail20bySO',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle11',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail20bySO',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1532,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
//                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
//                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
//                                                },
//                                                listeners: {
//                                                    click: 'onViewDataDetailSFI20_1'
//                                                }
//                                            },

                                            {text: '-', id: prototype.id + '-titleGridDataDetail20BYSO',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ticket Number', width: 150, dataIndex: 'TKT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            //click: 'onViewDataDetailSFI20_1'
                                                        }
                                                    },
                                                    {text: 'Flight<br>Date', width: 80, dataIndex: 'DES_SOURCOD'},
                                                    {text: 'Elect<br>Tkt Ind.', width: 60, dataIndex: 'ETKTIND'},
                                                    {text: 'Currency', width: 60, dataIndex: 'ACURREN'},
                                                    {text: 'GROSS', width: 70, dataIndex: 'GROSS', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20bySO').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'ISC',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 70, dataIndex: 'ISCCH', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 70, dataIndex: 'ISCAMT', renderer: 'getDouble',
//                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail20bySO').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right';
//                                                                    return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
//                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TAX', width: 70, dataIndex: 'TAX',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                            return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000.00') + '</a>';
                                                        },
                                                        listeners: {
                                                            //click: 'onViewDataDetailSFI20_1'
                                                        },
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20bySO').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'Other Commision',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 70, dataIndex: 'OTHCOMPER', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 70, dataIndex: 'OTHCOMAM', renderer: 'getDouble',
//                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail20bySO').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right';
//                                                                    return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
//                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'FEE', width: 70, dataIndex: 'HFEEAM', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20bySO').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'UATP',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 70, dataIndex: 'UATPPER', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 70, dataIndex: 'UATPAMT', renderer: 'getDouble',
//                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail20bySO').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right';
//                                                                    return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
//                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'NET', width: 70, dataIndex: 'CPNTAM', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20bySO').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {text: 'From - To', width: 80, dataIndex: 'FROMTO'},
                                                    {text: 'Att.Ind.', width: 60, dataIndex: 'ATTINDOR'},
                                                    {text: 'PMI<br>Validated', width: 60, dataIndex: 'VALDPMI'},
                                                    {text: 'Accounting',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 70, dataIndex: 'AccountingDate'},
                                                            {text: 'ID', width: 210, dataIndex: 'AccountingID'}

                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL21 BY SO ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail21bySO',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail21bySO',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1372,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '-', id: prototype.id + '-titleGridDataDetail21BYSO',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Rejection<br> Number', width: 100, dataIndex: 'REJNUM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            //click: 'onViewDataDetailSFI21'
                                                            click: 'viewDetailSFI031'
                                                        }
                                                    },
                                                    {text: 'Reason<br>Code', width: 70, dataIndex: 'REASCOD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' text-align:left;';
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Your Billing',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'GROSS', width: 75, dataIndex: 'TGROSSB', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'ISC', width: 75, dataIndex: 'TISCAL', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'TAX', width: 75, dataIndex: 'TTAXB', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'FEE', width: 75, dataIndex: 'THDFAL', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 75, dataIndex: 'TUATPAL', renderer: 'getDoubleColor1',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'We Accept',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'GROSS', width: 75, dataIndex: 'TGROSSA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTGROSSA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'ISC', width: 75, dataIndex: 'TISCA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISCA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'TAX', width: 75, dataIndex: 'TTAXA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTTAXA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'FEE', width: 75, dataIndex: 'THDFA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totHFEEAMA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 75, dataIndex: 'TUATPA', renderer: 'getDoubleColor2',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATPA, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Difference',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'GROSS', width: 75, dataIndex: 'TGROSSD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTGROSSD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'ISC', width: 75, dataIndex: 'TISCD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTISCD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'TAX', width: 75, dataIndex: 'TTAXD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTTAXD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'FEE', width: 75, dataIndex: 'THDFD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totHFEEAMD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {text: 'UATP', width: 75, dataIndex: 'TUATPD', renderer: 'getDoubleColor3',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totTUATPD, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'NET', width: 75, dataIndex: 'TNETR', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAIL22 BY SO ----------
                        //-----------------------------------------------------------------                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetail22bySO',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle13',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail22bySO',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 580,
                                    width: 1172,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'BM<br> Number', width: 100, dataIndex: 'BCMNUM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-ip-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'viewDetailSFI031_1'
                                                }
                                            },
                                            {text: 'Reason<br>Code', width: 70, dataIndex: 'REASCOD'},
                                            {text: 'Correspondence<br>Ref.Number', width: 100, dataIndex: 'REFNUM'},
                                            {text: 'FM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', width: 80, dataIndex: 'FIMNUM', renderer: 'getInt'},
                                                    {text: 'Coupon', width: 70, dataIndex: 'FIMCPNUM', renderer: 'getInt'}
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'NET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Att.Ind.', width: 50, dataIndex: 'ATTINDOR', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL MAIN DATA DETAILSFI41 ----------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataDetailSFI41',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-titleGridDataDetailSFI41',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetailSFI41',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 550,
                                    width: 1002,
                                    columnLines: true,
                                    resizable: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }
//                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'TAX 1', width: 100, dataIndex: 'TAXCODE1'},
                                            {text: 'AMNT1', width: 100, dataIndex: 'TAXBILED1', renderer: 'getDouble'},
                                            {text: 'TAX 2', width: 100, dataIndex: 'TAXCODE2'},
                                            {text: 'AMNT2', width: 100, dataIndex: 'TAXBILED2', renderer: 'getDouble'},
                                            {text: 'TAX 3', width: 100, dataIndex: 'TAXCODE3'},
                                            {text: 'AMNT3', width: 100, dataIndex: 'TAXBILED3', renderer: 'getDouble'},
                                            {text: 'TAX 4', width: 100, dataIndex: 'TAXCODE4'},
                                            {text: 'AMNT4', width: 100, dataIndex: 'TAXBILED4', renderer: 'getDouble'},
                                            {text: 'TAX 5', width: 100, dataIndex: 'TAXCODE5'},
                                            {text: 'AMNT5', width: 100, dataIndex: 'TAXBILED5', renderer: 'getDouble'}
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   PANEL TICKET ----------
                        //-----------------------------------------------------------------

                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxTKT',
                            bodyStyle: 'background-color: #E3EAF9;',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridboxTKT">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridBoxTKT',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1630,
                                    columnLines: true,
                                    resizable: false,
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
                                            {text: '-',
//                                              id: prototype.id + '-lblTitulo20bySO111',
                                                flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ticket Number', width: 175, dataIndex: 'TKT',
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Billing',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 90, dataIndex: 'strFormatDate'}
                                                        ]
                                                    },
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 90, dataIndex: 'DES_SOURCOD'}
                                                        ]
                                                    },
                                                    {text: 'Airline',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Code', width: 70, dataIndex: 'BAIR'}
                                                        ]
                                                    },
                                                    {text: 'Period', width: 50, dataIndex: 'PERNUM'},
                                                    {text: 'Source',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Code', width: 70, dataIndex: 'SOURCOD'}
                                                        ]
                                                    },
                                                    {text: 'Elect.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Tkt Ind.', width: 60, dataIndex: 'ETKTIND'}
                                                        ]
                                                    },
                                                    {text: 'Currency', width: 70, dataIndex: 'ACURREN'},
                                                    {text: 'GROSS', width: 85, dataIndex: 'GROSS', renderer: 'getDouble', sortable: true,
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridBoxTKT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 65, dataIndex: 'ISCCH', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 80, dataIndex: 'ISCAMT', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridBoxTKT').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'TAX',
                                                        listeners: {
                                                            click: 'onViewDataDetailSFI41'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-ip-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + Ext.util.Format.number(value, '0,000.00') + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridBoxTKT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Other Commision',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 65, dataIndex: 'OTHCOMPER', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 80, dataIndex: 'OTHCOMAM', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridBoxTKT').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'FEE', width: 80, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridBoxTKT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 65, dataIndex: 'UATPPER', renderer: 'getDouble'},
                                                            {text: 'Amount', width: 80, dataIndex: 'UATPAMT', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridBoxTKT').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'NET', width: 75, dataIndex: 'CPNTAM', renderer: 'getDouble', sortable: true,
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridBoxTKT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'From - To', width: 80, dataIndex: 'FROMTO'},
                                                    {text: 'Att.Ind.', width: 60, dataIndex: 'ATTINDOR'},
                                                    {text: 'PMI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Validated', width: 60, dataIndex: 'VALDPMI'}
                                                        ]
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-srcRN',
                            bodyStyle: 'background-color: #E3EAF9;',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridSrcRN">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridSrcRN',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1560,
                                    columnLines: true,
                                    resizable: false,
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
                                            {text: 'Rejection Nbr.', width: 130, dataIndex: 'REJNUM',
//                                                listeners: {
//                                                    click: 'viewDataDetailSFI30'
//                                                },
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
//                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
//                                                }
                                            },
                                            {text: 'Reason',
                                                columns: [
                                                    {text: 'Code', width: 50, dataIndex: 'REASCOD', align: 'center',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center';
//                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Your Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 90, dataIndex: 'TGROSSB', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 90, dataIndex: 'TISCAL', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 90, dataIndex: 'TTAXB', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 70, dataIndex: 'THDFAL', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 90, dataIndex: 'TUATPAL', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'We Accept',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 90, dataIndex: 'TGROSSA', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 90, dataIndex: 'TISCA', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 90, dataIndex: 'TTAXA', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 70, dataIndex: 'THDFA', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 90, dataIndex: 'TUATPA', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATPA, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 90, dataIndex: 'TGROSSD', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 90, dataIndex: 'TISCD', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 90, dataIndex: 'TTAXD', renderer: 'getDouble',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:right;text-decoration:underline;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000.00') + '</a>';
                                                        },
                                                                listeners: {
                                                                    click: 'viewDataDetailSFI41_2'
                                                                },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXD, '0,000.00');
                                                        },
                                                    },
                                                    {text: 'FEE', width: 70, dataIndex: 'THDFD', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 90, dataIndex: 'TUATPD', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATPD, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'NET', width: 90, dataIndex: 'TNETR', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridSrcRN').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                }
                                            }

                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                    ]
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
                            id: prototype.id + '-panelPie',
                            width: 780,
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

