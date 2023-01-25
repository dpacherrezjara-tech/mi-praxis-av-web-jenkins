/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.FptfAirline.DataEntryFptfAirlineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/FptfBestPractice',
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
        var data = p.rec.data;
         
        
        console.log(data);
       
         Ext.getCmp(prototype.id + '-A004FORMA').setValue(data.A004FORMA);
        Ext.getCmp(prototype.id + '-A004TIPODO').setValue(data.A004TIPODO);
        Ext.getCmp(prototype.id + '-A004NROCUP').setValue(data.A004NROCUP);
        Ext.getCmp(prototype.id + '-FORMTYPE').setValue(data.FORMTYPE);
        Ext.getCmp(prototype.id + '-FORMUSE').setValue(data.FORMUSE);
        Ext.getCmp(prototype.id + '-SALESTYPE').setValue(data.SALESTYPE);
        Ext.getCmp(prototype.id + '-METHOD').setValue(data.METHOD);
        Ext.getCmp(prototype.id + '-SCN').setValue(data.SCN);
        Ext.getCmp(prototype.id + '-DESCRIPTIO').setValue(data.DESCRIPTIO);
        

    }, onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }




});


