Ext.define('Ext.Praxis.controller.sales.Miscellaneous.DataEntryMiscellaneousController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMiscellaneousController',

    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        this.getDataInputs(this.p.rec);
        Ext.getCmp(prototype.id+'-btn-save').hide();
        Ext.getCmp(prototype.id+'-btn-update').hide();
        Ext.getCmp(prototype.id+'-btn-delete').hide();
        Ext.getCmp(prototype.id+'-btn-cancel').show();
    },
    getDataInputs: function(rec) {
        Ext.getCmp(prototype.id + '-txtA051KEY1').setValue(rec.get('A051KEY1'));
        Ext.getCmp(prototype.id + '-txtA051KEY2').setValue(rec.get('A051KEY2'));
        Ext.getCmp(prototype.id + '-txtA051DESCR1').setValue(rec.get('A051DESCR1'));
        Ext.getCmp(prototype.id + '-txtA051DESCR2').setValue(rec.get('A051DESCR2'));
        Ext.getCmp(prototype.id + '-txtA051CANTI1').setValue(Ext.util.Format.number(rec.get('A051CANTI1'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA051CANTI2').setValue(Ext.util.Format.number(rec.get('A051CANTI2'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA051FECHA1').setValue(rec.get('A051FECHA1'));
        Ext.getCmp(prototype.id + '-txtA051FECHA2').setValue(rec.get('A051FECHA2'));
        Ext.getCmp(prototype.id + '-txtA051COMENT').setValue(rec.get('A051COMENT'));
        Ext.getCmp(prototype.id + '-txtA051STATUS').setValue(rec.get('A051STATUS'));
    },
    onCancelClick: function(btn){
        this.view.close();
    }
});