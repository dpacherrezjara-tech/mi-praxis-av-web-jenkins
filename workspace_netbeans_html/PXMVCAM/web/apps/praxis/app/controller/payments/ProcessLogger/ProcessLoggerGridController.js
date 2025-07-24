Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessLoggerGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessLoggerGridController',
    url: CONTEXTPATH + '/ProcessLog',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: async function (view) {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SPPROL001', view.searchParams);
            
            let lst = res.lstRs.at(0);
            
            if(lst.length===0){
                global.Msg({msg:'No data'});
                return;
            }
            
            let store = new Ext.data.Store({
                data: lst,
                pageSize: 20, // Cantidad de registros por página
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });
            me.view.setStore(store);
        } catch (e) {
            global.Msg({msg:'Error on load Data'});
        } finally {
            me.view.setLoading(false);
        }

    }
});