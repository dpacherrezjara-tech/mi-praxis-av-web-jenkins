Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.DownloadFilesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DownloadFilesGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.DownloadFilesGridController'
    ],
    controller: 'DownloadFilesGridController',
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
            {text: 'Accounting<br>ID', dataIndex: 'IDCONT', width: 180},
            {text: 'Accounting<br>Period', dataIndex: 'FCONT', width: 80},
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 80},
            {text: 'Date<br>Generate', dataIndex: 'FSEND', width: 80},
            {text: 'Hour<br>Generate', dataIndex: 'HSEND', width: 80},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 140},
            {text: 'Correlative', dataIndex: 'CORRL', width: 100},
            {text: 'Correlative<br>Name', dataIndex: 'CORRLAV', width: 160},
            {text: 'User<br>Generate', dataIndex: 'USENV', width: 100},
            {text: 'File Name', dataIndex: 'FILENAM', flex: 1},
            {text: 'Status', dataIndex: 'STSAP', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold";
                    const opts = {
                        '1': 'Loaded',
                        '3': 'Rejected'
                    };
                    return opts[value];
                }
            },
            {text: 'Type', dataIndex: 'MODO', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold";
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
                        },
                        'M': () => {
                            return "ADM's";
                        }
                    };
                    return opts[value] ? opts[value]() : '';
                }
            },
            {text: 'User<br>Processor', dataIndex: 'USCR', width: 100},
            {text: 'Register<br>Date', dataIndex: 'TSCR', width: 160}

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
                id: prototype.id + '-dfamp-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    }
});


