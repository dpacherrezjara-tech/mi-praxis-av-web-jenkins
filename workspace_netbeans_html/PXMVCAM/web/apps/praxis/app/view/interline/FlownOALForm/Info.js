Ext.define('Ext.Praxis.view.interline.FlownOALForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id+'-boxConsultas',
            width: '100%',
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
                    xtype: 'panel',
                    id: prototype.id+'-vskMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxMainData',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 460
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridData',
                                    bodyStyle: 'background: transparent;',
                                    width: 900,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Flight Date', /*width: 160,*/flex: 1, dataIndex: 'strFormatDate',
                                                listeners: {
                                                    click: 'SearchByCIA_clickHandler'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                                    return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">'+value+'</a>';
                                                }
                                            },
                                            {text: 'Carrier', width: 80, dataIndex: 'strDescripcion', renderer: 'getLeft'},
                                            {text: 'Currency', width: 70, dataIndex: 'MDACP'},
                                            {text: 'Coupons',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'In Process', width: 95, dataIndex: 'CPN_Proc',
                                                        listeners: {
                                                            click: 'SearchByFINVO_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;';
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">'+value+'</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Proc, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Audited',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Coupons', width: 95, dataIndex: 'CPN_Aud',
                                                        listeners: {
                                                            click: 'SearchByFINVO_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;';
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">'+value+'</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Aud, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 95, dataIndex: 'VCPN_Aud', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Aud, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Account',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cpn', width: 95, dataIndex: 'VCPN_Billed', renderer: 'getInt',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.RN, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 95, dataIndex: 'CPN_Bill',
                                                        listeners: {
                                                            click: 'SearchByFINVO_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;';
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">'+value+'</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Bill, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 95, dataIndex: 'VCPN_Bill', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Bill, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 95, dataIndex: 'CPN_TOT', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background-color:E1FFE1;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totNETO, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="gridData2">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridData2',
                                    bodyStyle: 'background: transparent;',
                                    width: 850,
                                    hidden: true,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Flight Date', /*width: 160,*/flex: 1, dataIndex: 'strFormatDate',
                                                listeners: {
                                                    click: 'SearchByCIAoMonth_clickHandler'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                                    return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">'+value+'</a>';
                                                }
                                            },
                                            {text: 'Currency', width: 77, dataIndex: 'MDACP'},
                                            {text: 'Process',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 109, dataIndex: 'CPN_Proc', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Proc, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Audited',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 109, dataIndex: 'CPN_Aud', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Aud, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 109, dataIndex: 'VCPN_Aud', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Aud, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 109, dataIndex: 'CPN_Bill', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Bill, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 109, dataIndex: 'VCPN_Bill', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridData2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Bill, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 109, dataIndex: 'CPN_TOT', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background-color:E1FFE1;";
                                                            var data = Ext.getCmp(prototype.id+'-gridData2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totNETO, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxByCIAMonthData',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridDataByCIAMonth">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridDataByCIAMonth',
                                    bodyStyle: 'background: transparent;',
                                    width: 1100,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Flight Date', /*width: 160,*/flex: 1, dataIndex: 'strFormatDate'},
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cod', width: 55, dataIndex: 'CCIA',
                                                        listeners: {
                                                            click: 'SearchByCIA_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                                            return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">'+value+'</a>';
                                                        }
                                                    },
                                                    {text: 'Description', width: 200, dataIndex: 'strDescripcion', renderer: 'getLeft'}
                                                ]
                                            },
                                            {text: 'Currency', width: 72, dataIndex: 'MDACP'},
                                            {text: 'Process',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 100, dataIndex: 'CPN_Proc', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIAMonth').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Proc, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Audited',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 100, dataIndex: 'CPN_Aud', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIAMonth').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Aud, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 100, dataIndex: 'VCPN_Aud', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIAMonth').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Aud, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Account',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cpn', width: 100, dataIndex: 'VCPN_Billed', renderer: 'getInt'}
                                                ]
                                            },
                                            {text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 100, dataIndex: 'CPN_Bill', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIAMonth').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Bill, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 100, dataIndex: 'VCPN_Bill', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIAMonth').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Bill, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 100, dataIndex: 'CPN_TOT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#E1FFE1;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIAMonth').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totNETO, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxByCIAData_1',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridDataByCIA_1">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridDataByCIA_1',
                                    bodyStyle: 'background: transparent;',
                                    width: 1100,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Flight Date', /*width: 160,*/flex: 1, dataIndex: 'strFormatDate'},
                                            {text: 'Airline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cod', width: 55, dataIndex: 'CCIA',
                                                        listeners: {
                                                            click: 'SearchByCUPON_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                                            return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">'+value+'</a>';
                                                        }
                                                    },
                                                    {text: 'Description', width: 212, dataIndex: 'strDescripcion', renderer: 'getLeft'}
                                                ]
                                            },
                                            {text: 'Currency', width: 84, dataIndex: 'MDACP'},
                                            {text: 'Process',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 112, dataIndex: 'CPN_Proc', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIA_1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Proc, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Audited',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 112, dataIndex: 'CPN_Aud', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIA_1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Aud, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 112, dataIndex: 'VCPN_Aud', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIA_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Aud, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Billed',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 112, dataIndex: 'CPN_Bill', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIA_1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totCPN_Bill, '0,000');
                                                        }
                                                    },
                                                    {text: 'Value', width: 112, dataIndex: 'VCPN_Bill', renderer: 'getDouble',
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIA_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return Ext.util.Format.number(data.totVCPN_Bill, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cupons', width: 112, dataIndex: 'CPN_TOT',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#E1FFE1;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCIA_1').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totNETO, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxByCUPONData',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridDataByCUPON">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridDataByCUPON',
                                    bodyStyle: 'background: transparent;',
                                    width: 1280,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Ticket', flex: 1,/*width: 115,*/ dataIndex: 'strTicket',
                                                listeners: {
                                                    click: 'buscarFacsimilA1692'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">'+value+'</a>';
                                                }
                                            },
                                            {text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 95, dataIndex: 'strFormatFVTA'},
                                                    {text: 'Country', width: 85, dataIndex: 'PSVVTA'},
                                                    {text: 'Agent', width: 85, dataIndex: 'AGTIA'},
                                                    {text: 'Pax', width: 50, dataIndex: 'QTYPAX', renderer: 'getInt',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCUPON').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totTAX, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 95, dataIndex: 'strFormatDate'},
                                                    {text: 'Zone', width: 70, dataIndex: 'ZONA'},
                                                    {text: 'Orig', width: 65, dataIndex: 'CDEPART'},
                                                    {text: 'Dest', width: 65, dataIndex: 'CARRIVA'},
                                                    {text: 'Carrier', width: 65, dataIndex: 'CARR'},
                                                    {text: 'Cabin', width: 65, dataIndex: 'CABI'}
                                                ]
                                            },
                                            {text: 'Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Use Type', width: 75, dataIndex: 'TOPUS'},
                                                    {text: 'Curr.', width: 75, dataIndex: 'MDACP'},
                                                    {text: 'Value', width: 85, dataIndex: 'VCPN', renderer: 'getDouble',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridDataByCUPON').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.difVakues, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Com', width: 75, dataIndex: 'COMISI', renderer: 'getDouble'}
                                                ]
                                            },
                                            {text: 'Status', width: 65, dataIndex: 'FINVO', sortable: true}
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxTKT',
                            bodyStyle: 'background: transparent;',
                            hidden: true,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="gridTicket">
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridTicket',
                                    bodyStyle: 'background: transparent;',
                                    width: 1280,
                                    columnLines: true,
                                    enableColumnMove: false,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Ticket', flex: 1,/*width: 115,*/ dataIndex: 'strTicket',
                                                listeners: {
                                                    click: 'buscarFacsimilA1692'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                                    return '<a href="#interline-flown-oal-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">'+value+'</a>';
                                                }
                                            },
                                            {text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 95, dataIndex: 'strFormatFVTA'},
                                                    {text: 'Country', width: 85, dataIndex: 'PSVVTA'},
                                                    {text: 'Agent', width: 85, dataIndex: 'AGTIA'}
                                                ]
                                            },
                                            {text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 95, dataIndex: 'strFormatDate'},
                                                    {text: 'Zone', width: 75, dataIndex: 'ZONA'},
                                                    {text: 'Orig', width: 75, dataIndex: 'CDEPART'},
                                                    {text: 'Dest', width: 75, dataIndex: 'CARRIVA'},
                                                    {text: 'Carrier', width: 75, dataIndex: 'CARR'},
                                                    {text: 'Cabin', width: 75, dataIndex: 'CABI'}
                                                ]
                                            },
                                            {text: 'Values',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Use Type', width: 75, dataIndex: 'TOPUS'},
                                                    {text: 'Curr.', width: 75, dataIndex: 'MDACP'},
                                                    {text: 'Value', width: 85, dataIndex: 'VCPN', renderer: 'getDouble',
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id+'-gridTicket').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.difVakues, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Com', width: 75, dataIndex: 'COMISI', renderer: 'getDouble'}
                                                ]
                                            },
                                            {text: 'Status', width: 65, dataIndex: 'FINVO', sortable: true}
                                        ]
                                    }
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                {
                    xtype: 'panel',
                    id: prototype.id+'-boxPagDetail',
                    hidden: true,
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
                                    id: prototype.id+'-lblPagActual',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id+'-lblPagTotal',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id+'-lblRowsTotal',
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

