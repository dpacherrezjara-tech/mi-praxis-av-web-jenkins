Ext.define('Ext.Praxis.controller.flown.OCRLoad.DataEntryOCRLoadController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryOCRLoadController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    msjAlert: '',
    beanOption: {
        strTicket: "",
        DCHEQ: "",
        SEQ: "",
        FCONT: "",
        CDEPART: "",
        CARRIVA: "",
        ZONA: "",
        NFLIGHT: "",
        DFLIGHT: "",
        NPLANE: "",
        LEGSEQ: "",
        STVAL: "",
        FTE: "",
        TDOC: "",
        TKTASO: "",
        QTYPAX: "",
        CCIA: "",
        FORMA: "",
        SERIE: "",
        CUPON: "",
        MDACP: "",
        VCPN: "0",
        COMISI: "0",
        VTAX: "0"
    },
    // </editor-fold>
    init: function(view) {
    },
    afterRender: function(){
        this.p = this.view.params;
        me = this;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id+'-txtTicket').setReadOnly(true);
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id+'-txtTicket').setReadOnly(false);
                Ext.getCmp(prototype.id+'-cmbFTE').setValue("");
                Ext.getCmp(prototype.id+'-cmbSTVAL').setValue("");
                Ext.getCmp(prototype.id+'-cmbType').setValue("T");
                break;
        }
        // global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {
        var txtTKT = rec.get('strTicket').replace(/\s/g, "");
        if (txtTKT === '') {
            global.Msg({
                msg: 'Record not found'
            });
        } else {
            Ext.Ajax.request({
                url: prototype.url+'/searchBeanTkt',
                method: 'POST',
                timeout: 60000000,
                params: {
                    strTicket: txtTKT
                },
                beforerequest: Ext.getCmp('DataEntryOCRLoadForm').mask('Loading...'),
                success: function(response, options){
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {
                        var ruta = res.ruta;
                        var carpeta = res.carpeta;
                        var imagen = res.imagen;
                        var beanCons = res.beanConsTkt;
                        
                        me.mostrarData(beanCons);
                        
                        if (imagen !== "") {
                            me.getImagen(txtTKT, carpeta, ruta);
                        }
                    } else {
                        global.Msg({
                            msg: res.sesion,
                            icon: 0
                        });
                    }
                    Ext.getCmp('DataEntryOCRLoadForm').unmask();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code '+response.status);
                    Ext.getCmp('DataEntryOCRLoadForm').unmask();
                }
            });
        }
    },
    mostrarData: function(beanCons) {
        Ext.getCmp(prototype.id+'-txtTicket').setValue(beanCons.strTicket.replace(/\s/g, ""));
        Ext.getCmp(prototype.id+'-txtDCHEQ').setValue(beanCons.DCHEQ);
        if(beanCons.SEQ === '') Ext.getCmp(prototype.id+'-txtSEQ').setValue("00");
        else Ext.getCmp(prototype.id+'-txtSEQ').setValue(beanCons.SEQ);
        if(beanCons.FCONT === '') Ext.getCmp(prototype.id+'-txtFCONT').setValue(beanCons.DFLIGHT.substring(0, 6));
        else Ext.getCmp(prototype.id+'-txtFCONT').setValue(beanCons.FCONT);
//                Ext.getCmp(prototype.id+'-txtMDACP').setValue(beanCons.strTicket);
        Ext.getCmp(prototype.id+'-txtCDEPART').setValue(beanCons.CDEPART);
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCDEPART',
            html: beanCons.strDescCDEPART
        });
        Ext.getCmp(prototype.id+'-txtCARRIVA').setValue(beanCons.CARRIVA);
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCARRIVA',
            html: beanCons.strDescCARRIVA
        });
        Ext.getCmp(prototype.id+'-txtZONE').setValue(beanCons.ZONA);
//                Ext.getCmp(prototype.id+'-txtVCPN').setValue(beanCons.strTicket);
        Ext.getCmp(prototype.id+'-txtDFLIGHT').setValue(beanCons.DFLIGHT);
        Ext.getCmp(prototype.id+'-txtNFLIGHT').setValue(beanCons.NFLIGHT);
        Ext.getCmp(prototype.id+'-txtNPLANE').setValue(beanCons.NPLANE);
