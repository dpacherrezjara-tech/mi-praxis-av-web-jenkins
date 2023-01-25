Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryAdyenBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAdyenBankReconciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDe: '',
    actionCode: '',
    bean: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function(view) {
        meDe = this;
        this.p = this.view.params;
        this.lstA2290 = this.p.lstA2290;
//        this.actionCode = this.p.action;
        this.bean = this.p.rec;
//        this.lstCard = this.p.lstCard;
//        this.lstBank = this.p.lstBank;
//        this.lstCountry = this.p.lstCountry;
//        this.obtainData();
        console.log(this.lstA2290);
        this.onSearchCompleteDetail();
    },
    afterRender: function() {

        switch (this.actionCode) {
            case 'I':
                this.habilitarCampos();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.habilitarCampos();
                this.limpiarData();
                this.onSearchCompleteDetail();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'S':
//                this.deshabilitarCampos();
//                this.limpiarData();
//                this.onSearchCompleteDetail();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    obtainData: function() {

    },
    onSearchCompleteDetail: function() {
        if (this.lstA2290 !== null) {
            for (var p = 0; p < this.lstA2290.length; p++) {
                this.bean.data = this.lstA2290[p];
                if (this.bean.data.SORIG === 'BANK') {
                    this.mostrarData(this.bean, '1');
                } else {
                    this.mostrarData(this.bean, '2');
                }
            }
        }
    },
    mostrarData: function(beanTemp, fila) {
        switch (fila) {
            case '1':
                this.setValue('de-lblType01', beanTemp.data.SORIG);
                this.setValue('de-lblDateV01', beanTemp.data.SDATE);
                this.setValue('de-lblCardC01', beanTemp.data.SCARCOD);
//                Ext.create('Ext.tip.ToolTip', {
//                    target: prototype.id + '-de-lblCardC01',
//                    html: beanTemp.data.strDescCard.trim()
//                });
                this.setValue('de-txtCard01', beanTemp.data.strSCARDN);
                this.setValue('de-txtAuthor01', beanTemp.data.SAUTHOC);
                this.setValue('de-lblCurren01', beanTemp.data.SCURRENCY);
                this.setValue('de-txtAmount01', Ext.util.Format.number(beanTemp.data.SVFOP, '0,000.00'));
                this.setValue('de-lblError01', beanTemp.data.CERROR);
                break;
            case '2':
                this.setValue('de-lblType02', beanTemp.data.SORIG);
                this.setValue('de-lblDateV02', beanTemp.data.SDATE);
                this.setValue('de-lblCardC02', beanTemp.data.SCARCOD);
                this.setValue('de-txtCard02', beanTemp.data.strSCARDN);
                this.setValue('de-txtAuthor02', beanTemp.data.SAUTHOC);
                this.setValue('de-lblCurren02', beanTemp.data.SCURRENCY);
                this.setValue('de-txtAmount02', Ext.util.Format.number(beanTemp.data.SVFOP, '0,000.00'));
                this.setValue('de-lblError02', beanTemp.data.CERROR);
                break;
        }

    }
    ,
    cambiarColorChk: function() {
        if (Ext.getCmp(prototype.id + '-de-chkFADYEN').checked) {
            Ext.getCmp(prototype.id + '-de-chkFADYEN').setBoxLabel('<span style="color:#128b1b"><b>ADYEN</b></span>');
        } else {
            Ext.getCmp(prototype.id + '-de-chkFADYEN').setBoxLabel('<span style="color:#0B333C"><b>ADYEN</b></span>');
        }
    },
//<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        var bean = {};
        bean.strComment = "Match" + this.getValue("de-txtComment").trim();
        bean.origSDATE = meDe.bean.origSDATE;
        bean.origSCOUNTRY = meDe.bean.origSCOUNTRY;
        bean.origTDOC = meDe.bean.origTDOC;
        bean.origCODEBANK = meDe.bean.origCODEBANK;
        bean.origSCARCOD = meDe.bean.origSCARCOD;
        bean.origSCARDN = meDe.bean.origSCARDN;
        bean.origSAUTHOC = meDe.bean.origSAUTHOC;
        bean.origSVFOP = meDe.bean.origSVFOP;
        bean.origSCURRENCY = meDe.bean.origSCURRENCY;
        bean.origSEQNUM = meDe.bean.origSEQNUM;
        bean.SDATE = this.getValue("de-txtSDATE").trim();
        bean.TDOC = String(this.getValue("de-cmbTDOC"));
        bean.CBANK = String(this.getValue("de-cmbCODEBANK"));
        bean.SCOUNTRY = String(this.getValue("de-cmbSCOUNTRY"));
        bean.SCARCOD = String(this.getValue("de-cmbSCARCOD"));
        bean.SAUTHOC = this.getValue("de-txtSAUTHOC").trim();
        bean.SCARDN = meDe.bean.SCARDN;
        bean.IN_CARDN1 = this.getValue("de-txtCard1").trim();
        bean.IN_CARDN2 = this.getValue("de-txtCard2").trim();
        if (this.getValue("de-txtSVFOP").trim() !== '') {
            bean.SVFOP = Number(this.getValue("de-txtSVFOP").trim().replace(',', ''));
        } else {
            bean.SVFOP = 0;
        }
        bean.SCURRENCY = this.getValue("de-txtSCURRENCY").trim();
        bean.SEQNUM = this.getValue("de-txtSEQNUM").trim();
        bean.MERCHN = this.getValue("de-txtMERCHN").trim();
        bean.strTRNXCODE = String(this.getValue("de-cmbTRNXCODE"));
        bean.strNUMREF = this.getValue("de-txtNUMREF").trim();
        bean.STVAL = meDe.bean.STVAL;
        bean.BSTVAL = String(this.getValue("de-cmbBSTVAL"));
        bean.TIPOTAR = String(this.getValue("de-cmbTIPOTAR"));
        bean.strPEM = String(this.getValue("de-cmbPEM"));
        bean.SAGENT = this.getValue("de-txtSAGENT").trim();
        bean.SFLOAD = String(this.getValue("de-cmbFLOAD"));
        bean.SDATEL = this.getValue("de-txtLDATE").trim();
        bean.CREJEC = this.getValue("de-txtREASONREJ").trim();
        bean.TDATE = this.getValue("de-txtTDATE").trim();
        bean.DATEF = this.getValue("de-txtDATEF").trim();
        bean.strSORIG = String(this.getValue("de-cmbSORIG"));
        bean.BDATEP = this.getValue("de-txtBDATEP").trim();
        if (this.getValue("de-txtQTYDOC").trim() !== '') {
            bean.lngQTYDOC = Number(this.getValue("de-txtQTYDOC").trim().replace(',', ''));
        } else {
            bean.lngQTYDOC = 0;
        }
        bean.BAID = this.getValue("de-txtBAID").trim();
        bean.FLOADE = String(this.getValue("de-cmbFLOADE"));
        bean.LDATEE = this.getValue("de-txtLDATEE").trim();
        bean.STATUSC = String(this.getValue("de-cmbSTATUSC"));
        bean.DATEC = this.getValue("de-txtDATEC").trim();
        bean.STATT = String(this.getValue("de-cmbSTATT"));
        bean.DATET = this.getValue("de-txtDATET").trim();
        if (Ext.getCmp(prototype.id + '-de-chkFADYEN').checked) {
            bean.FADYEN = "Y";
        } else {
            bean.FADYEN = "";
        }
        var beanString = JSON.stringify(bean);
        beanTemp.beanString = beanString;
        console.log(beanTemp);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('de-txtSDATE', '');
        this.setValue('de-cmbTDOC', 'S');
        this.setValue('de-cmbCODEBANK', '');
        this.setValue('de-cmbSCOUNTRY', '');
        this.setValue('de-cmbSCARCOD', '');
        this.setValue('de-txtSAUTHOC', '');
        this.setValue('de-txtCard1', '');
        this.setValue('de-txtCard2', '');
        this.setValue('de-txtSVFOP', '0');
        this.setValue('de-txtSCURRENCY', '');
        this.setValue('de-txtSEQNUM', '');
        this.setValue('de-txtSTVAL', '');
        this.setValue('de-txtMERCHN', '');
        this.setValue('de-cmbTRNXCODE', '');
        this.setValue('de-txtNUMREF', '');
        this.setValue('de-cmbBSTVAL', '');
        this.setValue('de-cmbTIPOTAR', '');
        this.setValue('de-cmbPEM', '');
        this.setValue('de-txtSAGENT', '');
        this.setValue('de-cmbFLOAD', '');
        this.setValue('de-txtLDATE', '');
        this.setValue('de-txtREASONREJ', '');
        this.setValue('de-txtDESREJ', '');
        this.setValue('de-txtTDATE', '');
        this.setValue('de-txtDATEF', '');
        this.setValue('de-cmbSORIG', '');
        this.setValue('de-txtBDATEP', '');
        this.setValue('de-txtQTYDOC', '0');
        this.setValue('de-cmbFLOADE', '');
        this.setValue('de-txtLDATEE', '');
        this.setValue('de-cmbSTATUSC', '');
        this.setValue('de-txtDATEC', '');
        this.setValue('de-cmbSTATT', '');
        this.setValue('de-txtDATET', '');
        this.setValue('de-txtComment', '');
        this.setValue('de-txtUSCR', '');
        this.setValue('de-txtFECR', '');
        this.setValue('de-txtHOCR', '');
        this.setValue('de-txtUSUP', '');
        this.setValue('de-txtFEUP', '');
        this.setValue('de-txtHOUP', '');
    },
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceA2357(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function(btn) {
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to Update?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    var comentario = this.getValue("de-txtComment").trim();
                    if (msjResult === '') {
                        if (comentario !== '') {
                            if (meDe.bean.STVAL !== '1' && meDe.bean.STVAL !== '4') {
                                beanTemp.option = 'U';
                                this.maintenanceBean(beanTemp);
                            } else {
                                global.Msg({
                                    msg: 'Update can not be applied.'
                                });
                            }
                        } else {
                            global.Msg({
                                msg: 'Comment field is required.'
                            });
                        }
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onDeleteClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(meDe.bean);
                    this.MaintenanceA2357(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="maintenanceBean">
    maintenanceBean: function(beanTemp) {
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/maintenanceBean',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {

                    global.Msg({
                        msg: res.Mensaje,
//                        title: '',
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp(prototype.id + '-dataEntry').close();
                        }
                    });
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    //</editor-fold>

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODDES") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function(beanTemp) {
        var msjResult = '';
//        if (this.getValue("de-txtCODDES") === '') {
//            msjResult = "You must enter the required field.";
//        }
        return msjResult;
    },
    deshabilitarCampos: function() {
        Ext.getCmp(prototype.id + '-de-txtSDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbTDOC').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').disable(true);
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCard1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCard2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSVFOP').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSEQNUM').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbTRNXCODE').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbBSTVAL').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbTIPOTAR').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbPEM').disable(true);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbFLOAD').disable(true);
        Ext.getCmp(prototype.id + '-de-txtLDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtREASONREJ').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDESREJ').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtTDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDATEF').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbSORIG').disable(true);
        Ext.getCmp(prototype.id + '-de-txtBDATEP').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtQTYDOC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(true);
    },
    habilitarCampos: function() {
        Ext.getCmp(prototype.id + '-de-txtSDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-cmbTDOC').disable(false);
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').disable(false);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').disable(false);
        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').disable(false);
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard1').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard2').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSVFOP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSEQNUM').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-cmbTRNXCODE').disable(false);
        Ext.getCmp(prototype.id + '-de-cmbBSTVAL').disable(false);
        Ext.getCmp(prototype.id + '-de-cmbTIPOTAR').disable(false);
        Ext.getCmp(prototype.id + '-de-cmbPEM').disable(false);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-cmbFLOAD').disable(false);
        Ext.getCmp(prototype.id + '-de-txtLDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtREASONREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDESREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtTDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDATEF').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-cmbSORIG').disable(false);
        Ext.getCmp(prototype.id + '-de-txtBDATEP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtQTYDOC').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(false);

    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});

