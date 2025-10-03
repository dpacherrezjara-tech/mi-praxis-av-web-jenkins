Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.Grids.HeaderDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-HeaderDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.HeaderDetailGridController'
    ],
    controller: 'HeaderDetailGridController',
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
            {text: 'Status', dataIndex: 'FSELEC', width: 110,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                    const opts = {
                        '': 'Pending',
                        'L': 'Match'
                    };
                    return opts[value.trim()] || '';
                }
            },
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 180},
            {text: 'Merchant ID', dataIndex: 'MERCHAND', width: 130},
            {text: 'Settlement ID', dataIndex: 'LIQUIDACIO', width: 210},
            {
                text: 'Header Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#B2DAFA";
                        return value;
                    }
                }, columns: [
                    {   text: 'Detail',
                        width: 50,
                        xtype: 'actioncolumn',
                        align: 'center',
                        items: [{
                            iconCls: 'prx-icon-search',
                            tooltip: 'Ver detalle',
                            handler: 'openProcessDetailHeader' 
                        }]
                    },
                    {text: 'Curr.', dataIndex: 'MONEDA', width: 80},
                    {text: 'Amount', dataIndex: 'TOTAL', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Comm.', dataIndex: 'COMISION', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'NET', dataIndex: 'NETO', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Others', dataIndex: 'OTROS', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Payment<br>Curr.', dataIndex: 'MONEDAPAGO', width: 80},
                    {text: 'Payment<br>NET', dataIndex: 'IMPORTEPAG', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                    
                ]
            },
            {
                text: 'Total',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#fdff85";
                        return value;
                    }
                }, columns: [
                    {text: 'Qty<br>Settlement', dataIndex: 'QTY_SETTL', width: 80},
                    {text: 'Qty<br>Taxes', dataIndex: 'QTY_TAX', width: 80},
                    {text: 'Qty<br>Records', dataIndex: 'QTY_DETAIL', width: 80}
                ]
            },
            {text: 'Bandoc', dataIndex: 'BANDOC', width: 130},
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
                id: prototype.id + '-head-btnBack',
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


