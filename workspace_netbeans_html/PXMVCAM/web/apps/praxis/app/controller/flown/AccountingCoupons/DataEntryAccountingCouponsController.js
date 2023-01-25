Ext.define('Ext.Praxis.controller.flown.AccountingCoupons.DataEntryAccountingCouponsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingCouponsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDta: '',
    strFormatDate: '',
    nombreFile: '',
    str: '',
    tempLink: '',
    // </editor-fold>
    init: function(view) {
    },
    afterRender: function(){
        this.p = this.view.params;
        meDta = this;
        this.mostrarData(this.p.FECHA);
    },
    onBtnExport_Click: function(column, e, row, column, x, rowData) {
        Ext.getCmp(prototype.id + '-btnDownload').show();
        var data = x.record.data;
        meDta.nombreFile = data.strFormatDate; 
        console.log(meDta.nombreFile);
    },
    mostrarData: function(FECHA) {
        this.setValue('txtDate', FECHA.substring(0,4));
        this.setValue('txtPernum', FECHA.substring(4,6));
        this.exportFile1(FECHA);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onDownloadClick: function() {
        global.getFile(prototype.url + '/getIDECZip?FECHA=' + this.p.FECHA + '&NOMBRE=' + meDta.nombreFile);
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="exportFile1">
    exportFile1: function(FECHA) {
        Ext.Ajax.request({
            url: prototype.url+'/exportFile1',
            method: 'POST',
            timeout: 60000000,
            params: {
                strFecha: FECHA
            },
            beforerequest: Ext.getCmp(prototype.id + '-gridFileNames').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaFile = res.listaArray;
                    if (listaFile.length > 0) {
                        var storeGridData = Ext.create("Ext.Praxis.store.flown.AccountingCoupons.GridDataFileNames", {
                            data: listaFile
                        });
                        Ext.getCmp(prototype.id + '-gridFileNames').bindStore(storeGridData);
                        meDta.strFormatDate = listaFile[0].strFormatDate;
                        meDta.str = res.str;
                    } else {
                        global.Msg({ msg: 'This File has not been created.' });
                        meDta.onCancelClick();
                    }
//                } else global.Msg({ msg: res.sesion });
                } else global.Msg({ msg: 'This File has not been created.' });
                Ext.getCmp(prototype.id + '-gridFileNames').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-gridFileNames').unmask();
            }
        });
    },
    // </editor-fold>
    
    bin2string: function(array){
        var result = "";
        for(var i = 0; i < array.length; ++i){
            result+= (String.fromCharCode(array[i]));
        }
        return result;
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
    // </editor-fold>
});