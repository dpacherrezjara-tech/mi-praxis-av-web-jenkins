Ext.define('Ext.Praxis.controller.payments.AccountingReport.AdmsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AdmsGridController',
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
        const filters = Ext.getCmp(prototype.id + '-fadm').getForm().getValues();
        let store  = global.callStorePaggin('PRAXISMP','MPS500',filters);
        view.setStore(store);
    }
});

