Ext.define('Ext.Praxis.controller.payments.AccountingReport.LoggerDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoggerDataEntryController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 20000
      }),
    afterRender: function () {
        this.loadLogger();
    },
    loadLogger: async function(){
        const me = this;
        const grid = Ext.getCmp(prototype.idDE2 + '-gridLogger');
        try {
            grid.setLoading(true);
            const res = await me.request.get('loadLogCont',{
                params: me.view.searchParams
            });
            const {response} = res.data;
            let store = new Ext.data.Store({
               data:response 
            });
            grid.setStore(store);
        } catch (e) {
            console.error(e);
        } finally {
            grid.setLoading(false);
        }

    },
    onCancelClick: function () {
        this.view.close();
    }
});
