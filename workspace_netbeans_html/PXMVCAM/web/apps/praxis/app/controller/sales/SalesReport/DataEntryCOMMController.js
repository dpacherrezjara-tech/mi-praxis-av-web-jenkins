/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryCOMMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryCOMMController',
    url: CONTEXTPATH + '/SalesReport',
    paramsCOMM: {},
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

        paramsCOMM = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1533SEQ: A720SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadTicket_COMM',
            method: 'POST',
            timeout: 60000000,
            params: paramsCOMM,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryCOMM').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_COMM = res.lstTKT_COMM;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstTKT_COMM,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-det-gridDataTktCOMM').bindStore(storeData);
                Ext.getCmp(prototype.id + '-dataEntryCOMM').unmask('Loading...', '');
            }
        });
 },
});


