Ext.define('Ext.Praxis.controller.salesaudit.EMDCodesPrices.DataEntryLoadCodesEMDCodesPricesController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLoadCodesEMDCodesPricesController',
    actionCode: '',
    reader: '',
    arrBytes: '',
    file: '',
    init: function(view){
    },
    afterRender: function(){
    },
    btnUpload_clickHandler: function(cmp, value) {
        this.file = cmp.fileInputEl.dom.files[0];
        if (this.file !== undefined) cmp.setRawValue(this.file.name);
    },
    btnSave_clickHandler: function(cmp, value) {
        var txtRutaExcel = Ext.getCmp(prototype.id+'-txtRutaExcel').getValue();
        if (txtRutaExcel === '') {
            global.Msg({ msg: 'Select file.' });
        } else {
            this.reader = new FileReader();
            this.reader.onload = (function(theFile) {
                return function(e) {
                    this.arrBytes = e.target.result;
                    Ext.Ajax.request({
                        url: prototype.url+'/upload',
                        method: 'POST',
                        timeout: 60000000,
                        params: {
                            arrBytes : this.arrBytes,
                            filename: txtRutaExcel
                        },
                        beforerequest: Ext.getCmp('DataEntryLoadCodesEMDCodesPricesForm').mask('Loading...'),
                        success: function(response, options){
                            Ext.getCmp('DataEntryLoadCodesEMDCodesPricesForm').unmask();
                            var res = Ext.JSON.decode(response.responseText);
                            var mensaje = res.sesion;

                            if(mensaje !== ""){
                                global.Msg({msg: mensaje});
                            }else{
                                global.Msg({
                                    title: 'Load Excel EMD Codes and Prices   - Upload Process',
                                    msg: 'Process completed successfully!'
                                });
                                me.imgSearch_clickHandler();
                            }
                        },
                        failure: function(response, opts) {
                            Ext.getCmp('DataEntryLoadCodesEMDCodesPricesForm').unmask();
                            console.log('server-side failure with status code '+response.status);
                        }
                    });
                };
            })(this.file);
            this.reader.readAsBinaryString(this.file);
        }
    },
});