Ext.define('Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingGridController', {
    extend: 'Ext.Base',
    baseCtrl: null,
    widgetView: null,

    onRowAction: function (action, record, rowIndex, grid) {
        if (action === 'edit') {
            const { IDCONT, BANDOC, DATECI, TRANCI } = record.data;
            const dateEntry = Ext.create(
                'Ext.Praxis.view.payments.ReverseAccountingForm.DataEntrys.ReverseAccountingDataEntry',
                {
                    id: prototype.id + '-ReverseAccountingDataEntry-1',
                    searchParams: {
                        IN_IDCONT: IDCONT,
                        IN_BANDOC: BANDOC,
                        IN_DATECI: DATECI,
                        IN_TRANCI: TRANCI
                    }
                }
            );
            dateEntry.show();
        }
    },

    onWidgetReady: function (widgetView) {}
});
