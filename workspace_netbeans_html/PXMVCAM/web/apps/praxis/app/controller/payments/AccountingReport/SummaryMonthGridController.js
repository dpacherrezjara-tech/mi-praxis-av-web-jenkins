Ext.define('Ext.Praxis.controller.payments.AccountingReport.SummaryMonthGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SummaryMonthGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier:new AWN(),
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-msumm-btnBack').show();
            Ext.getCmp(prototype.id + '-msumm-btnBack').on('click', view.backButton);
        }
    },
    afterRender: function (obj, e) {
        this.getData();
    },
    getData: async function () {
        const me = this;
        try {
            me.view.setLoading(true);
            const res = await me.request.get('loadSummaryAccounting', {
                params: me.view.searchParams
            });
            const {response} = res.data;
            if (response.length > 0) {
                let store = new Ext.data.Store({
                    data: response
                });
                me.view.setStore(store);
            } else {
                global.Msg({msg: 'No data'});
            }
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
        //me.view.unmask();
    }
});