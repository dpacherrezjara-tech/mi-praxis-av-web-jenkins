Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryExportFlightConciliationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryExportFlightConciliationController',
    meEntry: '',
    p: {},
    strFormatDate: '',
    str: '',
    tempLink: '',
    init: function(view) {
        meEntry = this;
        this.p = this.view.params;
        console.log(this.p);
    },
    afterRender: function(){
        Ext.getCmp(prototype.id + '-txtDate').setValue(this.p.fecha);
//        Ext.getCmp(prototype.id + '-txtPernum').setValue(this.p.strFuente);
    },
    btnExport_clickHandler: function() {
        var csvData = new Blob([this.str], {type: 'text/zip;base64;'});
        var csvURL = window.URL.createObjectURL(csvData);
        this.tempLink = document.createElement('a');
        this.tempLink.href = csvURL;
//        Ext.getCmp(prototype.id + '-btnDownload').show();
        this.tempLink.setAttribute('download', this.strFormatDate);
        this.tempLink.click();
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    btnDownload_cliclHandler: function() {
//        this.tempLink.setAttribute('download', this.strFormatDate);
//        this.tempLink.click();
    },
    // </editor-fold>
//    bin2string: function(array){
//        var result = "";
//        for(var i = 0; i < array.length; ++i){
//            result+= (String.fromCharCode(array[i]));
//        }
//        return result;
//    },
});