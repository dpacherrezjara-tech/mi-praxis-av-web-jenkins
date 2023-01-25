Ext.define('Ext.Praxis.view.interline.TAXRATD2Form.Info', {
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
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            border: true,
                            height: 530,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Nbr', dataIndex: 'RN', width: 60
                                    },
                                    {
                                        text: 'TAX', dataIndex: 'A1202CODTA', width: 90,
//                                        listeners: {
//                                            click: 'viewDetailByCountry'
//                                        },
//                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
//                                            return '<a href="#interline-tax-ratd-2-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
//                                        }
                                    },
                                    {
                                        text: 'Country', dataIndex: 'strDescPais', width: 210,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Name', dataIndex: 'A1202TNAME', flex: 1,//width: 250,
                                        listeners: {
                                            click: 'viewDetail'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-tax-ratd-2-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Interlineable', dataIndex: 'A1202INTER', width: 120,
                                        listeners: {
                                            click: 'viewDetailByCountry'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value == 'Y'){
                                                metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                                return '<a href="#interline-tax-ratd-2-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                            }else{
                                                return value;
                                            }
                                        }
                                    },
                                    {
                                        text: 'Aplicable',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Departure', dataIndex: 'A1202ODEPA', width: 80
                                            },
                                            {
                                                text: 'Arrival', dataIndex: 'A1202OARRI', width: 80
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Register',
                                        hidden: true,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'A1202FINGR', width: 80
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
                            width: prototype.widthGrid,
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
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailData',
//                    width: prototype.widthContenedor,
                    width: 852,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailData',
//                            width: prototype.widthGrid2,
                            width: 852,
                            title: '',
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
                                        text: 'Airport', dataIndex: 'strDescripcion', width: 140,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Effect. Date', dataIndex: 'strFormatDate', width: 90
                                    },
                                    {
                                        text: 'Expiry Date', dataIndex: 'strFormatDate1', width: 90
                                    },
                                    {
                                        text: 'Description', dataIndex: 'TEXT2', flex: 1, hidden: true,//width: 450, 
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Local',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Rate', dataIndex: 'A1224LRT', width: 50,
                                                renderer: function(value) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'A1224EAM', width: 50,
                                                renderer: function(value) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'A1224ECU', width: 50
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Sale Date', dataIndex: 'strFormatDate3', width: 90
                                    },
                                    {
                                        text: 'Travel Date', dataIndex: 'strFormatDate4', width: 90
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A1224TYPE', width: 40
                                    },
                                    {
                                        text: 'Code', dataIndex: 'A1224CODE', width: 55
                                    },
                                    {
                                        text: 'Aplication', dataIndex: 'A1224APPL', width: 50
                                    },
                                    {
                                        text: 'Codified', dataIndex: 'A1224CODI', width: 55
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie2">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie2',
//                            width: prototype.widthGrid2,
                            width: 852,
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
                                    width: prototype.widthGrid2,
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
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailA1141',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDetailA1141Data">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailA1141Data',
//                            width: prototype.widthGrid3,
                            width: 534,
                            title: '',
                            height: 550,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Code', dataIndex: 'CDEPART', width: 90
                                    },
                                    {
                                        text: 'Airport', dataIndex: 'strDescCDEPART', width: 150,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Nacional(XV)',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'ISC', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailA1141Data').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totISC, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'MDACP', width: 70
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Internacional(XD)',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'GROSS', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailA1141Data').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totGROSS, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'BATCHP', width: 70
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