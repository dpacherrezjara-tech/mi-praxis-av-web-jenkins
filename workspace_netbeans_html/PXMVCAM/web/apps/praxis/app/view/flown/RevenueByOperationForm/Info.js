Ext.define('Ext.Praxis.view.flown.RevenueByOperationForm.Info', {
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 545,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 120,
                                                listeners: {
                                                    click: 'onViewDetailClick',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-decoration:none;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'CARRIER', width: 90
                                    },
                                    {
                                        text: 'Route',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Orig', dataIndex: 'CDEPART', width: 90
                                            },
                                            {
                                                text: 'Dest', dataIndex: 'CARRIVA', width: 90
                                            },
                                            {
                                                text: 'KMS', dataIndex: 'KMS_1', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Aircraft', dataIndex: 'NPLANE', width: 120,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'strDescripcion4', width: 90
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN_J', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_J', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_Y', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'KMS', dataIndex: 'KMS', width: 120,
                                        listeners: {
                                            click: 'onViewDetailByFBaseClick',
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                
                // <editor-fold defaultstate="collapsed" desc="boxByZone">
                {
                    region: 'center',
                    id: prototype.id + '-boxByZone',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
//                        width: prototype.widthGridByZone,
                        width: 1620,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataByZone">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataByZone',
//                            width: prototype.widthGridByZone,
//                            width: 1620,
                            height: 545,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 120,
                                                listeners: {
                                                    click: 'onViewDetailClick',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-decoration:none;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Zone',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Cod', dataIndex: 'ZONA', width: 90
                                            },
                                            {
                                                text: 'Name', dataIndex: 'strZona', width: 220,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'CARRIER', width: 90
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'strDescripcion4', width: 90
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN_J', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_J', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN_Y', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_Y', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'KMS', dataIndex: 'KMS', width: 120,
                                        listeners: {
                                            click: 'onViewDetailByFBaseClick',
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                                    width: prototype.widthGridByZone,
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
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxByCityPair">
                {
                    region: 'center',
                    id: prototype.id + '-boxByCityPair',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
//                        width: prototype.widthGridByCityPair,
                        width: 1620,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataByCityPair">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataByCityPair',
//                            width: prototype.widthGridByCityPair,
                            width: 1620,
                            height: 545,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 120,
                                                listeners: {
                                                    click: 'onViewDetailClick',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-decoration:none;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Route',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Orig - Dest', dataIndex: 'strRuta', width: 115,
                                                listeners: {
                                                    click: 'onViewNPlaneByCityPairClick',
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'KMS', dataIndex: 'KMS_1', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'CARRIER', width: 90
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'strDescripcion4', width: 90
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN_J', width: 110,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_J', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN_Y', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_Y', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'KMS', dataIndex: 'KMS', width: 120,
                                        listeners: {
                                            click: 'onViewDetailByFBaseClick',
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie3">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie3',
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
                                    width: prototype.widthGridByCityPair,
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
                                            id: prototype.id + '-lbl-currentPage3',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount3',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total3',
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
                
                // <editor-fold defaultstate="collapsed" desc="boxByNPlane">
                {
                    region: 'center',
                    id: prototype.id + '-boxByNPlane',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
//                        width: prototype.widthGridByNPlane,
                        width: 1372,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataByNPlane">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataByNPlane',
//                            width: prototype.widthGridByNPlane,
                            width: 1372,
                            height: 550,
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
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 120,
                                                listeners: {
                                                    click: 'onViewDetailClick',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-decoration:none;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Aircraft', dataIndex: 'NPLANE', width: 120,
                                        listeners: {
                                            click: 'onViewByNPlaneClick',
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;text-decoration:none;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Carr', dataIndex: 'CARRIER', width: 80
                                    },
                                    {
                                        text: 'Flights', dataIndex: 'QTYFlight', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totQTYFlight, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'strDescripcion4', width: 90
                                    },
                                    {
                                        text: 'KMS', dataIndex: 'KMS', width: 120,
                                        listeners: {
                                            click: 'onViewDetailByFBaseClick',
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totKMS, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYPAX_J, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN_J', width: 110,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVCPN_J, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_J', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYPAX_Y, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN_Y', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVCPN_Y, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Average', dataIndex: 'AVG_Y', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailByCabinClick',
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-revenue-by-operation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTYPAX, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVCPN, '0,000.00');
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
                        // <editor-fold defaultstate="collapsed" desc="pie4">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie4',
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
                                    width: prototype.widthGridByNPlane,
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
                                            id: prototype.id + '-lbl-currentPage4',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount4',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total4',
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