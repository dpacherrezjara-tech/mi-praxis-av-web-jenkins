/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.TAXRATD.DataEntryTAXRATDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/TAXRATD',
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


        Ext.getCmp(prototype.id + '-txtA1007CTATO').setValue(data.A1202CODTA);
        Ext.getCmp(prototype.id + '-txtA1007PAITA').setValue(data.A1202PAITA);
        Ext.getCmp(prototype.id + '-txtA1007NOMBR').setValue(data.A1202TNAME);
        Ext.getCmp(prototype.id + '-txtA1007DEFI').setValue(data.A1202TDEFI);
        Ext.getCmp(prototype.id + '-txtA1007PDEST').setValue(data.A1202PDESC);

        Ext.getCmp(prototype.id + '-txtA1007INTERL').setValue((data.A1202INTER === 'Y' ? 'YES' : 'NO'));
        Ext.getCmp(prototype.id + '-txtA1007ODEPA').setValue((data.A1202ODEPA === 'Y' ? 'YES' : 'NO'));
        Ext.getCmp(prototype.id + '-txtA1007OARRIV').setValue((data.A1202OARRI === 'Y' ? 'YES' : 'NO'));




        Ext.getCmp(prototype.id + '-USCR').setValue(data.A1202UINGR);
        Ext.getCmp(prototype.id + '-FECR').setValue(data.A1202FINGR);

        Ext.getCmp(prototype.id + '-USUP').setValue(data.A1202UMODI);
        Ext.getCmp(prototype.id + '-FEUP').setValue(data.A1202FMODI);


    },
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }



});


