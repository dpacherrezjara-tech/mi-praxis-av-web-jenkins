Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeaderIntegratorGridController', {
    extend: 'Ext.Base',
    baseCtrl:   null,
    widgetView: null,

    onRowAction: function (action, record, rowIndex, grid) {
        if (action !== 'detail') return;

        const me = this;
        if (record.data.FILETYPE && record.data.FILETYPE.trim() === 'SUCCESS') {
            global.Msg({ msg: 'No data' });
            return;
        }

        Ext.create(
            'Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.IntegratorDetailModal',
            {
                id:         prototype.id + '-IntegratorDetailModal-1',
                rowData:    record.data,
                baseParams: Ext.apply({}, me.baseCtrl.getFilterParams())
            }
        ).show();
    },

    onWidgetReady: function (widgetView) {}
});
