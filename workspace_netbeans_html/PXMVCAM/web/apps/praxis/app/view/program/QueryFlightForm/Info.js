Ext.define('Ext.Praxis.view.program.QueryFlightForm.Info', {
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
            id: prototype.id + '-boxPrincipal',
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
                        height: 580,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGrid,
                            height: 580,
                            columnLines: true,
                            features: [
                                {
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'SSIM Data',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'NFLIGHT', width: 60
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Carrier', dataIndex: 'CARRI', width: 55
                                            },
                                            {
                                                text: 'Flown Type', dataIndex: 'strDescFFLOW', width: 90
                                            },
                                            {
                                                text: 'Departure', dataIndex: 'CDEPART', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescCDEPART + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Arrival', dataIndex: 'CARRIVA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescCARRIVA + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Received',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatFSENDSS', width: 90
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {text: 'Quantity Coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Stock',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'OAL', width: 90, dataIndex: 'QCPNOAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                            return  Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNOAL, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Stock',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'AM', width: 90, dataIndex: 'QCPNON',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                            return  Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNON, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Valued', width: 90, dataIndex: 'lngQDIFF',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                            return  Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totlngQDIFF, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Valued', width: 90, dataIndex: 'QCPNVAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVAL, '0,000');
                                                }
                                            },
                                            {text: 'Total Cupons',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Total', width: 90, dataIndex: 'QCPNTOT',
                                                        listeners: {
                                                            click: 'onViewDetTicketClick'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;color:#057ECB';
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#program-query-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                        }
                                                    },
                                                    {text: 'Contab.', width: 90, dataIndex: 'QCPCON',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                            return  Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPCON, '0,000');
                                                        }
                                                    },
                                                    {text: '%', width: 60, dataIndex: 'A1791ORAV',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                            return  Ext.util.Format.number(value, '0,000')+'%';
                                                        }
                                                    },
                                                    {text: 'Not',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Contab.', width: 90, dataIndex: 'QCPNCON',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                                    return  Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQCPNCON, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Coupon',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Value', dataIndex: 'VCPNLOC', width: 85,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totVCPNLOC, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Select', width: 90, dataIndex: 'QCPNLEG',
                                                listeners: {
                                                    click: 'onViewDetTicketClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px;color:#057ECB';
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNLEG, '0,000');
                                                }
                                            }
                                        ]
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
                
                // <editor-fold defaultstate="collapsed" desc="boxDetailData">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailData',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetail,
                        height: 580,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDetTkt2">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetTkt2',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGridDetail,
                            height: 580,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: '',
                                        id:prototype.id + "-lblTitDetTkt",
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Ticket', dataIndex: 'strTicket', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                    metaData.style = "color:" + color;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Accounting',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate2', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + record.data.CDEPART + '-' + record.data.CARRIVA + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatFVTA', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Country', dataIndex: 'PSVVTA', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescPSVVTA + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Fare',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Basis', dataIndex: 'FBASE', width: 115,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                                    metaData.style = "text-align:left;color:" + color;
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'RBD', dataIndex: 'CLAS', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Coupon',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Operation', dataIndex: 'TOPUS', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "color:" + color;
                                                            metaData.tdAttr = 'data-qtip="D=Domestic/I=International"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Carrier', dataIndex: 'CARR', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Com.', dataIndex: 'COMISI', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'MDACP', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Valoration', dataIndex: 'strDescFVAL', width: 130,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                                    metaData.style = "color:" + color;
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
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
                },
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxQtySummary">
                {
                    region: 'center',
                    id: prototype.id + '-boxQtySummary',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
//                        height: 645,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', height: 6 },
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblTitDetail',
                            border: true,
                            text: '',
                            style: 'font-weight:bold;color:#323232;font-size: 13px;',
                            height: 17
//                            width: 200
                        },
                        { xtype: 'tbspacer', height: 6 },
                        // <editor-fold defaultstate="collapsed" desc="gridDataQtySumm">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataQtySumm',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
