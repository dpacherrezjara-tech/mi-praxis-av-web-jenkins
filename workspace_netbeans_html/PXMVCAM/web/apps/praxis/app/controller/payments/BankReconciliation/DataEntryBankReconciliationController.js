Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBankReconciliationController',
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
        this.bean = this.p.beanCons;
        this.lstCard = this.p.lstCard;
        this.lstBank = this.p.lstBank;
        this.lstCountry = this.p.lstCountry;
        console.log(this.bean.TDOC);
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
                this.habilitarCampos();
                this.limpiarData();
                this.onSearchCompleteDetail();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'S':
                this.deshabilitarCampos();
                this.limpiarData();
                this.onSearchCompleteDetail();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    obtainData: function() {

        var cmbDocumentType = Ext.getCmp(prototype.id + '-de-cmbTDOC');
        cmbDocumentType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["S", "Sales"],
                ["R", "Refund"]
            ]
        }));
        cmbDocumentType.setValue("S");

        var cmbTransactionCode = Ext.getCmp(prototype.id + '-de-cmbTRNXCODE');
        cmbTransactionCode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "On-Line Purchase(Aut.Bnmx)"],
                ["2", "On-Line Purchase (Aut.String)"],
                ["3", "Off-Line Purchase"],
                ["4", "Refund"],
                ["5", "Deferred On-Line Purchase"],
                ["6", "Deferred Off-Line Refund"],
                ["7", "On-Line Purchase with Cash Withdr"]
            ]
        }));
        cmbTransactionCode.setValue("");

        var cmbStatus = Ext.getCmp(prototype.id + '-de-cmbBSTVAL');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Accepted"],
                ["2", "Rejected"],
                ["3", "Suspect"]
            ]
        }));
        cmbStatus.setValue("");

        var cmbCardType = Ext.getCmp(prototype.id + '-de-cmbTIPOTAR');
        cmbCardType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["DEB", "Debit"],
                ["CRE", "Credit"]
            ]
        }));
        cmbCardType.setValue("");

        var cmbPosEntryMode = Ext.getCmp(prototype.id + '-de-cmbPEM');
        cmbPosEntryMode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["001", "Manual"],
                ["005", "Chip EMV"],
                ["080", "Fallback"],
                ["090", "Deslizada"]
            ]
        }));
        cmbPosEntryMode.setValue("");

        var cmbLoadType = Ext.getCmp(prototype.id + '-de-cmbFLOAD');
        cmbLoadType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Automatic"],
                ["M", "Manual"]
            ]
        }));
        cmbLoadType.setValue("");

        var cmbSourceS = Ext.getCmp(prototype.id + '-de-cmbSORIG');
        cmbSourceS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["B", "Banamex"],
                ["A", "American"],
                ["P", "Pagatodo"]
            ]
        }));
        cmbSourceS.setValue("");

        var cmbStatusLoad = Ext.getCmp(prototype.id + '-de-cmbFLOADE');
        cmbStatusLoad.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Pending"],
                ["L", "Loaded"]
            ]
        }));
        cmbStatusLoad.setValue("");

        var cmbConciliation = Ext.getCmp(prototype.id + '-de-cmbSTATUSC');
        cmbConciliation.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Pending"],
                ["1", "Processed"]
            ]
        }));
        cmbConciliation.setValue("");

        var cmbSourceC = Ext.getCmp(prototype.id + '-de-cmbSTATT');
        cmbSourceC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Clarification"],
                ["2", "Chargeback"]
            ]
        }));
        cmbSourceC.setValue("");

        var storeData = Ext.create('Ext.data.Store', {
            data: this.lstCard,
            autoLoad: true
        });

        var storeData2 = Ext.create('Ext.data.Store', {
            data: this.lstBank,
            autoLoad: true
        });

        var storeData3 = Ext.create('Ext.data.Store', {
            data: this.lstCountry,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').bindStore(storeData);
        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').setValue('');

        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').bindStore(storeData2);
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').setValue('');

        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').bindStore(storeData3);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').setValue('');

    },
    onSearchCompleteDetail: function() {

//        var paramDetail = {};
//        paramDetail.beanString = JSON.stringify(meDe.bean.data);
//        console.log(paramDetail);
//        Ext.Ajax.request({
//            url: prototype.url + '/searchBean',
//            method: 'POST',
//            timeout: 60000000,
//            params: paramDetail,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            success: function(response, opts) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
//                if (res.success) {
//                    meDe.bean = res.result;
//                    meDe.mostrarData();
//                } else {
//                    global.Msg({msg: res.Mensaje});
//                }
//            },
//            failure: function(response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//            }
//        });
//        meDe.bean = meDe.beanCons;
        meDe.mostrarData();
    },
    mostrarData: function() {
        this.setValue('de-txtSDATE', meDe.bean.SDATE);
        if (meDe.bean.TDOC === 'R') {
            this.setValue('de-cmbTDOC', 'R');
        } else if (meDe.bean.STVAL === 'S') {
            this.setValue('de-cmbTDOC', 'S');
        }
        this.setValue('de-cmbCODEBANK', meDe.bean.CBANK);
        this.setValue('de-cmbSCOUNTRY', meDe.bean.SCOUNTRY);
        this.setValue('de-cmbSCARCOD', meDe.bean.SCARCOD);
        this.setValue('de-txtSAUTHOC', meDe.bean.SAUTHOC);
        this.setValue('de-txtPNR', meDe.bean.SPNR);
        this.setValue('de-txtCard1', meDe.bean.IN_CARDN1);
        this.setValue('de-txtCard2', meDe.bean.IN_CARDN2);
        this.setValue('de-txtSVFOP', Ext.util.Format.number(meDe.bean.SVFOP, '0,000.00'));
        this.setValue('de-txtSCURRENCY', meDe.bean.SCURRENCY);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-de-txtSCURRENCY',
            html: meDe.bean.strDescAFTE.trim()
        });
        this.setValue('de-txtSEQNUM', meDe.bean.SEQNUM);
        this.setValue('de-txtSTVAL', meDe.bean.strDescStatus);
        this.setValue('de-txtMERCHN', meDe.bean.MERCHN);
        console.log(meDe.bean.strDescMerchn);
        if (meDe.bean.strDescMerchn.trim() !== '') {
            Ext.getCmp(prototype.id + '-de-lblMERCHNNAME').setText(meDe.bean.strDescMerchn);
            Ext.create('Ext.tip.ToolTip', {
                target: prototype.id + '-de-lblMERCHNNAME',
                html: meDe.bean.strDescMerchn.trim()
            });
        }
        if (meDe.bean.strTRNXCODE === '1') {
            this.setValue('de-cmbTRNXCODE', '1');
        } else if (meDe.bean.strTRNXCODE === '2') {
            this.setValue('de-cmbTRNXCODE', '2');
        } else if (meDe.bean.strTRNXCODE === '3') {
            this.setValue('de-cmbTRNXCODE', '3');
        } else if (meDe.bean.strTRNXCODE === '4') {
            this.setValue('de-cmbTRNXCODE', '4');
        } else if (meDe.bean.strTRNXCODE === '5') {
            this.setValue('de-cmbTRNXCODE', '5');
        } else if (meDe.bean.strTRNXCODE === '6') {
            this.setValue('de-cmbTRNXCODE', '6');
        } else if (meDe.bean.strTRNXCODE === '7') {
            this.setValue('de-cmbTRNXCODE', '7');
        }

        this.setValue('de-txtNUMREF', meDe.bean.strNUMREF);
        if (meDe.bean.BSTVAL === '1') {
            this.setValue('de-cmbBSTVAL', '1');
        } else if (meDe.bean.BSTVAL === '2') {
            this.setValue('de-cmbBSTVAL', '2');
        } else if (meDe.bean.BSTVAL === '3') {
            this.setValue('de-cmbBSTVAL', '3');
        }

        if (meDe.bean.TIPOTAR === 'DEB') {
            this.setValue('de-cmbTIPOTAR', 'DEB');
        } else if (meDe.bean.TIPOTAR === 'CRE') {
            this.setValue('de-cmbTIPOTAR', 'CRE');
        }

        if (meDe.bean.strPEM === '01') {
            this.setValue('de-cmbPEM', '01');
        } else if (meDe.bean.strPEM === '05') {
            this.setValue('de-cmbPEM', '05');
        } else if (meDe.bean.strPEM === '80') {
            this.setValue('de-cmbPEM', '80');
        } else if (meDe.bean.strPEM === '90') {
            this.setValue('de-cmbPEM', '90');
        }

        this.setValue('de-txtSAGENT', meDe.bean.SAGENT);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-de-txtSAGENT',
            html: meDe.bean.strDescripcion.trim()
        });

        if (meDe.bean.SFLOAD === '') {
            this.setValue('de-cmbFLOAD', '');
        } else if (meDe.bean.SFLOAD === 'M') {
            this.setValue('de-cmbFLOAD', 'M');
        }

        this.setValue('de-txtLDATE', meDe.bean.SDATEL);
        this.setValue('de-txtREASONREJ', meDe.bean.CREJEC);
        this.setValue('de-txtDESREJ', meDe.bean.strCREJEC);
        this.setValue('de-txtTDATE', meDe.bean.TDATE);
        this.setValue('de-txtDATEF', meDe.bean.DATEF);

        if (meDe.bean.strSORIG === 'B') {
            this.setValue('de-cmbSORIG', 'B');
        } else if (meDe.bean.strSORIG === 'A') {
            this.setValue('de-cmbSORIG', 'A');
        } else if (meDe.bean.strSORIG === 'P') {
            this.setValue('de-cmbSORIG', 'P');
        }

        this.setValue('de-txtBDATEP', meDe.bean.BDATEP);
        this.setValue('de-txtQTYDOC', Ext.util.Format.number(meDe.bean.lngQTYDOC, '0,000'));
        this.setValue('de-txtBAID', meDe.bean.BAID);

        console.log(meDe.bean.FLOADE);
        if (meDe.bean.FLOADE === 'L') {
            this.setValue('de-cmbFLOADE', 'L');
        }

        this.setValue('de-txtLDATEE', meDe.bean.LDATEE);

        if (meDe.bean.STATT === '1') {
            this.setValue('de-cmbSTATT', '1');
        } else if (meDe.bean.STATT === '2') {
            this.setValue('de-cmbSTATT', '2');
        }

        this.setValue('de-txtDATET', meDe.bean.DATET);
        this.setValue('de-txtComment', meDe.bean.strComment);

        if (meDe.bean.FADYEN === 'Y') {
            Ext.getCmp(prototype.id + '-de-chkFADYEN').setValue(true);
            Ext.getCmp(prototype.id + '-de-chkFADYEN').setBoxLabel('<span style="color:#128b1b"><b>ADYEN</b></span>');
        } else {
            Ext.getCmp(prototype.id + '-de-chkFADYEN').setValue(false);
            Ext.getCmp(prototype.id + '-de-chkFADYEN').setBoxLabel('<span style="color:#0B333C"><b>ADYEN</b></span>');
        }

        this.setValue('de-txtUSCR', meDe.bean.USCR);
        this.setValue('de-txtFECR', meDe.bean.FECR);
        this.setValue('de-txtHOCR', meDe.bean.HOCR);
        this.setValue('de-txtUSUP', meDe.bean.USUP);
        this.setValue('de-txtFEUP', meDe.bean.FEUP);
        this.setValue('de-txtHOUP', meDe.bean.HOUP);

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
    llenarData: function() {
        var bean = {};
        bean.strComment = "MATCH " + this.getValue("de-txtComment").trim();
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
        bean.SDATE = Ext.util.Format.date(this.getValue("de-txtSDATE"), 'Ymd');
        bean.TDOC = String(this.getValue("de-cmbTDOC"));
        bean.CBANK = String(this.getValue("de-cmbCODEBANK"));
        bean.SCOUNTRY = String(this.getValue("de-cmbSCOUNTRY"));
        bean.SCARCOD = String(this.getValue("de-cmbSCARCOD"));
        bean.SAUTHOC = this.getValue("de-txtSAUTHOC").trim();
        bean.SPNR = this.getValue("de-txtPNR").trim();
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
        bean.SDATEL = Ext.util.Format.date(this.getValue("de-txtLDATE"), 'Ymd');
        bean.CREJEC = this.getValue("de-txtREASONREJ").trim();
        bean.TDATE = Ext.util.Format.date(this.getValue("de-txtTDATE"), 'Ymd');
        bean.DATEF = Ext.util.Format.date(this.getValue("de-txtDATEF"), 'Ymd');
        bean.strSORIG = String(this.getValue("de-cmbSORIG"));
        bean.BDATEP = Ext.util.Format.date(this.getValue("de-txtBDATEP"), 'Ymd');
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
        return bean;

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
        this.setValue('de-txtPNR', '');
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
//            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp = this.llenarData();
                    var msjResult = this.validacionUpdate(beanTemp);
                    console.log(msjResult);
                    var comentario = this.getValue("de-txtComment").trim();
                    console.log(comentario);
                    if (msjResult === '') {
                        if (comentario !== '') {
                            if (meDe.bean.STVAL !== '1' && meDe.bean.STVAL !== '4') {
//                                beanTemp.option = 'U';
                                this.executeOption(beanTemp, 'U');
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
                        global.Msg({
                                msg: msjResult
                            });
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

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    executeOption: function(beanTemp, option) {
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp), option: option},
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
        //================== VALIDACIÓN =========================================
        //=======================================================================
        //Comprobando que los campos obligatorios sean ingresados
        console.log(beanTemp.SDATE);
        console.log(beanTemp.SCOUNTRY);
        console.log(beanTemp.TDOC);
        console.log(beanTemp.CBANK);
        console.log(beanTemp.SCARCOD);
        console.log(beanTemp.IN_CARDN1);
        console.log(beanTemp.IN_CARDN2);
        console.log(beanTemp.SAUTHOC);
        console.log(beanTemp.SVFOP);
        console.log(beanTemp.SCURRENCY);
        console.log(beanTemp.SEQNUM);
        console.log(beanTemp.MERCHN);
        console.log(beanTemp.TDATE);
        console.log(beanTemp.BDATEP);


        if (beanTemp.SDATE !== '' && beanTemp.SCOUNTRY !== ''
                && beanTemp.TDOC !== '' && beanTemp.CBANK !== ''
                && beanTemp.SCARCOD !== '' && beanTemp.IN_CARDN1 !== ''
                && beanTemp.IN_CARDN2 !== '' && beanTemp.SAUTHOC !== ''
                && beanTemp.SVFOP > 0 && beanTemp.SCURRENCY !== ''
                && beanTemp.SEQNUM !== '' && beanTemp.MERCHN !== ''
                && beanTemp.TDATE !== '' && beanTemp.BDATEP !== '') {
            if (Ext.getCmp(prototype.id + '-de-txtSAGENT').getErrors().length > 0) {
                msjResult = 'Invalid Agent Code.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getErrors().length > 0) {
                msjResult = 'Invalid Authorization Code.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtSVFOP').getErrors().length > 0) {
                msjResult = 'Invalid Local Amount.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getErrors().length > 0) {
                msjResult = 'Invalid Currency.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtSDATE').getErrors().length > 0) {
                msjResult = 'Invalid Sales Date.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtLDATE').getErrors().length > 0) {
                msjResult = 'Invalid Load Date.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtTDATE').getErrors().length > 0) {
                msjResult = 'Invalid Transaction Date.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtDATEF').getErrors().length > 0) {
                msjResult = 'Invalid TEF Date.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtBDATEP').getErrors().length > 0) {
                msjResult = 'Invalid Process Date.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtQTYDOC').getErrors().length > 0) {
                msjResult = 'Invalid Quantity Tickets.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtSEQNUM').getErrors().length > 0) {
                msjResult = 'Invalid Sequence Number.';
            }
            else if (Ext.getCmp(prototype.id + '-de-txtMERCHN').getErrors().length > 0) {
                msjResult = 'Invalid Merchant Number.';
            }
            else if (Ext.getCmp(prototype.id + '-de-cmbSCARCOD').getErrors().length > 0) {
                msjResult = 'Invalid Card Code.';
            }
        } else {
            msjResult = 'You must enter all required fields.';

        }
        return msjResult;
    },
    deshabilitarCampos: function() {
        Ext.getCmp(prototype.id + '-de-txtSDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbTDOC').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').disable(true);
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtPNR').setReadOnly(true);
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
//        Ext.getCmp(prototype.id + '-de-cmbTDOC').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').disable(false);
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtPNR').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard1').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard2').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSVFOP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSEQNUM').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-cmbTRNXCODE').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbBSTVAL').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbTIPOTAR').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbPEM').disable(false);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-cmbFLOAD').disable(false);
        Ext.getCmp(prototype.id + '-de-txtLDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtREASONREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDESREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtTDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDATEF').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-cmbSORIG').disable(false);
        Ext.getCmp(prototype.id + '-de-txtBDATEP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtQTYDOC').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(false);

    },
    tarjeta_keyDownHandler: function(e, eOpts) {
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (Ext.getCmp(prototype.id + '-de-txtCard1').getValue().length === 6) {
                Ext.getCmp(prototype.id + '-de-txtCard2').focus();
            }
        }
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

