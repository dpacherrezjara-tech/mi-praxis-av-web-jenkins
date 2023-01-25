/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.MinimunRule.DataEntryMinimunRuleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/MinimunRule',
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
      
        var p = this.view.params;

        switch (p.action) {
            case 'I':
                break;
            case 'U':
                this.getDataInputs();              

                this.view.setHeight(this.view.getHeight());
                break;
        }
    }   
 
    ,
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }   
    ,
    onClearInputs: function() {
    
    }
    , getDataInputs: function() {
        var p = this.view.params;
        rec = p.rec;

        Ext.getCmp(prototype.id + '-txtA025KEY').setValue(rec.get('A025KEY'));
        Ext.getCmp(prototype.id + '-txtA025COEFIC').setValue(rec.get('A025COEFIC'));
      

    }



});


