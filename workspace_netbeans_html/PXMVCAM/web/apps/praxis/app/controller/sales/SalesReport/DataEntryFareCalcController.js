/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryFareCalcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryFareCalcController',
    url: CONTEXTPATH + '/SalesReport',
    paramsFareCalc: {},
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

        paramsFareCalc = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1721SEQ: A720SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadTicket_FareCalc',
            method: 'POST',
            timeout: 60000000,
            params: paramsFareCalc,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_FC = res.lstTKT_FC;
                var file;
                if (lstTKT_FC.length > 0) {
                    var strFC = '';
                    for (var i = 0; i < lstTKT_FC.length; i++) {
                        file = lstTKT_FC[i];
                        strFC += file.A1721FRCA;
                    }
                    Ext.getCmp(prototype.id + '-det-TktFareCalc').setValue(strFC);
                }
            }
        });
 }
});


