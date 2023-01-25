Ext.define('Ext.Praxis.view.interline.SISAccountRMForm.Info', {
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
//            id: prototype.id + '-boxMainData',
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
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridSummary">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridSummary',
//                            width: prototype.widthGrid,
                            width: 1080,
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
                                        text: 'Billing Date', dataIndex: 'strFormatDate', width: 100/*,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-yield-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }*/
                                    },
                                    {
                                        text: 'Period', dataIndex: 'PERNUM', width: 70
                                    },
                                    {text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'RMS Cpns', width: 80, dataIndex: 'RMS',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {text: 'QRM Cpns', width: 80, dataIndex: 'QRM',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'DES_BAIR', width: 90
                                    },
                                    {
                                        text: 'GROSS', dataIndex: 'TGROSSD', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummary').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTGROSSD, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'ISC', dataIndex: 'TISCD', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummary').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTISCD, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'TAX', dataIndex: 'TTAXD', width: 80,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:right;color:#057ECB;";
                                            metaData.style = "text-align:right;";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
//                                            return '<a href="#interline-sis-account-rm--form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummary').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTTAXD, '0,000.00');
                                        }
                                    },
                                    {text: 'Other',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Commision', width: 80, dataIndex: 'TOTHCD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' text-align:right; margin-right:3px ';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridSummary').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totTOTHCD, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'FEE', dataIndex: 'THDFD', width: 80,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummary').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totHFEEAMD, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'UATP', dataIndex: 'TUATPD', width: 80,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummary').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTUATPD, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'NET', dataIndex: 'TNETR', width: 80,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummary').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totTNET, '0,000.00');
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
});