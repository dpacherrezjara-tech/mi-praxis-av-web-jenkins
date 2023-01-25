Ext.define('Ext.Praxis.view.interline.SPAProfitabilityForm.Info', {
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
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    width: prototype.widthContenedor,
                    hidden: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 540,
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
                                        text: 'Nbr.', dataIndex: 'RN', width: 40
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strDATE', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Airline', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'AIRLINE', width: 45, sortable: true
                                            },
                                            {
                                                text: 'Name', dataIndex: 'strAirlineName', flex: 1,//width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strAirlineName + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Documents',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Coupons', dataIndex: 'QCUPON', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQCUPON, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'SPA', dataIndex: 'QSPA', width: 70,
                                                listeners: {
                                                    click: 'viewDetail'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return '<a href="#interline-spa-profitability-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQSPA, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'perQSPA', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Audit', dataIndex: 'QAUDI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQAUDI, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'RM', dataIndex: 'QRM', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#bfe4f3;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.dbQRM, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'RMSPA', dataIndex: 'QRMSPA', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#bfe4f3;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQRMSPA, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'perQRMSPA', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#bfe4f3;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Currency', dataIndex: 'CURRENP', width: 73
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.dbNETI, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Reject',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 77,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.dbNETO, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'VALMPA', width: 90, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background:#cff3cf;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.lnVALMPA, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'VALSRP', width: 90, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background:#cff3cf;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.dbVALSRP, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'VALSPA', width: 90, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background:#ccdbca;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.dbVALSPA, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SPA-SRP', dataIndex: 'lngPROF', width: 80, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.lnPROF, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailData',
                    width: prototype.widthContenedor,
                    hidden: true,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataDetail">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetail',
                            width: prototype.widthGrid2,
                            height: 567,
                            title: '',//lblTitulo
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
                                        text: 'Int.Seq ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NROPRT', width: 150,
                                                listeners: {
                                                    click: 'viewProrate'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    return '<a href="#interline-spa-profitability-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'IN_TKT', /*width: 90,*/ sortable: true, flex: 1
                                    },
                                    {
                                        text: 'Sector', dataIndex: 'strFDWORK', width: 145
                                    },
                                    {
                                        text: 'RM', dataIndex: 'strASIGNED', width: 95
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'IN_CURRENP', width: 115, sortable: true
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'VALSPA', width: 140, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.dbVALSPA, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'VALSRP', width: 140, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.dbVALSRP, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Neto', dataIndex: 'NETI', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.dbNETI, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accept',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Neto', dataIndex: 'NETM', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQAUDI, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Neto', dataIndex: 'NETO', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.dbNETO, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxViewGlobal',
                    width: prototype.widthContenedor,
                    hidden: true,
                    layout: 'hbox',
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        height: 314
                    },
                    items: [
                        {xtype: 'tbspacer', width: 45},
                        // <editor-fold defaultstate="collapsed" desc="gridDataView1">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataView1',
                            width: 255,
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
                                        text: 'TOP 10 - SECTOR ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'RK', dataIndex: 'RN', width: 45
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strASIGNED', width: 80
                                            },
                                            {
                                                text: 'Events', dataIndex: 'QCUPON', width: 70, sortable: false,
                                                listeners: {
                                                    click: 'boxViewGlobalDetail'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    value = Ext.util.Format.number(value, '0,000')
                                                    return '<a href="#interline-spa-profitability-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataView1').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQCUPON, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'SPA', dataIndex: 'QSPA', flex: 1,//width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataView1').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQSPA, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', width: 7},
                        // <editor-fold defaultstate="collapsed" desc="gridDataView2">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataView2',
                            width: 586,
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
                                        text: 'TOP 10 - COMMENTS ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'RK', dataIndex: 'RN', width: 45
                                            },
                                            {
                                                text: 'Code', dataIndex: 'strASIGNED', width: 70
                                            },
                                            {
                                                text: 'Comment', dataIndex: 'COMME1', flex: 1,// width: 170,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Events', dataIndex: 'QCUPON', width: 70, sortable: false,
                                                listeners: {
                                                    click: 'boxViewGlobalDetail2'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return '<a href="#interline-spa-profitability-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataView2').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQCUPON, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', width: 7},
                        // <editor-fold defaultstate="collapsed" desc="gridDataView3">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataView3',
                            width: 332,
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
                                        text: 'TOP 10 - FAMILY CODE ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'RK', dataIndex: 'RN', width: 40
                                            },
                                            {
                                                text: 'Code', dataIndex: 'strASIGNED', width: 55
                                            },
                                            {
                                                text: 'Description', dataIndex: 'DES_FTE', sortable: true, flex: 1,//width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Events', dataIndex: 'QCUPON', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataView3').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQCUPON, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', width: 7},
                        // <editor-fold defaultstate="collapsed" desc="gridDataView4">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataView4',
                            width: 210,
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
                                        text: 'TOP 10 - SECTOR BY SPA', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'RK', dataIndex: 'RN', width: 50
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strASIGNED', width: 77
                                            },
                                            {
                                                text: 'SPA', dataIndex: 'QSPA', flex: 1,//width: 50,
                                                listeners: {
                                                    click: 'boxViewGlobalDetail'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return '<a href="#interline-spa-profitability-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataView4').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQSPA, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailViewGlobal',
                    width: prototype.widthContenedor,
                    hidden: true,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataDetailView">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetailView',
                            width: prototype.widthGrid3,
                            height: 567,
                            columnLines: true,
                            title: '',//lblTitulo1
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
                                        text: 'Airline', dataIndex: 'AIRLINE', width: 130, sortable: false
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strDATE', width: 130, sortable: false
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Int Seq.',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NROPRT', width: 130, sortable: false
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'IN_TKT', flex: 1//width: 90
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENP', width: 80
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailView').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnPROF, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accepted',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETM', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailView').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQAUDI, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Net',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailView').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQCUPON, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RM', dataIndex: 'RMACCEPT', width: 80
                                    },
                                    {
                                        text: 'SPMI', dataIndex: 'FMETHOD', width: 80
                                    },
                                    {
                                        text: 'Group', dataIndex: 'GRUPO', width: 80
                                    },
                                    {
                                        text: 'Sector', dataIndex: 'RUTAP', width: 90
                                    },
                                    {
                                        text: 'Rejection',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NRORM', width: 110
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailViewGlobal2',
                    width: prototype.widthContenedor,
                    hidden: true,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataDetailView2">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetailView2',
                            width: prototype.widthGrid3,
                            height: 567,
                            columnLines: true,
                            title: '',//lblTitulo2
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
                                        text: 'Airline', dataIndex: 'AIRLINE', width: 130, sortable: false
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strDATE', width: 130, sortable: false
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Int Seq.',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NROPRT', width: 130, sortable: false
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'IN_TKT', flex: 1//width: 90
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENP', width: 80
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailView2').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnPROF, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accepted',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETM', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailView2').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQAUDI, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Net',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailView2').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.lnQCUPON, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RM', dataIndex: 'RMACCEPT', width: 80
                                    },
                                    {
                                        text: 'SPMI', dataIndex: 'FMETHOD', width: 80
                                    },
                                    {
                                        text: 'Group', dataIndex: 'GRUPO', width: 80
                                    },
                                    {
                                        text: 'Sector', dataIndex: 'RUTAP', width: 90
                                    },
                                    {
                                        text: 'Rejection',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NRORM', width: 110
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-boxViewProrrateo',
//                    width: prototype.widthContenedor,
//                    layout: 'vbox',
//                    border: false,
//                    hidden: false,
//                    bodyStyle: 'background-color: #FFFFFF;',
//                    defaults: {
//                        anchor: '100%',
//                        padding: '6 0 6 0'
//                    },
//                    items: [
//                        {xtype: 'tbspacer', width: 7},
//                        
//                    ]
//                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    width: prototype.widthGrid,
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