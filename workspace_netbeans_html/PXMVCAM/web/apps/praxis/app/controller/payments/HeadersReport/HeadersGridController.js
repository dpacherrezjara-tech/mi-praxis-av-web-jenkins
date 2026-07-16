Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeadersGridController', {
    extend: 'Ext.Base',
    baseCtrl:   null,
    widgetView: null,
    onRowAction: function (action, record, rowIndex, grid) {
        if (action === 'edit') {
            global.cleanPXobj(record.data);
            Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.HeaderDataEntry', {
                id: prototype.id + '-HeaderDataEntry-1',
                praxisId: record.data.IDCONT,
                filters: this.widgetView.filters
            }).show();
        }
    },
    onWidgetReady: function (widgetView) {}
});
