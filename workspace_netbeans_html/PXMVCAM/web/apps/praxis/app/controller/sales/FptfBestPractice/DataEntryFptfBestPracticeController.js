/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.FptfBestPractice.DataEntryFptfBestPracticeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/FptfAirline',
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        console.log("URL : " + this.url);
        var p = this.view.params;
        this.getDataInputs();
    } 
  
    , getDataInputs: function() {
        var p = this.view.params;
        var data = p.data;
         
        
        console.log(data);    
     
        
        
         Ext.getCmp(prototype.id + '-A722AIRLIN').setValue(data.A722AIRLIN);
        Ext.getCmp(prototype.id + '-A722FORMA').setValue(data.A722FORMA);
        Ext.getCmp(prototype.id + '-txtA722UFORMA').setValue(data.A722UFORMA);
        Ext.getCmp(prototype.id + '-txtds_A722UFORMA').setValue(data.ds_A722UFORMA);
        Ext.getCmp(prototype.id + '-txtA722FTEVTA').setValue(data.A722FTEVTA);
        Ext.getCmp(prototype.id + '-txtds_A722FTEVTA').setValue(data.ds_A722FTEVTA);
        Ext.getCmp(prototype.id + '-txtstrFormatDate').setValue(data.strFormatDate);
        Ext.getCmp(prototype.id + '-txtstrFormatDate2').setValue(data.strFormatDate2);
        Ext.getCmp(prototype.id + '-txtA722TFORM1').setValue(data.A722TFORM1);
        Ext.getCmp(prototype.id + '-txtA722TFORM2').setValue(data.A722TFORM2);
        Ext.getCmp(prototype.id + '-txtA722TFORM3').setValue(data.A722TFORM3);
        Ext.getCmp(prototype.id + '-txtds_A722TFORM3').setValue(data.ds_A722TFORM3);
        Ext.getCmp(prototype.id + '-txtA722VFORMA').setValue(data.A722VFORMA);
        Ext.getCmp(prototype.id + '-txtstrA722VFORMA').setValue(data.strA722VFORMA);
        Ext.getCmp(prototype.id + '-txtA722METODO').setValue(data.A722METODO);
        Ext.getCmp(prototype.id + '-txtstrA722METODO').setValue(data.strA722METODO);
        Ext.getCmp(prototype.id + '-txtA722INDSCN').setValue(data.A722INDSCN);
        Ext.getCmp(prototype.id + '-txtstrA722INDSCN').setValue(data.strA722INDSCN);
        Ext.getCmp(prototype.id + '-txtA722DIGSER').setValue(data.A722DIGSER);
        Ext.getCmp(prototype.id + '-txtA722EMTCUP').setValue(data.A722EMTCUP);
        Ext.getCmp(prototype.id + '-txtA722TOTCUP').setValue(data.A722TOTCUP);
        Ext.getCmp(prototype.id + '-USCR').setValue(data.A722REGIST);
        Ext.getCmp(prototype.id + '-FECR').setValue(data.A722FREGIS);
        Ext.getCmp(prototype.id + '-HOCR').setValue(data.A722HREGIS);
        Ext.getCmp(prototype.id + '-USUP').setValue(data.A722REVISA);
        Ext.getCmp(prototype.id + '-FEUP').setValue(data.A722FREVIS);
        Ext.getCmp(prototype.id + '-HOUP').setValue(data.A722HREVIS);
        

    }



});


