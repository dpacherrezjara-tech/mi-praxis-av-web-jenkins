Ext.define('Ext.Praxis.view.interline.PricingOverForm.Info', {
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
                    border: false,
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
                            width: 960,
                            height: 400,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'checkcolumn',
                                        text: 'Sel', dataIndex: '', width: 35,
                                        renderer: function(value, meta, record, row, col) {
                                            meta['tdCls'] = 'x-item-disabled';
                                            return new Ext.ux.CheckColumn().renderer(value);
                                        }
                                    },
//                                    {
//                                        text: 'Sel', dataIndex: '', width: 35,
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center;";
//                                        }
//                                    },
                                    {
                                        text: 'Prorate',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'A020KEY', width: 85,
                                                listeners: {
                                                    click: 'viewProrate',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
//                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#interline-pricing-over-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'strTicket', flex: 1//width: 110
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Fare',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Basis', dataIndex: 'A020BASE', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'X/O', dataIndex: 'A728XO', width: 50
                                    },
                                    {
                                        text: 'Sector', dataIndex: 'A020RUTAP', width: 65
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'A020TRANSP', width: 55
                                    },
                                    {
                                        text: 'Flight', dataIndex: 'A020VUELO', width: 50
                                    },
                                    {
                                        text: 'Class', dataIndex: 'A020CLASE', width: 50
                                    },
                                    {
                                        text: 'Billing', dataIndex: 'A020SUDEBI', width: 60, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Miatech', dataIndex: 'A020ACEPTA', width: 60, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Gross', dataIndex: 'A020REDEBI', width: 55, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Isc', dataIndex: 'A020COMISI', width: 55, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Tax', dataIndex: 'A020TAX', width: 55, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = Number(data.A020TAX) >= 100 ? '#C22424' : '#244066';
                                            metaData.style = "text-align:right;color:" + color;
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Neto', dataIndex: 'A020NETO', width: 55, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'RM', dataIndex: 'A020CLASRM', width: 35
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxSwapData',
                    width: '100%',
                    hidden: true,
                    border: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridSwap">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridSwap',
                            width: 960,
                            height: 400,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Prorate',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'A020KEY', width: 90,
                                                listeners: {
                                                    click: 'viewProrate',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
//                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#interline-pricing-over-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'strTicket', width: 120
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Routing', dataIndex: 'A020RUTA', flex: 1//width: 270
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
                                                text: 'Date', dataIndex: 'A020FVENTA', width: 80
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Use',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'A020FUSO', width: 80
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Issue',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Place', dataIndex: 'A728CTYEMI', width: 60
                                            }
                                        ]
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
                                                text: 'Place', dataIndex: 'A728CTYVTA', width: 60
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Journey',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Init', dataIndex: 'A728RUTORG', width: 60
                                            }
                                        ]
                                    },
                                    {
                                        text: 'R.I.', dataIndex: 'A020TIPEX', width: 50
                                    },
                                    {
                                        text: 'User', dataIndex: 'A020USER', width: 90
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
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