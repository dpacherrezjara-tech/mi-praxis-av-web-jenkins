Ext.define('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.FilesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-FilesGrid',
    requires: [
        'Ext.Praxis.controller.payments.InputsSecondPhase.FilesGridController'
    ],
    controller: 'FilesGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1200,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
    },
    columnLines: true,
    features: [
        {
            ftype: 'summary' // Agrega la característica de resumen al grid
        }
    ],
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {text: 'Client<br>Code', dataIndex: 'MF054CCUST', width: 70},
            //{text: 'Client<br>Name', dataIndex: 'AIRLINE_NAME', width: 120},
            {text: 'Processing<br>Date', dataIndex: 'MF054PRDA', width: 80},
            {text: 'Load<br>Date', dataIndex: 'MF054FREGI', width: 80},
            {text: 'Source', dataIndex: 'DESC_PRO', flex: 1},
            {text: 'File<br>Type', dataIndex: 'DESC_FILE', flex: 1},
            {text: 'Total Records',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;';
                        return value;
                    },
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                        metaData.style = 'text-align:center; margin-right:3px ';
                        return '<b>' + value + '<b>';
                    }
                }, columns: [
                    {text: 'Lines', dataIndex: 'MF054TLIN', width: 70},
                    {text: 'Trans.', dataIndex: 'MF054QTRN', width: 70}
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Open',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Delivery',
                        handler: 'onClickDelivery'
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
            },
            {
                xtype: 'button',
                scale: 'small',
                id: prototype.id + '-files-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    }
});


