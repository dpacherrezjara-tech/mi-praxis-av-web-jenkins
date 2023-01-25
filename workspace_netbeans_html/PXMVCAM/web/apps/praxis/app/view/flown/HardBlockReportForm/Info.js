Ext.define('Ext.Praxis.view.flown.HardBlockReportForm.Info', {
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
                height: 647,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGrid,
                        height: 647,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 590,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Nbr', dataIndex: 'RN', width: 60
                                    },
                                    {
                                        text: 'Flown Period', dataIndex: 'strFormatDate', width: 120,
                                        listeners: {
                                            click: 'onViewDetailPAXClick'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;text-decoration:none;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-hard-block-report-form" style="color:#057ECB">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Marketing', dataIndex: 'CARRIER', width: 100
                                    },
                                    {
                                        text: 'Sales Type', dataIndex: 'SALESTYPE', width: 120, sortable: true
                                    },
                                    {
                                        text: 'Company', dataIndex: 'CIAHB', width: 100
                                    },
                                    {
                                        text: 'PAX', dataIndex: 'PAX', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totPAX, '0,000');
                                        }
                                    },
                                    {
                                        text: 'MXN', dataIndex: 'AMTMX', width: 100, sortable: true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTMX, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'AMTUS', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTUS, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxDetailData">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailData',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetail,
                        height: 647,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDetailData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailData',
                            width: prototype.widthGridDetail,
                            height: 590,
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
                                        text: 'Nbr', dataIndex: 'RN', width: 60
                                    },
                                    {
                                        text: 'Flown Period', dataIndex: 'strFormatDate', width: 120,
                                        listeners: {
                                            click: 'onViewDetailByDayClick'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;text-decoration:none;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-hard-block-report-form" style="color:#057ECB">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Marketing', dataIndex: 'CARRIER', width: 100
                                    },
                                    {
                                        text: 'Sales Type', dataIndex: 'SALESTYPE', width: 120
                                    },
                                    {
                                        text: 'Company', dataIndex: 'CIAHB', width: 100
                                    },
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Count', dataIndex: 'FLIGHTS', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'From', dataIndex: 'ORIG', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDesOrig+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'To', dataIndex: 'DEST', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDesDest+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'City Pair', dataIndex: 'ORIG', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rData = record.data;
                                            metaData.tdAttr = 'data-qtip="' + rData.strDesDest+'"';
                                            var sData = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[rowIndex].data;
                                            value = sData.ORIG+'-'+sData.DEST;
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'PAX', dataIndex: 'PAX', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totPAX, '0,000');
                                        }
                                    },
                                    {
                                        text: 'MXN', dataIndex: 'AMTMX', width: 100, sortable: true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTMX, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'AMTUS', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTUS, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxDetailNflightData">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailNflightData',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetailNflight,
                        height: 647,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDetailNFData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailNFData',
                            width: prototype.widthGridDetailNflight,
                            height: 590,
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
                                        text: 'Nbr', dataIndex: 'RN', width: 60
                                    },
                                    {
                                        text: 'Flown Period', dataIndex: 'strFormatDate', width: 120
                                    },
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 60,
                                                listeners: {
                                                    click: 'onViewDetailBytktClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-decoration:none;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-hard-block-report-form" style="color:#057ECB">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Count', dataIndex: 'PAX', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Marketing', dataIndex: 'CARRIER', width: 100
                                    },
                                    {
                                        text: 'Sales Type', dataIndex: 'SALESTYPE', width: 120
                                    },
                                    {
                                        text: 'Company', dataIndex: 'CIAHB', width: 100
                                    },
                                    {
                                        text: 'From', dataIndex: 'ORIG', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDesOrig+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'To', dataIndex: 'DEST', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDesDest+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'City Pair', dataIndex: 'ORIG', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var sData = Ext.getCmp(prototype.id + '-gridDetailNFData').getStore().getData().items[rowIndex].data;
                                            value = sData.ORIG+'-'+sData.DEST;
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'MXN', dataIndex: 'AMTMX', width: 100, sortable: true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetailNFData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTMX, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'AMTUS', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetailNFData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTUS, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxDetailTKTData">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailTKTData',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetailTKT,
                        height: 647,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDetailTKTData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailTKTData',
                            width: prototype.widthGridDetailTKT,
                            height: 590,
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
                                        text: 'Nbr', dataIndex: 'RN', width: 60
                                    },
                                    {
                                        text: 'Flown Period', dataIndex: 'strFormatDate', width: 120
                                    },
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 60
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'CCIA', width: 150,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var sData = Ext.getCmp(prototype.id + '-gridDetailTKTData').getStore().getData().items[rowIndex].data;
                                            value = sData.CCIA+'-'+sData.FORMA+sData.SERIE+'-'+sData.CUPON;
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Count', dataIndex: 'PAX', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Marketing', dataIndex: 'CARRIER', width: 100
                                    },
                                    {
                                        text: 'Sales Type', dataIndex: 'SALESTYPE', width: 120
                                    },
                                    {
                                        text: 'Company', dataIndex: 'CIAHB', width: 100
                                    },
                                    {
                                        text: 'From', dataIndex: 'ORIG', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDesOrig+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'To', dataIndex: 'DEST', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDesDest+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate2', width: 100
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flown',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate3', width: 100
                                            }
                                        ]
                                    },
                                    {
                                        text: 'MXN', dataIndex: 'AMTMX', width: 100, sortable: true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTKTData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTMX, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'AMTUS', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTKTData').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totAMTUS, '0,000.00');
                                        }
                                    }
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