Ext.define('Ext.Praxis.controller.sales.InvoiceCommissionConsortia.LoadFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadFileController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    msjAlert: '',
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'I':
                Ext.getCmp(prototype.idLoadFileConsortia+'-btn-upload').show();
                break;
        }
    },
    onUploadChange: function(cmp, value) {
        this.file = cmp.fileInputEl.dom.files[0];
        if (this.file !== undefined) {
            cmp.setRawValue(this.file.name);
            if (cmp.getErrors().length>0) Ext.getCmp(prototype.idLoadFileConsortia+'-btn-upload').disable(true);
            else Ext.getCmp(prototype.idLoadFileConsortia+'-btn-upload').enable(true);
        } else Ext.getCmp(prototype.idLoadFileConsortia+'-btn-upload').disable(true);
    },
        
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onInsertClick: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to upload the file ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.getCmp(prototype.idLoadFileConsortia+'-btn-upload').disable(true);
                    this.setData();
                }
            }
        });
    },
    onCancelClick: function(){
        this.view.close();
    },
    // </editor-fold>
    
    setData: function() {
        var me = this;
        var file = Ext.getCmp(prototype.idLoadFileConsortia + '-file').getValue();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "Select File", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idLoadFileConsortia + '-File').focus();", 100);
            });
            return;
        }    
        me.searchParams.VP_ACTION = 'I';
        me.searchParams.VP_A2447CCUST = '139';
        me.searchParams.fileName = file;
        var form = Ext.getCmp(prototype.idLoadFileConsortia + '-form-01').getForm();
        form.submit({
            url: prototype.url + '/setData',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {beanString:JSON.stringify(me.searchParams)},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                //var res = Ext.JSON.decode(response.responseText);
                var mensaje = res.sesion;
                if (res.success) {
                    var SQLCODE = res.SQLCODE;
                    var MESSAGE = res.MESSAGE;
                    var msj = MESSAGE;
                    if (SQLCODE!=="0"){
                        msj = "Archivo cargado; pero contiene errores";
                    }
                    Ext.MessageBox.alert('PRAXIS', msj, function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel'){
                            if (SQLCODE==="0") {
                                Ext.getCmp(prototype.idLoadFileConsortia + '-win').close();
                            }else{
                                Ext.create('Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.LoadErrorFile', {
                                    id: 'LoadErrorFileInvoiceCommissionConsortiaForm',
                                    params: {
                                        data: MESSAGE
                                    }
                                }).show();
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: mensaje
                    });
                }
                Ext.getCmp(prototype.idLoadFileConsortia+'-btn-upload').enable(true);
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.idLoadFileConsortia+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.idLoadFileConsortia+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.idLoadFileConsortia+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});