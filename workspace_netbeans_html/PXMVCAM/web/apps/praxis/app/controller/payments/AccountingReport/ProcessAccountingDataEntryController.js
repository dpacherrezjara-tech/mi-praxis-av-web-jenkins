Ext.define('Ext.Praxis.controller.payments.AccountingReport.ProcessAccountingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessAccountingDataEntryController',
    url: CONTEXTPATH + '/AccountingReport',
    afterRender: function () {
        
    },
    onCancelClick: function () {
        this.view.close();
    }
});
