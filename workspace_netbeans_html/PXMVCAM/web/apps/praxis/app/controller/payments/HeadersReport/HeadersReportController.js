Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeadersReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeadersReportController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    init: function (view) {
    },
    afterRender: async function () {
        this.onClickSearchBtn();
    },
    onClickSearchBtn:function(){
        let params = this.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid', {
            id: prototype.id + '-HeadersGrid-1',
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    onAddRecord:function(){
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
    },
    formatParams:function(){
        const filters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        return filters.getValues();
    }
});