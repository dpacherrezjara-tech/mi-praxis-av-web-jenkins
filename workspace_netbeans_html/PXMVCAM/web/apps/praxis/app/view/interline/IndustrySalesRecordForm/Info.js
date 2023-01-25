Ext.define('Ext.Praxis.view.interline.IndustrySalesRecordForm.Info', {
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
                        border: false,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 1350,
                            height: 500,
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
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 85
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'strDescripcion', width: 120
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
                                                text: 'Curr.', dataIndex: 'A720MONEDA', width: 50
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'A720TARIFA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Fare Equiv.',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Curr.', dataIndex: 'A720MDAPAG', width: 50
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'A720TRFPAG', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight 1',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate1', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion1', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA1', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR1', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E6FFE6;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight 2',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate2', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion2', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA2', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR2', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E0F0FF;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight 3',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate3', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion3', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA3', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR3', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E6FFE6;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight 4',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate4', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion4', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA4', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR4', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E0F0FF;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Billed Coupon',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: '1', dataIndex: 'A720FINVO1', width: 25,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '2', dataIndex: 'A720FINVO2', width: 25,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '3', dataIndex: 'A720FINVO3', width: 25,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: '4', dataIndex: 'A720FINVO4', width: 25,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="gridData2">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData2',
                            width: '100%',
                            height: 540,
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
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'strDescripcion', flex: 1//width: 125
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A720MONREG', width: 50
                                    },
                                    {
                                        text: 'Carrier', dataIndex: 'A720CARRA1', width: 55
                                    },
                                    {
                                        text: 'Flight 1',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate1', width: 73,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion1', width: 68,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA1', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR1', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E6FFE6;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Coupon', dataIndex: 'A720FINVO1', width: 54,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight 2',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate2', width: 73,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion2', width: 68,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA2', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR2', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E0F0FF;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Coupon', dataIndex: 'A720FINVO2', width: 54,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight 3',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate3', width: 73,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion3', width: 68,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA3', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR3', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E6FFE6;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Coupon', dataIndex: 'A720FINVO3', width: 54,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight 4',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate4', width: 73,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'strDescripcion4', width: 68,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA4', width: 47,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR4', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E0F0FF;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Coupon', dataIndex: 'A720FINVO4', width: 54,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF;";
                                                            return value;
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
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxA1884Data',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataA1884">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataA1884',
                            width: 900,
                            height: 500,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 85
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'strDescripcion', flex: 1//width: 120
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
                                                text: 'Curr.', dataIndex: 'A720MONEDA', width: 50
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'A720TARIFA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Fare Equiv.',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Curr.', dataIndex: 'A720MDAPAG', width: 50
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'A720TRFPAG', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
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
                                                text: 'Number', dataIndex: 'A720NVLO1', width: 70
                                            },
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate1', width: 90
                                            },
                                            {
                                                text: 'Orig', dataIndex: 'A720RUTA0', width: 70
                                            },
                                            {
                                                text: 'Dest', dataIndex: 'A720RUTA1', width: 70
                                            },
                                            {
                                                text: 'Carr', dataIndex: 'A720CARRA1', width: 47
                                            },
                                            {
                                                text: 'Value', dataIndex: 'A720VALOR1', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
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