//                Ext.getCmp(prototype.id+'-txtCOMISI').setValue(beanCons.strTicket);
        Ext.getCmp(prototype.id+'-cmbSTVAL').setValue(beanCons.STVAL);
        Ext.getCmp(prototype.id+'-txtLEGSEQ').setValue(beanCons.LEGSEQ);
        Ext.getCmp(prototype.id+'-cmbFTE').setValue(beanCons.FTE);
//                Ext.getCmp(prototype.id+'-txtVTAX').setValue(beanCons.strTicket);
        Ext.getCmp(prototype.id+'-txtTKTASO').setValue("");
//                Ext.getCmp(prototype.id+'-txtQTYPAX').setValue(beanCons.strTicket);
        Ext.getCmp(prototype.id+'-cmbType').setValue("T");
        this.beanOption.CCIA = beanCons.CCIA;
        if (beanCons.CCIA!==139) {
            Ext.getCmp(prototype.id + '-txtMDACP').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtVCPN').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtCOMISI').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtVTAX').setReadOnly(false);
        } else {
            Ext.getCmp(prototype.id + '-txtMDACP').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtVCPN').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtCOMISI').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtVTAX').setReadOnly(true);
        }
    },
    getImagen: function(strTicket, carpeta, strRuta) {
        Ext.Ajax.request({
            url: prototype.url+'/getImagen',
            params: {strOption: 'AM_IMG_OCR', strTicket: strTicket, strFVuelo: carpeta, strRuta: strRuta},
            method: 'GET',
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    res = res.data;
                    Ext.getCmp(prototype.id+'-imgImage').setSrc('data:image/jpeg;base64,'+res+'');
                } else {
                    Ext.getCmp(prototype.id+'-imgImage').setSrc('resources/img/not_picture.png');
                    global.Msg({
                        msg: 'Image Not Found.'
                    });
                }
            }
        });
    },
    onPrevClick: function() {
        var store = this.p.store;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex > 0) {
            var rec = store.getAt(rowIndex - 1);
            this.p = {action: "U", rec: rec, store: this.p.store, rowIndex: rowIndex - 1};
            this.getDataInputs(rec);
        }
    },
    onNextClick: function() {
        var store = this.p.store;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex < 19) {
            var rec = store.getAt(rowIndex+1);
            this.p = {action: "U", rec: rec, store: this.p.store, rowIndex: rowIndex+1};
            this.getDataInputs(rec);
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    validaRequiredFields: function() {
        this.msjAlert = "";
        if (this.beanOption.strTicket==="") {
            this.focus("txtTicket");
            return false;
        } else {
            var txtTicketError = Ext.getCmp(prototype.id + '-txtTicket').getErrors();
            if (txtTicketError.length>0) {
                this.focus("txtTicket");
                this.msjAlert = "Airline tickets have 14-digit identification numbers.\n[CCIA(3)FORM(4)SERIE(6)COUPON(1)]";
                return false;
            }
        }
        if (this.beanOption.DCHEQ==="") {
            this.focus("txtDCHEQ");
            return false;
        } else {
            var txtDCHEQError = Ext.getCmp(prototype.id + '-txtDCHEQ').getErrors();
            if (txtDCHEQError.length>0) {
                this.focus("txtDCHEQ");
                this.msjAlert = txtDCHEQError;
                return false;
            }
        }
        if (this.beanOption.CDEPART==="") {
            this.focus("txtCDEPART");
            return false;
        } else {
            var txtCDEPARTError = Ext.getCmp(prototype.id + '-txtCDEPART').getErrors();
            if (txtCDEPARTError.length>0) {
                this.focus("txtCDEPART");
                this.msjAlert = txtCDEPARTError;
                return false;
            }
        }
        if (this.beanOption.CARRIVA==="") {
            this.focus("txtCARRIVA");
            return false;
        } else {
            var txtCARRIVAError = Ext.getCmp(prototype.id + '-txtCARRIVA').getErrors();
            if (txtCARRIVAError.length>0) {
                this.focus("txtCARRIVA");
                this.msjAlert = txtCARRIVAError;
                return false;
            }
        }
        if (this.beanOption.DFLIGHT==="") {
            this.focus("txtDFLIGHT");
            return false;
        } else {
            var txtDFLIGHTError = Ext.getCmp(prototype.id + '-txtDFLIGHT').getErrors();
            if (txtDFLIGHTError.length>0) {
                this.focus("txtDFLIGHT");
                this.msjAlert = txtDFLIGHTError;
                return false;
            }
        }
        if (this.beanOption.NFLIGHT==="") {
            this.focus("txtNFLIGHT");
            return false;
        } else {
            var txtNFLIGHTError = Ext.getCmp(prototype.id + '-txtNFLIGHT').getErrors();
            if (txtNFLIGHTError.length>0) {
                this.focus("txtNFLIGHT");
                this.msjAlert = txtNFLIGHTError;
                return false;
            }
        }
        var d1 = Ext.getCmp(prototype.id+'-txtDFLIGHT').getValue("txtDFLIGHT").getTime();
        var d2 = new Date().getTime();
        if (d1>d2) {
            this.focus("txtDFLIGHT");
            this.msjAlert = "Flight Date cannot be higher than Current Date";
            return false;
        }
        return true;
    },
    llenarData: function() {
        this.beanOption.strTicket = Ext.getCmp(prototype.id+'-txtTicket').getValue();
        this.beanOption.DCHEQ = Ext.getCmp(prototype.id+'-txtDCHEQ').getValue();
        var txtSEQ = Ext.getCmp(prototype.id+'-txtSEQ').getValue();
        
        if (txtSEQ === '') this.beanOption.SEQ = '00';
        else this.beanOption.SEQ = txtSEQ;
        
        var txtFCONT = Ext.getCmp(prototype.id+'-txtFCONT').getValue();
        this.beanOption.DFLIGHT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtDFLIGHT').getValue(), 'Ymd');
        if (txtFCONT === '' && this.beanOption.DFLIGHT.length === 8) this.beanOption.FCONT = this.beanOption.DFLIGHT.substring(0, 6);
        else this.beanOption.FCONT = txtFCONT;
        
        this.beanOption.CDEPART = Ext.getCmp(prototype.id+'-txtCDEPART').getValue();
        this.beanOption.CARRIVA = Ext.getCmp(prototype.id+'-txtCARRIVA').getValue();
        this.beanOption.ZONA = Ext.getCmp(prototype.id+'-txtZONE').getValue();
        this.beanOption.NFLIGHT = Ext.getCmp(prototype.id+'-txtNFLIGHT').getValue();
        this.beanOption.NPLANE = Ext.getCmp(prototype.id+'-txtNPLANE').getValue();
        this.beanOption.LEGSEQ = Ext.getCmp(prototype.id+'-txtLEGSEQ').getValue();
        this.beanOption.STVAL = Ext.getCmp(prototype.id+'-cmbSTVAL').getValue();
        this.beanOption.FTE = Ext.getCmp(prototype.id+'-cmbFTE').getValue();
        var cmbType = Ext.getCmp(prototype.id+'-cmbType').getValue();
        this.beanOption.TDOC = cmbType===null?"T":cmbType;
        this.beanOption.TKTASO = Ext.getCmp(prototype.id+'-txtTKTASO').getValue();
        var txtQTYPAX = Ext.getCmp(prototype.id+'-txtQTYPAX').getValue();
        if (this.beanOption.TDOC === 'F') {
            if (txtQTYPAX !== '') this.beanOption.QTYPAX = txtQTYPAX.replace(',', '');
            else this.beanOption.QTYPAX = 0;
        }
        if (this.beanOption.CCIA!=="139") {
            this.beanOption.MDACP = this.getValue("txtMDACP");
            if (this.getValue("txtVCPN")!=="") {
                this.beanOption.VCPN = this.getValue("txtVCPN").replace(',', '');
            } else {
                this.beanOption.VCPN = 0;
            }
            if (this.getValue("txtCOMISI")!=="") {
                this.beanOption.COMISI = this.getValue("txtCOMISI").replace(',', '');
            } else {
                this.beanOption.COMISI = 0;
            }
            if (this.getValue("txtVTAX")!=="") {
                this.beanOption.VTAX = this.getValue("txtVTAX").replace(',', '');
            } else {
                this.beanOption.VTAX = 0;
            }
        }
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue().trim();
    },
    focus: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).focus();
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "I";
                    this.llenarData();
                    if (this.validaRequiredFields()) {
                        this.beanOption.CCIA = this.beanOption.strTicket.substring(0, 3);
                        this.beanOption.FORMA = this.beanOption.strTicket.substring(3, 7);
                        this.beanOption.SERIE = this.beanOption.strTicket.substring(7, 13);
                        this.beanOption.CUPON = this.beanOption.strTicket.substring(13, 14);
                        this.crud();
                    } else {
                        var msg = this.msjAlert;
                        if (msg==='') msg = 'You must enter all required fields.';
                        global.Msg({
                            msg: msg
                        });
                    }
                }
            }
        });
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        
//        if (this.validaRequiredFields()) {
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
                    this.llenarData();
                    window.alert("listo update");
