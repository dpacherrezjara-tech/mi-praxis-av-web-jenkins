Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryAMDPBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAMDPBankReconciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDe: '',
    actionCode: '',
    bean: {},
    bean_detail: {},
    bean_scan: {},
    lstA1852: {},
    lstSendManual: [],
    lstBlocked: [],
    lstAdjustment: [],
    sumAmount: 0,
    sumAmountBlocked: 0,
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
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
    afterRender: function () {
        console.log(this.bean.STVAL);
        this.mostrarData();

        Ext.getCmp(prototype.id + '-btn-save').hide();
        Ext.getCmp(prototype.id + '-btn-delete').hide();
        Ext.getCmp(prototype.id + '-btn-cancel').show();

        if (this.bean.STVAL === '1' || this.bean.STVAL === '4' || this.bean.STVAL === '5') {
            this.onSearchCompleteDetail();
            Ext.getCmp(prototype.id + '-btn-update').hide();
        } else {
            this.onSearchPendingDetail();
            Ext.getCmp(prototype.id + '-btn-update').show();
        }
    },
    addCreditCard_keyDownHandler: function () {
        var fecha_a_validar = "";
        this.bean_scan.TICKET = Ext.getCmp(prototype.id + '-input-txtTKTScan1').getValue();
        this.bean_scan.CARD1 = Ext.getCmp(prototype.id + '-txtCard11').getValue();
        this.bean_scan.CARD2 = Ext.getCmp(prototype.id + '-txtCard22').getValue();
        this.bean_scan.SAUTHOC = Ext.getCmp(prototype.id + '-txtApproval').getValue();
        this.bean_scan.SDATE = (Ext.getCmp(prototype.id + '-txtFromDate').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(this.getValue("txtFromDate"), 'Ymd');

        var paramScan = {};

        paramScan.beanString = JSON.stringify(this.bean_scan);
        console.log(paramScan);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_SCAN',
            method: 'POST',
            timeout: 60000000,
            params: paramScan,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    meDe.calcularMontos();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    obtainData: function () {

//        var cmbDocumentType = Ext.getCmp(prototype.id + '-de-cmbTDOC');
//        cmbDocumentType.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["S", "Sales"],
//                ["R", "Refund"]
//            ]
//        }));
//        cmbDocumentType.setValue("S");

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

    },
    onSearchCompleteDetail: function () {

        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(this.bean);
        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_DETAIL',
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    meDe.calcularMontos();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });
    },
    onSearchPendingDetail: function () {

        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(this.bean);
        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP_SCAN_PENDING',
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAMDP').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    meDe.calcularMontos();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryAMDP').unmask();
            }
        });
    },
    mostrarData: function () {
//        this.setValue('de-txtSDATE', meDe.bean.SDATE);
//        if (meDe.bean.TDOC === 'R') {
//            this.setValue('de-cmbTDOC', 'R');
//        } else if (meDe.bean.STVAL === 'S') {
//            this.setValue('de-cmbTDOC', 'S');
//        }
        console.log(this.bean);
        this.setValue('de-txtPRDA', this.bean.PRDA);
        this.setValue('de-txtSAGENT', this.bean.DESAGENT);
        this.setValue('de-txtMERCHID', this.bean.MERCHNC);
        //this.setValue('de-txtSMERCHID', this.bean.SMERCHID);
        //this.setValue('de-txtIDITEMS', this.bean.IDITEMS);
        //this.setValue('de-txtIDITEMT', this.bean.IDITEMT);
        //this.setValue('de-txtINSTPLA', this.bean.INSTPLA);
        //this.setValue('de-txtINSTPAY', this.bean.INSTPAY);
        //this.setValue('de-txtINVORNBR', this.bean.INVORNBR);
        //this.setValue('de-txtZONE', this.bean.ZONE);
        this.setValue('de-txtCOUNTRY', this.bean.DESC_SCOUNTRY);
        //this.setValue('de-txtSTCONL', this.bean.STCONL);
        //this.setValue('de-txtFCONTL', this.bean.FCONTL);
        //this.setValue('de-txtIDCONL', this.bean.IDCONL);
        //this.setValue('de-txtCERRORHST', this.bean.CERRORHST);
        //this.setValue('de-txtCERROIN', this.bean.CERROIN);
        //this.setValue('de-txtDES_CERROIN', this.bean.DES_CERROIN);
        //this.setValue('de-txtFLAG', this.bean.FLAG);
        //this.setValue('de-txtCERROR', this.bean.CERROR);
        //this.setValue('de-txtDES_CERROR', this.bean.DES_CERROR);
        this.setValue('de-txtBSUMDATE', this.bean.SDATE);
        this.setValue('de-txtTDOC', this.bean.strPEM);
        this.setValue('de-txtSPNR', this.bean.SPNR);
//        this.setValue('de-txtISREFNBR', this.bean.ISREFNBR);
        this.setValue('de-txtPAYDATE', this.bean.PAYDATE);
        this.setValue('de-txtSCARCODE', this.bean.SCARCOD);
        this.setValue('de-txtSCARDN', this.bean.SCARDN);
        this.setValue('de-txtSAUTHOC', this.bean.SAUTHOC);
        this.setValue('de-txtSTVAL', this.bean.descSTVAL);
        this.setValue('de-txtQTYTKT', this.bean.QTYTKT);
        this.setValue('de-txtPCURRENCY', this.bean.SCURRENCY);
        this.setValue('de-txtTGROSAMOUN', Ext.util.Format.number(this.bean.SVFOP, '0,000.00'));
        this.setValue('de-txtFAREO', Ext.util.Format.number(this.bean.FAREO, '0,000.00'));
        this.setValue('de-txtFAREC', Ext.util.Format.number(this.bean.FAREC, '0,000.00'));
        this.setValue('de-txtDIFF_FARE', Ext.util.Format.number(this.bean.DIFF_FARE, '0,000.00'));
        this.setValue('de-txtdescFREGLA', this.bean.descFREGLA);
        //this.setValue('de-txtCONCIDATE', this.bean.CONCIDATE);
        //this.setValue('de-txtVOID', this.bean.VOID);
        this.setValue('de-txtSVFOPS', Ext.util.Format.number(this.bean.SVFOP, '0,000.00'));
        //this.setValue('de-txtFADM', this.bean.FADM);
        //this.setValue('de-txtFREVERSA', this.bean.FREVERSA);
        //this.setValue('de-txtFREVADM', this.bean.FREVADM);
        //this.setValue('de-txtDIFF_AMOUNT', Ext.util.Format.number(this.bean.DIFF_AMOUNT, '0,000.00'));
        this.setValue('de-txtDIFF_AMOUNT', Ext.util.Format.number(0, '0,000.00'));

        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);
        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);

    },
    calcularMontos: function () {
        this.sumAmount = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);
            if (dataRow1.data.STMANUAL !== 'Blocked') {
                this.sumAmount = this.sumAmount + dataRow1.data.A1531VFOP; //+ dataRow1.data.SADJUST;
            }
        }

