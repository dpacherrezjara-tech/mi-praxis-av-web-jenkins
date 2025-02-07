Ext.define('Ext.Praxis.controller.payments.RejectedCodesCatalog.RejectedCodesCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RejectedCodesCatalogController',
    url: CONTEXTPATH + '/RejectedCodesCatalog',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/RejectedCodesCatalog',
        timeout: 20000
    }),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadMain();
    },
    loadMain: async function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        let params = Ext.getCmp(prototype.id + '-formFilters').getValues();
        const grid = Ext.create('Ext.Praxis.view.payments.RejectedCodesForm.Grids.MainGrid', {
            id: prototype.id + '-MainGrid-1',
            searchParams: params
        });
        mainPanel.removeAll();
        mainPanel.add(grid);
    },
    onClickSearchBtn:function(){
        this.loadMain();
    }
});