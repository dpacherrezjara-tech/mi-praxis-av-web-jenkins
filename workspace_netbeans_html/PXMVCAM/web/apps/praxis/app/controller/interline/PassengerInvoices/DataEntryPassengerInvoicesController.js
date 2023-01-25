Ext.define('Ext.Praxis.controller.interline.PassengerInvoices.DataEntryPassengerInvoicesController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPassengerInvoicesController',
    meEntry: '',
    p: {},
    strFormatDate: '',
    str: '',
    tempLink: '',
    dwfile: '',
    init: function(view) {
        meEntry = this;
        this.p = this.view.params;
        console.log(this.p);
    },
    afterRender: function(){
        Ext.getCmp(prototype.id + '-txtDate').setValue(this.p.strFecha);
        Ext.getCmp(prototype.id + '-txtPernum').setValue(this.p.strFuente);
    },
    btnExport_clickHandler: function(cmp, cpm2, numRow, numCol, cpm3, rowData) {
        var data = rowData.data;
        
//        var csvData = new Blob([this.str], {type: 'text/zip;base64;'});
//        var csvURL = window.URL.createObjectURL(csvData);
//        this.tempLink = document.createElement('a');
//        this.tempLink.href = csvURL;
        
        var bean = {
            FILLER1: data.FILLER1,
            strFormatDate: data.strFormatDate
        };
        meEntry.dwfile = JSON.stringify(bean);
        Ext.getCmp(prototype.id + '-btnDownload').show();
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    btnDownload_cliclHandler: function() {
//        this.tempLink.setAttribute('download', this.strFormatDate);
//        this.tempLink.click();
        global.getFile(prototype.url + '/getIDECZip?beanString=' + meEntry.dwfile);
        Ext.getCmp(prototype.id + '-btnDownload').hide();
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