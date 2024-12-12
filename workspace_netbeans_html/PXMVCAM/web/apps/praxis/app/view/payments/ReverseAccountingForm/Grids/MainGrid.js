Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.MainGridController'
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
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Info',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onViewDetailReverseAccounting', // onViewDetailReverseAccounting
                    }
                ]
            },
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 50},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 200},
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
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
            {text: 'Value Date', dataIndex: 'VALDATE', width: 100},
            {text: 'BPO Message', dataIndex: 'BPOMSG', flex: 1},
            {text: 'Reverse<br>Origin', dataIndex: 'REVORI', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'X': 'Excel',
                        'C': 'Accounting',
                        'B': 'Bandoc',
                        'S': 'Stand By',
                        'L': 'Stand By Rev'
                    };
                    return opts[value];
                }
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
                    {text: 'User', dataIndex: 'USRV', width: 100},
                    {text: 'Datetime', dataIndex: 'TSRV', width: 160}
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


