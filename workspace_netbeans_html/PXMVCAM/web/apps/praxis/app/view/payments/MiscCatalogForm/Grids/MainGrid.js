Ext.define('Ext.Praxis.view.payments.MiscCatalogForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.payments.MiscCatalog.MainGridController'
    ],
    controller: 'MainGridController',
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
            {text: 'Client', dataIndex: 'A4451CCUST', width: 100},
            {text: 'Key 1', dataIndex: 'A4451KEY1', width: 60},
            {text: 'Key 2', dataIndex: 'A4451KEY2', width: 80},
            {text: 'Key 3', dataIndex: 'A4451KEY3', width: 120},
            {text: 'Description 1', dataIndex: 'A4451DESC1', width: 250},
            {text: 'Description 2', dataIndex: 'A4451DESC2', width: 250},
            {text: 'SEQ', dataIndex: 'A4451SEQ', width: 60},
            {text: 'Corrl', dataIndex: 'A4451CORRL', width: 80},
            {text: 'Table', dataIndex: 'A4451TTABL', width: 100},
            {text: 'Comment', dataIndex: 'A4451COMEN', flex: 1},
            {text: 'Status', dataIndex: 'A4451STS', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#7ec7d5;font-weight:bold;";
                    const opts = {
                        '1': 'Active',
                        '0': 'Inactive'
                    };
                    return opts[value];
                }
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Cl',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-add',
                        tooltip: 'Clone',
                        handler: 'onCloneRec'
                    }
                ]
            },
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


