Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.TaxesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-TaxesGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.TaxesGridController'
    ],
    controller: 'TaxesGridController',
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
            {text: 'Client', dataIndex: 'CCUST', width: 60},
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 200},
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
            {text: 'Settlement<br>Date', dataIndex: 'FLIQUIDACI', width: 100},
            {text: 'Settlement ID', dataIndex: 'LIQUIDACIO', width: 250},
            {text: 'Merchant', dataIndex: 'MERCHAND', width: 130},
            {text: 'Code', dataIndex: 'CODIGO', width: 120},
            {text: 'Currency', dataIndex: 'MONEDA', width: 80},
            {text: 'Amount', dataIndex: 'IMPORTE', width: 120},
            {text: 'Rev.<br>Currency', dataIndex: 'MONEDAPAGO', width: 80},
            {text: 'Rev.<br>Amount', dataIndex: 'IMPORTEPAG', width: 120},
            {
                text: 'Bank Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "background-color:#92c3c6;";
                        return value;
                    }
                },
                columns:[
                    {text: 'Acc. Number', dataIndex: 'ACCCOMP', width: 120},
                    {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120},
                    {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
                    {text: 'Payment<br>Date', dataIndex: 'VALDATE', width: 80},
                    {text: 'DATECI', dataIndex: 'DATECI', width: 100},
                    {text: 'TRANCI', dataIndex: 'TRANCI', width: 100}
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
//            {
//                xtype: 'button',
//                iconCls: 'prx-icon-excel',
//                scale: 'small',
//                tooltip: 'Export to Excel',
//                listeners: {
//                    click: 'downloadExcel'
//                }
//            },
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


