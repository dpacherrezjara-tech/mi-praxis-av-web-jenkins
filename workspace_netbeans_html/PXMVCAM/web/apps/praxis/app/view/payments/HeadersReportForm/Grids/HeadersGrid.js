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
    width: 1350,
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
                    metaData.style = "background-color:#B2DAFA";
                    const opts = {
                        'DEB': 'Debits',
                        'REG': 'Regular',
                        'ADJ': 'Adjustment'
                    };
                    return opts[value];
                }
            },
            {text: 'Header ID', dataIndex: 'HEADER', flex: 1},
            {text: 'Period', dataIndex: 'PERIOD', width: 80},
            {text: 'Date', dataIndex: 'FCONT', width: 80},
            {text: 'Praxis ID', dataIndex: 'IDCONT', width: 200},
            {text: 'Status', dataIndex: 'STSAP', width: 120,
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
                    return opts[value]() || '';
                }
            },
            {text: 'Qty<br>Bussiness', dataIndex: 'NEGOCIOS', width: 90},
            {text: 'Qty<br>Documents', dataIndex: 'TRNX', width: 90},

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