//        for (var i = 0; i < this.lstAdjustment.length; i++) {
//            this.sumAmount = this.sumAmount + parseFloat(this.lstAdjustment[i].A1531VFOP);
//        }

        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function () {
        var bean = {};

        //bean.BDATEP = Ext.util.Format.date(this.getValue("de-txtBDATEP"), 'Ymd');

        return bean;

    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('de-txtPRDA', '');
        this.setValue('de-txtSAGENT', '');
        this.setValue('de-txtMERCHID', '');
        this.setValue('de-txtSMERCHID', '');
        this.setValue('de-txtIDITEMS', '');
        this.setValue('de-txtIDITEMT', '');
        this.setValue('de-txtINSTPLA', '');
        this.setValue('de-txtINSTPAY', '');
        this.setValue('de-txtINVORNBR', '');
        this.setValue('de-txtZONE', '');
        this.setValue('de-txtCOUNTRY', '');
        this.setValue('de-txtSTCONL', '');
        this.setValue('de-txtFCONTL', '');
        this.setValue('de-txtIDCONL', '');
        this.setValue('de-txtCERRORHST', '');
        this.setValue('de-txtCERROIN', '');
        this.setValue('de-txtDES_CERROIN', '');
        this.setValue('de-txtFLAG', '');
        this.setValue('de-txtCERROR', '');
        this.setValue('de-txtDES_CERROR', '');
        this.setValue('de-txtFromDateBSUMDATE', '');
        this.setValue('de-txtBSUMDATE', '');
        this.setValue('de-txtTDOC', '');
        this.setValue('de-txtSPNR', '');
        this.setValue('de-txtISREFNBR', '');
        this.setValue('de-txtSCARCODE', '');
        this.setValue('de-txtSCARDN', '');
        this.setValue('de-txtSAUTHOC', '');
        this.setValue('de-txtSTVAL', '');
        this.setValue('de-txtQTYTKT', '');
        this.setValue('de-txtPCURRENCY', '');
        this.setValue('de-txtTGROSAMOUN', '0');
        this.setValue('de-txtdescFREGLA', '');
        this.setValue('de-txtVOID', '');
        this.setValue('de-txtSVFOP', '0');
        this.setValue('de-txtFADM', '');
        this.setValue('de-txtFREVERSA', '');
        this.setValue('de-txtFREVADM', '');
        this.setValue('de-txtDIFF_AMOUNT', '0');

        this.setValue('de-txtUSCR', '');
        this.setValue('de-txtFECR', '');
        this.setValue('de-txtHOCR', '');
        this.setValue('de-txtUSUP', '');
        this.setValue('de-txtFEUP', '');
        this.setValue('de-txtHOUP', '');
    },
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
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
    onUpdateClick: function (btn) {
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to Update?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
//            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp = this.llenarData();
                }
            }
        });
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(meDe.bean);
                    this.MaintenanceA2357(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    executeOption: function (beanTemp, option) {
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp), option: option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {

                    global.Msg({
                        msg: res.Mensaje,
//                        title: '',
                        icon: 1,
                        fn: function () {
                            //exito
                            Ext.getCmp(prototype.id + '-dataEntry').close();
                        }
                    });
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODDES") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
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
            } else if (Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getErrors().length > 0) {
                msjResult = 'Invalid Authorization Code.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSVFOP').getErrors().length > 0) {
                msjResult = 'Invalid Local Amount.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getErrors().length > 0) {
                msjResult = 'Invalid Currency.';
            }
