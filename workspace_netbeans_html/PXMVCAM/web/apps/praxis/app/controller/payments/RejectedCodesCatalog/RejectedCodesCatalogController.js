Ext.define('Ext.Praxis.controller.payments.RejectedCodesCatalog.RejectedCodesCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RejectedCodesCatalogController',
    url: CONTEXTPATH + '/RejectedCodesCatalog',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/RejectedCodesCatalog',
        timeout: 0
    }),
    init: function (view) {
        prototype.id = 'RejectedCodesForm';
        prototype.url = CONTEXTPATH + '/RejectedCodesCatalog';
        prototype.width = 1900;
        prototype.height = 630;
        fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();
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
    },
    onAddRecord:function(){
       const dataEntry = Ext.create('Ext.Praxis.view.payments.RejectedCodesForm.DataEntrys.CodeMaintenanceDataEntry', {
            id: prototype.id + '-CodeMaintenanceDataEntry-1',
            option:'C'
        }); 
        dataEntry.show();
    },
    onDisplayFilterBtn:function(){
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if(filters.isVisible()){
            filters.hide();
        }else{
            filters.show();
        }
    },
    onClearOptionsBtn:function(){
        Ext.getCmp(prototype.id + '-formFilters').getForm().reset();
    }
});