Ext.define('Ext.Praxis.controller.payments.AccountsCatalog.AccountsCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountsCatalogController',
    init: function (view) {
    },
    afterRender: async function () {
        this.loadGrid();
    },
    loadGrid: function(){
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const grid = Ext.create('Ext.Praxis.view.payments.AccountsCatalogForm.Grids.MainGrid',{
            id: prototype.id + '-MainGrid-1',
            searchParams:me.formatParams()
        });
        mainPanel.add(grid);
    },
    formatParams: function(){
        const filters = Ext.getCmp(prototype.id + '-formFilters').getValues();
        return filters;
    },
    onClickSearchBtn:function(){
        this.loadGrid();
    },
    onAddRecord:function(){
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountsCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            option:'C',
            reloadGrid: ()=>{
                me.loadGrid();
            }
        });
        dataEntry.show();
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        formFilters.reset();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    }
});