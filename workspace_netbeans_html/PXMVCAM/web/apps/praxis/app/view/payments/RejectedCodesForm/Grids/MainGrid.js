Ext.define('Ext.Praxis.view.payments.RejectedCodesForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.payments.RejectedCodesCatalog.MainGridController'
    ],
    controller: 'MainGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1350,
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
            {text: 'Type', dataIndex: 'TIPO', width: 80},
            {text: 'Code', dataIndex: 'CODREC', width: 100},
            {text: 'Description', dataIndex: 'DESCR', flex: 1},
            {
                text: 'User Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'User Created', dataIndex: 'USCR', width: 120},
                    {text: 'Datetime Created', dataIndex: 'TSCR', width: 150},
                    {text: 'User Updated', dataIndex: 'USUP', width: 120},
                    {text: 'Datetime Updated', dataIndex: 'TSUP', width: 150}
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
                        iconCls: 'prx-icon-download',
                        tooltip: 'Delete',
                        handler: 'onDeleteRec'
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Upd',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-log',
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


