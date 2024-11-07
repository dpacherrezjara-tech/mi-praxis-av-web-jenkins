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
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    selModel: {
        type: 'checkboxmodel',
        mode: 'MULTI', // Permite la selección múltiple
        listeners: {
            beforeselect: 'validateReversed'
        }
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
            {text: 'Processor', dataIndex: 'DESC_PRO', width: 200},
            {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 100},
            {text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80},
            {text: 'Error<br>Code', dataIndex: 'CERROR', width: 50},
            {text: 'Error<br>Description', dataIndex: 'DESCERR', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:left;";
                    return value;
                }
            },
            {text: 'Error<br>Records', dataIndex: 'QTYERR', width: 120},
            {text: 'Status<br>Reversed', dataIndex: 'STREV', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        '0': () => {
                            metaData.style = "background-color:#f71a1a;color:#ffffff;font-weight:bold";
                            return 'Pending';
                        },
                        '1': () => {
                            metaData.style = "background-color:#7dee50;font-weight:bold";
                            return 'Reversed';
                        },
                        '2': () => {
                            metaData.style = "background-color:#dbf12d;font-weight:bold";
                            return 'Stand By';
                        }
                    };
                    return opts[value]();
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
                    {text: 'User', dataIndex: 'USUP', width: 100},
                    {text: 'Datetime', dataIndex: 'TSUP', width: 130}
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
                        handler: 'reverseSingleBandoc',
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
                iconCls: 'prx-icon-delete',
                scale: 'small',
                tooltip: 'Reverse Masive',
                listeners: {
                    click: 'reverseMassiveBandoc'
                }
            },
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


