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
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 70},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 80},
            {text: 'Accounting<br>Date', dataIndex: 'FCONT', width: 80},
            {text: 'Accounting<br>Hour', dataIndex: 'HCONT', width: 160},
            {text: '', dataIndex: 'DESC_PRO', flex: 1},
            {text: 'Merchant ID', dataIndex: 'MERCHAND', width: 130},
            {text: 'Settlement ID', dataIndex: 'LIQUIDACIO', width: 210},
            {
                text: 'Accounting',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#B2DAFA";
                        return value;
                    }
                }, columns: [
                    {text: 'Date', dataIndex: 'FCONT', width: 120},
                    {text: 'Hour', dataIndex: 'HCONT', width: 80},
                    {text: 'Type', dataIndex: 'TIPOCON', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const opts = {
                                'DEB':'Debits',
                                'REG':'Regular'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'ID', dataIndex: 'IDCONT', width: 150},
                    {text: 'Initial<br>Date', dataIndex: 'PRDAF', width: 100},
                    {text: 'Final<br>Date', dataIndex: 'PRDAT', width: 100},
                    {text: 'Status', dataIndex: 'STCONT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const opts = {
                                '0':'Processing',
                                '1':'Pre-Accounting Errors',
                                '2':'Post-Accounting Errors',
                                '3':'Validated',
                                '4':'Downloaded'
                            };
                            return opts[value];
                        }
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


