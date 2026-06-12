Ext.define('Ext.Praxis.controller.payments.HeadersReport.SequencesGridController', {
    extend: 'Ext.Base',
    baseCtrl:   null,
    widgetView: null,
    onRowAction: function (action, record, rowIndex, grid) {
        if (action === 'detail') {
            global.cleanPXobj(record.data);
            Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.SequencesDataEntry', {
                id: prototype.id + '-SequencesDataEntry-1',
                obj: record.data,
                filters: this.widgetView.filters,
                reloadGrid: function () {
                    grid.up('storeprocgrid').getController().reload();
                }
            }).show();
        }
    },
    onWidgetReady: function (widgetView) {}
});
