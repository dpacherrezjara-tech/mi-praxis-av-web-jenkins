Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.Grids.ReverseAccountingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ReverseAccountingGrid',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingGridController'
    ],
    controller: 'ReverseAccountingGridController',
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
            {text: 'Type', dataIndex: 'TIPOCON', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'REG': 'Regular',
                        'DEB': 'Debit',
                        'ADJ': 'Adjustment'
                    };
                    return opts[value];
                }
            },
            {text: 'Accounting ID', dataIndex: 'IDCONT', width: 200},
            {text: 'Header', dataIndex: 'HEADER', width: 180},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 200},
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
            {text: 'Reference', dataIndex: 'REFER', width: 150},
            {
                text: 'Reject Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    }
                }, columns: [
                    {text: 'User', dataIndex: 'USCR', width: 100},
                    {text: 'Datetime', dataIndex: 'TSCR', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value) {
                                value = global.formatTimeStamp(value);
                            }
                            return value;
                        }
                    },
                    {text: 'Type Reject', dataIndex: 'STREJ', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const opts = {
                                'R': 'Rejected',
                                'J': 'Justified',
                                'P': 'Re-Process'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'Rejected<br>Code', dataIndex: 'CODREC', width: 80},
                    {text: 'Rejected Message', dataIndex: 'OBSERV', width: 450}
                ]
            },
            {
                text: 'Solved Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    }
                }, columns: [
                    {text: 'Status', dataIndex: 'STREVI', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const opts = {
                                'Y': 'Audited',
                                'N': 'Pending'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'User', dataIndex: 'USUP', width: 100},
                    {text: 'Datetime', dataIndex: 'TSUP', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value) {
                                value = global.formatTimeStamp(value);
                            }
                            return value;
                        }
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-edit',
                        tooltip: 'Edit',
                        handler: 'onMaintenanceReject' // onViewDetailReverseAccounting
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
                    click: 'onDownloadExcel'
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


