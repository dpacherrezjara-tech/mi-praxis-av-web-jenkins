/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.LoadGranPlan.DataEntryLoadGranPlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/LoadGranPlanSa',
    lblPreffixOld: '',
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

        global.Msg({
            msg: 'Data Not Found'          
        });

    },
    getDataInputs: function() {

//        var p = this.view.params;
//        var data = p.rec.data;
//
//        Ext.getCmp(prototype.id + '-TXT_A1874CODEA').setValue(data.A2448CODEA.trim());
//        Ext.getCmp(prototype.id + '-TXT_A1874FFINV').setValue(data.A2448FFINV.substr(0, 4) + '/' + data.A2448FFINV.substr(4, 2) + '/' + data.A2448FFINV.substr(6, 2));

    },
    getDataEntryValues: function(strOption) {

//        var OPCION = strOption;
//        var A2448CCUST = '139';
//        var A2448IATA = Ext.getCmp(prototype.id + '-TXT_A1874IATA').getValue();
//       
//
//
//        return {
//            OPCION: OPCION,
//            A2448CCUST: A2448CCUST           
//        };
    },
    onSaveClick: function(btn) {
        global.Msg({
            msg: 'Required Field Form'        
        });
    },    
     onCancelClick: function(btn) {
         Ext.getCmp(prototype.id + '-dataEntry').close();
    },  
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
   


});


