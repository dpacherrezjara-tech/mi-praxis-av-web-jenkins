Ext.define('Ext.Praxis.controller.flown.DOT.DataEntryDOTController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDOTController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    strFormatDate: '',
    str: '',
    tempLink: '',
    // </editor-fold>
    init: function(view) {
    },
    afterRender: function(){
        this.p = this.view.params;
        me = this;
        this.mostrarData(this.p.rec);
    },
    onBtnExport_Click: function() {
        var csvData = new Blob([this.str], {type: 'text/csv;base64;'});
        var csvURL = window.URL.createObjectURL(csvData);
        this.tempLink = document.createElement('a');
        this.tempLink.href = csvURL;
        Ext.getCmp(prototype.id + '-btnDownload').show();
    },
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        this.setValue('txtDate', rec.data.YEAR);
        this.setValue('txtPernum', '0'+rec.data.QUARTER);
        this.exportFile1(rec);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onDownloadClick: function() {
        this.tempLink.setAttribute('download', this.strFormatDate);
        this.tempLink.click();
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="exportFile1">
    exportFile1: function(rec) {
        Ext.Ajax.request({
            url: prototype.url+'/exportFile1',
            method: 'POST',
            timeout: 60000000,
            params: {
                strFecha: rec.data.YEAR,
                strPeriodo: '0'+rec.data.QUARTER
            },
            beforerequest: Ext.getCmp(prototype.id + '-gridFileNames').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaFile = res.listaArray;
                    if (listaFile.length > 0) {
                        var storeGridData = Ext.create("Ext.Praxis.store.flown.DOT.GridDataFileNames", {
                            data: listaFile
                        });
                        Ext.getCmp(prototype.id + '-gridFileNames').bindStore(storeGridData);
                        me.strFormatDate = listaFile[0].strFormatDate;
                        me.str = res.str;
                    } else {
                        global.Msg({ msg: 'This File has not been created.' });
                        me.onCancelClick();
                    }
                } else global.Msg({ msg: res.sesion });
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