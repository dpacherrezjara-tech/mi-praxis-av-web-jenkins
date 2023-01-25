Ext.define('Ext.Praxis.controller.interline.PassengerInvoicesIp.DataEntryPassengerInvoicesIpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPassengerInvoicesIpController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    // </editor-fold>
    afterRender: function() {
        meDe = this;
        this.p = this.view.params;
        this.bean = this.p.bean;
        console.log(this.bean);
        this.llenarData();
    },
    llenarData: function() {
        this.setValue('de-txtNUMRMK', meDe.bean.NUMRMK);
        this.setValue('de-txtREMARK1', meDe.bean.REMARK1);
        this.setValue('de-txtREMARK2', meDe.bean.REMARK2);
        this.setValue('de-txtREMARK3', meDe.bean.REMARK3);
        this.setValue('de-txtREMARK4', meDe.bean.REMARK4);
        this.setValue('de-txtREMARK5', meDe.bean.REMARK5);

    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onCancelClick: function(btn) {
        this.view.close();
    }
});