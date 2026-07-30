Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.DeliveryGrid', {
    extend: 'Ext.Praxis.view.widgets.StoreProcGrid',
    alias: 'widget.' + prototype.id + '-DeliveryGrid',
    requires: [
        'Ext.Praxis.view.widgets.StoreProcGrid'
    ],
    library: 'PRAXISMP',
    storeProcedure: 'MPS294',
    pageSize: 20,
    memoryPaging: true,
    showExcelButton: true,
    gridTitle: 'Delivery',
    gridColumns: {
        defaults: { align: 'center', menuDisabled: true, sortable: true },
        items: [
            { text: 'RN', locked: true, xtype: 'rownumberer', width: 60 },
            { text: 'Detail', dataIndex: 'TRAMA', flex: 1, align: 'left' },
            {
                text: 'Creation',
                columns: [
                    { text: 'Date', dataIndex: 'FECR', width: 100, align: 'center', menuDisabled: true },
                    { text: 'Time', dataIndex: 'HOCR', width: 100, align: 'center', menuDisabled: true }
                ]
            }
        ]
    }
});
