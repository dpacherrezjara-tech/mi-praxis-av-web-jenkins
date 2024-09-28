Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.TaxDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-TaxDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.TaxDetailGridController'
    ],
    controller: 'TaxDetailGridController',
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
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
            {text: 'Payment<br>Date', dataIndex: 'FLIQUIDACI', width: 80},
            {text: 'Status', dataIndex: 'FSELEC', width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                    const opts = {
                        '': 'Pending',
                        'L': 'Match'
                    };
                    return opts[value.trim()] || '';
                }
            },
            {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1},
            {text: 'Merchant ID', dataIndex: 'MERCHAND', width: 130},
            {text: 'Settlement ID', dataIndex: 'LIQUIDACIO', width: 210},
            {text: 'Bandoc', dataIndex: 'BANDOC', width: 130},
            {
                text: 'Tax Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#B2DAFA";
                        return value;
                    }
                }, columns: [
                    {text: 'Code', dataIndex: 'CODIGO', width: 120},
                    {text: 'Amount', dataIndex: 'IMPORTE', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Curr.', dataIndex: 'MONEDA', width: 80},
                    {text: 'Payment<br>Amount', dataIndex: 'IMPORTEPAG', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Payment<br>Curr.', dataIndex: 'MONEDAPAGO', width: 80}
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
                    {text: 'User', dataIndex: 'USUP', width: 100},
                    {text: 'Date', dataIndex: 'FEUP', width: 100}
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
                id: prototype.id + '-tax-btnBack',
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


