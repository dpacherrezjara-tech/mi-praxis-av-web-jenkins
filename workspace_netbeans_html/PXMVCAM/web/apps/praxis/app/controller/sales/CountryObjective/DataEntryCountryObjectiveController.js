Ext.define('Ext.Praxis.controller.sales.CountryObjective.DataEntryCountryObjectiveController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCountryObjectiveController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    // </editor-fold>
    init: function(view) {
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.mostrarData(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
        }
        // global.AccessControlMaganer();
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        var data = rec.data;
        this.setValue('txtGSA', data.A1841GSA);
        this.setValue('txtArea', data.A1841AREA);
        this.setValue('txtCountry', data.A1841PAIS);
        this.setValue('txtYear', data.A1841YEAR);
        this.setValue('txtPaymentCurrency', data.A1841MPAG);
        this.setValue('txtQuote', Ext.util.Format.number(data.A1841CUOTA, '0,000.00'));
        this.setValue('txtQuote01', Ext.util.Format.number(data.A1841CUO01, '0,000.00'));
        this.setValue('txtQuote02', Ext.util.Format.number(data.A1841CUO02, '0,000.00'));
        this.setValue('txtQuote03', Ext.util.Format.number(data.A1841CUO03, '0,000.00'));
        this.setValue('txtQuote04', Ext.util.Format.number(data.A1841CUO04, '0,000.00'));
        this.setValue('txtQuote05', Ext.util.Format.number(data.A1841CUO05, '0,000.00'));
        this.setValue('txtQuote06', Ext.util.Format.number(data.A1841CUO06, '0,000.00'));
        this.setValue('txtQuote07', Ext.util.Format.number(data.A1841CUO07, '0,000.00'));
        this.setValue('txtQuote08', Ext.util.Format.number(data.A1841CUO08, '0,000.00'));
        this.setValue('txtQuote09', Ext.util.Format.number(data.A1841CUO09, '0,000.00'));
        this.setValue('txtQuote10', Ext.util.Format.number(data.A1841CUO10, '0,000.00'));
        this.setValue('txtQuote11', Ext.util.Format.number(data.A1841CUO11, '0,000.00'));
        this.setValue('txtQuote12', Ext.util.Format.number(data.A1841CUO12, '0,000.00'));
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Navegación">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
    // </editor-fold>
});