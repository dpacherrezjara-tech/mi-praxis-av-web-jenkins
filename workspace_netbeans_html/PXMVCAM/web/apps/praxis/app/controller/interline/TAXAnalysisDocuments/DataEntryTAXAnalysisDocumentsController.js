Ext.define('Ext.Praxis.controller.interline.TAXAnalysisDocuments.DataEntryTAXAnalysisDocumentsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTAXAnalysisDocumentsController',
    p: '',
    init: function(view) {
        this.p = this.view.params;
    },
    afterRender: function(){
        this.mostrarData(this.p.gridDataAC);
    },
    mostrarData: function(gridDataAC) {
        Ext.getCmp(prototype.id + '-gridData2').bindStore(
            Ext.create("Ext.Praxis.store.interline.GridData", { data: gridDataAC })
        );
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