/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.FareBasis.DataEntryFareBasisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/FareBasis',
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
        Ext.getCmp(prototype.id + '-txtA721AIRLIN').setValue(data.A721AIRLIN);
        Ext.getCmp(prototype.id + '-txtA721AIRLN2').setValue(data.A721AIRLN2);
        Ext.getCmp(prototype.id + '-txtA721FBASIS').setValue(data.A721FBASIS);
        Ext.getCmp(prototype.id + '-txtA721CODIGO').setValue(data.A721CODIGO);
        Ext.getCmp(prototype.id + '-txtA721CLASE').setValue(data.A721CLASE);

        Ext.getCmp(prototype.id + '-txtA721TEMPOR').setValue(data.A721TEMPOR);
        Ext.getCmp(prototype.id + '-txtA721SEMANA').setValue(data.A721SEMANA);
        Ext.getCmp(prototype.id + '-txtA721DIA').setValue(data.A721DIA);
        Ext.getCmp(prototype.id + '-txtA721CODTRF').setValue(data.A721CODTRF);
        Ext.getCmp(prototype.id + '-txtA721CODATP').setValue(data.A721CODATP);
        Ext.getCmp(prototype.id + '-txtA721TIPIAT').setValue(data.A721TIPIAT);
        Ext.getCmp(prototype.id + '-txtA721TIPTRF').setValue(data.A721TIPTRF);

        if (data.A721CODTRF === '1') {
            Ext.getCmp(prototype.id + '-txtA721CANVLD').setValue(data.A721CANVLD);
        } else if (data.A721CODTRF === '4' || data.A721CODTRF === '5' || data.A721CODTRF === '6' || data.A721CODTRF === '7') {
            Ext.getCmp(prototype.id + '-txtA721CANVLD').setValue(data.A721CANMIN);
        }

        Ext.getCmp(prototype.id + '-txtA721INDVLD').setValue(data.A721INDVLD);
        Ext.getCmp(prototype.id + '-txtA721NVLTRF').setValue(data.A721NVLTRF);
        Ext.getCmp(prototype.id + '-txtA721GI').setValue(data.A721GI);
        Ext.getCmp(prototype.id + '-txtA721RBD').setValue(data.A721RBD);
        Ext.getCmp(prototype.id + '-txtA721OBS').setValue(data.A721OBS);
        Ext.getCmp(prototype.id + '-txtA721VIGEN').setValue(data.A721VIGEN);
        Ext.getCmp(prototype.id + '-txtA721TERMI').setValue(data.A721TERMI);
        Ext.getCmp(prototype.id + '-txtA721REGIST').setValue(data.A721REGIST);
        Ext.getCmp(prototype.id + '-txtA721FREGIS').setValue(data.A721FREGIS);
        Ext.getCmp(prototype.id + '-txtA721HREGIS').setValue(data.A721HREGIS);
        Ext.getCmp(prototype.id + '-txtA721REVISA').setValue(data.A721REVISA);
        Ext.getCmp(prototype.id + '-txtA721FREVIS').setValue(data.A721FREVIS);
        Ext.getCmp(prototype.id + '-txtA721HREVIS').setValue(data.A721HREVIS);


    },
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }




});


