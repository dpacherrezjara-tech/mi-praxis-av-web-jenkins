Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.MainGridController'
    ],
    controller: 'MainGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
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
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {text: 'Key 1', dataIndex: 'a4451key1', width: 50},
            {text: 'Key 2', dataIndex: 'a4451key2', width: 110},
            {text: 'Key 3', dataIndex: 'a4451key3', width: 140},
            {text: 'Description 1', dataIndex: 'a4451desc1', width: 300},
            {text: 'Description 2', dataIndex: 'a4451desc2', width: 200},
            {text: 'Cant 1', dataIndex: 'a4451cant1', width: 80},
            {text: 'Cant 2', dataIndex: 'a4451cant2', width: 80},
            {text: 'Fecha 1', dataIndex: 'a4451fech1', width: 80},
            {text: 'Fecha 2', dataIndex: 'a4451fech2', width: 80},
            {text: 'Comment', dataIndex: 'a4451comen', flex: 1},
            {text: 'Status', dataIndex: 'a4451sts', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        '1':'Enabled',
                        '0':'Disabled'
                    };
                    return  opts[value];
                }
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


