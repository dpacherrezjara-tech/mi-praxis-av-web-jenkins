Ext.define('Ext.Praxis.controller.sales.GSAIncentiveConditions.DataEntryGSAIncentiveConditionsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryGSAIncentiveConditionsController',
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
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        var data = rec.data;
        this.setValue('txtGSA', data.A1774GSA);
        this.setValue('txtArea', data.A1774AREA);
        this.setValue('txtCountry', data.A1774PAIS);
        this.setValue('txtCity', data.A1774CITY);
        this.setValue('txtInitialRange', Ext.util.Format.number(data.A1774RINI, '0,000.00'));
        this.setValue('txtEndRange', Ext.util.Format.number(data.A1774RFIN, '0,000.00'));
        this.setValue('txtAnnualPercentOfCommision', Ext.util.Format.number(data.A1774COMA, '0,000.00'));
        this.setValue('txtMonthlyPercentOfCommision', Ext.util.Format.number(data.A1774COMM, '0,000.00'));
        this.setValue('txtYearAplication', data.A1774APLA);
        this.setValue('txtMonthAplication', data.A1774APLM);
        this.setValue('txtNetExclude', data.A1774EXC);
        this.setValue('txtInitialDateValidity', data.A1774FIVIG);
        this.setValue('txtEndDateValidity', data.A1774FFVIG);
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