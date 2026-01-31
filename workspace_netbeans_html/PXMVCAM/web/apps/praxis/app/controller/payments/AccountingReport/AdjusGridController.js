Ext.define('Ext.Praxis.controller.payments.AccountingReport.AdjusGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AdjusGridController',
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
        const filters = Ext.getCmp(prototype.id + '-fadju').getForm().getValues();
        let store  = global.callStorePaggin('PRAXISMP','MPS501',filters);
        view.setStore(store);
    },
    onLoadDetail: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        let newWin = Ext.create('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.AdjuDetailDataEntry',{
            id: prototype.id + '-AdjuDetailDataEntry-1',
            obj: record.data
        });
        newWin.show();
    }
});

