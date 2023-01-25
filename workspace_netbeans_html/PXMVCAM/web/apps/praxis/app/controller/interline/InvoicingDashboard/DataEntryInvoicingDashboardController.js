    Ext.define('Ext.Praxis.controller.interline.InvoicingDashboard.DataEntryInvoicingDashboardController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInvoicingDashboardController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meTAX: '',
    // </editor-fold>
    afterRender: function(){
        meTAX = this;
        this.p = this.view.params;
        Ext.getCmp(prototype.id + '-gridTaxes').bindStore(
            Ext.create("Ext.Praxis.store.interline.GridData", { data: this.p.gridTaxesAC })
        );
    }
});