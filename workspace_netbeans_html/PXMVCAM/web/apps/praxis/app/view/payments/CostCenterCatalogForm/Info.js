Ext.define('Ext.Praxis.view.payments.CostCenterCatalogForm.Info', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-Info',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 720,
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
            {text: 'Cod.', dataIndex: 'CODREC', width: 80},
            {text: 'Society', dataIndex: 'SOCIETY', width: 100},
            {text: 'Country', dataIndex: 'PAIS', width: 80},
            {text: 'Profit<br>Center', dataIndex: 'CEBE', width: 100},
            {text: 'Cost<br>Center', dataIndex: 'CECO', flex: 1},
            {text: 'Account', dataIndex: 'CUENTA', width: 100},
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Up.',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-edit',
                        tooltip: 'Update',
                        handler: 'onUpdate'
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Dl.',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-trash',
                        tooltip: 'Delete',
                        handler: 'onDelete'
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
                    click: 'downloadGrid'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


