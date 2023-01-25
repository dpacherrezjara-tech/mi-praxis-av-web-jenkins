Ext.define('Ext.Praxis.controller.sales.InvoiceCommissionFOB.LoadErrorFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadErrorFileController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    msjAlert: '',
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
    },
    afterRender: function(){
        this.p = this.view.params;
        Ext.getCmp(prototype.idLoadErrorFileFOB+'-txtError').setValue(this.p.data);
    }
});