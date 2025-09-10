Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeaderIntegratorGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-HeaderIntegratorGrid',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.HeaderIntegratorGridController'
    ],
    controller: 'HeaderIntegratorGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1300,
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
                xtype: 'rownumberer',
                width: 50
            },
            {text: 'File ID', dataIndex: 'FILEID', width: 100},
            {text: 'Status', dataIndex: 'STPRO', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "background-color:#838187";
                    const opts = {
                        'L': () => {
                            metaData.style = "background-color:#88d556;font-weight:bold";
                            return 'LOADED';
                        },
                        'F': () => {
                            metaData.style = "background-color:#b0d7dc;font-weight:bold";
                            return 'FORMATTED';
                        },
                        'P': () => {
                            metaData.style = "background-color:#638be1;color:#ffffff;font-weight:bold";
                            return 'PROCESSED';
                        },
                        'E': () => {
                            metaData.style = "background-color:#fd5858;color:#dbdb12;font-weight:bold";
                            return 'ERROR';
                        }
                    };
                    return opts[value]();
                }
            },
            {text: 'Process Status', dataIndex: 'STCAR', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "background-color:#838187";
                    console.log('value', value);
                    console.log('record', record);
//                    metaData.style = "background-color:#B2DAFA";
                    metaData.style = "background-color:#638be1;color:#ffffff;font-weight:bold";
                    
                    const opts = {
                        '': () => {
//                            metaData.style = "background-color:#638be1;color:#ffffff;font-weight:bold";
                            return '';
                        },
                        '1': () => {
                            metaData.style = "background-color:#638be1;color:#ffffff;font-weight:bold";
                            return 'TOTAL';
                        },
                        '2': () => {
                            metaData.style = "background-color:#efd773;color:#ce3232;font-weight:bold"
                            return 'PARTIAL';
                        }
                    };
                    return opts[value]();
                }},
            {text: 'Corrl', dataIndex: 'CORRL', width: 50},
            {text: 'File Type', dataIndex: 'FILETYPE', width: 100},
            {text: 'File Name', dataIndex: 'FILENAME', flex: 1},
            {text: 'Qty Rows', dataIndex: 'QTYROWS', width: 100},
            {
                xtype: 'actioncolumn',
                width: 80,
                text: 'Formatted',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-log',
                        tooltip: 'Open Formatting',
                        handler: 'onClickFormateo'
                    }
                ]
            },
            {
                xtype: 'actioncolumn',
                width: 80,
                text: 'Delivery',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-log',
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
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