//                    this.crud();
                }
            }
        });
//        } else {
//            global.Msg({
//                msg: 'You must enter all required fields.',
//                fn: function() {}
//            });
//        }
    },
    onDeleteClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.beanOption.CCUST = p.rec.data.CCUST;
                    this.beanOption.CCIA = p.rec.data.CCIA;
                    this.beanOption.FORMA = p.rec.data.FORMA;
                    this.beanOption.SERIE = p.rec.data.SERIE;
                    this.beanOption.CUPON = p.rec.data.CUPON;
                    this.beanOption.strTicket = p.rec.data.CCIA + p.rec.data.FORMA + p.rec.data.SERIE + p.rec.data.CUPON;
                    this.beanOption.DFLIGHT = p.rec.data.DFLIGHT;
                    this.beanOption.NFLIGHT = p.rec.data.NFLIGHT;
                    this.beanOption.CDEPART = p.rec.data.CDEPART;
                    this.beanOption.CARRIVA = p.rec.data.CARRIVA;
                    this.crud();
                }
            }
        });
    },
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url+'/executeOptionTkt',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            beforerequest: Ext.getCmp('DataEntryOCRLoadForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp('DataEntryOCRLoadForm').unmask();
                if (res.success) {
                    var msg = res.msjOption;
                    switch (msg) {
                        case 'DUPLICATE KEY, VERIFY!':
                        case 'Departure City does not exist':
                        case 'ERROR.The ticket is posted or taken by Interline.':
                            global.Msg({
                                msg: msg,
                                icon: 2
                            });
                            break;
                        default:
                            global.Msg({
                                msg: msg,
                                fn: function() {
                                    Ext.getCmp('DataEntryOCRLoadForm').close(),
                                    Ext.getCmp(prototype.id+'-btnSearch').fireEvent('click', {});
                                }
                            });
                    }
                } else {
                    global.Msg({
                        msg: res.sesion,
                        icon: 0
                    });
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryOCRLoadForm').unmask();
            }
        });
    },
    onCmbTypeChange: function(combo , newValue , oldValue , eOpts) {
        Ext.getCmp(prototype.id + '-txtQTYPAX').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtTKTASO').setReadOnly(true);
        if (newValue==="F") {
            Ext.getCmp(prototype.id + '-txtQTYPAX').setReadOnly(false);
        } else if(newValue==="M") {
            Ext.getCmp(prototype.id + '-txtTKTASO').setReadOnly(false);
        }
    },
    getDataEntryValues: function() {
        var p = this.view.params;
        var strOption = p.action;
        
        console.log(this.beanOption);
        
        return {
            strOption: strOption,
            DFLIGHT: this.beanOption.DFLIGHT,
            NFLIGHT: this.beanOption.NFLIGHT,
            CDEPART: this.beanOption.CDEPART,
            CARRIVA: this.beanOption.CARRIVA,
            
            PSVVTA: "",
            AGTIA: "",
//            CARR: this.beanOption,
            STVAL: this.beanOption.STVAL,
            TKTASO: this.beanOption.TKTASO,
            strTicket: this.beanOption.strTicket,
            
            CCIA: this.beanOption.CCIA,
            FORMA: this.beanOption.FORMA,
            SERIE: this.beanOption.SERIE,
            CUPON: this.beanOption.CUPON,
            DCHEQ: this.beanOption.DCHEQ,
            ZONA: this.beanOption.ZONA,
            VCPN: this.beanOption.VCPN,
            COMISI: this.beanOption.COMISI,
            VTAX: this.beanOption.VTAX,
            MDACP: this.beanOption.MDACP,
            RFIC: "",
            RECODE: "",
            FOPERZUL: "",
//            FVAL: this.beanOption,
//            FECVAL: this.beanOption,
//            IN_CARR: this.beanOption,
            
            TDOC: this.beanOption.TDOC,
            FLOAD: "",
            QTYPAX: this.beanOption.QTYPAX,
            CABI: "",
            CLAS: "",
            FBASE: "",
            NPLANE: this.beanOption.NPLANE
        };
    }
});