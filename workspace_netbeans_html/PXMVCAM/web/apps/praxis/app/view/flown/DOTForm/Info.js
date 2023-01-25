Ext.define('Ext.Praxis.view.flown.DOTForm.Info', {
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
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
//                height: 570,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGrid,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridMainData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridMainData',
                            width: prototype.widthGrid,
                            height: 545,
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
                                        text: 'Year - Quarter', dataIndex: 'strDescripcion', width: 90,
                                        listeners: {
                                            click: 'onViewDetailFTEClick'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-dot-form" style="text-decoration:underline #057ECB;color:#008FE3;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'strFCON', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Total Universe',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYCOUP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYCOUP, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Passenger', dataIndex: 'QCPNTOT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Fare', dataIndex: 'FARE', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.FARETOT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Universe Coupon 0',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYCOUPU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#A9DAED;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYCOUPU, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Passenger', dataIndex: 'QCPNTOT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#A9DAED;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNTOTU, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Fare', dataIndex: 'FAREU', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#A9DAED;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.FARETOTU, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total DOT',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYCOUPD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYCOUPD, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Passenger', dataIndex: 'QCPNTOTD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNTOTD, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Fare', dataIndex: 'FARED', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.FARETOTD, '0,000.00');
                                                        }
                                                    }
                                                ]
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
                                                text: 'DOT',
                                                xtype: 'actioncolumn',
                                                width: 60,
                                                align: 'center',
                                                items: [
                                                    {
                                                        icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                        tooltip: 'Export Information DOT',
                                                        handler: 'onOpenExportClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxMainDataDetailFTE">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainDataDetailFTE',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetailFTE,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', height: 6 },
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblTitDetailFTE',
                            text: '',
                            style: 'text-align:center;font-weight:bold;color:#323232;font-size: 13px;',
                            height: 20
                        },
                        { xtype: 'tbspacer', height: 6 },
                        // <editor-fold defaultstate="collapsed" desc="gridMainDataDetailFTE">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridMainDataDetailFTE',
                            width: prototype.widthGridDetailFTE,
                            height: 545,
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
                                        text: 'Source', dataIndex: 'strFte', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'strFCON', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Total Universe',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYCOUP', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYCOUP, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Passenger', dataIndex: 'QCPNTOT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Fare', dataIndex: 'FARE', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.FARETOT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Universe Coupon 0',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYCOUPU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#A9DAED;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYCOUPU, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Passenger', dataIndex: 'QCPNTOT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#A9DAED;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNTOTU, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Fare', dataIndex: 'FAREU', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#A9DAED;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.FARETOTU, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total DOT',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTYCOUPD', width: 100,
                                                        listeners: {
                                                            click: 'onViewDetailTKTClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-dot-form" style="color:#057ECB;text-decoration:underline #057ECB;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYCOUPD, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Passenger', dataIndex: 'QCPNTOTD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNTOTD, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Fare', dataIndex: 'FARED', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.FARETOTD, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxDetTKT">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetTKT',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetTKT,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', height: 6 },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            defaults: {
                                anchor: '100%',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                width: prototype.widthGridDetTKT
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    width: 25,
                                    align: 'center',
                                    icon: 'resources/img/exchange.png',
                                    style: 'background: #E3EAEF;',
                                    tooltip: 'Swap',
                                    scale: 'large',
                                    handler: 'onSwapTKT_Click',
                                    margin: '0 150 0 0'
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblDetTituloTKT',
                            text: '',
                            style: 'text-align:center;font-weight:bold;color:#323232;font-size: 13px;',
                            height: 20
                        },
                        { xtype: 'tbspacer', height: 6 },
                        // <editor-fold defaultstate="collapsed" desc="gridDetTKT">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetTKT',
                            width: prototype.widthGridDetTKT,
                            height: 530,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Nbr.', dataIndex: 'RN', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'TICKET', width: 130, sortable: false,
                                        listeners: {
                                            click: 'gridData_VIEWTKT_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#D7F1FB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-dot-form" style="color:#057ECB;text-decoration:underline #057ECB;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Ticket Flown', dataIndex: 'strSQL', width: 130, sortable: false
                                    },
                                    {
                                        text: 'Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Fare', dataIndex: 'FARE', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pass.', dataIndex: 'PASSCOUN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // <editor-fold defaultstate="collapsed" desc="CITY">
                                    {
                                        text: 'CITY 01',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity01', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity01+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 02',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity02', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity02+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 03',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity03', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity03+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 04',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity04', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity04+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 05',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity05', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity05+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 06',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity06', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity06+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 07',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity07', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity07+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 08',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity08', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity08+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 09',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity09', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity09+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 10',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity10', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity10+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                    // </editor-fold>
                                ]
                            }
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="gridDetTKT2">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetTKT2',
                            hidden: true,
                            width: prototype.widthGridDetTKT,
                            height: 530,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Nbr.', dataIndex: 'RN', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'TICKET', width: 130, sortable: false,
                                        listeners: {
                                            click: 'gridData_VIEWTKT_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#D7F1FB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-dot-form" style="color:#057ECB;text-decoration:underline #057ECB;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Ticket Flown', dataIndex: 'strSQL', width: 130, sortable: false
                                    },
                                    {
                                        text: 'Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Fare', dataIndex: 'FARE', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pass.', dataIndex: 'PASSCOUN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // <editor-fold defaultstate="collapsed" desc="CITY">
                                    {
                                        text: 'CITY 11',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity11', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity11+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 12',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity12', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity12+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 13',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity13', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity13+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 14',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity14', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity14+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 15',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity15', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity15+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 16',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity16', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity16+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 17',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity17', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity17+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 18',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity18', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity18+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 19',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity19', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity19+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'CITY 20',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'City - Op. - Mk. - Cl.', dataIndex: 'strCity20', width: 128,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesCity20+'"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                    // </editor-fold>
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                }
                // </editor-fold>
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
});