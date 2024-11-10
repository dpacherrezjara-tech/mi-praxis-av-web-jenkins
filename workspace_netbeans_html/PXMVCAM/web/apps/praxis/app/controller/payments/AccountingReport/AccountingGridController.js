Ext.define('Ext.Praxis.controller.payments.AccountingReport.AccountingGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingGridController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
      }),
    init: function (view) {
        if(view.backButton){
            Ext.getCmp(prototype.id + '-acco-btnBack').show();
            Ext.getCmp(prototype.id + '-acco-btnBack').on('click',view.backButton);
        }
    },
    afterRender: function () {
        this.loadGrid();
    },
    loadGrid: async function(){
        const me = this;
        const grid = me.view;
        try {
            grid.setLoading(true);
            const res = await me.request.get('loadAccountingInfo',{
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

    }
});
