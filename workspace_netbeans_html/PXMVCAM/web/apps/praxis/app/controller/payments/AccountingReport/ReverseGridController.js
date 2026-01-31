Ext.define('Ext.Praxis.controller.payments.AccountingReport.ReverseGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReverseGridController',
    url: CONTEXTPATH + '/AccountingReport',
    notifier: new AWN(),
    init: function (view) {
        
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: function (view) {
        const me = this;
        const filters = Ext.getCmp(prototype.id + '-frever').getForm().getValues();
        let store  = global.callStorePaggin('PRAXISMP','MPS502',filters);
        view.setStore(store);
    }
});

