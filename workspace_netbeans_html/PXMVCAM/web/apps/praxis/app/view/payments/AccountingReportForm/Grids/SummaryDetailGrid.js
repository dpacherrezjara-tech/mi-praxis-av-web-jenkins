Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.SummaryDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SummaryDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.SummaryDetailGridController'
    ],
    controller: 'SummaryDetailGridController',
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
            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 90},
            {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 60},
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
            {text: 'Core', dataIndex: 'COREP', width: 60},
            {text: 'Status<br>Phase 1', dataIndex: 'STVAL', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#50dd56;font-weight:bold;";
                    const opts = {
                        '1': 'Match',
                        '3': 'Bank w/o Settl.',
                        '4': 'Match Diff.',
                        '5': 'Match Manual'
                    };
                    return opts[value];
                }
            },
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#50dd56;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 90},
            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 90},
            {text: 'Account', dataIndex: 'ACCOUNT', width: 100},
            {text: 'Profit<br>Center', dataIndex: 'BENCENC', width: 100},
            {text: 'Company', dataIndex: 'ACCCOMP', width: 120},
            {text: 'Society', dataIndex: 'SOCIETY', width: 80},
            {text: 'Commercial', dataIndex: 'CIACOME', width: 100},
            {text: 'Reference', dataIndex: 'REFER', width: 130},
            {text: 'Key 1', dataIndex: 'CLAVE1', width: 130},
            {text: 'Key 3', dataIndex: 'CLAVE3', width: 200},
            {text: 'Text', dataIndex: 'TEXTO', width: 230},
            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
            {text: 'Bank<br>Amount', dataIndex: 'NETO', width: 120},
            {text: 'Reconciled<br>Amount', dataIndex: 'NETOC', width: 120},
            {text: 'Rev<br>Currency', dataIndex: 'LOCRENCY2', width: 70},
            {text: 'Rev<br>Amount', dataIndex: 'LOCAMOUNT2', width: 120},
            {text: 'Qty<br>Settl. F1', dataIndex: 'QTYLIQ1', width: 60},
            {text: 'Qty<br>Settl. F2', dataIndex: 'QTYLIQ2', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-decoration:underline;cursor:pointer;font-weight:bolder;color:#5bc611;";
                    return value;
                },
                listeners: {
                    click: 'onLoadSettlements'
                }
            },
            {text: 'Qty<br>Tax', dataIndex: 'QTYGAS', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-decoration:underline;cursor:pointer;font-weight:bolder;color:#5bc611;";
                    return value;
                },
                listeners: {
                    click: 'onLoadTaxes'
                }
            },
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
                },
                columns: [
                    {text: 'Date', dataIndex: 'FECACC', width: 90},
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
                    {text: 'ID', dataIndex: 'IDACC', width: 210}
                ]
            },
            {
                text: 'SAP Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#9e95cb;font-weight:bold;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Date', dataIndex: 'FECSAP', width: 100},
                    {text: 'Status', dataIndex: 'STSAP', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#9e95cb;font-weight:bold;";
                            const opts = {
                                'P': () => {
                                    metaData.style = "background-color:#fffc33;font-weight:bold";
                                    return 'Pending';
                                },
                                'L': () => {
                                    metaData.style = "background-color:#7cf925;font-weight:bold";
                                    return 'Loaded';
                                }
                            };
                            return opts[value]() || '';
                        }
                    },
                    {text: 'Corrl AV', dataIndex: 'HEADER', width: 200},
                    {text: 'File Name', dataIndex: 'FILENAM', width: 300}
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
                id: prototype.id + '-dtsumm-btnBack',
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


