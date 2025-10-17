Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.DeliveryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DeliveryGrid',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.DeliveryGridController'
    ],
    controller: 'DeliveryGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1200,
    store: [],
    title: 'Delivery',
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
            {text: 'Detail', dataIndex: 'TRAMA', flex:1},
//            {text: 'Type', dataIndex: 'TIPO', width: 100},
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


