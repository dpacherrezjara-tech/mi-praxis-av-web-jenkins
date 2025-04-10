Ext.define('Ext.Praxis.view.payments.AccountsCatalogForm.Grids.AccountsCatalogGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-AccountsCatalogGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountsCatalog.AccountsCatalogGridController'
    ],
    controller: 'AccountsCatalogGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1250,
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
            {text: 'Key', dataIndex: 'CODCTB', width: 100},
            {text: 'Code', dataIndex: 'CODIGO', width: 90,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    return value;
                }
            },
            {text: 'Account', dataIndex: 'CUENTA', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#bbe3ac;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Memo Line', dataIndex: 'MEMOLINE', width: 220},
            {text: 'Description', dataIndex: 'DESCR', flex: 1},
            {text: 'Type', dataIndex: 'TIPO', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    const opts = {
                        'NET': 'Netos',
                        'COM': 'Comisiones',
                        'GYD': 'Gastos',
                        'SOB': 'Sobrantes',
                        'DFR': 'Diferencias'
                    };
                    return opts[value];
                }
            },
            {text: 'Process', dataIndex: 'BANCO', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    const opts = {
                        'JP': 'Exterior',
                        'BC': 'Colombia'
                    };
                    return opts[value.trim()];
                }
            },
            {text: 'Initial<br>Date', dataIndex: 'FINICI', width: 90},
            {text: 'Expiration<br>Date', dataIndex: 'FVENCE', width: 90},
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


