Ext.define('Ext.Praxis.controller.sales.LoadVirtualCardUATP.DataEntryLoadVirtualCardUATPController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLoadVirtualCardUATPController',
    msjAlert: '',
    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-cmbtINDACN').setValue("U");
                Ext.getCmp(prototype.id + '-CHECK_UPFRONT').setValue("1");
                Ext.getCmp(prototype.id + '-CHECK_BACKEND').setValue("0");
                Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD').focus();
                break;
        }
    },
    getDataInputs: function(rec) {
//        this.setComboBoxItemData(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD').setValue(rec.get('A2860VCARD'));
        Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD_BCK').setValue(rec.get('A2860VCARD'));
        Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD_ENC').setValue(rec.get('A2860VCARX'));
        Ext.getCmp(prototype.id + '-DATE_EFFEC').setValue(rec.get('A2860EFFST'));
        Ext.getCmp(prototype.id + '-DATE_TERM').setValue(rec.get('A2860EFFEN'));
        Ext.getCmp(prototype.id + '-CHECK_UPFRONT').setValue(rec.get('A2860APLYU')==='SI'?true:false);
        Ext.getCmp(prototype.id + '-CHECK_BACKEND').setValue(rec.get('A2860APLYB')==='SI'?true:false);
        Ext.getCmp(prototype.id + '-TXT_PRODUCT').setValue(rec.get('A2860PRODU'));
        Ext.getCmp(prototype.id + '-TXT_SELECT_TRADE').setValue(rec.get('A2860COMNM'));
        
        Ext.getCmp(prototype.id + '-cmbtINDACN').setValue("U");
        
//        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A2860UINGR'));
//        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A2860FINGR'));
//        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A2860HINGR'));
//        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A2860UMODI'));
//        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A2860FMODI'));
//        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A2860HMODI'));
    },
    onUploadChange: function(cmp, value) {
        this.file = cmp.fileInputEl.dom.files[0];
        if (this.file !== undefined) cmp.setRawValue(this.file.name);
    },
    onSaveFilterClick: function(cmp, value) {
        var txtRutaExcel = Ext.getCmp(prototype.id+'-txtRutaExcel2').getValue();
        if (txtRutaExcel === '') {
            global.Msg({
                msg: 'Select file.'
            });
        } else {
            this.p = this.view.params;
            var txtXLSError = this.p.txtXLSError;
            var cmbtINDAC = this.p.cmbtINDAC;
            
            var TXT_VIRTUAL_CARD_BCK = Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD_BCK').getValue();
            var TXT_VIRTUAL_CARD = Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD').getValue();
            var DATE_EFFEC = Ext.util.Format.date(Ext.getCmp(prototype.id + '-DATE_EFFEC').getValue(), 'Ymd');
            var DATE_TERM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-DATE_TERM').getValue(), 'Ymd');
            var CHECK_UPFRONT = Ext.getCmp(prototype.id + '-CHECK_UPFRONT').getValue();
            var CHECK_BACKEND = Ext.getCmp(prototype.id + '-CHECK_BACKEND').getValue();
            var TXT_PRODUCT = Ext.getCmp(prototype.id + '-TXT_PRODUCT').getValue();
            var TXT_SELECT_TRADE = Ext.getCmp(prototype.id + '-TXT_SELECT_TRADE').getValue();
            if (txtXLSError.length === 0) {
                this.reader = new FileReader();
                this.reader.onload = (function(theFile) {
                    return function(e) {
                        this.arrBytes = e.target.result;
                        Ext.Ajax.request({
                            url: prototype.url + '/setLoadExcel',
                            method: 'POST',
                            timeout: 60000000,
                            params: {
                                arrBytes : this.arrBytes,
                                filename: txtRutaExcel,
                                A2860INDAC: cmbtINDAC,
                                A2860VCARX: TXT_VIRTUAL_CARD_BCK,
                                A2860VCARD: TXT_VIRTUAL_CARD,
                                A2860EFFST: DATE_EFFEC,
                                A2860EFFEN: DATE_TERM,
                                A2860APLYU: CHECK_UPFRONT.selected?'SI':'NO',
                                A2860APLYB: CHECK_BACKEND.selected?'SI':'NO',
                                A2860PRODU: TXT_PRODUCT,
                                A2860COMNM: TXT_SELECT_TRADE
                            },
                            beforerequest: Ext.getCmp('DataEntryLoadVirtualCardUATPForm').mask('Loading...'),
                            success: function(response, options){
                                var res = Ext.JSON.decode(response.responseText);
                                var mensaje = res.sesion;
                                if (res.success) {
                                    if (mensaje !== '') {
                                        global.Msg({
                                            msg: mensaje
                                        });
                                    } else {
                                        global.Msg({
                                            title: 'Load Excel Virtual Card - Upload Process',
                                            msg: 'Process completed successfully!'
                                        });
                                    }
                                    
                                } else {
                                    global.Msg({
                                        msg: mensaje,
                                        icon: 0
                                    });
                                }
                                Ext.getCmp('DataEntryLoadVirtualCardUATPForm').unmask();
                            },
                            failure: function(response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                                Ext.getCmp('DataEntryLoadVirtualCardUATPForm').unmask();
                            }
                        });
                    };
                })(this.file);
                this.reader.readAsBinaryString(this.file);
            } else {
                global.Msg({
                    msg: txtXLSError,
                    buttons: 0,
                    icon: 2
                });
            }
        }
    },
    onCancelClick: function(btn){
        this.view.close();
        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    validaRequiredFields: function(OP) {
        var bvalida = true;
        var cmbtINDACN = Ext.getCmp(prototype.id + '-cmbtINDACN').getValue();
        var TXT_VIRTUAL_CARD = Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD').getValue();
        var DATE_EFFEC = Ext.util.Format.date(Ext.getCmp(prototype.id + '-DATE_EFFEC').getValue(), 'Ymd');
        if (cmbtINDACN ==="") {
            this.msjAlert = "Selected Type";
            Ext.getCmp(prototype.id + '-cmbtINDACN').focus();
            bvalida = false;
        }
        if (TXT_VIRTUAL_CARD ==="") {
            this.msjAlert = "Enter, VIRTUAL CARD";
            Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD').focus();
            bvalida = false;
        }
        if (OP !== 'D') {
            if (DATE_EFFEC ==="") {
                this.msjAlert = "Enter, Effective Date Open MCO";
                Ext.getCmp(prototype.id + '-DATE_EFFEC').focus();
                bvalida = false;
            }
        }
        return bvalida;
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        if (this.validaRequiredFields("I")) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
//                        console.log("LISTO PARA SAVE");
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        } else {
            if (this.msjAlert === '') {
                global.Msg({
                    msg: 'You must enter all required fields.',
                    fn: function() {}
                });
            } else {
                global.Msg({
                    msg: this.msjAlert
                });
            }
        }
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        
        if (this.validaRequiredFields("U")) {
            Ext.Msg.show({
                title:'.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn){
                    if (btn === 'yes'){
//                        console.log("LISTO PARA UPDATE");
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        } else {
            if (this.msjAlert === '') {
                global.Msg({
                    msg: 'You must enter all required fields.',
                    fn: function() {}
                });
            } else {
                global.Msg({
                    msg: this.msjAlert
                });
            }
        }
    },
    onDeleteClick: function(btn) {
        var p = this.view.params;
        if (this.validaRequiredFields("D")) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to delete ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
//                        console.log("LISTO PARA DELETE");
                        this.view.params.action = "D";
                        this.crud();
                    }
                }
            });
        } else {
            if (this.msjAlert === '') {
                global.Msg({
                    msg: 'You must enter all required fields.',
                    fn: function() {}
                });
            } else {
                global.Msg({
                    msg: this.msjAlert
                });
            }
        }
    },
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/setMantenimientoCARDUATP',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.intResult;
                var icon=1;
                if(msg==='DUPLICATE KEY, VERIFY!'){
                    icon=2;
                }

                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryLoadVirtualCardUATPForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        var cmbtINDACN = Ext.getCmp(prototype.id + '-cmbtINDACN').getValue();
        var TXT_VIRTUAL_CARD_BCK = Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD_BCK').getValue();
        var TXT_VIRTUAL_CARD = Ext.getCmp(prototype.id + '-TXT_VIRTUAL_CARD').getValue();
        var DATE_EFFEC = Ext.util.Format.date(Ext.getCmp(prototype.id + '-DATE_EFFEC').getValue(), 'Ymd');
        var DATE_TERM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-DATE_TERM').getValue(), 'Ymd');
        var CHECK_UPFRONT = Ext.getCmp(prototype.id + '-CHECK_UPFRONT').getValue();
        var CHECK_BACKEND = Ext.getCmp(prototype.id + '-CHECK_BACKEND').getValue();
        var TXT_PRODUCT = Ext.getCmp(prototype.id + '-TXT_PRODUCT').getValue();
        var TXT_SELECT_TRADE = Ext.getCmp(prototype.id + '-TXT_SELECT_TRADE').getValue();
        
        return {
            strOption: strOption,
            A2860INDAC: cmbtINDACN,
            A2860VCARX: TXT_VIRTUAL_CARD_BCK,
            A2860VCARD: TXT_VIRTUAL_CARD,
            A2860EFFST: DATE_EFFEC,
            A2860EFFEN: DATE_TERM,
            A2860APLYU: CHECK_UPFRONT?'SI':'NO',
            A2860APLYB: CHECK_BACKEND?'SI':'NO',
            A2860PRODU: TXT_PRODUCT,
            A2860COMNM: TXT_SELECT_TRADE
        };
    }
});