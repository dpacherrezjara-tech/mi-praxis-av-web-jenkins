Ext.define('Ext.Praxis.view.flown.YieldReportForm.Info', {
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
            id: prototype.id + '-boxMainData',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                height: 555,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxSummary">
                {
                    region: 'center',
                    id: prototype.id + '-boxSummary',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGrid,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridSummary">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridSummary',
                            width: prototype.widthGrid,
                            height: 510,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Nbr', dataIndex: 'RN', width: 80
                                    },
                                    {
                                        text: 'Flight Date', dataIndex: 'strFormatDate', width: 100,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-yield-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Flight', dataIndex: 'NFLIGHT', width: 70
                                    },
                                    {
                                        text: 'Departure', dataIndex: 'CDEPART', width: 90
                                    },
                                    {
                                        text: 'Arrival', dataIndex: 'CARRIVA', width: 90
                                    },
                                    {
                                        text: 'Passengers', dataIndex: 'PASSNG', width: 110,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Revenue', dataIndex: 'RVNUE', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            metaData.tdAttr = 'data-qtip="Passengers x Revenue by Pax"';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Revenue by Pax', dataIndex: 'RVNPAX', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'KMS', dataIndex: 'KMS', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
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
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
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
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxDetail">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetail',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetail,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDetail">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetail',
                            width: prototype.widthGridDetail,
                            height: 510,
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
                                        text: 'Nbr', dataIndex: 'RN', width: 80
                                    },
                                    {
                                        text: 'Flight Date', dataIndex: 'DFLIGHT', width: 100
                                    },
                                    {
                                        text: 'Flight', dataIndex: 'NFLIGHT', width: 70
                                    },
                                    {
                                        text: 'Zone', dataIndex: 'ZONA', width: 60
                                    },
                                    {
                                        text: 'Departure', dataIndex: 'CDEPART', width: 90
                                    },
                                    {
                                        text: 'Arrival', dataIndex: 'CARRIVA', width: 90
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'CARR', width: 80
                                    },
                                    {
                                        text: 'Fare Basis CD', dataIndex: 'FBASE', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Fare Class', dataIndex: 'CLAS', width: 90
                                    },
                                    {
                                        text: 'Passengers', dataIndex: 'PASSNG', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTAX, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Revenue', dataIndex: 'RVNUE', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            metaData.tdAttr = 'data-qtip="Passengers x Revenue by Pax"';
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totNETO, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Yield', dataIndex: 'YIELD', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            metaData.tdAttr = 'data-qtip="Revenue by Pax / KMS"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Revenue by Pax', dataIndex: 'RVNPAX', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'KMS', dataIndex: 'KMS', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie2">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie2',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGridDetail,
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
                                            id: prototype.id + '-lbl-currentPage2',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount2',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total2',
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