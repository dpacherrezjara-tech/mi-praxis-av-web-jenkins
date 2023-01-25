Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryInfoFlightConciliationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInfoFlightConciliationController',
//    me: '',
    init: function(view) {
    },
    afterRender: function(){
        this.p = this.view.params;
//        me = this;
        this.mostrarData(this.p.lstCampos);
    },
    mostrarData: function(lstCampos) {
        var storeGridData = Ext.create("Ext.Praxis.store.flown.FlightConciliation.GridDataEntry", {
            data: lstCampos
        });
        Ext.getCmp(prototype.id + '-gridDataEntryInfo').bindStore(storeGridData);
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).focus();
    }
});