Ext.define('Ext.Praxis.view.flown.DischargesForm.Info', {
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
//            xtype: 'panel',
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
                // <editor-fold defaultstate="collapsed" desc="boxGridDeciduousForMonth">
                {
                    region: 'center',
//                    xtype: 'panel',
                    id: prototype.id + '-boxGridDeciduousForMonth',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDeciduousForMonth">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDeciduousForMonth',
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
                                        text: 'Sale Dates', dataIndex: 'strFormatDate', width: 150,
                                        listeners: {
                                            click: 'OnByZona_Click',
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-discharges-form" style="text-decoration:none;color:#008FE3;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Type', dataIndex: 'strDesTIPO', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            return '<b>' + value + '</b>';
                                        }
                                    },
                                    {
                                        text: 'Coupons', dataIndex: 'QTYCPNS', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                            ;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDeciduousForMonth').getStore().getData().items[0].data;
                                            return '<b>' + Ext.util.Format.number(data.totQTYCPNS, '0,000') + '</b>';
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURCPNS', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            return '<b>' + value + '</b>';
                                        }
                                    },
                                    {
                                        text: 'Value CPN', dataIndex: 'AMNCPNS', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDeciduousForMonth').getStore().getData().items[0].data;
                                            return '<b>' + Ext.util.Format.number(data.totAMNCPNS, '0,000.00') + '</b>';
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>

                // <editor-fold defaultstate="collapsed" desc="boxGridDeciduousForZona">
                {
                    region: 'center',
                    id: prototype.id + '-boxGridDeciduousForZona',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
//                        width: prototype.widthGrid,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDeciduousForZona">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDeciduousForZona',
                            width: 540,
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
                                        text: 'Zona',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Cod', dataIndex: 'ZONADES', width: 80,
                                                listeners: {
                                                    click: 'OnGridDetCity'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDesDEST+'"';
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-discharges-form" style="text-decoration:none;color:#008FE3;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Description', dataIndex: 'strDesDEST', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return '<b>' + value + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Coupons', dataIndex: 'QTYCPNS', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDeciduousForZona').getStore().getData().items[0].data;
                                            data = Ext.util.Format.number(data.totQTYCPNS, '0,000');
                                            return  '<b>' + data + '</b>';
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURCPNS', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return '<b>' + value + '</b>';
                                        },
                                    },
                                    {
                                        text: 'Value CPN', dataIndex: 'AMNCPNS', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDeciduousForZona').getStore().getData().items[0].data;
                                            return '<b>' + Ext.util.Format.number(data.totAMNCPNS, '0,000.00') + '</b>';
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>

                // <editor-fold defaultstate="collapsed" desc="boxGridDeciduousForCity">
                {
                    region: 'center',
                    id: prototype.id + '-boxGridDeciduousForCity',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDeciduousForCity">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDeciduousForCity',
                            width: 840,
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
                                    {text: 'Flight Date', dataIndex: 'strFormatDate2', width: 90,
                                        listeners: {
                                            click: 'OnGridDetMonth'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-discharges-form" style="text-decoration:none;color:#008FE3;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Origin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Cod', dataIndex: 'FROMCITY', width: 80,
                                                listeners: {
                                                    click: 'OnGridDetCity'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Description', dataIndex: 'strDesORIG', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return '<b>' + value + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Destination',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Cod', dataIndex: 'TOCITY', width: 80,
                                                listeners: {
                                                    click: 'OnGridDetCity'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Description', dataIndex: 'strDesDEST', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return '<b>' + value + '</b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Coupons', dataIndex: 'QTYCPNS', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDeciduousForCity').getStore().getData().items[0].data;
                                            data = Ext.util.Format.number(data.totQTYCPNS, '0,000');
                                            return  '<b>' + data + '</b>';
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURCPNS', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return '<b>' + value + '</b>';
                                        },
                                    },
                                    {
                                        text: 'Value CPN', dataIndex: 'AMNCPNS', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDeciduousForCity').getStore().getData().items[0].data;
                                            return '<b>' + Ext.util.Format.number(data.totAMNCPNS, '0,000.00') + '</b>';
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
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