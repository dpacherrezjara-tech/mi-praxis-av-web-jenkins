Ext.define('Ext.Praxis.controller.payments.DataRequestedByDate.DataEntryDataRequestedByDateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDataRequestedByDateController',
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
                ["1", "Stand By"],
                ["2", "Sent to Office"],
                ["3", "Linked"],
                ["4", "Sent to Bank"],
                ["5", "Chargeback"]
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
        win.lblUser_toolTip("Estructura: A2331");
        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(meDe.bean.data);
//        console.log(paramDetail);
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
        
        this.setValue('de-txtSENTDATE', meDe.bean.SENTDATE);
        this.setValue('de-txtMERCHN', meDe.bean.MERCHN);
        this.setValue('de-txtCOUNTRY', meDe.bean.SCOUNTRY);
        this.setValue('de-txtDATEN', meDe.bean.DATEN);
        this.setValue('de-txtCARDNBR', meDe.bean.strSCARDN);
        
        this.setValue('de-txtMERCHNAM', meDe.bean.MERCHNAM);
        this.setValue('de-txtAUTHNBR', meDe.bean.AUTHNBR);
        this.setValue('de-txtNUMREFER', meDe.bean.NUMREFER);
        this.setValue('de-txtSQCRFILE', meDe.bean.SQCRFILE);
        this.setValue('de-txtFOLIO', meDe.bean.FOLIO);
        
        if (meDe.bean.STVAL === '1') {
            this.setValue('de-cmbSTVAL', '1');
        } else if (meDe.bean.STVAL === '2') {
            this.setValue('de-cmbSTVAL', '2');
        } else if (meDe.bean.STVAL === '3') {
            this.setValue('de-cmbSTVAL', '3');
        } else if (meDe.bean.STVAL === '4') {
            this.setValue('de-cmbSTVAL', '4');
        } else if (meDe.bean.STVAL === '5') {
            this.setValue('de-cmbSTVAL', '5');
        } else {
            this.setValue('de-cmbSTVAL', '');
        }
        this.setValue('de-cmbCODEBANK', meDe.bean.CODEBANK);
        this.setValue('de-cmbSCARCOD', meDe.bean.SCARCOD);
        
        this.setValue('de-txtSALEDATE', meDe.bean.SALEDATE);
        this.setValue('de-txtAUTAMOUNT', Ext.util.Format.number(meDe.bean.AUTAMOUNT, '0,000.00'));
        this.setValue('de-txtCLINAME', meDe.bean.CLINAME);
        this.setValue('de-txtAGENTE', meDe.bean.AGENTE);
        this.setValue('de-txtTOTCUP', Ext.util.Format.number(meDe.bean.TOTCUP, '0,000'));
        this.setValue('de-txtIATADATE', meDe.bean.IATADATE);
        this.setValue('de-txtDATES', meDe.bean.DATES);
        this.setValue('de-txtLINKDATE', meDe.bean.LINKDATE);
        this.setValue('de-txtLINKHORA', meDe.bean.LINKHORA);
        this.setValue('de-txtRUTA', meDe.bean.RUTA);
        this.setValue('de-txtCERROR', meDe.bean.strDescError);
        
        this.setValue('de-txtUSCR', meDe.bean.USCR);
        this.setValue('de-txtFECR', meDe.bean.FECR);
        this.setValue('de-txtHOCR', meDe.bean.HOCR);
        this.setValue('de-txtUSUP', meDe.bean.USUP);
        this.setValue('de-txtFEUP', meDe.bean.FEUP);
        this.setValue('de-txtHOUP', meDe.bean.HOUP);

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        
        beanTemp.SENTDATE = this.getValue("de-txtSENTDATE").trim();
        beanTemp.MERCHN = this.getValue("de-txtMERCHN").trim();
        beanTemp.SCOUNTRY = this.getValue("de-txtCOUNTRY").trim();
        beanTemp.DATEN = this.getValue("de-txtDATEN").trim();
        
        beanTemp.CARDNBR = meDe.bean.CARDNBR;
        beanTemp.MERCHNAM = this.getValue("de-txtMERCHNAM").trim();
        beanTemp.AUTHNBR = this.getValue("de-txtAUTHNBR").trim();
        beanTemp.NUMREFER = this.getValue("de-txtNUMREFER").trim();
        beanTemp.SQCRFILE = this.getValue("de-txtSQCRFILE").trim();
        beanTemp.FOLIO = this.getValue("de-txtFOLIO").trim();
        beanTemp.STVAL = String(this.getValue("de-cmbSTVAL"));
        beanTemp.CODEBANK = String(this.getValue("de-cmbCODEBANK").trim());
        beanTemp.SCARCOD = String(this.getValue("de-cmbSCARCOD").trim());
        beanTemp.CERROR = meDe.bean.CERROR;
        
        beanTemp.SALEDATE = String(this.getValue("de-txtSALEDATE").trim());
        if (this.getValue("de-txtAUTAMOUNT").trim() !== '') {
            beanTemp.AUTAMOUNT = Number(this.getValue("de-txtAUTAMOUNT").trim().replace(',', ''));
        } else {
            beanTemp.AUTAMOUNT = 0;
        }
        beanTemp.CLINAME = this.getValue("de-txtCLINAME").trim();
        beanTemp.AGENTE = this.getValue("de-txtAGENTE").trim();
        if (this.getValue("de-txtTOTCUP") !== '') {
            beanTemp.TOTCUP = Number(this.getValue("de-txtTOTCUP").trim().replace(',', ''));
        } else {
            beanTemp.TOTCUP = 0;
        }
        beanTemp.IATADATE = this.getValue("de-txtIATADATE").trim();
        beanTemp.DATES = this.getValue("de-txtDATES").trim();
        beanTemp.LINKDATE = this.getValue("de-txtLINKDATE");
        beanTemp.LINKHORA = this.getValue("de-txtLINKHORA").trim();
        beanTemp.RUTA = this.getValue("de-txtRUTA").trim();
        
//        var beanString = JSON.stringify(bean);
//        beanTemp.beanString = beanString;
//        console.log(beanTemp);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('de-txtSENTDATE', '');
        this.setValue('de-txtMERCHN', '');
        this.setValue('de-txtCOUNTRY', '');
        this.setValue('de-txtDATEN', '');
        this.setValue('de-txtCARDNBR', '');
        this.setValue('de-txtMERCHNAM', '');
        this.setValue('de-txtAUTHNBR', '');
        this.setValue('de-txtNUMREFER', '');
        this.setValue('de-txtSQCRFILE', '');
        this.setValue('de-cmbSTVAL', '');
        this.setValue('de-txtFOLIO', '');
        this.setValue('de-cmbCODEBANK', '');
        this.setValue('de-cmbSCARCOD', '');
        this.setValue('de-txtCERROR', '');
        this.setValue('de-txtSALEDATE', '');
        this.setValue('de-txtAUTAMOUNT', '');
        this.setValue('de-txtCLINAME', '');
        this.setValue('de-txtAGENTE', '');
        this.setValue('de-txtTOTCUP', '');
        this.setValue('de-txtIATADATE', '');
        this.setValue('de-txtDATES', '');
        this.setValue('de-txtLINKDATE', '');
        this.setValue('de-txtLINKHORA', '');
        this.setValue('de-txtRUTA', '');
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
//                        this.MaintenanceA2357(beanTemp);
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
            msg: 'Are you sure to Update??',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
//            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
//                    var msjResult = this.validacionInsert(beanTemp);
                    var msjResult = '';
                    if (msjResult === '') {
//                        beanTemp.option = 'U';
                        this.executeOption(beanTemp);
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
//                    this.MaintenanceA2357(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    executeOption: function(beanTemp) {
        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                } else{
                    global.Msg({msg: 'An error occurred'});
                }
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
        var haySSIM = false;
	var hayODS = false;
	var hayVCR = false;
	var hayVFI = false;
	var msjResult = '';
	
	//================== VALIDACIÓN =========================================
	//=======================================================================
//	var valAUTAMOUNT:ValidationResultEvent = valAUTAMOUNT.validate();
	
	if(valAUTAMOUNT.type == ValidationResultEvent.INVALID){
		msjResult = "Invalid Amount.";
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