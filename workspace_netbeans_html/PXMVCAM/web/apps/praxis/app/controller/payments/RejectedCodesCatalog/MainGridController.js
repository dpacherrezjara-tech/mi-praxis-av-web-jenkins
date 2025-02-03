Ext.define('Ext.Praxis.controller.payments.RejectedCodesCatalog.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    url: CONTEXTPATH + '/RejectedCodesCatalog',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/RejectedCodesCatalog',
        timeout: 0
    }),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadMain();
    },
    loadMain: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.get('loadMain', {
                params: me.view.searchParams
            });
            let store = new Ext.data.Store({
                data: res.data.response
            });
            me.view.setStore(store);
        } catch (e) {
            console.error(e);
        }finally {
            me.view.setLoading(false);
        }
    },
    onUpdate: function(){
        const mainWin = Ext.create('Ext.Praxis.view.payments.RejectedCodesForm.DataEntrys.CodeMaintenanceDataEntry',{
            id : prototype.id + '-CodeMaintenanceDataEntry-1',
            option:'U'
        });
        mainWin.show();
    }
});