Ext.define('Ext.Praxis.controller.interline.PassengerInvoicesIp.DataEntryExPassengerInvoicesIpController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryExPassengerInvoicesIpController',
    meEntryIp: '',
    p: {},
    strFormatDate: '',
    str: '',
    tempLink: '',
    dwfile: '',
    init: function(view) {
        meEntryIp = this;
        this.p = this.view.params;
        console.log(this.p);
    },
    afterRender: function(){
        Ext.getCmp(prototype.id + '-txtDate').setValue(this.p.strFecha);
        Ext.getCmp(prototype.id + '-txtPernum').setValue(this.p.strFuente);
    },
    btnExport_clickHandler: function(cmp, cpm2, numRow, numCol, cpm3, rowData) {
        var data = rowData.data;
        var bean = {
            FILLER1: data.FILLER1,
            strFormatDate: data.strFormatDate
        };
        meEntryIp.dwfile = JSON.stringify(bean);
        Ext.getCmp(prototype.id + '-btnDownload').show();
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    btnDownload_cliclHandler: function() {
//        this.tempLink.setAttribute('download', this.strFormatDate);
//        this.tempLink.click();
        global.getFile(prototype.url + '/getIDECZip?beanString=' + meEntryIp.dwfile);
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