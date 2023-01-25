Ext.define('Ext.Praxis.controller.payments.IntalmentSales.DataEntryIntalmentSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryIntalmentSalesController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDe: '',
    actionCode: '',
    bean: {},
    lstA1852: {},
    // </editor-fold>
    init: function(view) {
        meDe = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
//        this.obtainData();
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
                this.limpiarData();
                this.onSearchCompleteDetail();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    obtainData: function() {

        var cmbTTRAN = Ext.getCmp(prototype.id + '-de-cmbTTRAN');
        cmbTTRAN.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["C", "C - Credit"],
                ["D", "D - Debit"]
            ]
        }));
        cmbTTRAN.setValue();
    },
    onSearchCompleteDetail: function() {

        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(meDe.bean.data);
        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
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

        this.setValue('de-txtSDATE', meDe.bean.SDATE);
        this.setValue('de-txtTDOC', meDe.bean.TDOC);
        this.setValue('de-txtstrTOPER', meDe.bean.strTOPER);
        this.setValue('de-txtFTE', meDe.bean.FTE);
        this.setValue('de-txtstrSCARF', meDe.bean.strSCARF);
        this.setValue('de-txtCODEBANK', meDe.bean.CODEBANK);
        this.setValue('de-txtSCARCOD', meDe.bean.SCARCOD);
        this.setValue('de-txtSCARDN', meDe.bean.SCARDN);
        this.setValue('de-txtSAUTHOC', meDe.bean.SAUTHOC);
        this.setValue('de-txtSCOUNTRY', meDe.bean.SCOUNTRY);
        this.setValue('de-txtSPNR', meDe.bean.SPNR);
        this.setValue('de-txtMERCHN', meDe.bean.MERCHN);
        this.setValue('de-txtSAGENT', meDe.bean.SAGENT);
        this.setValue('de-txtstrComment', meDe.bean.strComment);
        this.setValue('de-txtINSTLCOUNT', meDe.bean.INSTLCOUNT);
        this.setValue('de-txtCURRENPAY', meDe.bean.CURRENPAY);
        this.setValue('de-txtTOTALCHRG', Ext.util.Format.number(meDe.bean.TOTALCHRG, '0,000.00'));
        this.setValue('de-txtFIRSTINSAM', Ext.util.Format.number(meDe.bean.FIRSTINSAM, '0,000.00'));
        this.setValue('de-txtTOTALCOM', Ext.util.Format.number(meDe.bean.TOTALCOM, '0,000.00'));
        this.setValue('de-txtTCOMISCA', Ext.util.Format.number(meDe.bean.TCOMISCA, '0,000.00'));
        this.setValue('de-txtdiffTCOMIS', Ext.util.Format.number(meDe.bean.diffTCOMIS, '0,000.00'));
        this.setValue('de-txtQTYTKT', Ext.util.Format.number(meDe.bean.QTYTKT, '0,000'));
        this.setValue('de-txtstrSORIG', meDe.bean.strSORIG);
        this.setValue('de-txtSDATEL', meDe.bean.SDATEL);
        this.setValue('de-txtstrDescStatus', meDe.bean.strDescStatus);
        this.setValue('de-txtFADM1', meDe.bean.FADM1);
        this.setValue('de-txtADMNUM', meDe.bean.ADMNUM);
        this.setValue('de-txtNUMADM', meDe.bean.NUMADM);
        this.setValue('de-txtDATEADM', meDe.bean.DATEADM);
        this.setValue('de-txtCURRADM', meDe.bean.CURRADM);
        this.setValue('de-txtTOTADM', Ext.util.Format.number(meDe.bean.TOTADM, '0,000.00'));
        this.setValue('de-txtUSCR', meDe.bean.USCR);
        this.setValue('de-txtFECR', meDe.bean.FECR);
        this.setValue('de-txtHOCR', meDe.bean.HOCR);
        this.setValue('de-txtUSUP', meDe.bean.USUP);
        this.setValue('de-txtFEUP', meDe.bean.FEUP);
        this.setValue('de-txtHOUP', meDe.bean.HOUP);
        console.log(meDe.bean.FADM);
        if (meDe.bean.FADM === '1') {
            Ext.getCmp(prototype.id + '-de-txtFADM').setValue(true);
            Ext.getCmp(prototype.id + '-de-txtFADM').disable();
        } else {
            Ext.getCmp(prototype.id + '-de-txtFADM').setValue(false);
        }
        Ext.getCmp(prototype.id + '-de-lblstrFADM').setText(meDe.bean.strFADM);
    },
    ShowADM: function() {
        if (Ext.getCmp(prototype.id + '-de-txtFADM').checked) {
            Ext.getCmp(prototype.id + '-de-lblstrFADM').setText('PRE-ADM');
        } else {
            Ext.getCmp(prototype.id + '-de-lblstrFADM').setText('');
        }
    },
//<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        var bean = {};
        bean.SDATE = this.getValue("de-txtSDATE").trim();
        bean.SCOUNTRY = this.getValue("de-txtSCOUNTRY").trim();
        bean.TDOC = this.getValue("de-txtTDOC").trim();
        bean.CODEBANK = this.getValue("de-txtCODEBANK").trim();
        bean.SCARCOD = this.getValue("de-txtSCARCOD").trim();
        bean.SCARDN = this.getValue("de-txtSCARDN").trim();
        bean.SAUTHOC = this.getValue("de-txtSAUTHOC").trim();
        bean.CURRENPAY = this.getValue("de-txtCURRENPAY").trim();
        if (Ext.getCmp(prototype.id + '-de-txtFADM').checked) {
            bean.FADM = "1";
        } else {
            bean.FADM = "";
        }
        if(this.getValue("de-txtdiffTCOMIS") !== ''){
            bean.diffTCOMIS = Number(this.getValue("de-txtdiffTCOMIS").trim().replace(',', '').replace('-', ''));
        }else{
            bean.diffTCOMIS = 0.00;
        }
        var beanString = JSON.stringify(bean);
        beanTemp.beanString = beanString;
        console.log(beanTemp);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('de-txtSCOUNTRY', '');
        this.setValue('de-txtstrDescStatus', '');
        this.setValue('de-txtSDATE', '');
        this.setValue('de-txtTDOC', '');
        this.setValue('de-txtFTE', '');
        this.setValue('de-txtSPNR', '');
        this.setValue('de-txtMERCHN', '');
        this.setValue('de-txtCODEBANK', '');
        this.setValue('de-txtSCARCOD', '');
        this.setValue('de-txtstrSCARF', '');
        this.setValue('de-txtSCARDN', '');
        this.setValue('de-txtSAUTHOC', '');
        this.setValue('de-txtFADM1', '');
        this.setValue('de-txtADMNUM', '');
        this.setValue('de-txtNUMADM', '');
        this.setValue('de-txtDATEADM', '');
        this.setValue('de-txtTOTADM', '');
        this.setValue('de-txtCURRADM', '');
        this.setValue('de-txtSDATEL', '');
        this.setValue('de-txtCURRENPAY', '');
        this.setValue('de-txtstrSORIG', '');
        this.setValue('de-txtTOTALCHRG', '');
        this.setValue('de-txtINSTLCOUNT', '');
        this.setValue('de-txtSAGENT', '');
        this.setValue('de-txtstrComment', '');
        this.setValue('de-txtFIRSTINSAM', '');
        this.setValue('de-txtQTYTKT', '');
        this.setValue('de-txtTOTALCOM', '');
        this.setValue('de-txtTCOMISCA', '');
        this.setValue('de-txtdiffTCOMIS', '');
        this.setValue('de-txtstrTOPER', '');
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