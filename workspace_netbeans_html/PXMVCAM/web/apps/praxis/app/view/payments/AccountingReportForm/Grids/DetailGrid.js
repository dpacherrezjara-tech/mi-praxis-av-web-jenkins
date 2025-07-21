Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.DetailGridController'
    ],
    controller: 'DetailGridController',
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
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Info',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'openBandocDetail'
                    }
                ]
            },
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 50},
            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 90},
            {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 60},
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
            {text: 'Status<br>Phase 1', dataIndex: 'STVAL', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#bbe3ac;font-weight:bold;";
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
                    metaData.style = "background-color:#bbe3ac;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Payment<br>Date', dataIndex: 'ADATE', width: 90},
            {text: 'Account', dataIndex: 'ACCOUNT', width: 100},
            {text: 'Account<br>Prov.', dataIndex: 'ACCPROV', width: 100},
            {text: 'Date<br>Prov.', dataIndex: 'FECPROV', width: 100},
            {text: 'Profit<br>Center', dataIndex: 'BENCENC', width: 100},
            {text: 'Society', dataIndex: 'SOCIETY', width: 80},
            {text: 'Reference', dataIndex: 'REFER', width: 130},
            {text: 'Key 1', dataIndex: 'CLAVE1', width: 130},
            {text: 'Key 3', dataIndex: 'CLAVE3', width: 200},
            {text: 'Text', dataIndex: 'TEXTO', width: 230},
            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
            {text: 'Bank<br>Amount', dataIndex: 'NETO', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Rev<br>Currency', dataIndex: 'LOCRENCY2', width: 70},
            {text: 'Rev<br>Amount', dataIndex: 'LOCAMOUNT2', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
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
                text: 'Regular Accounting Information',
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
                    {text: 'Period', dataIndex: 'PERIOD_REG', width: 90},
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
                    {text: 'Sub-type', dataIndex: 'TIPOREG', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#B2DAFA;font-weight:bold;";
                            const opts = {
                                'P': () => {
                                    return 'PAX CO';
                                },
                                'A': () => {
                                    return 'CGO CO';
                                },
                                'C': () => {
                                    return 'COR CO';
                                },
                                'E': () => {
                                    return 'PAX EXT';
                                },
                                'G': () => {
                                    return 'CGO EXT';
                                },
                                'T': () => {
                                    return 'TAX EXT';
                                },
                                'D': () => {
                                    return 'DEB CO';
                                },
                                'B': () => {
                                    return 'DEB EXT';
                                },
                                'J': () => {
                                    return 'ADJ CO';
                                },
                                'K': () => {
                                    return 'ADJ EXT';
                                }
                            };
                            return opts[value] ? opts[value]() : '';
                        }
                    },
                    {text: 'ID', dataIndex: 'IDCONT', width: 210,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'background-color:#B2DAFA;';
                            if(value){
                                if (value.trim() !== '') {
                                    metaData.style += "text-decoration:underline;cursor:pointer;font-weight:bolder;color:#639cbe;";
                                }
                            }
                            return value;
                        },
                        listeners: {
                            click: 'onLoadAccountingReg'
                        }
                    },
                    {text: 'Corrl AV', dataIndex: 'HEADER', width: 200},
                    {text: 'File Name', dataIndex: 'FILENAM', width: 250},
                    {text: 'SAP Date', dataIndex: 'FECSAP', width: 100},
                    {text: 'SAP<br>Status', dataIndex: 'STSAP', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#7ec7d5;font-weight:bold;";
                            const opts = {
                                'N': () => {
                                    metaData.style = "background-color:#ef6f59;font-weight:bold";
                                    return 'Pending Accounting';
                                },
                                'P': () => {
                                    metaData.style = "background-color:#fffc33;font-weight:bold";
                                    return 'Pending to Send';
                                },
                                'L': () => {
                                    metaData.style = "background-color:#deace3;font-weight:bold";
                                    return 'Loaded to SAP';
                                },
                                'S': () => {
                                    metaData.style = "background-color:#7cf925;font-weight:bold";
                                    return 'Sended to AV';
                                }
                            };
                            return opts[value]? opts[value]() : '';
                        }
                    }
                ]
            },
            {
                text: 'Debit Accounting Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#dcc279";
                        return value;
                    }
                },
                columns: [
                    {text: 'Period', dataIndex: 'PERIOD_DEB', width: 90},
                    {text: 'Type', dataIndex: 'TIPOCON2', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dcc279";
                            const opts = {
                                'DEB': 'Debits',
                                'REG': 'Regular',
                                'ADJ': 'Adjustment'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'Sub-type', dataIndex: 'TIPOREG2', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#dcc279;font-weight:bold;";
                            const opts = {
                                'P': () => {
                                    return 'PAX CO';
                                },
                                'A': () => {
                                    return 'CGO CO';
                                },
                                'C': () => {
                                    return 'COR CO';
                                },
                                'E': () => {
                                    return 'PAX EXT';
                                },
                                'G': () => {
                                    return 'CGO EXT';
                                },
                                'T': () => {
                                    return 'TAX EXT';
                                },
                                'D': () => {
                                    return 'DEB CO';
                                },
                                'B': () => {
                                    return 'DEB EXT';
                                },
                                'J': () => {
                                    return 'ADJ CO';
                                },
                                'K': () => {
                                    return 'ADJ EXT';
                                }
                            };
                            return opts[value] ? opts[value]() : '';
                        }
                    },
                    {text: 'ID', dataIndex: 'IDCDEB', width: 210,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'background-color:#dcc279;';
                            if(value){
                                if (value.trim() !== '') {
                                    metaData.style += "text-decoration:underline;cursor:pointer;font-weight:bolder;color:#639cbe;";
                                }
                            }
                            return value;
                        },
                        listeners: {
                            click: 'onLoadAccountingDeb'
                        }
                    },
                    {text: 'Corrl AV', dataIndex: 'HEADER2', width: 200},
                    {text: 'File Name', dataIndex: 'FILENAM2', width: 250},
                    {text: 'SAP Date', dataIndex: 'FECSAP2', width: 100},
                    {text: 'SAP<br>Status', dataIndex: 'STSAP2', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#7ec7d5;font-weight:bold;";
                            const opts = {
                                'N': () => {
                                    metaData.style = "background-color:#ef6f59;font-weight:bold";
                                    return 'Pending Accounting';
                                },
                                'P': () => {
                                    metaData.style = "background-color:#fffc33;font-weight:bold";
                                    return 'Pending to Send';
                                },
                                'L': () => {
                                    metaData.style = "background-color:#deace3;font-weight:bold";
                                    return 'Loaded to SAP';
                                },
                                'S': () => {
                                    metaData.style = "background-color:#7cf925;font-weight:bold";
                                    return 'Sended to AV';
                                }
                            };
                            return opts[value]? opts[value]() : '';
                        }
                    }
                ]
            },
            {text: 'Qty<br>Rejections', dataIndex: 'QTYREJ', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#a5d7d6;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#5bc611;";
                    return value;
                },
                listeners: {
                    click: 'onLoadRejections'
                }
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
                id: prototype.id + '-bandoc-btnBack',
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


