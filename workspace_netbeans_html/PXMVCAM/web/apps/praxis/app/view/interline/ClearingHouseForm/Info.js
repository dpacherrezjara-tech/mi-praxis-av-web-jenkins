Ext.define('Ext.Praxis.view.interline.ClearingHouseForm.Info', {
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
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 460,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Invoice', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', flex: 1,//width: 80,
                                                listeners: {
                                                    click: 'viewDetCia'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;text-decoration:underline;font-weight:bold;cursor:hand;";
                                                    return '<a href="#interline-clearing-house-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Period', dataIndex: 'PERNUM', width: 60
                                    },
                                    {
                                        text: 'Outgoing Billing',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Form 1', dataIndex: 'dblTNETF1OB', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Form 2', dataIndex: 'dblTNETF2OB', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Balance', dataIndex: 'dblBALANCOB', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
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
                                                text: 'Form 1', dataIndex: 'dblTNETF1IB', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Form 3', dataIndex: 'dblTNETF3IB', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Balance', dataIndex: 'dblBALANCIB', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
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
                    id: prototype.id + '-boxDetCia',
                    width: prototype.widthContenedor,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetCIA">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetCIA',
                            width: prototype.widthGrid2,
                            height: 530,
                            columnLines: true,
                            features: [{
                                ftype: 'summary',
//                                dock: 'bottom'
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
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'CCIA', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Name', dataIndex: 'strAirName', flex: 1,//width: 250,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;font-weight:bold;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strAirName + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Outgoing Billing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Form 1', dataIndex: 'dblTNETF1OB', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridDetCIA').getStore().getData().items;
                                                            var dblTNETF1OB = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                dblTNETF1OB += Number(items[i].data.dblTNETF1OB);
                                                            return Ext.util.Format.number(dblTNETF1OB, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Form 2', dataIndex: 'dblTNETF2OB', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridDetCIA').getStore().getData().items;
                                                            var dblTNETF2OB = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                dblTNETF2OB += Number(items[i].data.dblTNETF2OB);
                                                            return Ext.util.Format.number(dblTNETF2OB, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Balance', dataIndex: 'dblBALANCOB', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridDetCIA').getStore().getData().items;
                                                            var dblBALANCOB = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                dblBALANCOB += Number(items[i].data.dblBALANCOB);
                                                            return Ext.util.Format.number(dblBALANCOB, '0,000.00');
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
                                                        text: 'Form 1', dataIndex: 'dblTNETF1IB', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridDetCIA').getStore().getData().items;
                                                            var dblTNETF1IB = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                dblTNETF1IB += Number(items[i].data.dblTNETF1IB);
                                                            return Ext.util.Format.number(dblTNETF1IB, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Form 3', dataIndex: 'dblTNETF3IB', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridDetCIA').getStore().getData().items;
                                                            var dblTNETF3IB = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                dblTNETF3IB += Number(items[i].data.dblTNETF3IB);
                                                            return Ext.util.Format.number(dblTNETF3IB, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Balance', dataIndex: 'dblBALANCIB', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridDetCIA').getStore().getData().items;
                                                            var dblBALANCIB = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                dblBALANCIB += Number(items[i].data.dblBALANCIB);
                                                            return Ext.util.Format.number(dblBALANCIB, '0,000.00');
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
                                                        text: 'Form 2 vs Form 3', dataIndex: 'dblAJUSF1IB', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridDetCIA').getStore().getData().items;
                                                            var dblAJUSF1IB = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                dblAJUSF1IB += Number(items[i].data.dblAJUSF1IB);
                                                            return Ext.util.Format.number(dblAJUSF1IB, '0,000.00');
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