//                            width: prototype.widthGridQtySummary,
                            height: 580,
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
                                        id: prototype.id+'-titQDate',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 180,
                                                listeners: {
                                                    click: 'onViewDetTktSummValClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB';
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Quantity Coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Stock OAL', width: 120, dataIndex: 'QCPNOAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNOAL, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock AM', width: 120, dataIndex: 'QCPNON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNON, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Not Valued', width: 120, dataIndex: 'lngQDIFF',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totlngQDIFF, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Valued', width: 120, dataIndex: 'QCPNVAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVAL, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total', width: 120, dataIndex: 'QCPNTOT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accounted',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Coupons', dataIndex: 'QCPCON', width: 110,
                                                listeners: {
                                                    click: 'onViewDetTktSummaryClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;color:#057ECB';
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPCON, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Not Accounted',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Coupons', dataIndex: 'QCPNCON', width: 110,
                                                listeners: {
                                                    click: 'onViewDetTktSummaryClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;color:#057ECB';
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNCON, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        hidden: true,
                                        id: prototype.id+'-C_TOTACC',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pre-Accounted', dataIndex: 'QCPNOCR', width: 110,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strDescFFLOW.replace('0x', '#');//Cadena vacía
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;color:black;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNOCR, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Amount',
                                        hidden: true,
                                        id: prototype.id+'-C_MONTOS',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'USD', dataIndex: 'VCPNUSD', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totVCPNUSD, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'MXN', dataIndex: 'VCPNLOC', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right;';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataQtySumm').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totVCPNLOC, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="gridDetQtySum">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetQtySum',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGridDetQtySum,
                            height: 580,
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
                                        text: 'Ticket', dataIndex: 'strTicket', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFuente', width: 80
                                            },
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accounting',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strDescSTNEW', width: 95,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    metaData.tdAttr = 'data-qtip="' + record.data.CDEPART + '-' + record.data.CARRIVA + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatFVTA', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Country', dataIndex: 'PSVVTA', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescPSVVTA + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Fare',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Basis', dataIndex: 'FBASE', width: 115,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'RBD', dataIndex: 'CLAS', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySum').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totCPN_Proc, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Coupon',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Operation', dataIndex: 'TOPUS', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    metaData.tdAttr = 'data-qtip="D=Domestic/I=International"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Carrier', dataIndex: 'CARR', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'MDACP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'VCPN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'YQ', dataIndex: 'A1437RATE', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Valoration', dataIndex: 'strDescFVAL', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Id Cont.', dataIndex: 'IDCON', width: 220,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;color:" + (data.strSQL === 'verde' ? "#2BC224" : "#244066");
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescSTCON+'"';
                                                    return value;
                                                }
                                            }
                                        ]
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
                                    width: prototype.widthGridDetQtySum,
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
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="gridDetQtySummVal">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetQtySummVal',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGridDetQtySummVal,
                            height: 580,
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
                                        text: 'Valued',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 150
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Quantity Coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Stock OAL', width: 120, dataIndex: 'QCPNOAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySummVal').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNOAL, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock AM', width: 120, dataIndex: 'QCPNON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySummVal').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNON, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Not Valued', width: 120, dataIndex: 'lngQDIFF',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySummVal').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totlngQDIFF, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Valued', width: 120, dataIndex: 'QCPNVAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySummVal').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVAL, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total', width: 120, dataIndex: 'QCPNTOT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySummVal').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accounted',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Coupons', dataIndex: 'QCPCON', width: 110,
                                                listeners: {
                                                    click: 'onViewDetSummValByTktClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;color:#057ECB';
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySummVal').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPCON, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Not Accounted',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Coupons', dataIndex: 'QCPNCON', width: 110,
                                                listeners: {
                                                    click: 'onViewDetSummValByTktClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;color:#057ECB';
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetQtySummVal').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNCON, '0,000');
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
                // </editor-fold>
                
                // <editor-fold defaultstate="collapsed" desc="boxConsolid">
                {
                    region: 'center',
                    id: prototype.id + '-boxConsolid',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
//                        height: 645,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', height: 6 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id+'-chkSummary',
                            boxLabel: '<strong style="color:green;text-align:right !important;">By Date</strong>',
                            checked: false,
                            width: 80,
                            listeners:{
                                change: 'onSummary1Change'
                            }
                        },
                        { xtype: 'tbspacer', height: 6 },
                        // <editor-fold defaultstate="collapsed" desc="gridDataConsolid">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataConsolid',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGridConsolid,
                            height: 580,
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
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 80
                                            },
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Quantity Coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pending', width: 120, dataIndex: 'QCPAD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPINF, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock OAL', width: 120, dataIndex: 'QCPNOAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNOCR, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock AM', width: 120, dataIndex: 'QCPNON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVC, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Not Valued', width: 120, dataIndex: 'lngQDIFF',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totDiff, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Valued', width: 120, dataIndex: 'QCPNVAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVAL, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total', width: 120, dataIndex: 'QCPNTOT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accounted coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Total', width: 120, dataIndex: 'QCPCON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPCON, '0,000');
                                                }
                                            },
                                            {
                                                text: '%', width: 120, dataIndex: 'A1791ORAV',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000')+'%';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Math.ceil(data.totQCPNTOT>0?(data.totQCPCON*100/data.totQCPNTOT):0)+'%';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Local',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Currency', width: 120, dataIndex: 'VCPNLOC',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totVCPNLOC, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'USD', width: 120, dataIndex: 'VCPNUSD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolid').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totVCPNUSD, '0,000.00');
                                                }
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
                            hidden: false,
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
                                    width: prototype.widthGridConsolid,
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
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="gridDataConsolidByDay">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataConsolidByDay',
                            hidden: true,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGridConsolidByDay,
                            height: 580,
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
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 80,
                                                listeners: {
                                                    click: 'onByNFLIGHT_Click'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Quantity Coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pending', width: 120, dataIndex: 'QCPAD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPINF, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock OAL', width: 120, dataIndex: 'QCPNOAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNOCR, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock AM', width: 120, dataIndex: 'QCPNON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVC, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Not Valued', width: 120, dataIndex: 'lngQDIFF',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totDiff, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Valued', width: 120, dataIndex: 'QCPNVAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVAL, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total', width: 120, dataIndex: 'QCPNTOT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accounted coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Total', width: 120, dataIndex: 'QCPCON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPCON, '0,000');
                                                }
                                            },
                                            {
                                                text: '%', width: 120, dataIndex: 'A1791ORAV',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000')+'%';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Math.ceil(data.totQCPNTOT>0?(data.totQCPCON*100/data.totQCPNTOT):0)+'%';
                                                }
                                            },
                                            {
                                                text: 'Local',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Currency', width: 120, dataIndex: 'VCPNLOC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                            return  Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVCPNLOC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'USD', width: 120, dataIndex: 'VCPNUSD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByDay').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totVCPNUSD, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie5">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie5',
                            hidden: true,
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
                                    width: prototype.widthGridConsolidByDay,
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
                                            id: prototype.id + '-lbl-currentPage5',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount5',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total5',
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
                
                // <editor-fold defaultstate="collapsed" desc="boxConsolidByNFLIGHT">
                {
                    region: 'center',
                    id: prototype.id + '-boxConsolidByNFLIGHT',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridConsolidByNFLIGHT,
//                        height: 580,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', height: 6 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id+'-chkSummary2',
                            boxLabel: '<strong style="color:green;text-align:right !important;">By Date</strong>',
                            checked: true,
                            width: 80,
                            listeners:{
                                change: 'onSummary2Change'
                            }
                        },
                        { xtype: 'tbspacer', height: 6 },
                        // <editor-fold defaultstate="collapsed" desc="gridDataConsolidByNFLIGHT">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataConsolidByNFLIGHT',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGridConsolidByNFLIGHT,
                            height: 580,
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
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 80,
                                                listeners: {
                                                    click: 'onByTKT_Click'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#program-query-flight-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Quantity Coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pending', width: 100, dataIndex: 'QCPAD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPINF, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock OAL', width: 100, dataIndex: 'QCPNOAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNOCR, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Stock AM', width: 100, dataIndex: 'QCPNON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVC, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Not Valued', width: 100, dataIndex: 'lngQDIFF',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totDiff, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Valued', width: 100, dataIndex: 'QCPNVAL',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNVAL, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Total', width: 100, dataIndex: 'QCPNTOT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#d5f4d5;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accounted coupons',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Total', width: 100, dataIndex: 'QCPCON',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPCON, '0,000');
                                                }
                                            },
                                            {
                                                text: '%', width: 100, dataIndex: 'A1791ORAV',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000')+'%';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Math.ceil(data.totQCPNTOT>0?(data.totQCPCON*100/data.totQCPNTOT):0)+'%';
                                                }
                                            },
                                            {
                                                text: 'Local',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Currency', width: 100, dataIndex: 'VCPNLOC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                            return  Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVCPNLOC, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'USD', width: 120, dataIndex: 'VCPNUSD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right; margin-right:0px; background:#D6EBFF;';
                                                    return  Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totVCPNUSD, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie6">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie6',
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
                                    width: prototype.widthGridConsolidByNFLIGHT,
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
                                            id: prototype.id + '-lbl-currentPage6',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount6',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total6',
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
                
                // <editor-fold defaultstate="collapsed" desc="boxDetTicketContab">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetTicketContab',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetTicketContab,
//                        height: 580,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', height: 6 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbContab',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"],
                                    ["C", "Accounted"],
                                    ["NC", "No Accounted"]
                                ]
                            }),
                            queryMode: 'local',
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 150,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                },
                                focus: function(combo) {
                                    combo.expand();
                                },
                                blur: function(combo, event, eOpts) {
                                    if (combo.getValue() === null) {
                                        combo.setValue("");
                                    }
                                },
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[a-zA-Z]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                change: 'onContabChange'
                            }
                        },
                        { xtype: 'tbspacer', height: 6 },
                        // <editor-fold defaultstate="collapsed" desc="gridDetTktContab">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetTktContab',
                            hidden: false,
                            padding: '5px 0px 0px 0px',
                            width: prototype.widthGridDetTicketContab,
                            height: 580,
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
                                        text: '',
                                        id:prototype.id + "-lblTITULO",
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Ticket', dataIndex: 'strTicket', width: 140
                                            },
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Carrier', dataIndex: 'CARR', width: 95
                                                    },
                                                    {
                                                        text: 'Orig', dataIndex: 'CDEPART', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCDEPART + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Dest', dataIndex: 'CARRIVA', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCARRIVA + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:right;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCARRIVA + '"';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTktContab').getStore().getData().items[0].data;
                                                            return data.totTAX;
                                                        }
                                                    },
                                                    {
                                                        text: 'Fare Basis', dataIndex: 'FBASE', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'RBD', dataIndex: 'CLAS', width: 70
                                                    },
                                                    {
                                                        text: 'Cabin', dataIndex: 'CABI', width: 70
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Valoration',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Local', dataIndex: 'VCPMX', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTktContab').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVCPMX, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPUS', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTktContab').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVCPUS, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'strDescFVAL', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Accounting',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Id Cont.', dataIndex: 'IDCON', width: 220,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flag', dataIndex: 'STCON', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
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
                        // <editor-fold defaultstate="collapsed" desc="pie7">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie7',
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
                                    width: prototype.widthGridDetTicketContab,
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
                                            id: prototype.id + '-lbl-currentPage7',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount7',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total7',
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