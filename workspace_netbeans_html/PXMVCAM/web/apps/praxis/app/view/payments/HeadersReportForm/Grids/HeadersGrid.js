Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-HeadersGrid',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.HeadersGridController'
    ],
    controller: 'HeadersGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    store: [],
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
            {text: 'Type', dataIndex: 'TIPOCON', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    const opts = {
                        'DEB': 'Debits',
                        'REG': 'Regular',
                        'ADJ': 'Adjustment'
                    };
                    return opts[value];
                }
            },
            {text: 'Header ID', dataIndex: 'FILENAM', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value.trimEnd();
                }
            },
            {text: 'Period', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                    return record.data.FCONT.slice(0, 6);
                }
            },
            {text: 'Date', dataIndex: 'FCONT', width: 80},
            {text: 'Praxis ID', dataIndex: 'IDCONT', width: 200},
            {text: 'Status', dataIndex: 'STCONT', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "background-color:#838187";
                    const opts = {
                        '5': () => {
                            metaData.style = "background-color:#638be1;color:#ffffff;font-weight:bold";
                            return 'SFTP ️🆗';
                        },
                        'L': () => {
                            metaData.style = "background-color:#88d556;font-weight:bold";
                            return 'Loaded to SAP ☑';
                        },
                        '6': () => {
                            metaData.style = "background-color:#efd773;color:#ce3232;font-weight:bold";
                            return 'Partially Rejected ↩️';
                        },
                        '9': () => {
                            metaData.style = "background-color:#efd773;font-weight:bold";
                            return 'Partially Justified ↩️';
                        },
                        'J': () => {
                            metaData.style = "background-color:#b0d7dc;font-weight:bold";
                            return 'Justified ⏺️';
                        },
                        'R': () => {
                            metaData.style = "background-color:#fd5858;color:#dbdb12;font-weight:bold";
                            return 'Rejected ⚠️';
                        }
                    };
                    return opts[value]();
                }
            },
            {text: 'Qty<br>Documents', dataIndex: 'CUR_BANDOCS', width: 90},
            {text: 'Rej.<br>Documents', dataIndex: 'REJ_BANDOCS', width: 90},
            {text: 'Jus.<br>Documents', dataIndex: 'JUS_BANDOCS', width: 90},
            {text: 'Rep.<br>Documents', dataIndex: 'REP_BANDOCS', width: 90},
            {text: 'User<br>Created', dataIndex: 'USCR', width: 90},
            {text: 'Date<br>Created', dataIndex: 'TSCR', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return global.formatTimeStamp(value);
                }
            },
            {text: 'User<br>Update', dataIndex: 'USUP', width: 90},
            {text: 'Date<br>Update', dataIndex: 'TSUP', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return global.formatTimeStamp(value);
                }
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Edit',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-edit',
                        tooltip: 'Update',
                        handler: 'onUpdateRec'
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
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


