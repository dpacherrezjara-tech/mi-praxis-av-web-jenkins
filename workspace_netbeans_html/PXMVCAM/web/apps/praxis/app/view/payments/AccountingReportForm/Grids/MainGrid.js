Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.MainGridController'
    ],
    controller: 'MainGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                text: 'RN',
                locked: true,
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 50},
            {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1},
            {
                text: 'Accounting Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#B2DAFA";
                        return value;
                    }
                }, columns: [
                    {text: 'Date', dataIndex: 'FCONT', width: 90},
                    {text: 'Hour', dataIndex: 'HCONT', width: 80},
                    {text: 'Type', dataIndex: 'TIPOCON', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#B2DAFA";
                            const opts = {
                                'DEB': 'Debits',
                                'REG': 'Regular',
                                'ADJ': 'Adjustment'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'ID', dataIndex: 'IDCONT', width: 210},
                    {text: 'Bandocs', dataIndex: 'TOTRECS', width: 80},
                    {text: 'Settl.', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#B2DAFA;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#7bc569;";
                            const {TOTREG,TOTDEB,TOTADJ,TIPOCON} = record.data;
                            const opts = {
                              'REG':  TOTREG,
                              'DEB': TOTDEB,
                              'ADJ': TOTADJ
                            };
                            return opts[TIPOCON];
                        },
                        listeners: {
                            click: 'onLoadSettlements'
                        }
                    },
                    {text: 'Initial<br>Date', dataIndex: 'PRDAF', width: 90},
                    {text: 'Final<br>Date', dataIndex: 'PRDAT', width: 90},
                    {text: 'Pre Acc.<br>Errors', dataIndex: 'QTYROWS', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2DAFA;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            return value;
                        },
                        listeners: {
                            click: 'onViewPreErrors'
                        }
                    },
                    {text: 'Post Acc.<br>Errors', dataIndex: 'QTYERRS', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2DAFA;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            return value;
                        },
                        listeners: {
                            click: 'onViewPostErrors'
                        }
                    },
                    {text: 'File Name', dataIndex: 'FILENAM', width: 160},
                    {text: 'Status', dataIndex: 'STCONT', width: 210,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "background-color:#838187";
                            const opts = {
                                '0': ()=>{
                                    metaData.style = "background-color:#838187;font-weight:bold";
                                    return 'Processing';
                                }, 
                                '1': ()=>{
                                    metaData.style = "background-color:#f7ec35;font-weight:bold";
                                    return 'Pre-Accounting Errors';
                                }, 
                                '2': ()=>{
                                    metaData.style = "background-color:#f7ec35;font-weight:bold";
                                    return 'Post-Accounting Errors';
                                }, 
                                '3': ()=>{
                                    metaData.style = "background-color:#91fc63;font-weight:bold";
                                    return 'Validated';
                                }, 
                                '4': ()=>{
                                    metaData.style = "background-color:#f71a1a;color:#ffffff;font-weight:bold";
                                    return 'Reversed';
                                },
                                '5': ()=>{
                                    metaData.style = "background-color:#7f69af;font-weight:bold";
                                    return 'Downloaded/Sended';
                                },
                                '6': ()=>{
                                    metaData.style = "background-color:#f71a1a;color:#ffffff;font-weight:bold";
                                    return 'Program Down';
                                }, 
                                '7': ()=>{
                                    metaData.style = "background-color:#f7ec35;font-weight:bold";
                                    return 'Executor Error';
                                }, 
                                '8': ()=>{
                                    metaData.style = "background-color:#f7ec35;font-weight:bold";
                                    return 'No Data';
                                }
                            };
                            return opts[value]();
                        }
                    },
                    {
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 50,
                        text: 'Log',
                        align: 'center',
                        items: [
                            {
                                iconCls: 'prx-icon-image-log',
                                tooltip: 'Open Log',
                                handler: 'onOpenLogger'
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Update Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    }
                }, columns: [
                    {text: 'User', dataIndex: 'USCR', width: 100},
                    {text: 'Datetime', dataIndex: 'TSCR', width: 130}
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Rev.',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-trash',
                        tooltip: 'Reverse',
                        handler: 'onReverseAccounting',
                        isDisabled: 'disableReverse'
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Dl.',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-download',
                        tooltip: 'Download',
                        handler: 'onDownloadAccounting',
                        isDisabled: 'disableDownload'
                    }
                ]
            }
            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            },
            {
                xtype: 'button',
                scale: 'small',
                id: prototype.id + '-main-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


