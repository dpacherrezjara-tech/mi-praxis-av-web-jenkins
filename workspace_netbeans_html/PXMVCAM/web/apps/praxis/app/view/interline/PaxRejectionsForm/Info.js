Ext.define('Ext.Praxis.view.interline.PaxRejectionsForm.Info', {
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByMonth">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByMonth',
//                            width: prototype.widthGrid,
                            width: 1487,
                            height: 357,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Billing',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Month', dataIndex: 'strFormatDate', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Period', dataIndex: 'PERMONT', width: 60
                                    },
                                    {
                                        text: 'Type', //flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'of Doc', dataIndex: 'strDescripcion',  width: 130,//flex: 1, width: 120,
                                                listeners: {
                                                    click: 'imgByTdoc_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return '<a href="#interline-pax-rejections-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
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
                                                text: 'Docs', dataIndex: 'QCUPON', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Supp', dataIndex: 'QSFIM', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Audit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Docs', dataIndex: 'QAUDI', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'RMs', dataIndex: 'QRM', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: '%Audit', dataIndex: 'dblPerRev', width: 68,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Invoiced',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Gross', dataIndex: 'GROSSI', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ISC', dataIndex: 'ISCI', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'CSC', dataIndex: 'ISCUA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Tax', dataIndex: 'TAXI', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Rejected',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Gross', dataIndex: 'GROSSN', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'ISC', dataIndex: 'ISCN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Tax', dataIndex: 'TAXN', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: '%Tax', dataIndex: 'dblPerTax', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'UATP', dataIndex: 'ISCMA', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'FEE', dataIndex: 'ISCMA', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: '%Rec', dataIndex: 'dblPerRec', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', height: 4},
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByCurr">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByCurr',
                            width: prototype.widthGrid2,
                            height: 121,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Currency', dataIndex: 'CURRENP', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Inv', dataIndex: 'QTYINV', flex: 1, //width: 70,
                                                listeners: {
                                                    click: 'imgByTdoc_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return '<a href="#interline-pax-rejections-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
                                                }
                                            },
                                            {
                                                text: 'Docs', dataIndex: 'QCUPON', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Supp', dataIndex: 'QSFIM', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Audit',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Docs', dataIndex: 'QAUDI', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'RMs', dataIndex: 'QRM', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: '%Audit', dataIndex: 'dblPerRev', width: 68,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Invoiced',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Gross', dataIndex: 'GROSSI', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ISC', dataIndex: 'ISCI', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'CSC', dataIndex: 'ISCUA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Tax', dataIndex: 'TAXI', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Rejected',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Gross', dataIndex: 'GROSSN', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'ISC', dataIndex: 'ISCN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Tax', dataIndex: 'TAXN', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: '%Tax', dataIndex: 'dblPerTax', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'UATP', dataIndex: 'ISCMA', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'FEE', dataIndex: 'ISCMA', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
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
                    id: prototype.id + '-boxDetailByTdocData',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTdocMonth">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTdocMonth',
                            width: prototype.widthGrid3,
                            title: '', //lbl_DetailByTdoc
                            height: 540,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Air', dataIndex: 'AIRLINE', width: 55
                                    },
                                    {
                                        text: 'Source', dataIndex: 'TUSO', width: 65
                                    },
                                    {
                                        text: 'Invoice', dataIndex: 'INVOICE', width: 110,
                                        listeners: {
                                            click: 'imgByINVOICE_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                            return '<a href="#interline-pax-rejections-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Airline', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Name', dataIndex: 'strDescripcion', flex: 1,//width: 170,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
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
                                                text: 'Docs', dataIndex: 'QCUPON', width: 80,
                                                listeners: {
                                                    click: 'imgByTkt_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return '<a href="#interline-pax-rejections-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
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
                                                text: 'Supp', dataIndex: 'QSFIM', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
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
                                                text: 'Audit', dataIndex: 'QAUDI', width: 80,
                                                /*listeners: {
                                                    click: 'imgByRank_clickHandler'
                                                },*/
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    //return '<a href="#interline-pax-rejections-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RMs', dataIndex: 'QRM', width: 75,
                                        listeners: {
//                                            click: 'imgByRank_clickHandler'
                                            click: 'imgByTkt_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return '<a href="#interline-pax-rejections-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'CURRENP', width: 55
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Rejected',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: '%Rec', dataIndex: 'dblPerRec', width: 77,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00')+'%';
                                        }
                                    },
                                    {
                                        text: 'Send',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate1', width: 105
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Date',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Closed', dataIndex: 'strFormatDate2', width: 105
                                            }
                                        ]
                                    },
                                    {
                                        text: 'SPMI', dataIndex: 'FMETHOD', width: 65
                                    },
                                    {
                                        text: 'Group', dataIndex: 'GRUPO', width: 85
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', height: 10},
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTdocCurr">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTdocCurr',
                            width: prototype.widthGrid4,
                            height: 100,
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
                                                text: 'Currency', dataIndex: 'CURRENP', flex: 1//width: 90
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
                                                text: 'Invoices', dataIndex: 'QTYINV', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
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
                                                text: 'Docs', dataIndex: 'QCUPON', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
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
                                                text: 'Aud', dataIndex: 'QAUDI', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RMs', dataIndex: 'QRM', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: '%',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Audited', dataIndex: 'dblPerRev', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
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
                                                text: 'Supported', dataIndex: 'QSFIM', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Supp',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Audited', dataIndex: 'QSOPAUD', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Supp',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'RM', dataIndex: 'QSOPRM', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Invoice',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETI', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Rejected',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ttl',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Corr.', dataIndex: 'QCORR', width: 80,
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
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailByTktData',
                    width: '100%',
                    title: '',//lbl_boxDetailByTktData
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTktMonth">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTktMonth',
                            width: prototype.widthGrid5,
                            height: 566,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Daily Summary Report View ( FC ) ', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Int.Sequence',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'NROPRT', width: 100,
                                                        listeners: {
                                                            click: 'viewProrate'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return '<a href="#interline-pax-rejections-form" style="color:#057ECB;text-decoration:none;"><b>' + value + '</b></a>';
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
                                                        text: 'Number', dataIndex: 'strDescripcion', flex: 1//width: 110
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr', dataIndex: 'CURRENP', width: 70
                                            },
                                            {
                                                text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETI', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Accepted',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETM', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Net',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'RM', dataIndex: 'RMACCEPT', width: 87
                                            },
                                            {
                                                text: 'SPMI', dataIndex: 'FMETHOD', width: 87
                                            },
                                            {
                                                text: 'Sector', dataIndex: 'RUTAP', width: 100
                                            },
                                            {
                                                text: 'Penalty', dataIndex: 'IPENAL', width: 95
                                            },
                                            {
                                                text: 'Reject',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'NRORM', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Group', dataIndex: 'GRUPO', width: 90
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', height: 5},
                        // <editor-fold defaultstate="collapsed" desc="gridDetailByTktCurr">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByTktCurr',
                            width: prototype.widthGrid6,
                            height: 119,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Totals', flex: 1,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Clearing', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', flex: 1//width: 90
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
                                                        text: 'Cpns', dataIndex: 'QCUPON', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
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
                                                        text: 'Audited', dataIndex: 'QAUDI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
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
                                                        text: 'RM', dataIndex: 'QRM', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '%',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Audited', dataIndex: 'dblPerRev', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Rejected Totals',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Gross', dataIndex: 'GROSSN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'ISC', dataIndex: 'ISCN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'TAX', dataIndex: 'TAXN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Rejected',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'NETO', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: '%',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Recovery', dataIndex: 'dblPerRec', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
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
                    id: prototype.id + '-boxDetailByRank',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 7},
                        {
                            xtype: 'label',
                            id: prototype.id + '-lbl_Rank',
                            text: '',
                            style: 'font-weight:bold;text-align:center;',
                            align: 'center',
                            width: '100%'
                        },
                        {xtype: 'tbspacer', height: 7},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: transparent;',
                            align: 'center',
                            defaults: {
                                bodyStyle: 'background-color: transparent;'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridDetailRank1">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailRank1',
                                    width: 270,
                                    height: 279,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Top 10 - Sector', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rk', dataIndex: 'RN', width: 30
                                                    },
                                                    {
                                                        text: 'Sector', dataIndex: 'strDescripcion', flex: 1//width: 80
                                                    },
                                                    {
                                                        text: 'Events', dataIndex: 'lngQty', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'SPA', dataIndex: 'lngSPA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridDetailRank2">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailRank2',
                                    width: 450,
                                    height: 242,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Top 10 - Comments', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rk', dataIndex: 'RN', width: 30
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'strKEY', width: 50
                                                    },
                                                    {
                                                        text: 'Comment', dataIndex: 'strCOM', flex: 1,//width: 250,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Events', dataIndex: 'lngQty', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridDetailRank3">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailRank3',
                                    width: 378,
                                    height: 242,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Top 10 - Family Code', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rk', dataIndex: 'RN', width: 30
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'strKEY', width: 50
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strCOM', flex: 1,//width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Events', dataIndex: 'lngQty', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridDetailRank4">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailRank4',
                                    width: 200,
                                    height: 279,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Top 10 - Sector by SPA', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rk', dataIndex: 'RN', width: 30
                                                    },
                                                    {
                                                        text: 'Sector', dataIndex: 'strDescripcion', flex: 1//width: 80
                                                    },
                                                    {
                                                        text: 'SPA', dataIndex: 'lngSPA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
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
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                bodyStyle: 'background-color: transparent;'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Total Value">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: 956,
                                    defaults: {
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Total Value',
                                            style: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 956,
                                            padding: '4 0'
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: 956,
                                    defaults: {
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            readOnly: true,
                                            width: 140
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: 'Events (Sector)',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: '%',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: 'Events (Comment)',
                                            width: 125
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: '%',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: 'Events (Family)',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: '%',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: 'Events (SPA)',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: '%',
                                            width: 70
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: 956,
                                    defaults: {
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: 'Rank',
                                            readOnly: true,
                                            width: 140
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;background:#E9E9FF;',
                                            id: prototype.id + '-Sec_R',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SecPerc_R',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-Com_R',
                                            value: '',
                                            width: 125
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-ComPerc_R',
                                            value: '',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-Fam_R',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-FamPerc_R',
                                            value: '',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SPA_R',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SPAPerc_R',
                                            value: '',
                                            width: 70
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: 956,
                                    defaults: {
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: 'Other Rank',
                                            readOnly: true,
                                            width: 140
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;background:#E9E9FF;',
                                            id: prototype.id + '-Sec_OR',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SecPerc_OR',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-Com_OR',
                                            value: '',
                                            width: 125
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-ComPerc_OR',
                                            value: '',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-Fam_OR',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-FamPerc_OR',
                                            value: '',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SPA_OR',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SPAPerc_OR',
                                            value: '',
                                            width: 70
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: 956,
                                    defaults: {
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:center;',
                                            value: 'Univ',
                                            readOnly: true,
                                            width: 140
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;background:#E9E9FF;',
                                            id: prototype.id + '-Sec_U',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SecPerc_U',
                                            value: '100%',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-Com_U',
                                            value: '',
                                            width: 125
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-ComPerc_U',
                                            value: '100%',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-Fam_U',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-FamPerc_U',
                                            value: '100%',
                                            width: 70
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SPA_U',
                                            value: '',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align:right;#E9E9FF',
                                            id: prototype.id + '-SPAPerc_U',
                                            value: '100%',
                                            width: 70
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailByInvoiceNbr',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        layout: 'hbox',
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: 900
                    },
                    items: [
                        {
                            region: 'center',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900,
                                padding: '0 0 6 0'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Detail of Invoice">
                                {
                                    defaults: {
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Detail of Invoice',
                                            style: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: '100%',
                                            padding: '4 0'
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Airline',
                                            readOnly: true,
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_AIRLINE_DES',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 510
                                        },
                                        {
                                            id: prototype.id+'-lbl_STVAL_DES',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 200
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice Number',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_INVOICE',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'SRC',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_TUSO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 290
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Group',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_GRUPO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice Date',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_FINVOICE',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Per',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERMONT',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 70
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Time Limit:',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_FECLIMIT',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Clearing',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_FCLEAR',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice Net',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_NETI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 290
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'SPA',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_SPA',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'IMG',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_IMG',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Sending Date',
                                            width: 190
                                        },
                                        {
                                            id: prototype.id+'-lbl_DATENV',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Close Date',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_FECL',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 290
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ETKT',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_ETKT',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            region: 'center',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Invoice Quantity Cpns">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            value: 'Invoice Quantity Cpns',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 250
                                        },
                                        {
                                            value: 'Invoice Amount',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 250
                                        },
                                        {
                                            value: 'RM Amount',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 250
                                        },
                                        {
                                            value: 'Currency',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_MONEDA',
                                            value: '',
                                            fieldStyle: 'text-align:center;',
                                            width: 50
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            id: prototype.id+'-lbl_TUSO_DES',
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: '',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 555
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: '% Rec',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Invoice',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            id: prototype.id+'-lbl_QCUPON',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 80
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Rate',
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Gross',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_GROSSI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_GROSSN',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Process',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            id: prototype.id+'-lbl_PCUPON',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC2',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ISC',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_ISCI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_ISCN',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC3',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Checked',
                                            readOnly: true,
                                            width: 85
                                        },
                                        {
                                            id: prototype.id+'-lbl_QAUDI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC4',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 85
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'TAX',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_TAXI',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_TAXN',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC5',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 250
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Totals',
                                            width: 110
                                        },
                                        {
                                            id: prototype.id+'-lbl_NETI2',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_NETO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 140
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC6',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 110
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            region: 'center',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Quantity RM">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            value: 'Quantity RM',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: '100%'
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: '',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Rate',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'RM',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRM',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_Rate1',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Gross',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMGROSS',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC7',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ISC',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMISC',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC8',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Tax',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMTAX',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC9',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 6">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Others',
                                            readOnly: true,
                                            width: 100
                                        },
                                        {
                                            id: prototype.id+'-lbl_QRMOTH',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            id: prototype.id+'-lbl_PERC10',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 100
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            region: 'center',
                            id: prototype.id+'-box_Adjustment',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                width: 900
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Adjustment">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            value: 'Adjustment',
                                            fieldStyle: 'font-weight:bold;color:#ffffff;background:#305983;text-align:center;',
                                            width: '100%'
                                        }
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Quantity Cpns',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_ICUPON',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Gross',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_IFARE',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'ISC',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_IISC',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Tax',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_ITAX',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Other',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_IOTHER',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 6">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Net',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_INETO',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 150
                                        },
                                        {
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 550
                                        }
                                    ]
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Fila 7">
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:center;background:#E9E9FF;',
                                            value: 'Comments',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            id: prototype.id+'-lbl_COMMENTS',
                                            fieldStyle: 'text-align:center;',
                                            value: '',
                                            width: 700
                                        }
                                    ]
                                }
                                //</editor-fold>
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    width: prototype.widthGrid,
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