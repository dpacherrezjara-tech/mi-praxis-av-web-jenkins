Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.FormateoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-FormateoGrid',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.FormateoGridController'
    ],
    controller: 'FormateoGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1200,
    store: [],
    title: 'Formatted',
    titleAlign: 'center',
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
                width: 60
            },
            {text: 'File ID', dataIndex: 'FILEID', width: 100},
            {text: 'Date', dataIndex: 'VALDATE', width: 100},
            {text: 'Seq', dataIndex: 'SEQ', width: 100},
            {text: 'Status', dataIndex: 'STPRO', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "background-color:#838187";
                    console.log('value', value);
                    console.log('record', record);
                    const opts = {
                        'Y': () => {
//                            metaData.style = "background-color:#638be1;color:#ffffff;font-weight:bold";
                            return 'PROCESSED';
                        },
                        'N': () => {
//                            metaData.style = "background-color:#88d556;font-weight:bold";
                            return 'NO PROCESSED';
                        },
                    };
                    return opts[value]();
                }
            },
            {text: 'Error',
                flex:1,
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {text: 'Code', dataIndex: 'CERROR', width: 100},
                    {text: 'Description', dataIndex: 'DESCERR', flex:1}
                ]},
            {text: 'Creation',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {text: 'Date', dataIndex: 'FECR', width: 100},
                    {text: 'Time', dataIndex: 'HOCR', width: 100}
                ]}

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