//            else if (Ext.getCmp(prototype.id + '-de-txtSDATE').getErrors().length > 0) {
//                msjResult = 'Invalid Sales Date.';
//            }
            else if (Ext.getCmp(prototype.id + '-de-txtLDATE').getErrors().length > 0) {
                msjResult = 'Invalid Load Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtTDATE').getErrors().length > 0) {
                msjResult = 'Invalid Transaction Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtDATEF').getErrors().length > 0) {
                msjResult = 'Invalid TEF Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtBDATEP').getErrors().length > 0) {
                msjResult = 'Invalid Process Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtQTYTKT').getErrors().length > 0) {
                msjResult = 'Invalid Quantity Tickets.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSEQNUM').getErrors().length > 0) {
                msjResult = 'Invalid Sequence Number.';
            } else if (Ext.getCmp(prototype.id + '-de-txtMERCHN').getErrors().length > 0) {
                msjResult = 'Invalid Merchant Number.';
            } else if (Ext.getCmp(prototype.id + '-de-cmbSCARCOD').getErrors().length > 0) {
                msjResult = 'Invalid Card Code.';
            }
        } else {
            msjResult = 'You must enter all required fields.';

        }
        return msjResult;
    },
    deshabilitarCampos1: function () {
//        Ext.getCmp(prototype.id + '-de-txtSDATE').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-de-cmbTDOC').disable(true);
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
        Ext.getCmp(prototype.id + '-de-txtQTYTKT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(true);
    },
    habilitarCampos1: function () {
//        Ext.getCmp(prototype.id + '-de-txtSDATE').setReadOnly(false);
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
        Ext.getCmp(prototype.id + '-de-txtQTYTKT').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(false);

    },
    onGridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        Ext.getCmp(prototype.id + '-dataEntryAMDP').close();
        var data = x.record.data;
        var strTkt = data.A1531TKT;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';

//        console.log(beanProMasterTicket);
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';

        win.displayCustomViewTicket(this, 'BankConciliation', beanProMasterTicket);
    },
    removeTKT: function () {
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        //var rowIndex = store_gridInfoScan.indexOf(record);
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        this.calcularMontos();
    },
    onAdjust: function (grid, rowIndex, colIndex) {

        var data = grid.getStore().getAt(rowIndex).data;
        console.log(data);
        if (data.STMANUAL !== 'Blocked') {
            if (this.sumAmount === this.bean.TGROSAMOUN) {
                global.Msg({msg: 'The sum amount is equal to transaction amount.'});
            } else {
                //this.lstAdjustment = [];
                Ext.getCmp(prototype.id + '-gridDataAdjustment').show();
                Ext.getCmp(prototype.id + '-panelADJ').show();
                var rec = Object.create(grid.getStore().getAt(rowIndex).data);
                var monto_ajustado = parseFloat(parseFloat(this.bean.TGROSAMOUN - this.sumAmount).toFixed(2))

                rec.A1531VFOP = monto_ajustado;
                rec.tot_VFOP = monto_ajustado;
                //rec.SADJUST = 0;
                rec.A720AGENTE = $('#menuUser').text();
                rec.CERROR = '01';
                this.lstAdjustment.push(rec);
                Ext.getCmp(prototype.id + '-gridDataAdjustment').bindStore(
                        Ext.create('Ext.data.Store', {data: this.lstAdjustment, autoLoad: true})
                        );
                this.calcularMontos();
            }
        } else {
            global.Msg({msg: 'Can\'t adjust a blocked ticket.'});
        }

    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});

