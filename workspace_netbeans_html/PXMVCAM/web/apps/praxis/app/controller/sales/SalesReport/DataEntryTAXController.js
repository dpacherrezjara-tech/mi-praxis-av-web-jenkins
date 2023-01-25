/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryTAXController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryTAXController',
    url: CONTEXTPATH + '/SalesReport',
    paramsTAX: {},
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

        paramsTAX = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1532SEQ: A720SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadTicket_TAX',
            method: 'POST',
            timeout: 60000000,
            params: paramsTAX,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryTAX').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_TAX = res.lstTKT_TAX;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstTKT_TAX,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-det-gridDataTktTAX').bindStore(storeData);
                Ext.getCmp(prototype.id + '-dataEntryTAX').unmask('Loading...', '');
            }
        });
 },
});


