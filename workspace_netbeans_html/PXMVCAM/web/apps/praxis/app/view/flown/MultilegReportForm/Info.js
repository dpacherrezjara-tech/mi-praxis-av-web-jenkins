Ext.define('Ext.Praxis.view.flown.MultilegReportForm.Info', {
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
                height: 647,
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
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
                                        text: 'Flight Date', dataIndex: 'strFormatDate', width: 140,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#flown-multileg-report-form" style="color:#057ECB">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Update', dataIndex: '', width: 55,id:prototype.id + '-col-update',
                                        listeners: {
                                            click: 'onUpdateCarrierA1897'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return '<img src="resources/img/botones/refresh.png">';
                                        }
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
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 110
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Segmento',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'O &amp; D', dataIndex: 'strDescripcion', width: 140
                                            },
                                            {
                                                text: 'PAX', dataIndex: 'PAX', width: 120,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totPAX, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MXN', dataIndex: 'AMTMXN', width: 140,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totAMTMXN, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMTUSD', width: 140,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totAMTUSD, '0,000.00');
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

                // <editor-fold defaultstate="collapsed" desc="boxDetail">
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
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDetail">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetail',
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
                                        text: 'Zulu Date', dataIndex: 'strFormatDate', width: 100
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
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 100
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Segmento',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'O &amp; D', dataIndex: 'strDescripcion', width: 140
                                            },
                                            {
                                                text: 'PAX', dataIndex: 'PAX', width: 120,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totPAX, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MXN', dataIndex: 'AMTMXN', width: 140,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totAMTMXN, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMTUSD', width: 140,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totAMTUSD, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Leg Analysis',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Legs', dataIndex: 'strDescripcion2', width: 90
                                            },
                                            {
                                                text: 'Nbr Legs', dataIndex: 'FLAGLEG', width: 70
                                            },
                                            {
                                                text: 'Carrier', dataIndex: 'CARRIER', width: 70
                                            },
                                            {
                                                text: 'PAX', dataIndex: 'PAXL', width: 70,
                                                listeners: {
                                                    click: 'onViewDetTicketClick'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB;text-decoration:none;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-multileg-report-form" style="color:#057ECB">' + value + '</a>';
                                                }//summary <adg:FooterAdvancedDataGridColumn id="lblTotPAX2"/>
                                            },
                                            {
                                                text: 'MXN', dataIndex: 'AMTMXNL', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }//summary <adg:FooterAdvancedDataGridColumn id="lblTotMXN2"/>
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMTUSDL', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }//summary <adg:FooterAdvancedDataGridColumn id="lblTotUSD2"/>
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

                // <editor-fold defaultstate="collapsed" desc="boxDetTicket">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetTicket',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetTicket,
                        height: 647,
                        align: 'center'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 6},
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblTitDetTkt',
                            text: '',
                            style: 'font-weight:bold;color:#323232;font-size: 13px;',
                            height: 20,
                            width: 500
                        },
                        {xtype: 'tbspacer', height: 6},
                        // <editor-fold defaultstate="collapsed" desc="gridDetTkt1">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetTkt1',
                            width: prototype.widthGridDetTicket,
                            height: 590,
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
                                        text: 'Ticket', dataIndex: 'strTicket', width: 125,
                                        listeners: {
                                            click: 'onViewDetTicketA1897Click'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;";
//                                            value = '<b>' + value + '</b>';
//                                            return '<a href="#flown-multileg-report-form" style="color:#057ECB">' + value + '</a>';

                                            var data = record.data;
                                            if (data.FLAGLEG === 'S') {
                                                metaData.style = "text-align:center;color:#057ECB;text-decoration:none;"
                                                value = '<b>' + value + '</b>';
                                                return '<a href="#flown-multileg-report-form" style="color:#057ECB" >' + value + '</a>';
                                            }else{
                                                return value;
                                            }

                                        }
                                    },
                                    {
                                        text: 'Accounting',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate2', width: 80, sortable: true
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Country', dataIndex: 'PSVVTA', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'RBD', dataIndex: 'CLAS', width: 50,
                                            },
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 45,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetTkt1').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totTAX, '0,000');
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
                                                text: 'Operation', dataIndex: 'TOPUS', width: 80
                                            },
                                            {
                                                text: 'Carrier', dataIndex: 'CARR', width: 80
                                            },
                                            {
                                                text: 'Value', dataIndex: 'VCPN', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Com.', dataIndex: 'COMISI', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'MDACP', width: 80
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
                                                        text: 'Valoration', dataIndex: 'strDescFVAL', width: 110
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'MXN', dataIndex: 'VCPMX', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Rate', dataIndex: 'TCMUS', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPUS', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
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
                                    width: prototype.widthGridDetTicket,
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

                // <editor-fold defaultstate="collapsed" desc="boxDetTicketA1897">
                {
                    region: 'center',
                    id: prototype.id + '-boxDetTicketA1897',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGridDetTicketA1897,
                        height: 647,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDetTktA1897">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetTktA1897',
                            width: prototype.widthGridDetTicketA1897,
                            height: 590,
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
                                        text: 'Ticket', dataIndex: 'strTicket', width: 130, sortable: false
                                    },
                                    {
                                        text: 'CP', dataIndex: 'CUPON', width: 60
                                    },
                                    {
                                        text: 'Leg', dataIndex: 'LEGSEQ', width: 60
                                    },
                                    {
                                        text: 'From', dataIndex: 'CDEPART', width: 75
                                    },
                                    {
                                        text: 'To', dataIndex: 'CARRIVA', width: 75
                                    },
                                    {
                                        text: 'Cr MKT', dataIndex: 'CARR', width: 90
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
                                                text: 'MKT', dataIndex: 'NFLIGHT', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90
                                    },
                                    {
                                        text: 'Cls', dataIndex: 'CLAS', width: 80
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
                                                text: 'Basis', dataIndex: 'FBASE', width: 100
                                            }
                                        ]
                                    },
                                    {
                                        text: 'RBD', dataIndex: 'RPK', width: 80
                                    },
                                    {
                                        text: 'Cur', dataIndex: 'MDACP', width: 80
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'VCPN', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Comm', dataIndex: 'COMISI', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Over',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Comm', dataIndex: 'ISC', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'YQ', dataIndex: 'A1692CREDTOTAL', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
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
                                    width: prototype.widthGridDetTicketA1897,
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