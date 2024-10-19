Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Grids.ErrorsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ErrorsGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.ErrorsGridController'
    ],
    controller: 'ErrorsGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1450,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    selModel: {
        type: 'checkboxmodel',
        mode: 'MULTI'  // Permite la selección múltiple
    },
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
            {text: 'Accounting ID', dataIndex: 'IDCONT', width: 180},
            {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1},
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 100},
            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
            {text: 'Error<br>Code', dataIndex: 'CERROR', width: 50},
            {text: 'Error<br>Description', dataIndex: 'DESCERR', width: 300},
            {text: 'Error<br>Records', dataIndex: 'QTYERR', width: 120},
            {text: 'Status<br>Reversed', dataIndex: 'STREV', width: 100},
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
                    {text: 'Datetime', dataIndex: 'TSUP', width: 130}
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
                id: prototype.id + '-errors-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    }
});


