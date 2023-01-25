/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryTAXCOMMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryTAXCOMMController',
    url: CONTEXTPATH + '/SalesReport',
    paramsTAXCOMM: {},
    /**
     * Constructor
     */
    init: function(view) {

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    afterRender: function() {
        this.getDataInputs();
    },
    getDataInputs: function() {

        var p = this.view.params;
        var IN_AIRLIN = p.IN_AIRLIN;
        var IN_CIA = p.IN_CIA;
        var IN_FORMA = p.IN_FORMA;
        var IN_SERIE = p.IN_SERIE;
        var A720SEQ = p.A720SEQ;

        paramsTAXCOMM = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1534SEQ: A720SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadTicket_TAXCOMM',
            method: 'POST',
            timeout: 60000000,
            params: paramsTAXCOMM,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryTAXCOMM').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_TAXCOMM = res.lstTKT_TAXCOMM;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstTKT_TAXCOMM,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-det-gridDataTktTAXCOMM').bindStore(storeData);
                Ext.getCmp(prototype.id + '-dataEntryTAXCOMM').unmask('Loading...', '');
            }
        });
 },
});


