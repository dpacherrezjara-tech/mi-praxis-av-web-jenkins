Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.BandocInfoDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BandocInfoDataEntryController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
      }),
    afterRender: function () {
        this.loadGrid();
    },
    loadGrid: async function(){
        const me = this;
        const grid = Ext.getCmp(prototype.idDE4 + '-gridBandoc');
        try {
            grid.setLoading(true);
            const res = await me.request.get('evaluateBandoc',{
                params: me.view.searchParams
            });
            const {response} = res.data;
            console.log(response);
            let store = new Ext.data.Store({
               data:response 
            });
            grid.setStore(store);
        } catch (e) {
            console.error(e);
        } finally {
            grid.setLoading(false);
            me.view.center();
        }

    },
    onCancelClick: function () {
        this.view.close();
    },
    onReloadGrid: function(){
        this.loadGrid();
    }
});
