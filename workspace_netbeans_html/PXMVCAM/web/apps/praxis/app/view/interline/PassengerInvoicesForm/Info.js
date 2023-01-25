Ext.define('Ext.Praxis.view.interline.PassengerInvoicesForm.Info', {
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
            id: prototype.id + '-boxConsulta',
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
                    id: prototype.id + '-vskConsulta',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '10 0 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1615,
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
                                            {text: 'Billing Date', /*width: 160,*/flex: 1, dataIndex: 'strFormatDate',
                                                listeners: {
                                                    click: 'viewDataDetailSFI30'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Period', width: 85, dataIndex: 'PERNUM',
                                                listeners: {
                                                    click: 'viewDetailCIA'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
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
                                                    {text: 'GROSS', width: 140, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 140, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'TAX', width: 140, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'VAT', width: 140, dataIndex: 'TVAT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.VATABP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'Other Commision', width: 140, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'FEE', width: 140, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 140, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 140, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
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
                                                      /* getClass: function(v, meta, rec) {
                                                            if (rec.data.PERNUM !== '04') {
//                                                                meta.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                                metaData.unselectableAttr = "unselectable='off'";
                                                                metaData.css = 'x-hide-display';
                                                                return v;
                                                            }
                                                        },*/
                                                        handler: 'openExportManyExcels'
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'EMD-DELTA',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'SKYLINK',
                                                        xtype: 'actioncolumn',
                                                        width: 100,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                                handler: 'exportExcelEMD'
                                                            }
                                                        ]
                                                    }
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
                            id: prototype.id + '-boxMainData_2',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainData_2">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData_2',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1300,
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
                                            {text: 'Billing Date', flex: 1, /*width: 100,*/ dataIndex: 'strFormatDate',
                                                listeners: {
                                                    click: 'viewDataSource'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Period', width: 89, dataIndex: 'PERNUM'},
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 148, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 148, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'TAX', width: 148, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Other Commision', width: 148, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'FEE', width: 148, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 148, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 148, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
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
                            id: prototype.id + '-boxMainDataDetail',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1300,
                                    columnLines: true,
                                    resizable: false,
                                    titleAlign: 'center',
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
                                            {text: 'Source',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 85, dataIndex: 'SOURCOD',
                                                        listeners: {
                                                            click: 'viewDetail'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Source Code', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Description', flex: 1, /*width: 100,*/ dataIndex: 'IN_FECHA_FROM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    }
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
                                                    {text: 'GROSS', width: 140, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 140, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'TAX', width: 140, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'VAT', width: 140, dataIndex: 'TVAT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTAXI, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Other Commision', width: 140, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'FEE', width: 140, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 140, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 140, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
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
                            id: prototype.id + '-boxMainDataDetail20_1',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail20_1">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail20_1',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1400,
                                    columnLines: true,
                                    resizable: false,
                                    titleAlign: 'center',
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
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 85, dataIndex: 'BDAIR',
                                                        listeners: {
                                                            click: 'viewDataDetailSFI20_1'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Airline', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Name', flex: 1, /*width: 100,*/ dataIndex: 'DES_BDAIR',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Quantity', width: 65, dataIndex: 'QUANTITY'}
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
                                                    {text: 'GROSS', width: 140, dataIndex: 'GROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 140, dataIndex: 'ISCAMT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'TAX', width: 140, dataIndex: 'TAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'VAT', width: 140, dataIndex: 'VATAMT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.TOTHCD, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Other Commision', width: 140, dataIndex: 'OTHCOMAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'FEE', width: 140, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 140, dataIndex: 'UATPAMT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 140, dataIndex: 'CPNTAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
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
                            id: prototype.id + '-boxMainDataDetail21_1',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail21_1">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail21_1',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1730,
                                    columnLines: true,
                                    resizable: false,
                                    titleAlign: 'center',
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
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 85, dataIndex: 'BDAIR',
                                                        listeners: {
                                                            click: 'viewDataDetailSFI21_1'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Airline', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Name', flex: 2, /*width: 100,*/ dataIndex: 'DES_BDAIR',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Quantity', width: 65, dataIndex: 'QUANTITY'}
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 90, dataIndex: 'TISCAL', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 90, dataIndex: 'TTAXB', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 90, dataIndex: 'THDFAL', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 90, dataIndex: 'TUATPAL', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
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
                                                    {text: 'GROSS', width: 90, dataIndex: 'TGROSSA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 90, dataIndex: 'TISCA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 90, dataIndex: 'TTAXA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 90, dataIndex: 'THDFA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 90, dataIndex: 'TUATPA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
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
                                                    {text: 'GROSS', width: 90, dataIndex: 'TGROSSD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 90, dataIndex: 'TISCD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 90, dataIndex: 'TTAXD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 90, dataIndex: 'THDFD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 90, dataIndex: 'TUATPD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATPD, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'NET', width: 90, dataIndex: 'TNETR', renderer: 'getDoubleColor2',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21_1').getStore().getData().items[0].data;
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail22_1',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail20_1">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail22_1',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1400,
                                    columnLines: true,
                                    resizable: false,
                                    titleAlign: 'center',
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
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 85, dataIndex: 'BDAIR',
                                                        listeners: {
                                                            click: 'viewDataDetailSFI22_1'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Airline', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Name', flex: 1, /*width: 100,*/ dataIndex: 'DES_BDAIR',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Quantity', width: 65, dataIndex: 'QUANTITY'}
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
                                                    {text: 'GROSS', width: 140, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 140, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'TAX', width: 140, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Other Commision', width: 140, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'FEE', width: 140, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 140, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 140, dataIndex: 'NET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Att.Ind.', width: 140, dataIndex: 'ATTINDOR', renderer: 'getDouble'}
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetailbyCIA',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetailbyCIA">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetailbyCIA',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1300,
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
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 85, dataIndex: 'BDAIR',
                                                        listeners: {
                                                            click: 'viewDetailbySOURCE'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Airline', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Description', flex: 1, /*width: 100,*/ dataIndex: 'IN_FECHA_FROM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    }
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
                                                    {text: 'GROSS', width: 140, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 140, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'TAX', width: 140, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'VAT', width: 140, dataIndex: 'TVAT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTAXI, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Other Commision', width: 140, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'FEE', width: 140, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 140, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 140, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbyCIA').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
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
                            id: prototype.id + '-boxMainDataDetail20',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail20">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail20',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1700,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '-', id: prototype.id + '-lblTitulo20', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ticket Number', width: 150, dataIndex: 'TKT',
                                                        listeners: {
                                                            click: 'viewProrate'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 80, dataIndex: 'DES_SOURCOD'}
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
                                                            {text: 'Number', width: 80, dataIndex: 'FLIGHTN'}
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
                                                    {text: 'Fare',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Currency', width: 60, dataIndex: 'ACURREN'}
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
                                                            {text: 'GROSS', width: 70, dataIndex: 'GROSS',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                                }
                                                            }
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
                                                            {text: 'Rate', width: 70, dataIndex: 'ISCCH',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {text: 'ISC', width: 70, dataIndex: 'ISCAMT',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'TAX', width: 70, dataIndex: 'TAX',
                                                                listeners: {
                                                                    click: 'viewDataDetailSFI41'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = ' color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Other Commision',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Rate', width: 70, dataIndex: 'OTHCOMPER',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {text: 'Amount', width: 70, dataIndex: 'OTHCOMAM',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'FEE', width: 70, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                                }
                                                            }
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
                                                            {text: 'Rate', width: 70, dataIndex: 'UATPPER', renderer: 'getDouble'},
                                                            {text: 'UATP', width: 70, dataIndex: 'UATPAMT', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                                }
                                                            }
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
                                                            {text: 'NET', width: 70, dataIndex: 'CPNTAM', renderer: 'getDouble',
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                                }
                                                            }
                                                        ]
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
                                                            {text: 'Original', width: 70, dataIndex: 'ORIGPMI'}
                                                        ]
                                                    },
                                                    {text: 'Accounting', flex: 1,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 70, dataIndex: 'AccountingDate'},
                                                            {text: 'ID', flex: 1, /*width: 210,*/ dataIndex: 'AccountingID'}

                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-panelMainDataDetail20_1',
//                            bodyStyle: 'background-color: #E3EAF9;',
//                            padding: '1',
//                            margin: '1',
//                            //width: 100,    
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    id: prototype.id + '-labelTitle4',
//                                    style: 'font-size:13px;font-weight:bold',
//                                    align: 'center',
//                                    margin: '10 0 0 0'
////                                    hide: true
//                                },
//                                //<editor-fold defaultstate="collapsed" desc="gridDataDetail20_1">
//                                {
//                                    xtype: 'grid',
//                                    padding: '20 0 0 0',
//                                    id: prototype.id + '-gridDataDetail20_1',
//                                    bodyStyle: 'background-color: #E3EAEF;',
//                                    height: 580,
//                                    width: 1102,
//                                    columnLines: true,
//                                    resizable: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }
//                                    ],
//                                    columns: {
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: true,
//                                            resizable: false,
//                                            align: 'center'
//                                        },
//                                        items: [
//                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' color:#057ECB;text-align:center;text-decoration:underline;';
//                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;">' + value + '</a>';
//                                                },
//                                                listeners: {
//                                                    click: 'onViewDataDetailSFI20'
//                                                }
//                                            },
//                                            {text: 'Airline Name', width: 300, dataIndex: 'DES_BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' text-align:left;';
//                                                    return  value;
//                                                }
//                                            },
//                                            {text: 'Total',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'GROSS', width: 100, dataIndex: 'GROSS', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'ISC', width: 100, dataIndex: 'ISCAMT', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'TAX', width: 100, dataIndex: 'TAX', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'OTHCOMAM', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'UATP', width: 100, dataIndex: 'UATPAMT', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'NET', width: 100, dataIndex: 'CPNTAM', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail20_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
//                                                        }
//                                                    }
//                                                ]
//                                            }
//
//                                        ]
//                                    }
//                                }
//                                //</editor-fold>
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-panelMainDataDetail21_1',
//                            bodyStyle: 'background-color: #E3EAF9;',
//                            padding: '1',
//                            margin: '1',
//                            //width: 100,    
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    id: prototype.id + '-labelTitle5',
//                                    style: 'font-size:13px;font-weight:bold',
//                                    align: 'center',
//                                    margin: '10 0 0 0'
////                                    hide: true
//                                },
//                                //<editor-fold defaultstate="collapsed" desc="gridDataDetail21_1">
//                                {
//                                    xtype: 'grid',
//                                    padding: '20 0 0 0',
//                                    id: prototype.id + '-gridDataDetail21_1',
//                                    bodyStyle: 'background-color: #E3EAEF;',
//                                    height: 580,
//                                    width: 1502,
//                                    columnLines: true,
//                                    resizable: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }
//                                    ],
//                                    columns: {
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: true,
//                                            resizable: false,
//                                            align: 'center'
//                                        },
//                                        items: [
//                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' color:#057ECB;text-align:center;text-decoration:underline;';
//                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;">' + value + '</a>';
//                                                },
//                                                listeners: {
//                                                    click: 'onViewDataDetailSFI21'
//                                                }
//                                            },
//                                            {text: 'Airline Name', width: 200, dataIndex: 'DES_BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' text-align:left;';
//                                                    return  value;
//                                                }
//                                            },
//                                            {text: 'Your Billing',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSB', renderer: 'getDoubleColor1',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'ISC', width: 75, dataIndex: 'TISCAL', renderer: 'getDoubleColor1',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXB', renderer: 'getDoubleColor1',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'FEE', width: 75, dataIndex: 'THDFAL', renderer: 'getDoubleColor1',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPAL', renderer: 'getDoubleColor1',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {text: 'We Accept',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSA', renderer: 'getDoubleColor2',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTGROSSA, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'ISC', width: 75, dataIndex: 'TISCA', renderer: 'getDoubleColor2',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTISCA, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXA', renderer: 'getDoubleColor2',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTTAXA, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'FEE', width: 75, dataIndex: 'THDFA', renderer: 'getDoubleColor2',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAMA, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPA', renderer: 'getDoubleColor2',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTUATPA, '0,000.00') + '<b>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {text: 'Difference',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSD', renderer: 'getDoubleColor3',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTGROSSD, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'ISC', width: 75, dataIndex: 'TISCD', renderer: 'getDoubleColor3',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTISCD, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXD', renderer: 'getDoubleColor3',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTTAXD, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'FEE', width: 75, dataIndex: 'THDFD', renderer: 'getDoubleColor3',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAMD, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPD', renderer: 'getDoubleColor3',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTUATPD, '0,000.00') + '<b>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {text: 'NET', width: 75, dataIndex: 'TNETR', renderer: 'getDouble',
//                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail21_1').getStore().getData().items[0].data;
//                                                    metaData.style = 'text-align:right';
//                                                    return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
//                                                }
//                                            }
//                                        ]
//                                    }
//                                }
//                                //</editor-fold>
//                            ]
//                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail21',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail21">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail21',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1500,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Rejection Nbr.', width: 100, dataIndex: 'REJNUM',
                                                listeners: {
                                                    click: 'viewDetailSFI031',
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#057ECB;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 70, dataIndex: 'REASCOD'}
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
                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSB',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#F2FAFC;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 75, dataIndex: 'TISCAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#F2FAFC;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXB',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#F2FAFC;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 75, dataIndex: 'THDFAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#F2FAFC;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#F2FAFC;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'We Accept',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#DFF0ED;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 75, dataIndex: 'TISCA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#DFF0ED;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#DFF0ED;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 75, dataIndex: 'THDFA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#DFF0ED;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPA', sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#DFF0ED;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATPA, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Difference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'GROSS', width: 75, dataIndex: 'TGROSSD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#FCF5F2;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 75, dataIndex: 'TISCD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#FCF5F2;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 75, dataIndex: 'TTAXD',
                                                        listeners: {
                                                            click: 'viewDataDetailSFI41_2',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#FCF5F2;';
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 75, dataIndex: 'THDFD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#FCF5F2;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 75, dataIndex: 'TUATPD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#FCF5F2;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATPD, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'NET', width: 75, dataIndex: 'TNETR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;background-color:#F2FAFC;';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21').getStore().getData().items[0].data;
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
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-panelMainDataDetail22_1',
//                            bodyStyle: 'background-color: #E3EAF9;',
//                            padding: '1',
//                            margin: '1',
//                            //width: 100,    
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    id: prototype.id + '-labelTitle6',
//                                    style: 'font-size:13px;font-weight:bold',
//                                    align: 'center',
//                                    margin: '10 0 0 0'
////                                    hide: true
//                                },
//                                //<editor-fold defaultstate="collapsed" desc="gridDataDetail22_1">
//                                {
//                                    xtype: 'grid',
//                                    padding: '20 0 0 0',
//                                    id: prototype.id + '-gridDataDetail22_1',
//                                    bodyStyle: 'background-color: #E3EAEF;',
//                                    height: 580,
//                                    width: 1102,
//                                    columnLines: true,
//                                    resizable: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }
//                                    ],
//                                    columns: {
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: true,
//                                            resizable: false,
//                                            align: 'center'
//                                        },
//                                        items: [
//                                            {text: 'Airline<br> Code', width: 100, dataIndex: 'BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' color:#057ECB;text-align:center;text-decoration:underline;';
//                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;">' + value + '</a>';
//                                                },
//                                                listeners: {
//                                                    click: 'onViewDataDetailSFI22'
//                                                }
//                                            },
//                                            {text: 'Airline Name', width: 300, dataIndex: 'DES_BAIR',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = ' text-align:left;';
//                                                    return  value;
//                                                }
//                                            },
//                                            {text: 'Total',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSS', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTGROSS, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTISC, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTTAX, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'Other<BR>Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTVAT, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totHFEEAM, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTUATP, '0,000.00') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: 'NET', width: 100, dataIndex: 'NET', renderer: 'getDouble',
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail22_1').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right';
//                                                            return '<b>' + Ext.util.Format.number(data.totTNET, '0,000.00') + '<b>';
//                                                        }
//                                                    }
//                                                ]
//                                            }
//                                        ]
//                                    }
//                                }
//                                //</editor-fold>
//                            ]
//                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail22',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail22">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail22',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1400,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'BM Number', width: 100, dataIndex: 'BCMNUM',
                                                listeners: {
                                                    click: 'viewDetailSFI033',
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;';
                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 70, dataIndex: 'REASCOD',
                                                        listeners: {
                                                            click: 'viewDetailSFI031_1',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Correspondence',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ref.Number', width: 110, dataIndex: 'REFNUM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'FIM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', width: 110, dataIndex: 'FIMNUM'},
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAX', sortable: false,
                                                        listeners: {
                                                            click: 'viewDataDetailSFI41_3',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;';
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Other Commision', width: 100, dataIndex: 'TOHCOM', renderer: 'getDouble', sortable: false,
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'NET', width: 100, dataIndex: 'NET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Att.Ind.', width: 50, dataIndex: 'ATTINDOR', sortable: false}
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
                            id: prototype.id + '-boxMainDataDetailbySO',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetailbySO">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetailbySO',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1300,
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
                                            {text: 'Source',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 85, dataIndex: 'SOURCOD',
                                                        listeners: {
                                                            click: 'viewDetailbyCIASOURCE'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Source Code', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Description', flex: 1, /*width: 300,*/ dataIndex: 'IN_FECHA_FROM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    }
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
                                                    {text: 'GROSS', width: 140, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 140, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'TAX', width: 140, dataIndex: 'TTAX', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'VAT', width: 140, dataIndex: 'TVAT', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTAXI, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Other Commision', width: 140, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'FEE', width: 140, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 140, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 140, dataIndex: 'TNET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailbySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
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
                            id: prototype.id + '-boxMainDataDetail20bySO',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail20bySO">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail20bySO',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1700,
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
                                            {text: '-', id: prototype.id + '-lblTitulo20bySO', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ticket Number', width: 175, dataIndex: 'TKT',
                                                        listeners: {
                                                            click: 'viewProrate'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;font-weight:bold;">' + value + '</a>';
                                                        }
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
                                                    {text: 'Currency <br> Fare', width: 70, dataIndex: 'ACURREN'},
                                                    {text: 'GROSS', width: 85, dataIndex: 'GROSS', renderer: 'getDouble', sortable: true,
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20bySO').getStore().getData().items[0].data;
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
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'TAX',
                                                        listeners: {
                                                            click: 'viewDataDetailSFI41'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + Ext.util.Format.number(value, '0,000.00') + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20bySO').getStore().getData().items[0].data;
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
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'FEE', width: 80, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20bySO').getStore().getData().items[0].data;
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
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20bySO').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {text: 'NET', width: 75, dataIndex: 'CPNTAM', renderer: 'getDouble', sortable: true,
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail20bySO').getStore().getData().items[0].data;
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
                                                            {text: 'Original', width: 60, dataIndex: 'ORIGPMI'}
                                                        ]
                                                    },
                                                    {text: 'Accounting', flex: 1,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 85, dataIndex: 'AccountingDate'},
                                                            {text: 'ID', flex: 1, /*width: 210,*/ dataIndex: 'AccountingID'}
                                                        ]
                                                    }
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
                            id: prototype.id + '-boxMainDataDetail21bySO',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail21bySO">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail21bySO',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1500,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Rejection Nbr.', width: 140, dataIndex: 'REJNUM',
                                                listeners: {
                                                    click: 'viewDetailSFI031',
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 60, dataIndex: 'REASCOD'}
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
                                                    {text: 'GROSS', width: 80, dataIndex: 'TGROSSB', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 80, dataIndex: 'TISCAL', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'TTAXB', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 80, dataIndex: 'THDFAL', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 80, dataIndex: 'TUATPAL', renderer: 'getDoubleColor1',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
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
                                                    {text: 'GROSS', width: 80, dataIndex: 'TGROSSA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 80, dataIndex: 'TISCA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'TTAXA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 80, dataIndex: 'THDFA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMA, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 80, dataIndex: 'TUATPA', renderer: 'getDoubleColor2',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATPA, '0,000.00');
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
                                                    {text: 'GROSS', width: 80, dataIndex: 'TGROSSD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSSD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 80, dataIndex: 'TISCD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISCD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'TTAXD',
                                                        listeners: {
                                                            click: 'viewDataDetailSFI41_2',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;background-color:#FCF5F2;';
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAXD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'FEE', width: 80, dataIndex: 'THDFD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAMD, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'UATP', width: 80, dataIndex: 'TUATPD', renderer: 'getDoubleColor3',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATPD, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'NET', flex: 1, /*width: 75,*/ dataIndex: 'TNETR',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;background-color:#F2FAFC;';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataDetail21bySO').getStore().getData().items[0].data;
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail22bySO',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail22bySO">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail22bySO',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1400,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'BM Number', flex: 1, /*width: 100,*/ dataIndex: 'BCMNUM',
                                                listeners: {
                                                    click: 'viewDetailSFI031_1',
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', width: 70, dataIndex: 'REASCOD'}
                                                ]
                                            },
                                            {text: 'Correspondence',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ref.Number', width: 130, dataIndex: 'REFNUM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'FIM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', width: 120, dataIndex: 'FIMNUM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Coupon', width: 75, dataIndex: 'FIMCPNUM',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return value;
                                                        }
                                                    }
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
                                                    {text: 'GROSS', width: 110, dataIndex: 'TGROSS', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'ISC', width: 110, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'TAX', width: 110, dataIndex: 'TTAX',
                                                        listeners: {
                                                            click: 'viewDataDetailSFI41_3',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'Other Commision', width: 110, dataIndex: 'TOHCOM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'FEE', width: 110, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'UATP', width: 110, dataIndex: 'TUATP', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 110, dataIndex: 'NET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail22bySO').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Att.Ind.', width: 57, dataIndex: 'ATTINDOR'}
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail33',
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
                                //<editor-fold defaultstate="collapsed" desc="gridMainDataDetail20_1">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataDetail33',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1400,
                                    columnLines: true,
                                    resizable: false,
                                    titleAlign: 'center',
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
                                            {text: 'Ticket Number', width: 150, dataIndex: 'TKT'},
                                            {text: 'Flight',
                                                columns: [
                                                    {text: 'Date', width: 90, dataIndex: 'DES_SOURCOD', align: 'center'}
                                                ]
                                            },
                                            {text: 'Flight',
                                                columns: [
                                                    {text: 'Number', width: 70, dataIndex: 'FLIGHTN', align: 'center'}
                                                ]
                                            },
                                            {text: 'Elect',
                                                columns: [
                                                    {text: 'Tkt Ind.', width: 110, dataIndex: 'ETKTIND', align: 'center'}
                                                ]
                                            },
                                            {text: 'Fare',
                                                columns: [
                                                    {text: 'Currency', width: 70, dataIndex: 'ICURREN', align: 'center'}
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
                                                    {text: 'GROSS', width: 100, dataIndex: 'TGROSSB', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTGROSS, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'Rate', width: 100, dataIndex: 'TISCAL', renderer: 'getDouble', align: 'right'},
                                                    {text: 'ISC', width: 100, dataIndex: 'TISC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTISC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'TAX', width: 100, dataIndex: 'TTAXB', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTTAX, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Other Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Rate', width: 100, dataIndex: 'TOTHAL', renderer: 'getDouble', align: 'right'},
                                                    {text: 'Amount', width: 100, dataIndex: 'TOTHC', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTVAT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'FEE', width: 100, dataIndex: 'HFEEAM', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totHFEEAM, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Rate', width: 100, dataIndex: 'TUATP', renderer: 'getDouble', align: 'right'},
                                                    {text: 'UATP', width: 100, dataIndex: 'TUATAB', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTUATP, '0,000.00');
                                                        }
                                                    }
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
                                                    {text: 'NET', width: 100, dataIndex: 'NET', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetail33').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'From-To', width: 80, dataIndex: 'FROMTO', align: 'center'},
                                            {text: 'Att.Ind.', width: 50, dataIndex: 'ATTINDOR', align: 'center'},
                                            {text: 'PMI',
                                                columns: [
                                                    {text: 'Original', width: 60, dataIndex: 'ORIGPMI', renderer: 'getDouble', align: 'center'}
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
                                                            click: 'viewProrate'
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
                                                            {text: 'Code', width: 70, dataIndex: 'BDAIR'}
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
                                                    {text: 'Currency <br> Fare', width: 70, dataIndex: 'ACURREN'},
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
                                                            click: 'viewDataDetailSFI41'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:none;font-weight:bold;';
                                                            return '<a href="#interline-passenger-invoices-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + Ext.util.Format.number(value, '0,000.00') + '</a>';
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail41_2',
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
                                    id: prototype.id + '-titleGridDataDetail41_2',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail41_2',
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataDetail41',
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
//                                    id: prototype.id + '-titleGridDataDetail41',
                                    style: 'font-size:13px;font-weight:bold',
                                    align: 'center',
                                    margin: '10 0 0 0'
//                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail41',
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
                                },
                                {
                                    xtype: 'label',
                                    html: '(*) Just searching by coupon',
                                    style: 'font-size:13px;style="color:#AC4546;font-weight:bold;text-align: left',
                                    margin: '0 0 0 0',
                                },
                            ],
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxPagDetail',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
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
                                    id: prototype.id + '-lblPagActual',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lblPagTotal',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lblRowsTotal',
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

