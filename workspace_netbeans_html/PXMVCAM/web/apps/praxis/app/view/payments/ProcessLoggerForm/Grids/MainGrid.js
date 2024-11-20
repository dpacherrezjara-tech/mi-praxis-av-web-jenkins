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
    width: 1100,
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
            {text: 'Processing<br>Date', dataIndex: 'FPRDA', width: 80},
            {text: 'Processor', dataIndex: 'PROC_NAME', flex: 1},
            {text: 'Process<br>Init', dataIndex: 'FINI', width: 180},
            {text: 'Process<br>End', dataIndex: 'FFIN', width: 180},
            {text: 'Seq', dataIndex: 'SEQ', width: 50},
            {text: 'Status', dataIndex: 'STAT', width: 90,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'X': () => {
                            metaData.tdAttr = `data-qtip="${record.data.VRESULT}"`;
                            return '<img src="resources/img/icon/16x16/loading_robot.png"/>';
                        },
                        '1': () => {
                            metaData.tdAttr = `data-qtip="${record.data.VRESULT}"`;
                            return '<img src="resources/img/icon/16x16/check.png"/>';
                        },
                        '':() => {
                            metaData.tdAttr = `data-qtip="Error"`;
                            return '<img src="resources/img/icon/delete.png"/>';
                        }
                    };
                    return opts[value.trim()]();
                }
            },
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
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


