Ext.define('Ext.Praxis.view.payments.TAXMerchantCatalogForm.Grids.TAXMerchantCatalogGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-TAXMerchantCatalogGrid',
    requires: [
        'Ext.Praxis.controller.payments.TAXMerchantCatalog.TAXMerchantCatalogGridController'
    ],
    controller: 'TAXMerchantCatalogGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
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
            {
                text: 'RN',
                locked: true,
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {text: 'Proceso', dataIndex: 'PROCESO', flex: 0.6},
            {text: 'Merchant', dataIndex: 'MERCHANT', flex: 1},
            {text: 'Sales<br>Agent', dataIndex: 'SALE_AGENT', flex: 1},
            {text: 'Society', dataIndex: 'SOCIETY', flex: 0.6},
            {text: 'Currency', dataIndex: 'CURRENCY', flex: 0.6},
            {text: 'Sales<br>Profit', dataIndex: 'SALE_PROFIT', flex: 1},
            {text: 'Country', dataIndex: 'COUNTRY',flex: 0.6},
            {text: 'Statement<br>Profit', dataIndex: 'STATEMENT_PROFIT', flex: 1},
            {text: 'Cost<br>Center', dataIndex: 'COST_CENTER', flex: 1},
            {text: 'Acquirer', dataIndex: 'ACQUIRER', flex: 1.5},
            {text: 'Processor', dataIndex: 'PROCESSOR', flex: 0.6},
            {text: 'Channel', dataIndex: 'CHANNEL', flex: 1.5},
            {text: 'Company', dataIndex: 'COMPANY', flex: 0.6},
            {text: 'Bank<br>Currency', dataIndex: 'BANK_CURRENCY', flex: 0.6},
            {text: 'Bank<br>Profit', dataIndex: 'BANK_PROFIT', flex: 1},
            {text: 'NIT<br>Code', dataIndex: 'NIT_CODE', flex: 1.2},
            {text: 'NIT<br>Description', dataIndex: 'NIT_DESCRIPTION', flex: 1.6},
            {text: 'Code', dataIndex: 'CODE', flex: 0.8},
            {text: 'Account', dataIndex: 'ACCOUNT', flex: 0.8},
            {text: 'Type<br>Memoline', dataIndex: 'TYPE_MEMOLINE', flex: 0.6},
            {text: 'Memoline', dataIndex: 'MEMOLINE', flex: 2.3},
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
    }
});


