Ext.define('Ext.Praxis.controller.payments.BankStatementTransaction.DataEntryBankStatementTransactionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBankStatementTransactionController',
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
        this.obtainData();
    },
    afterRender: function() {

        switch (this.actionCode) {
            case 'I':
                this.habilitarCampos();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.deshabilitarCampos();
                this.limpiarData();
                this.onSearchCompleteDetail();

                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
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
                ["C", "C - Credit"],
                ["A", "A - Debit"]
            ]
        }));
        cmbTTRAN.setValue('C');
    },
    onSearchCompleteDetail: function() {

        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(meDe.bean.data);

        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
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
        console.log(meDe.bean);
        this.setValue('de-txtSCOUNTRY', meDe.bean.SCOUNTRY);
        this.setValue('de-txtCODEBANK', meDe.bean.CODEBANK);
        this.setValue('de-cmbTTRAN', meDe.bean.TTRAN);
        this.setValue('de-txtCTRAN', meDe.bean.CTRAN);
        this.setValue('de-txtCODDES', meDe.bean.CODDES);

        this.setValue('de-txtDESCEECC', meDe.bean.DESCEECC);
        this.setValue('de-txtDESCRI', meDe.bean.DESCRI);
        this.setValue('de-txtCTRANstr', meDe.bean.strCTRAN);
        this.setValue('de-txtNameCODEBANK', meDe.bean.strCODEBANK);
        this.setValue('de-txtNameCTRY', meDe.bean.strSCOUNTRY);


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
        bean.SCOUNTRY = this.getValue("de-txtSCOUNTRY");
        bean.CODEBANK = this.getValue("de-txtCODEBANK");
        bean.TTRAN = this.getValue("de-cmbTTRAN");
        bean.CTRAN = this.getValue("de-txtCTRAN");
        bean.CODDES = this.getValue("de-txtCODDES");
        bean.DESCEECC = this.getValue("de-txtDESCEECC");
        bean.DESCRI = this.getValue("de-txtDESCRI");
        
        var beanString = JSON.stringify(bean);
        beanTemp.beanString = beanString;
        console.log(beanTemp);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('de-txtSCOUNTRY', '');
        this.setValue('de-txtCODEBANK', '');
        this.setValue('de-cmbTTRAN', '');
        this.setValue('de-txtCTRAN', '');
        this.setValue('de-txtCODDES', '');
        this.setValue('de-txtDESCEECC', '');
        this.setValue('de-txtDESCRI', '');
        this.setValue('de-txtCTRANstr', '');
        this.setValue('de-txtNameCODEBANK', '');
        this.setValue('de-txtNameCTRY', '');

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
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
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
                    this.MaintenanceA2357(beanTemp);
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

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA2357">
    MaintenanceA2357: function(beanTemp) {
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2357',
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
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp(prototype.id + '-dataEntry').close(),
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
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
        Ext.getCmp(prototype.id + '-de-txtCODDES').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCODEBANK').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCTRAN').setReadOnly(true);
    },
    habilitarCampos: function() {
        Ext.getCmp(prototype.id + '-de-txtCODDES').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCODEBANK').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCTRAN').setReadOnly(false);

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