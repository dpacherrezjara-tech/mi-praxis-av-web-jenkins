/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.LoadReport.DataEntryInfInteractController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idInfInteract + '-dataEntryInfInteractController',
    url: CONTEXTPATH + '/LoadReport',
    paramsInfInteract: {},
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
        var IN_WKSTAT = p.STATION;
        var IN_FREPOR = p.FREPOR;
        paramsInfInteract = {
            IN_WKSTAT: IN_WKSTAT,
            IN_FREPOR: IN_FREPOR
        };
        Ext.Ajax.request({
            url: this.url + '/loadPX031S02PXF050',
            method: 'POST',
            timeout: 60000000,
            params: paramsInfInteract,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstPXF050 = res.lstPXF050;
                var file;
                var bolAdd;
                var strPrevRECORD;
                var intCountEmpty;
                if (lstPXF050.length > 0) {
                    var strText = '';
                    for (var i = 0; i < lstPXF050.length; i++) {
                        file = lstPXF050[i];
                        bolAdd = false;
                        if(i === 0){
                            strPrevRECORD = file.RECOR;
                            bolAdd = true;
                        }else if(file.RECOR.trim() === '' && strPrevRECORD.trim() === ''){
                            if(++intCountEmpty <= 2){
                                bolAdd = true;
                            }
                        }else{
                            strPrevRECORD = file.RECOR;
                            if(file.RECOR.trim() === ''){
                                intCountEmpty = 1;
                            }else{
                                intCountEmpty = 0;
                            }
                            bolAdd = true;
                        }
                        if(bolAdd === true){
                            //aTempRECORD[aTempRECORD.length] = file.RECOR;
                            strText += file.RECOR + '\n';
                        }
                    }
                    Ext.getCmp(prototype.idInfInteract + '-det-TxtInfInteract').setValue(strText);
                }
            }
        });
    }
});