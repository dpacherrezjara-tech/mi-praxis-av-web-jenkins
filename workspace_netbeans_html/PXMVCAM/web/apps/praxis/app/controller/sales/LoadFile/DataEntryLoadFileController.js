Ext.define('Ext.Praxis.controller.sales.LoadFile.DataEntryLoadFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLoadFileController',
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
                Ext.getCmp(prototype.id+'-btn-upload').show();
                break;
        }
    },
    onUploadChange: function(cmp, value) {
        this.file = cmp.fileInputEl.dom.files[0];
        if (this.file !== undefined) {
            cmp.setRawValue(this.file.name);
            if (cmp.getErrors().length>0) Ext.getCmp(prototype.id+'-btn-upload').disable(true);
            else Ext.getCmp(prototype.id+'-btn-upload').enable(true);
        } else Ext.getCmp(prototype.id+'-btn-upload').disable(true);
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
                    Ext.getCmp(prototype.id+'-btn-upload').disable(true);
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
        var txtFile = this.getValue('txtFile');
        var txtPeriodDateFrom = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtPeriodDateFrom').getValue(), 'Ymd');
        var txtPeriodDateTo = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtPeriodDateTo').getValue(), 'Ymd');
        this.reader = new FileReader();
        this.reader.onload = (function(theFile) {
            return function(e) {
                this.arrBytes = e.target.result;
                Ext.Ajax.request({
                    url: prototype.url + '/setData',
                    method: 'POST',
                    timeout: 60000000,
                    params: {
                        VP_OPCION : 'I',
                        arrBytes : this.arrBytes,
                        fileName: txtFile,
                        VP_FPERDES: txtPeriodDateFrom!==''?txtPeriodDateFrom:'',
                        VP_FPERHAS: txtPeriodDateTo!==''?txtPeriodDateTo:'',
                        A1789FORMA: '',
                        A1789SERIE: '',
                        A1789IATA: '',
                        A1789NGPS: '',
                        A1789SRES: '',
                        A1789PNR: '',
                        A1789TFORM: '',
                        A1789FECVT: '',
                        A1789TCAMB: '0.0',
                        A1789MDA: '',
                        A1789TOTAL: '0.0',
                        A1789NPAX: '',
                        A1789STOTA: '0.0'
                    },
//                    beforerequest: Ext.getCmp('DataEntryLoadFileForm').mask('Loading...'),
                    success: function(response, options){
                        var res = Ext.JSON.decode(response.responseText);
                        var mensaje = res.sesion;
                        if (res.success) {
                            var SQLCODE = res.SQLCODE;
                            var MESSAGE = res.MESSAGE;
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: MESSAGE,
                                buttons: Ext.MessageBox.YESNO,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'yes') {
                                        if (SQLCODE==="0") {
                                            Ext.getCmp(prototype.id+'-btn-upload').enable(true);
                                            this.onCancelClick();
                                        }
                                    }
                                }
                            });
                        } else {
                            global.Msg({
                                msg: mensaje
                            });
                        }
//                        Ext.getCmp('DataEntryLoadFileForm').unmask();
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
//                        Ext.getCmp('DataEntryLoadFileForm').unmask();
                    }
                });
            };
        })(this.file);
        this.reader.readAsBinaryString(this.file);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
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