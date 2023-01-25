/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.CouponsError.DeliveryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-DeliveryController',   
   
    init: function(view) {

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        this.param = this.view.params;
        Ext.getCmp(prototype.id + 'del-txtTexto').setValue(this.param.strTextoBSP);
    },
    onBtnClose:function(){
         Ext.getCmp(prototype.id + '-deliveryInformation').close();
    }
 



});


