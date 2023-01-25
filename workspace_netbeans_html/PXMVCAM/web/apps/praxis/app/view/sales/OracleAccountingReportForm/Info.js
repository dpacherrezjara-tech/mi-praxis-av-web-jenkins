Ext.define('Ext.Praxis.view.sales.OracleAccountingReportForm.Info', {
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
                            hidden: false,
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
                                        text: 'Nbr', dataIndex: 'RN', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Date / Period', dataIndex: 'A1955FPROC', width: 90
                                    },
                                    {
                                        text: 'Create Date', dataIndex: 'A1955FECIN', width: 90
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
                                                text: 'New', dataIndex: 'N', width: 95,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'In Process', dataIndex: 'P', width: 95,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'In Queue', dataIndex: 'Q', width: 95,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Procesable', dataIndex: 'C', width: 95,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'No procesable', dataIndex: 'X', width: 95,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Expired', dataIndex: 'E', width: 95,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Empty', dataIndex: 'VACIO', width: 95,
                                                listeners: {
                                                    click: 'onViewDetailClick'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total', dataIndex: 'TOTAL', width: 95,
                                        listeners: {
                                            click: 'onViewDetailClick'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#sales-oracle-accounting-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="gridDataDetail">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetail',
                            width: prototype.widthGridDetail,
                            hidden: true,
                            height: 485,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Nbr', dataIndex: 'RN', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A1955TIPO', width: 140,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A1955FUENT', width: 90, id: prototype.id+'-colFuente'
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A1955KEY2', width: 90, id: prototype.id+'-colKEY2'
                                    },
                                    {
                                        text: 'Channel', dataIndex: 'A1955KEY3', width: 90, id: prototype.id+'-colKEY3'
                                    },
                                    {
                                        text: 'Dates',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Process', dataIndex: 'A1955FPROC', width: 110, id: prototype.id+'-colFechaProc'
                                            },
                                            {
                                                text: 'Account', dataIndex: 'A1955FCONT', width: 110
                                            },
                                            {
                                                text: 'Oracle', dataIndex: 'A1955FECAC', width: 110
                                            }
                                        ]
                                    }
                                ]
                            }
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