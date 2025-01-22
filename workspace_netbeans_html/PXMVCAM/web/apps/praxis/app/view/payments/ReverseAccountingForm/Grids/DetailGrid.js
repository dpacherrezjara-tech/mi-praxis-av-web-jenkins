Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.DetailGridController'
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
            {text: 'Client<br>Code', dataIndex: 'A4545CCUST', width: 50},
            {text: 'Society', dataIndex: 'A4545COMPC', width: 80},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 180},
            {text: 'Bank Doc.', dataIndex: 'A4545DOCBA', width: 100},
            {text: 'Value<br>Date', dataIndex: 'A4545DOCD', width: 100},
            {text: 'Reference', dataIndex: 'A4545REFD', width: 160},
            {text: 'Record<br>Type', dataIndex: 'A4545HREGI', width: 80},
            {text: 'SEQ', dataIndex: 'A4545SEQ', width: 60},
            {text: 'Item', dataIndex: 'A4545ITEM', width: 60},
            {text: 'Profit', dataIndex: 'A4545PROFI', width: 120},
            {text: 'Cost Center', dataIndex: 'A4545CCOST', width: 100},
            {text: 'Primary<br>Key', dataIndex: 'A4545PKEY', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        '15': () => {
                            metaData.style = "color:#2fc611;font-weight:bold;";
                        },
                        '50': () => {
                            metaData.style = "color:#2fc611;font-weight:bold;";
                        },
                        '40': () => {
                            metaData.style = "color:#c61111;font-weight:bold;";
                        },
                        '01': () => {
                            metaData.style = "color:#c61111;font-weight:bold;";
                        }
                    };
                    opts[value]();
                    return value;
                }
            },
            {text: 'Account', dataIndex: 'A4545CUENT', width: 100},
            {text: 'Currency', dataIndex: 'A4545CUR', width: 80},
            {text: 'Value', dataIndex: 'A4545ACTIV', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Balance', dataIndex: 'A4545PASIV', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#dcdf3a;text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Large Text', dataIndex: 'A4545TEXTD', width: 400},
            {text: 'Bussiness<br>Place', dataIndex: 'A4545PLACE', width: 80},
            {text: 'Bank<br>Code', dataIndex: 'A4545BANCO', width: 70},
            {text: 'Bank Name', dataIndex: 'A4545REFB', width: 180},
            {text: 'Country', dataIndex: 'A4545PAIS', width: 70},
            {text: 'Merchant', dataIndex: 'A4545MERCH', width: 120},
            {text: 'Agent', dataIndex: 'A4545AGENT', width: 90},
            {text: 'Key 1', dataIndex: 'A4545REFK', width: 120},
            {text: 'Key 2', dataIndex: 'A4545REFK2', width: 120},
            {text: 'Payment', dataIndex: 'A4545MPAGO', width: 70},
            {text: 'Acc. Number', dataIndex: 'A4545ANUMB', width: 160},
            {text: 'Sub-Type', dataIndex: 'A4545MODO', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "background-color:#838187";
                    const opts = {
                        'P': () => {
                            metaData.style = "font-weight:bold";
                            return 'PAX CO';
                        },
                        'A': () => {
                            metaData.style = "font-weight:bold";
                            return 'CGO CO';
                        },
                        'C': () => {
                            metaData.style = "font-weight:bold";
                            return 'COR CO';
                        },
                        'E': () => {
                            metaData.style = "font-weight:bold";
                            return 'PAX EXT';
                        },
                        'G': () => {
                            metaData.style = "font-weight:bold";
                            return 'CGO EXT';
                        },
                        'T': () => {
                            metaData.style = "font-weight:bold";
                            return 'TAX EXT';
                        },
                        'D': () => {
                            metaData.style = "font-weight:bold";
                            return 'DEB CO';
                        },
                        'B': () => {
                            metaData.style = "font-weight:bold";
                            return 'DEB EXT';
                        },
                        'J': () => {
                            metaData.style = "font-weight:bold";
                            return 'ADJ CO';
                        },
                        'K': () => {
                            metaData.style = "font-weight:bold";
                            return 'ADJ EXT';
                        }
                    };
                    return opts[value] ? opts[value]() : '';
                }
            },
            {text: 'A. Date', dataIndex: 'A4545ADATE', width: 100},
            {text: 'Date Bank', dataIndex: 'A4545DATCI', width: 100},
            {text: 'Trans. Bank', dataIndex: 'A4545TRACI', width: 100},
            {text: 'Date Settl', dataIndex: 'A4545DATEC', width: 100},
            {text: 'Trans. Settl', dataIndex: 'A4545TRANC', width: 100},
            {text: 'Accounting<br>Date', dataIndex: 'A4545PSTGD', width: 100},
            {text: 'Accounting<br>ID', dataIndex: 'A4545USER', width: 200},
            {text: 'User', dataIndex: 'USCR', width: 100},
            {text: 'Reverse<br>Date', dataIndex: 'TSCR', width: 140}
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
                    click: 'onDownloadExcel'
                }
            },
            {
                xtype: 'button',
                scale: 'small',
                id: prototype.id + '-rvac-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    }
});


