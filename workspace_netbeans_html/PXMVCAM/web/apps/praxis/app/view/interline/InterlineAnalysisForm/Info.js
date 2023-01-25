Ext.define('Ext.Praxis.view.interline.InterlineAnalysisForm.Info', {
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
                    layout: 'hbox',
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
//                        align: 'center'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 4},
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 70,
                            height: 530,
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
                                        text: '&nbsp',
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#D1E0E0;font-weight:bold;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', width: 7},
                        // <editor-fold defaultstate="collapsed" desc="gridDataP1">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataP1',
                            width: 600,
                            height: 530,
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
                                        text: '&nbsp',
                                        id: prototype.id+'-HD_LASTYEAR',
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Outgoing Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'USD', dataIndex: 'TNETOCAR_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#CCE6FF;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totISCI_LY, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'PAX', dataIndex: 'QITEMSCAR_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#CCE6FF;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totGROSSI_LY, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Incoming Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'USD', dataIndex: 'TNETO_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#E1FFE1;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totTNETO_LY, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'PAX', dataIndex: 'QITEMS_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#E1FFE1;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQITEMS_LY, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Balance',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'USD', dataIndex: 'diffTNETO_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totSISCI_LY, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'PAX', dataIndex: 'diffQITEMS_LY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strDescripcion2 == 'rojo' ? '#c22437' : '#244066';
                                                            metaData.style = "text-align:right;color:" + color + ";font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totTAXI_LY, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', width: 7},
                        // <editor-fold defaultstate="collapsed" desc="gridDataP2">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataP2',
                            width: 600,
                            height: 530,
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
                                        text: '&nbsp',
                                        id: prototype.id+'-HD_CURRENTYEAR',
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Outgoing Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'USD', dataIndex: 'TNETOCAR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#CCE6FF;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totISCI, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'PAX', dataIndex: 'QITEMSCAR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#CCE6FF;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totGROSSI, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Incoming Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'USD', dataIndex: 'TNET', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#E1FFE1;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totTNETO, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'PAX', dataIndex: 'NUMREC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#E1FFE1;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQITEMS, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Balance',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'USD', dataIndex: 'diffTNETO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totSISCI, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'PAX', dataIndex: 'diffQITEMS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strDescripcion === 'rojo' ? '#C22437' : '#244066';
                                                            metaData.style = "text-align:right;color:" + color + ";font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataP2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totTAXI, '0,000');
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
                }
            ]
        }
    ]
});