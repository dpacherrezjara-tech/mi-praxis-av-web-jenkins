Ext.define('Ext.Praxis.controller.payments.DataRequestedByBank.DataEntryAvisosDataRequestedByBankController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAvisosDataRequestedByBankController',
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
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCard = this.p.lstCard;
        this.lstBank = this.p.lstBank;
        this.obtainData();
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
//                this.deshabilitarCampos();
//                this.limpiarData();
                this.onSearchCompleteDetail();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    obtainData: function() {

        var cmbStatus = Ext.getCmp(prototype.id + '-de-cmbSTVAL');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Match"],
                ["2", "Notice without Clarification"],
            ]
        }));
        cmbStatus.setValue("");
        var storeData = Ext.create('Ext.data.Store', {
            data: this.lstCard,
            autoLoad: true
        });

        var storeData2 = Ext.create('Ext.data.Store', {
            data: this.lstBank,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').bindStore(storeData);
        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').setValue('');

        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').bindStore(storeData2);
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').setValue('');
    },
    onSearchCompleteDetail: function() {

        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(meDe.bean.data);
        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAvisos',
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean = res.result;
                    meDe.mostrarData();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    mostrarData: function() {

        this.setValue('de-txtREMEDATE', meDe.bean.SENTDATE);
        this.setValue('de-txtMERCHN', meDe.bean.MERCHN);
        this.setValue('de-txtCARDNBR', meDe.bean.strSCARDN);
        this.setValue('de-txtMERCHNAM', meDe.bean.MERCHNAM);
        this.setValue('de-txtAUTHNBR', meDe.bean.AUTHNBR);
        this.setValue('de-txtSQCRFILE', meDe.bean.SQCRFILE);
        if (meDe.bean.STVAL === '1') {
            this.setValue('de-cmbSTVAL', '1');
        } else if (meDe.bean.STVAL === '2') {
            this.setValue('de-cmbSTVAL', '2');
        } else {
            this.setValue('de-cmbSTVAL', '');
        }
        this.setValue('de-cmbSCARCOD', meDe.bean.SCARCOD);
        this.setValue('de-txtAUTAMOUNT', Ext.util.Format.number(meDe.bean.AUTAMOUNT, '0,000.00'));
        this.setValue('de-txtOPEAMOUNT', Ext.util.Format.number(meDe.bean.OPEAMOUNT, '0,000.00'));
        this.setValue('de-txtIVA', Ext.util.Format.number(meDe.bean.IVA, '0,000.00'));
        this.setValue('de-txtAPLIDATE', meDe.bean.APLIDATE);
        this.setValue('de-txtNATURE', meDe.bean.NATURE);
        this.setValue('de-txtCONCEPT', meDe.bean.CONCEPT);
        this.setValue('de-txtQTYTRNX', Ext.util.Format.number(meDe.bean.QTYTRNX, '0,000'));
        this.setValue('de-txtREMESA', meDe.bean.REMESA);
        this.setValue('de-txtREMETIPO', meDe.bean.strFlag);
        this.setValue('de-txtREMEFOLIO', meDe.bean.FOLIO);
        this.setValue('de-cmbCODEBANK', meDe.bean.CODEBANK);
        this.setValue('de-txtFSELEC', meDe.bean.FSELEC);
        this.setValue('de-txtFECSELEC', meDe.bean.FECSELEC);
        this.setValue('de-txtUSCR', meDe.bean.USCR);
        this.setValue('de-txtFECR', meDe.bean.FECR);
        this.setValue('de-txtHOCR', meDe.bean.HOCR);
        this.setValue('de-txtUSUP', meDe.bean.USUP);
        this.setValue('de-txtFEUP', meDe.bean.FEUP);
        this.setValue('de-txtHOUP', meDe.bean.HOUP);
    },
//<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        var bean = {};
        bean.SENTDATE = this.getValue("de-SENTDATE").trim();
        bean.MERCHN = this.getValue("de-txtMERCHN").trim();
        bean.CARDNBR = this.getValue("de-txtCARDNBR").trim();
        bean.MERCHNAM = this.getValue("de-txtMERCHNAM").trim();
        bean.AUTHNBR = this.getValue("de-txtAUTHNBR").trim();
        bean.SQCRFILE = this.getValue("de-txtSQCRFILE").trim();
        bean.STVAL = String(this.getValue("de-cmbSTVAL").trim());
        bean.SCARCOD = String(this.getValue("de-cmbSCARCOD").trim());
        if (this.getValue("de-txtAUTAMOUNT") !== '') {
            bean.AUTAMOUNT = Number(this.getValue("de-txtAUTAMOUNT").trim().replace(',', ''));
        } else {
            bean.AUTAMOUNT = 0;
        }
        if (this.getValue("de-txtOPEAMOUNT") !== '') {
            bean.OPEAMOUNT = Number(this.getValue("de-txtOPEAMOUNT").trim().replace(',', ''));
        } else {
            bean.OPEAMOUNT = 0;
        }
        if (this.getValue("de-txtIVA") !== '') {
            bean.IVA = Number(this.getValue("de-txtIVA").trim().replace(',', ''));
        } else {
            bean.IVA = 0;
        }
        bean.APLIDATE = this.getValue("de-txtAPLIDATE").trim();
        bean.NATURE = this.getValue("de-txtNATURE").trim();
        bean.CONCEPT = this.getValue("de-txtCONCEPT").trim();
        if (this.getValue("de-txtQTYTRNX") !== '') {
            bean.QTYTRNX = Number(this.getValue("de-txtQTYTRNX").trim().replace(',', ''));
        } else {
            bean.QTYTRNX = 0;
        }
        bean.REMESA = this.getValue("de-txtREMESA").trim();
        bean.strFlag = this.getValue("de-txtREMETIPO").trim();
        bean.FOLIO = this.getValue("de-txtREMEFOLIO").trim();
        bean.CODEBANK = String(this.getValue("de-cmbCODEBANK").trim());
        bean.FSELEC = this.getValue("de-txtFSELEC").trim();
        bean.FECSELEC = this.getValue("de-txtFECSELEC").trim();
        var beanString = JSON.stringify(bean);
        beanTemp.beanString = beanString;
        console.log(beanTemp);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('de-txtREMEDATE', '');
        this.setValue('de-txtMERCHN', '');
        this.setValue('de-txtCARDNBR', '');
        this.setValue('de-txtMERCHNAM', '');
        this.setValue('de-txtAUTHNBR', '');
        this.setValue('de-txtSQCRFILE', '');
        this.setValue('de-cmbSCARCOD', '');
        this.setValue('de-cmbSTVAL', '');
        this.setValue('de-txtAUTAMOUNT', '0');
        this.setValue('de-txtOPEAMOUNT', '0');
        this.setValue('de-txtIVA', '0');
        this.setValue('de-txtAPLIDATE', '');
        this.setValue('de-txtNATURE', '');
        this.setValue('de-txtCONCEPT', '');
        this.setValue('de-txtQTYTRNX', '0');
        this.setValue('de-txtREMESA', '');
        this.setValue('de-txtREMETIPO', '');
        this.setValue('de-txtREMEFOLIO', '');
        this.setValue('de-cmbCODEBANK', '');
        this.setValue('de-txtFSELEC', '');
        this.setValue('de-txtFECSELEC', '');
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
            msg: 'Do you want to mark this Credit Card as PRE-ADM ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'U';
                    this.maintenanceBean(beanTemp);
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
    deshabilitarCampos: function() {
//        Ext.getCmp(prototype.id + '-de-txtCODDES').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-de-txtCODEBANK').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-de-txtCTRAN').setReadOnly(true);
    },
    habilitarCampos: function() {
//        Ext.getCmp(prototype.id + '-de-txtCODDES').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-txtCODEBANK').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-txtCTRAN').setReadOnly(false);

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