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
    width: 1000,
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
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 70},
            {text: 'Client<br>Name', dataIndex: 'AIRLINE_NAME', width: 120},
            {text: 'Processing<br>Date', dataIndex: 'FPRDA', width: 80},
            {text: 'Proccessor', dataIndex: 'PROC_NAME', width: 120},
            {text: 'Process<br>Init', dataIndex: 'FINI', width: 80},
            {text: 'Process<br>End', dataIndex: 'FFIN', width: 80},
            {text: 'Seq', dataIndex: 'SEQ', width: 50},
            {text: 'Log', dataIndex: 'VRESULT', flex: 1},
            {text: 'User', dataIndex: 'USCR', width: 90}
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


