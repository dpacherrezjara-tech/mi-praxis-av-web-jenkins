Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Grids.ProcessLoggerGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ProcessLoggerGrid',
    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.ProcessLoggerGridController'
    ],
    controller: 'ProcessLoggerGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1600,
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
            {text: 'ID', dataIndex: 'CUUID', width: 230},
            {text: 'Process<br>Date', dataIndex: 'FUUID', width: 80},
            {text: 'Process', dataIndex: 'PROCESO', flex: 1},
            {text: 'Status', dataIndex: 'STPRO', width: 90,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const opts = {
                        'P': () => {
                            metaData.tdAttr = `data-qtip="Processing"`;
                            return '<img src="resources/img/icon/16x16/loading_robot.png"/>';
                        },
                        'C': () => {
                            metaData.tdAttr = `data-qtip="Completed"`;
                            return '<img src="resources/img/icon/16x16/check.png"/>';
                        },
                        'X':() => {
                            metaData.tdAttr = `data-qtip="Error"`;
                            return '<img src="resources/img/icon/delete.png"/>';
                        }
                    };
                    return opts[value.trim()]();
                }
            },
            {text: 'Message', dataIndex: 'MSGPRO', width: 400},
            {text: 'User<br>Create', dataIndex: 'USCR', width: 100},
            {text: 'Date<br>Create', dataIndex: 'FECR', width: 80},
            {text: 'Hour<br>Create', dataIndex: 'HOCR', width: 80},
            {text: 'User<br>End', dataIndex: 'USTR', width: 100},
            {text: 'Date<br>End', dataIndex: 'FETR', width: 80},
            {text: 'Hour<br>End', dataIndex: 'HOTR', width: 80}
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


