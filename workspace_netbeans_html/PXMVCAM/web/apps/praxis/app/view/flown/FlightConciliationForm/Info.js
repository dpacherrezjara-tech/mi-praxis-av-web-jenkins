Ext.define('Ext.Praxis.view.flown.FlightConciliationForm.Info', {
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
                                align: 'center'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    padding: '5px 0px 0px 0px',
                                    width: 1180,
                                    height: 428,
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
                                                text: 'Flight Date', dataIndex: 'strFormatDate', flex: 1, //width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Flight Reception',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'SSIM',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Scheduled', dataIndex: 'lngQSSIM', width: 80,
                                                                listeners: {
                                                                    click: 'onViewDetailClick'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                                    var total = 0;
                                                                    for (var i = 0; i < items.length; i++)
                                                                        total += Number(items[i].data.lngQSSIM);
                                                                    return Ext.util.Format.number(total, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'ODS',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Operated', dataIndex: 'lngQODS', width: 80,
                                                                listeners: {
                                                                    click: 'onViewDetailClick'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                                    var total = 0;
                                                                    for (var i = 0; i < items.length; i++)
                                                                        total += Number(items[i].data.lngQODS);
                                                                    return Ext.util.Format.number(total, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Cancelled', dataIndex: 'lngQtyCANCEL', width: 80,
                                                                listeners: {
                                                                    click: 'onViewDetailClick'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                                    var total = 0;
                                                                    for (var i = 0; i < items.length; i++)
                                                                        total += Number(items[i].data.lngQtyCANCEL);
                                                                    return Ext.util.Format.number(total, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'VCR',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Detailed', dataIndex: 'lngQVCR', width: 80,
                                                                listeners: {
                                                                    click: 'onViewDetailClick'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                                    var total = 0;
                                                                    for (var i = 0; i < items.length; i++)
                                                                        total += Number(items[i].data.lngQVCR);
                                                                    return Ext.util.Format.number(total, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Flights',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pending', dataIndex: 'lngQPRO', width: 80,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQPRO);
                                                            return Ext.util.Format.number(total, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Processed', dataIndex: 'lngQCLO', width: 80,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background:#CDEACD;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQCLO);
                                                            return Ext.util.Format.number(total, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Closed', dataIndex: 'lngQACC', width: 80,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background:#CDEACD;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQACC);
                                                            return Ext.util.Format.number(total, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Scheduled vs Operated',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Processed', dataIndex: 'lngQSVOPRO', width: 80,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQSVOPRO);
                                                            return Ext.util.Format.number(total, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Pending', dataIndex: 'lngQSVOPEND', width: 80,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQSVOPEND);
                                                            return Ext.util.Format.number(total, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Scheduled vs Flight Details',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Processed', dataIndex: 'lngQSVVPRO', width: 90,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQSVVPRO);
                                                            return Ext.util.Format.number(total, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Pending', dataIndex: 'lngQSVVPEND', width: 80,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQSVVPEND);
                                                            return Ext.util.Format.number(total, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Unscheduled', dataIndex: 'lngQFFLOW', width: 100, sortable: true,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                    var total = 0;
                                                    for (var i = 0; i < items.length; i++)
                                                        total += Number(items[i].data.lngQFFLOW);
                                                    return Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Flight Manifest',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Envelope', dataIndex: 'lngQPHY', width: 100,
                                                        listeners: {
                                                            click: 'onViewDetailClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var items = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items;
                                                            var total = 0;
                                                            for (var i = 0; i < items.length; i++)
                                                                total += Number(items[i].data.lngQPHY);
                                                            return Ext.util.Format.number(total, '0,000');
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
                            id: prototype.id + '-boxDetailData',
                            hidden: true,
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
                                // <editor-fold defaultstate="collapsed" desc="gridDetail">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetail',
                                    width: 1650,
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
                                                text: 'SSIM Data', //flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Flight', // flex: 1,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate', width: 100 //flex: 1
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'NFLIGHT', width: 60,
                                                                listeners: {
                                                                    click: 'onViewDetailNFLIGHTClick'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#057ECB";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Carrier', dataIndex: 'CARRI', width: 50
                                                    },
                                                    {
                                                        text: 'Flown Type', dataIndex: 'strDescFFLOW', width: 90
                                                    },
                                                    {
                                                        text: 'Orig', dataIndex: 'CDEPART', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescCDEPART + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Dest', dataIndex: 'CARRIVA', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
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
                                                                text: 'Date', dataIndex: 'strFormatFSENDSS', width: 100
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Information PAX ODS',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Senior', dataIndex: 'QCPAD', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#FFF9E0;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPAD, '0,000');
                                                        }
                                                    },
                                                    {text: 'Children', dataIndex: 'QCPCHD', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#FFF9E0;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPCHD, '0,000');
                                                        }
                                                    },
                                                    {text: 'Infant', dataIndex: 'QCPINF', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#FFF9E0;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPINF, '0,000');
                                                        }
                                                    },
                                                    {text: 'Transit', dataIndex: 'QCPTRA', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#FFF9E0;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPTRA, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'ODS Data',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Received',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatFSENDOD', width: 100
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Qty', dataIndex: 'QCPNOD', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#d5f4d5;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNOD, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            /*{
                                             text: 'Leg', dataIndex: 'QCPNLEG', width: 50, sortable: true,
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:right;background:#d5f4d5;";
                                             return value;
                                             },
                                             summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                             metaData.style = "text-align:right;";
                                             var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                             return Ext.util.Format.number(data.totQCPNLEG, '0,000');
                                             }
                                             },*/
                                            {
                                                text: 'Dif', dataIndex: 'DIFFODSVCR', width: 50, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totDIFFODSVCR, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VCR Data',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Received',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatFSENDVC', width: 90, sortable: true
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Qty', dataIndex: 'QCPNVC', width: 45, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNVC, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'OCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Qty', dataIndex: 'QCPNOCR', width: 45, sortable: true,
                                                        listeners: {
                                                            click: 'onViewDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNOCR, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Manual',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Qty', dataIndex: 'QCPNMA', width: 55, sortable: true,
                                                        listeners: {
                                                            click: 'onViewDetTicketClick'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNMA, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total', dataIndex: 'QCPNTOT', width: 60, sortable: true,
                                                listeners: {
                                                    click: 'onViewDetTicketClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;color:#057ECB;background:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNTOT, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Coupons',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Valued', dataIndex: 'QCPNVAL', width: 60, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNVAL, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Physical Manifest',
                                                id: prototype.id + '-adgcPhysical',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Received',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate3', width: 90,
                                                                listeners: {
                                                                    click: 'onViewFileClick',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdAttr = 'data-qtip="Open Flight Manifest"';
                                                                    metaData.style = "text-align:right;color:#057ECB;background:#d5f4d5;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Qty', dataIndex: 'QCPNFI', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Flight Manifest',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Received',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate3', width: 100, sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background:#ccfaff;";
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Qty', dataIndex: 'QCPNFI', width: 50, sortable: true,
                                                        listeners: {
                                                            click: 'onViewDetailFlightManifest'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background:#ccfaff;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNFI, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Qty NR', dataIndex: 'QCPNFRE', width: 60, sortable: true,
//                                                        listeners: {
//                                                            click: 'onViewDetailFlightManifest'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:#ccfaff;";
//                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNFRE, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Coupons',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Diff', dataIndex: 'lngQDIFF', width: 50, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totDiff, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Obs.', dataIndex: '', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:#d5f4d5;";
                                                            if (record.data.DESCRIP !== '') {
                                                                metaData.tdAttr = 'data-qtip="' + record.data.DESCRIP.substring(0,50).trim() + '<br>' + record.data.DESCRIP.substring(50,100).trim() + '"';
                                                                return 'Y';
                                                            } else {
                                                                return 'N';
                                                            }

                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Edit',
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 45,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit Flight Manifest',
                                                        handler: 'viewDataEntry_clickHandler'
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
                            id: prototype.id + '-boxDetailNFLGITHData',
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: true,
                                height: '100%',
                                align: 'center'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridDetailNFLIGHT">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailNFLIGHT',
                                    width: 962,
                                    hidden: false,
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
                                                text: 'SSIM Data',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Zulu',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate2', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
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
                                                                text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'NFLIGHT', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Carrier', dataIndex: 'CARRI', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flown Type', dataIndex: 'strDescFFLOW', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Leg', dataIndex: 'FOPERZUL', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Orig', dataIndex: 'CDEPART', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescCDEPART + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Dest', dataIndex: 'CARRIVA', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
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
                                                                text: 'Date', dataIndex: 'strFormatFSENDSS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR Data',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Received',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatFSENDVC', width: 90, sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Qty', dataIndex: 'QCPNVC', width: 55, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailNFLIGHT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNVC, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'OCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QCPNOCR', width: 45, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailNFLIGHT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNOCR, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Manual',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'QCPNMA', width: 60, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailNFLIGHT').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQCPNMA, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total', dataIndex: 'QCPNTOT', /*width: 62*/flex: 1, sortable: true,
                                                listeners: {
                                                    click: 'onViewDetTicketClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-flight-conciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailNFLIGHT').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totQCPNTOT, '0,000');
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
                            id: prototype.id + '-boxDetailFlightManifest',
                            hidden: true,
                            defaults: {
//                                bodyStyle: 'background: transparent;',
                                border: true,
                                height: '100%',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-titulo',
                                    hidden: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: E3EAEF;',
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 1369,
                                            id: prototype.id + '-setTitulo',
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
                                                    html: '<b> Quantity:</b>',
                                                    width: 60
                                                },
                                                {
                                                    id: prototype.id + '-txtQty',
                                                    text: '0',
                                                    width: 40
                                                },
                                                {
                                                    html: '<b>Flight Date:</b>',
                                                    width: 75
                                                },
                                                {
                                                    id: prototype.id + '-FlightDate',
//                                                    text: '1',
                                                    width: 80
                                                },
                                                {
                                                    html: '<b>Flight Number:</b>',
                                                    width: 95
                                                },
                                                {
                                                    id: prototype.id + '-FlightNumber',
                                                    text: '0',
                                                    width: 45
                                                },
                                                {
                                                    html: '<b>Download File:</b>',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-imgInfo1',
                                                    region: 'south',
                                                    width: 20,
                                                    height: 20,
                                                    hidden: false,
                                                    icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                    tooltip: 'File Flight Manifest',
                                                    listeners: {
                                                        click: 'openExport'
                                                    },
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:left;";
                                                        value = '<b>' + value + '</b>';
                                                        return '<a href="#flown-flight-conciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="gridDetailFlightManifest">
                                {xtype: 'panel',
                                    hidden: false,
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDetailFlightManifest',
                                            width: 1439,
                                            height: 550,
                                            features: [{
                                                    ftype: 'summary'
                                                }],
                                            columnLines: true,
                                            scrollable: {
                                                direction: 'vertical',
                                            },
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Nbr', width: 40, dataIndex: 'RN', sortable: true, },
                                                    {text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', width: 100, dataIndex: 'DFLIGHT'},
                                                            {text: 'Number', width: 80, dataIndex: 'NFLIGHT'}
                                                        ]
                                                    },
                                                    {
                                                        text: 'Last Name', dataIndex: 'LNAME', width: 120, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'First Name', dataIndex: 'FNAME', width: 120, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Type <br> Pax', dataIndex: 'desPAX', width: 70, sortable: true,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background:#FFF9E0;";
//                                                            return value;
//                                                        }
                                                    },
                                                    {
                                                        text: 'Seat', dataIndex: 'CHAIR', width: 70, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:#FFF9E0;";
                                                            return value;
                                                        },
//                                                        sorter: function (v1, v2) {
//                                                            console.log('sorter');
//                                                            v1 = v1.get('CHAIR');
//                                                            v2 = v2.get('CHAIR');
//                                                            return v1 > v2 ? 1 : ( v1 < v2 ? -1 : 0 );
//                                                        }
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 70, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Ticket', dataIndex: 'strTicket', width: 130, sortable: true,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-flight-conciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Status', dataIndex: 'desSTVAL', width: 110, sortable: true},
                                                    {text: 'Orig', dataIndex: 'CDEPART', width: 70, sortable: true},
                                                    {text: 'Dest', dataIndex: 'CARRIVA', width: 70, sortable: true},
                                                    {text: 'VCR vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Manifest', dataIndex: 'desSTVCR', width: 70, sortable: true},
                                                        ]
                                                    },
                                                    {
                                                        text: 'Process Sabre',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Scan', dataIndex: 'descFSABRE', width: 80, sortable: true},
                                                            {text: 'Status', dataIndex: 'STASABR', width: 80, sortable: true},
                                                        ]
                                                    },
                                                    {text: 'Flag<br>Sales-PRAXIS', dataIndex: 'descFSALES', width: 100, sortable: true},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 45,
                                                        text: 'Edit',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'viewDataEntry_A3729'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                    ]
                                }
                                // </editor-fold>

                            ]
                        },
//                        {
//                            region: 'center',
//                            id: prototype.id + '-boxDetailLeg',
//                            hidden: true,
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
//                            defaults: {
//                                bodyStyle: 'background: transparent;',
//                                border: true,
//                                height: '100%',
//                                align: 'center'
//                            },
//                            items: [
//                                // <editor-fold defaultstate="collapsed" desc="gridDetailLeg">
//                                {
//                                    xtype: 'grid',
//                                    id: prototype.id + '-gridDetailLeg',
//                                    width: 730,
//                                    columnLines: true,
//                                    columns: {
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: false,
//                                            align: 'center'
//                                        },
//                                        items: [
//                                            {
//                                                text: 'Flight',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90, sortable: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;";//color add viene de la bd
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Number', dataIndex: 'NFLIGHT', width: 70, sortable: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;";//color add viene de la bd
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Carrier', dataIndex: 'CARRI', width: 60, sortable: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";//color add viene de la bd
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Flown Type', dataIndex: 'strDescFFLOW', width: 90, sortable: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";//color add viene de la bd
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Orig', dataIndex: 'CDEPART', width: 60, sortable: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";//color add viene de la bd
//                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescCDEPART + '"';
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Dest', dataIndex: 'CARRIVA', width: 60, sortable: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";//color add viene de la bd
//                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescCARRIVA + '"';
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Transit', dataIndex: 'QCPTRA', width: 60, sortable: false,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:right;";//color add viene de la bd
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'ODS Data',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QCPNOD', width: 80, sortable: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;";//color add viene de la bd
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'VCR Data',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QCPNVC', width: 80, sortable: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;color:#057ECB";
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'OCR Data',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Qty', dataIndex: 'QCPNOCR', width: 80, sortable: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;";//color add viene de la bd
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            }
//                                        ]
//                                    }
//                                }
//                                // </editor-fold>
//                            ]
//                        },
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
                                border: true,
                                height: '100%',
                                align: 'center'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridDetTkt1">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTkt1',
                                    width: 1610,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
//                                                text: 'Ticket', dataIndex: 'strTicket', /*width: 125*/flex: 1, sortable: false, id: prototype.id + 'AD_TKT',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;color:#057ECB";
//                                                    metaData.tdAttr = 'data-qtip="' + record.data.strTicket + ' - Enter to view Image' + '"';
//                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                    metaData.unselectableAttr = "unselectable='off'";
//                                                    return value;
//                                                }

                                                text: 'Ticket', dataIndex: 'strTicket', width: 110,
                                                listeners: {
                                                    click: 'showTicket'

                                                },
                                                /*editor: {
                                                 xtype: 'textfield',
                                                 editable: false,
                                                 enableKeyEvents: true,
                                                 listeners: {
                                                 //                                                            keypress: 'eventKey2',
                                                 //                                                            specialkey: 'eventKey2'
                                                 //                                                            keypress: function(cmp, a) {
                                                 //                                                                alert('xx');
                                                 //                                                            },
                                                 specialkey: function(e, eOpts ) {
                                                 if (eOpts.getKey() === 13) {
                                                 
                                                 var grid = e.up('grid'),
                                                 plugin = grid.findPlugin('cellediting');
                                                 
                                                 me.showTicket(plugin.context.record.data,plugin.context.rowIdx);
                                                 }
                                                 }
                                                 click: function() {
                                                 me.showTicket(plugin.context.record.data,plugin.context.rowIdx);
                                                 }
                                                 }
                                                 }, */
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:#057ECB;background-color:#FFFFFF;cursor: pointer;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strTicket + ' - Enter to view Image' + '"';
                                                    return '<b>' + value + '<b>';
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
                                                        text: 'Date', dataIndex: 'strFormatDate2', width: 100, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + record.data.CDEPART + '-' + record.data.CARRIVA + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Seq', dataIndex: 'SEQ', width: 40, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Rolling', dataIndex: 'SEQRO', width: 44, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
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
                                                        text: 'Date', dataIndex: 'strFormatFVTA', width: 120, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Country', dataIndex: 'PSVVTA', width: 85, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Basis', dataIndex: 'FBASE', width: 120, sortable: true,
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
                                                        text: 'RBD', dataIndex: 'CLAS', width: 75, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 70, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
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
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Operation', dataIndex: 'TOPUS', width: 90, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="D=Domestic/I=International"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Carrier', dataIndex: 'CARR', width: 80, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'VCPN', width: 80, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Com.', dataIndex: 'COMISI', width: 80, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'MDACP', width: 80, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Valoration', dataIndex: 'strDescFVAL', width: 130, sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                                    metaData.style = "text-align:center;color:" + color;
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'MXN', dataIndex: 'VCPMX', width: 100, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Rate', dataIndex: 'TCMUS', width: 100, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPUS', width: 100, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
                                                            metaData.style = "text-align:right;color:" + color;
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Edit', width: 45,
                                                listeners: {
                                                    click: 'viewDataEntryTkt_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="Edit Ticket"';
                                                    return '<img src="resources/img/botones/16x16/1326498593_018.png">';
                                                }
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridDetTkt2">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTkt2',
                                    width: 1455,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
//                                                text: 'Ticket', dataIndex: 'strTicket', /*width: 125*/flex: 1, sortable: false,
//                                                id: prototype.id + 'AD_TKT2',
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    var color = data.strSQL === 'verde' ? "#2BC224" : "#244066";
//                                                    metaData.style = "text-align:center;background:#CCFFFF;cursor:text;color:" + color;
//                                                    metaData.tdAttr = 'data-qtip="' + data.strTicket + '"';
//                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                    metaData.unselectableAttr = "unselectable='off'";
//                                                    return value;
//                                                }
                                                text: 'Ticket', dataIndex: 'strTicket', width: 110,
                                                listeners: {
                                                    click: 'showTicket'
                                                },
                                                /*editor: {
                                                 xtype: 'textfield',
                                                 editable: true,
                                                 enableKeyEvents: true,
                                                 listeners: {
                                                 //                                                            keypress: 'eventKey2',
                                                 //                                                            specialkey: 'eventKey2'
                                                 //                                                            keypress: function(cmp, a) {
                                                 //                                                                alert('xx');
                                                 //                                                            },
                                                 specialkey: function(e, eOpts ) {
                                                 if (eOpts.getKey() === 13) {
                                                 
                                                 var grid = e.up('grid'),
                                                 plugin = grid.findPlugin('cellediting');
                                                 
                                                 me.showTicket(plugin.context.record.data,plugin.context.rowIdx);
                                                 }
                                                 }
                                                 },*/
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "color:#057ECB;background-color:#FFFFFF;cursor: pointer;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strTicket + ' - Enter to view Image' + '"';
                                                    return '<b>' + value + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Accounting',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate2', width: 80, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            metaData.tdAttr = 'data-qtip="' + record.data.CDEPART + '-' + record.data.CARRIVA + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Seq', dataIndex: 'SEQ', width: 35, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Rolling', dataIndex: 'SEQRO', width: 35, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
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
                                                        text: 'Date', dataIndex: 'strFormatFVTA', width: 80, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Country', dataIndex: 'PSVVTA', width: 40, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescPSVVTA + '"';
                                                            return value;
                                                        }
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
                                                                text: 'Basis', dataIndex: 'FBASE', width: 115, sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";//color add viene de la bd
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'RBD', dataIndex: 'CLAS', width: 40, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 45, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";//color add viene de la bd
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTkt2').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totTAX, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Coupon',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Oper.', dataIndex: 'TOPUS', width: 50, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            metaData.tdAttr = 'data-qtip="D=Domestic/I=International"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Carrier', dataIndex: 'CARR', width: 55, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            return value;
                                                        }
                                                    },
                                                    /*{
                                                     text: '0%',
                                                     defaults: {
                                                     menuDisabled: true,
                                                     sortable: false,
                                                     align: 'center'
                                                     },
                                                     columns: [
                                                     {
                                                     text: 'Value', dataIndex: 'VCPN0', width: 60, sortable: true,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;";//color add viene de la bd
                                                     value = Ext.util.Format.number(value, '0,000.00');
                                                     return value;
                                                     }
                                                     },
                                                     {
                                                     text: 'YQ', dataIndex: 'VYQ0', width: 60, sortable: true,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;";
                                                     value = Ext.util.Format.number(value, '0,000.00');
                                                     return value;
                                                     }
                                                     }
                                                     ]
                                                     },
                                                     {
                                                     text: '16%',
                                                     defaults: {
                                                     menuDisabled: true,
                                                     sortable: false,
                                                     align: 'center'
                                                     },
                                                     columns: [
                                                     {
                                                     text: 'Value', dataIndex: 'VCPN16', width: 50, sortable: true,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;";//color add viene de la bd
                                                     value = Ext.util.Format.number(value, '0,000.00');
                                                     return value;
                                                     }
                                                     },
                                                     {
                                                     text: 'YQ', dataIndex: 'VYQ16', width: 40, sortable: true,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;";
                                                     value = Ext.util.Format.number(value, '0,000.00');
                                                     return value;
                                                     }
                                                     }
                                                     ]
                                                     },*/
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Value', dataIndex: 'VCPN', width: 60, sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";//color add viene de la bd
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'YQ', dataIndex: 'VYQ', width: 40, sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Com.', dataIndex: 'COMISI', width: 55, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";//color add viene de la bd
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'MDACP', width: 40, sortable: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Valoration', dataIndex: 'strDescFVAL', width: 110, sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";//color add viene de la bd
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Accounting Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFCON', width: 80, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";//color add viene de la bd
                                                            metaData.tdAttr = 'data-qtip="' + record.data.CDEPART + '-' + record.data.CARRIVA + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Id', dataIndex: 'IDCON', width: 235, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'strDescSTCON', width: 90, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strDescSTCON + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Service Type', dataIndex: 'strFFLOW', width: 85, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + record.data.strFFLOW + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Edit', width: 39,
                                                listeners: {
                                                    click: 'viewDataEntryTkt_clickHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="Edit Ticket"';
                                                    return '<img src="resources/img/botones/16x16/1326498593_018.png">';
                                                }
                                            }
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-BoxSecundario',
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
                        // <editor-fold defaultstate="collapsed" desc="gridTkt">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridTkt',
                            padding: '5px 0px 0px 0px',
                            width: 1652,
                            height: 460,
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
                                    {text: 'Ticket', dataIndex: 'strTicket', width: 110,
                                        listeners: {
                                            click: 'viewDataEntryTkt_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                            return '<a href="#flown-flight-conciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'Seq', dataIndex: 'SEQ', width: 40},
                                    {
                                        text: 'Rolling', dataIndex: 'SEQRO', width: 44, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Source', dataIndex: 'FLOAD', width: 55, sortable: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
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
                                                text: 'Date', dataIndex: 'strFormatFVTA', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Country', dataIndex: 'PSVVTA', width: 53,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
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
                                                    {text: 'Basis', dataIndex: 'FBASE', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'RBD', dataIndex: 'CLAS', width: 45,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flights',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Orig', dataIndex: 'CDEPART', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescCDEPART + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Dest', dataIndex: 'CARRIVA', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescCARRIVA + '"';
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
                                                text: 'Use',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'TOPUS', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="D=Domestic/I=International"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Carrier', dataIndex: 'CARR', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Cabin', dataIndex: 'CABI', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Date Value', dataIndex: 'strFormatFECVAL', width: 80, sortable: false,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Value', dataIndex: 'VCPN', width: 57,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'MDACP', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
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
                                                    {text: 'Valoration', dataIndex: 'strDescFVAL', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Accounting Information',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate2', width: 80, sortable: false,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Id', dataIndex: 'IDCON', width: 100, sortable: false,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status', dataIndex: 'strDescSTCON', width: 90, sortable: false,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + record.data.strDescSTCON + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Service Type', dataIndex: 'strFFLOW', width: 85, sortable: false,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + record.data.strFFLOW + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Edit', width: 40,
                                        listeners: {
                                            click: 'viewDataEntryTkt_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return '<img src="resources/img/botones/16x16/1326498593_018.png">';
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlightManifest',
                    hidden: true,
                    defaults: {
//                                bodyStyle: 'background: transparent;',
                        border: true,
                        height: '100%',
                        align: 'center'
                    },
                    items: [
                        /*{
                         xtype: 'panel',
                         id: prototype.id + '-titulo',
                         hidden: false,
                         layout: {
                         type: 'hbox',
                         pack: 'center'
                         },
                         border: true,
                         height: 25,
                         bodyStyle: 'background-color: E3EAEF;',
                         defaults: {
                         border: false
                         },
                         items: [
                         {
                         xtype: 'panel',
                         width: 1324,
                         id: prototype.id + '-setTitulo',
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
                         html: '<b> Quantity:</b>',
                         width: 60
                         },
                         {
                         id: prototype.id + '-txtQty',
                         text: '0',
                         width: 40
                         },
                         {
                         html: '<b>Flight Date:</b>',
                         width: 75
                         },
                         {
                         id: prototype.id + '-FlightDate',
                         //                                                    text: '1',
                         width: 80
                         },
                         {
                         html: '<b>Flight Number:</b>',
                         width: 95
                         },
                         {
                         id: prototype.id + '-FlightNumber',
                         text: '0',
                         width: 45
                         },
                         {
                         html: '<b>Download File:</b>',
                         width: 100
                         },
                         {
                         xtype: 'button',
                         id: prototype.id + '-imgInfo1',
                         region: 'south',
                         width: 20,
                         height: 20,
                         hidden: false,
                         icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                         tooltip: 'File Flight Manifest',
                         listeners: {
                         click: 'openExport'
                         },
                         renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                         metaData.style = "text-align:left;";
                         value = '<b>' + value + '</b>';
                         return '<a href="#flown-flight-conciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                         }
                         }
                         ]
                         }
                         ]
                         },*/
                        // <editor-fold defaultstate="collapsed" desc="gridFlightManifest">
                        {xtype: 'panel',
                            hidden: false,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridFlightManifest',
                                    width: 1369,
//                                    width: 1449,
                                    height: 550,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columnLines: true,
                                    scrollable: {
                                        direction: 'vertical',
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Nbr', width: 40, dataIndex: 'RN', sortable: true, },
                                            {text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 100, dataIndex: 'DFLIGHT'},
                                                    {text: 'Number', width: 80, dataIndex: 'NFLIGHT'}
                                                ]
                                            },
                                            {
                                                text: 'Last Name', dataIndex: 'LNAME', width: 120, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'First Name', dataIndex: 'FNAME', width: 120, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Pax <br> Type', dataIndex: 'desPAX', width: 70, sortable: true,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background:#FFF9E0;";
//                                                            return value;
//                                                        }
                                            },
                                            {
                                                text: 'Seat', dataIndex: 'CHAIR', width: 70, sortable: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background:#FFF9E0;";
                                                    return value;
                                                },
//                                                        sorter: function (v1, v2) {
//                                                            console.log('sorter');
//                                                            v1 = v1.get('CHAIR');
//                                                            v2 = v2.get('CHAIR');
//                                                            return v1 > v2 ? 1 : ( v1 < v2 ? -1 : 0 );
//                                                        }
                                            },
//                                            {
//                                                text: 'PNR', dataIndex: 'PNR', width: 80, sortable: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                            {
                                                text: 'Ticket', dataIndex: 'strTicket', width: 130, sortable: true,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-flight-conciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'desSTVAL', width: 110, sortable: true},
                                            {text: 'Orig', dataIndex: 'CDEPART', width: 70, sortable: true},
                                            {text: 'Dest', dataIndex: 'CARRIVA', width: 70, sortable: true},
                                            {text: 'VCR vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Manifest', dataIndex: 'desSTVCR', width: 70, sortable: true},
                                                ]
                                            },
                                            {
                                                text: 'Process Sabre',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Scan', dataIndex: 'descFSABRE', width: 80, sortable: true},
                                                    {text: 'Status', dataIndex: 'STASABR', width: 80, sortable: true},
                                                ]
                                            },
                                            {text: 'Flag<br>Sales-PRAXIS', dataIndex: 'descFSALES', width: 100, sortable: true},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 45,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'viewDataEntry_A3729'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                        // </editor-fold>

                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
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