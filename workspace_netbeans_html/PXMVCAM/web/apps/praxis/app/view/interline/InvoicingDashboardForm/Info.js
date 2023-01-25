Ext.define('Ext.Praxis.view.interline.InvoicingDashboardForm.Info', {
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
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 1200,
                            height: 500,
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
                                        text: 'Invoice Date', dataIndex: 'strFormatDate', flex: 1,//width: 90,
                                        listeners: {
                                            click: 'imgByFINVOICE_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-invoicing-dashboard-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Period', dataIndex: 'PERMONT', width: 67,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'QTY-CPNS', dataIndex: 'QTYINV', width: 87,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totQTYDOC, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENP', width: 82,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'GROSS', dataIndex: 'GROSSI', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totGROSS, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'ISC', dataIndex: 'ISCN', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totISC, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'TAX', dataIndex: 'TAXN', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTAX, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Other Commission', dataIndex: 'DOTCRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totOTHER, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'FEE', dataIndex: 'DHAFRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totHFEE, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'UATP', dataIndex: 'DUATRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totUATP, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'NET', dataIndex: 'NETO', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totNETO, '0,000.00');
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
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataDetail">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetail',
                            width: 1300,
                            height: 520,
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
                                        text: 'Source', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'TUSO', width: 65,
                                                listeners: {
                                                    click: 'imgByTUSO_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;font-weight:bold;cursor:hand;";
                                                    return '<a href="#interline-invoicing-dashboard-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Name', dataIndex: 'strDescripcion', flex: 1,//width: 200,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;font-weight:bold;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'QTY-CPNS', dataIndex: 'QTYINV', width: 85,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totQTYDOC, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENP', width: 75,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'GROSS', dataIndex: 'GROSSI', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totGROSS, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'ISC', dataIndex: 'ISCN', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totISC, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'TAX', dataIndex: 'TAXN', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTAX, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Other Commission', dataIndex: 'DOTCRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totOTHER, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'FEE', dataIndex: 'DHAFRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totHFEE, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'UATP', dataIndex: 'DUATRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totUATP, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'NET', dataIndex: 'NETO', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totNETO, '0,000.00');
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
                    id: prototype.id + '-boxDetailAIRLINE',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataDetailAirline">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetailAirline',
                            width: 1300,
                            height: 565,
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
                                        text: 'Airline', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'AIRLINE', width: 67,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;font-weight:bold;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Name', dataIndex: 'strDescripcion1', flex: 1,//width: 200,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;font-weight:bold;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'QTY-CPNS', dataIndex: 'QTYINV', width: 85,
                                        listeners: {
                                            click: 'viewDetByTkt_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;color:#057ECB;text-decoration:underline;font-weight:bold;cursor:hand;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return '<a href="#interline-invoicing-dashboard-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totQTYDOC, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENP', width: 75,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'GROSS', dataIndex: 'GROSSI', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totGROSS, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'ISC', dataIndex: 'ISCN', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totISC, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'TAX', dataIndex: 'TAXN', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTAX, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Other Commission', dataIndex: 'DOTCRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totOTHER, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'FEE', dataIndex: 'DHAFRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totHFEE, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'UATP', dataIndex: 'DUATRM', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totUATP, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'NET', dataIndex: 'NETO', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;font-weight:bold;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailAirline').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totNETO, '0,000.00');
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
                    id: prototype.id + '-boxDetTkt',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                anchor: '100%',
                                padding: '6 0',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-tit_det_Tkt',
                                    text: '',
                                    style: 'font-weight:bold;text-align:center;'
                                }
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="gridTkt">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridTkt',
                            width: 1300,
                            height: 515,
                            hidden: false,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Ticket', dataIndex: 'A050KEY', width: 150,
                                        listeners: {
                                            click: 'viewProrate'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                            return '<a href="#interline-invoicing-dashboard-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'Invoice', dataIndex: 'A050CRTR', width: 90},
                                    {text: 'Billing <br> Date', dataIndex: 'strFormatDate', width: 90},
                                    {text: 'Period', dataIndex: 'A050PSTRF', width: 90},
                                    {text: 'Source', dataIndex: 'A050TUSO', width: 90},
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'A050FVUELO', width: 90
                                            },
                                            {
                                                text: 'Number', dataIndex: 'A050NVUELO', width: 70
                                            },
                                            {
                                                text: 'Orig', dataIndex: 'CITYO', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescOrigen + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Dest', dataIndex: 'CITYD', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescDestino + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'A050CARS', width: 70
                                    },
                                    {
                                        text: 'RBD', dataIndex: 'A050RBDS', width: 70
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A050MNRCD', width: 70
                                    },
                                    {
                                        text: 'Gross', dataIndex: 'A050ACEPTA', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Commision',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'ISC', dataIndex: 'A050COMISI', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '%Rate', dataIndex: 'A050COMISP', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'CSC', dataIndex: 'A050OVRAMT', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '%Rate', dataIndex: 'A050OVRISC', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Tax', dataIndex: 'A050TUA', width: 80,
                                        listeners: {
                                            click: 'btnTUA_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.A050TUA !== 0 ? '#057ECB' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";text-decoration:none;font-weight:bold;cursor:pointer;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return '<a href="#interline-invoicing-dashboard-form" style="color:' + color + ';text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Net', dataIndex: 'A050NETO', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'PMI', dataIndex: 'strMonthF', width: 50
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="gridTktA020">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridTktA020',
                            width: 1150,
                            height: 520,
                            hidden: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Ticket', dataIndex: 'A050KEY',width: 150,
                                        listeners: {
                                            click: 'viewProrate'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                            return '<a href="#interline-invoicing-dashboard-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'Rejection <br> Number', dataIndex: 'A050RMSN', width: 90},
                                    {text: 'Invoice', dataIndex: 'A050CRTR', width: 90},
                                    {text: 'Billing <br> Date', dataIndex: 'A050BDATE', width: 90},
                                    {text: 'Period', dataIndex: 'A050PSTRF', width: 90},
                                    {text: 'Source', dataIndex: 'A050TUSO', width: 90},
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'A050FVUELO', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A050MNRCD', width: 70
                                    },
                                    {
                                        text: 'Gross', dataIndex: 'A050ACEPTA', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'ISC', dataIndex: 'A050COMISI', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Tax', dataIndex: 'A050TUA', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Neto', dataIndex: 'A050NETO', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'PMI', dataIndex: 'strMonthF', width: 50
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxTKT',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="gridboxTKT">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridBoxTKT',
                            bodyStyle: 'background-color: #E3EAEF;',
                            width: 1552,
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
                                    {text: 'Ticket', width: 130, dataIndex: 'A050KEY',
                                        listeners: {
                                            click: 'viewProrate'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                            return '<a href="#interline-invoicing-dashboard-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'Invoice', dataIndex: 'A050CRTR', width: 90},
                                    {text: 'Billing <br> Date', dataIndex: 'strFormatDate', width: 90},
                                    {text: 'Period', dataIndex: 'A050PSTRF', width: 90},
                                    {text: 'Source', dataIndex: 'A050TUSO', width: 90},
                                    {text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Date', width: 80, dataIndex: 'A050FVUELO'},
                                            {text: 'Number', width: 70, dataIndex: 'A050NVUELO'},
                                            {text: 'Orig', width: 70, dataIndex: 'CITYO'},
                                            {text: 'Dest', width: 70, dataIndex: 'CITYD'},
                                        ]
                                    },
                                    {text: 'Carrier', width: 70, dataIndex: 'A050CARS'},
                                    {text: 'RBD', width: 70, dataIndex: 'A050RBDS'},
                                    {text: 'Curr.', width: 70, dataIndex: 'A050MNRCD'},
                                    {text: 'Gross', width: 90, dataIndex: 'A050ACEPTA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right;';
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Commision',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'ISC', width: 90, dataIndex: 'A050COMISI',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: '%Rate', width: 90, dataIndex: 'A050COMISP',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'CSC', width: 90, dataIndex: 'A050OVRAMT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: '%Rate', width: 90, dataIndex: 'A050OVRISC',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                        ]
                                    },
                                    {text: 'Tax', width: 70, dataIndex: 'A050TUA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right;';
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Net', width: 70, dataIndex: 'A050NETO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right;';
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'PMI', width: 70, dataIndex: 'strMonthF'}
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    width: prototype.widthContenedor,
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