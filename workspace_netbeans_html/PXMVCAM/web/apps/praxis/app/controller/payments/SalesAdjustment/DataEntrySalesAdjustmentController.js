Ext.define('Ext.Praxis.controller.payments.SalesAdjustment.DataEntrySalesAdjustmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySalesAdjustmentController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    msjValidate: '',
    bean: {},
    beanResult: {},
    beanInfo: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    lstSendManual: [],
    lstBlocked: [],
    lstAdjustment: [],
    beanSettlementTktsDetail: {},
    paramsDetailDEDetTktSettlement: {},
    sumAmount: 0,
    sumAmountBlocked: 0,
    gridAdjustmentRowIndex: 10,
    status_match: ['1', '5', '6', '7'],
    dataObtain: {},
            init: function (view) {
                prototype.id = 'SalesAdjustmentForm';
                prototype.url = CONTEXTPATH + '/SalesAdjustment';
                meDE = this;
                this.p = this.view.params;
                this.actionCode = this.p.action;
                this.bean = this.p.rec.data;
            },
    afterRender: function () {

        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();

                console.log(this.bean);
                if (this.bean.STRFND == '1') {
                    Ext.getCmp(prototype.id + '-btn-update').hide();
                    Ext.getCmp(prototype.id + '-de-txtRFDATE').setReadOnly(true);
                    Ext.getCmp(prototype.id + '-de-txtRFAUTOR').setReadOnly(true);
                    Ext.getCmp(prototype.id + '-de-txtRFOPERB').setReadOnly(true);
                } else {
                    Ext.getCmp(prototype.id + '-de-txtRFDATE').setReadOnly(false);
                    Ext.getCmp(prototype.id + '-de-txtRFAUTOR').setReadOnly(false);
                    Ext.getCmp(prototype.id + '-de-txtRFOPERB').setReadOnly(false);
                    Ext.getCmp(prototype.id + '-btn-update').show();
                }

                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {

        this.setValue('de-txtPAYDATE', this.beanResult.PAYDATE);
        this.setValue('de-txtPRDA', this.beanResult.PRDA);
        this.setValue('de-txtBSUMDATE', this.beanResult.BSUMDATE);
        this.setValue('de-txtMERCHID', this.beanResult.MERCHID);
        this.setValue('de-txtSMERCHID', this.beanResult.SMERCHID);
        this.setValue('de-txtAXPAYNBR', this.beanResult.AXPAYNBR);
        this.setValue('de-txtPCURRENCY', this.beanResult.PCURRENCY);
        this.setValue('de-txtSCARDN', this.beanResult.SCARDN);
        this.setValue('de-txtSAUTHOC', this.beanResult.SAUTHOC);
        this.setValue('de-txtIDITEMS', this.beanResult.IDITEMS);
        this.setValue('de-txtIDITEMT', this.beanResult.IDITEMT);
        this.setValue('de-txtISREFNBR', this.beanResult.ISREFNBR);
        this.setValue('de-txtSPNR', this.beanResult.SPNR);
        this.setValue('de-txtTRANSDATE', this.beanResult.TRANSDATE);
        this.setValue('txtCERRORHST', this.beanResult.CERRORHST);
        this.setValue('txtCERROR', this.beanResult.CERROR);
        this.setValue('txtDES_CERROR', this.beanResult.DES_CERROR);
        this.setValue('txtCERROIN', this.beanResult.CERROIN);
        this.setValue('txtDES_CERROIN', this.beanResult.DES_CERROIN);
        this.setValue('txtFLAG', this.beanResult.FSELEC);
        this.setValue('de-txtINSTANBR', this.beanResult.INSTANBR);
        this.setValue('de-txtNBRINSTA', this.beanResult.NBRINSTA);
        this.setValue('txtSTVAL', this.beanResult.descSTVAL);
        this.setValue('de-txtFCOMPL', this.beanResult.descFCOMPL);
        this.setValue('de-txtTDOC', this.beanResult.descTDOC);
        this.setValue('de-txtQTYTKT', this.beanResult.QTYTKT);
        this.setValue('de-txtPASSED_DAYS', this.beanResult.PASSED_DAYS);
        this.setValue('de-txtTGROSAMOUN', Ext.util.Format.number(this.beanResult.TGROSAMOUN, '0,000.00'));
        this.setValue('de-txtSVFOPS', Ext.util.Format.number(this.beanResult.SVFOPS, '0,000.00'));
        this.setValue('de-txtDIFF_AMOUNT', Ext.util.Format.number(this.beanResult.DIFF_AMOUNT, '0,000.00'));

        this.setValue('de-txtSTRFND', this.beanResult.descSTRFND);
        this.setValue('de-txtRFDATE', this.beanResult.RFDATE);
        this.setValue('de-txtRFAUTOR', this.beanResult.RFAUTOR);
        this.setValue('de-txtRFOPERB', this.beanResult.RFOPERB);
        this.setValue('de-txtRFAUDIT', this.beanResult.RFAUDIT);

        this.setValue('de-txtSTCONL', this.beanResult.descSTCONL);
        this.setValue('de-txtFCONTL', this.beanResult.FCONTL);
        this.setValue('de-txtIDCONL', this.beanResult.IDCONL);
        this.setValue('de-txtdescFREGLA', this.beanResult.descFREGLA);
        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.formato(this.beanResult.HOCR));
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.formato(this.beanResult.HOUP));
        //this.getBreakdownDataGrid();
    },
    formato: function (numero) {
        var d, e;
        d = String(numero);
        if (d === "0     ") {
            return "";
        } else {
            e = d.substring(0, 2) + ':' + d.substring(2, 4) + ':' + d.substring(4, 6);
            return e;
        }
    },
    obtainData: function () {
//        console.log('obtainData');
    },
    llenarData: function (beanTemp) {

        beanTemp.PAYDATE = this.getValue("de-txtPAYDATE");
        beanTemp.PRDA = this.getValue("de-txtPRDA");
        beanTemp.BSUMDATE = this.getValue("de-txtBSUMDATE");
        beanTemp.MERCHID = this.getValue("de-txtMERCHID");
        beanTemp.SMERCHID = this.getValue("de-txtSMERCHID");
        beanTemp.AXPAYNBR = this.getValue("de-txtAXPAYNBR");
        beanTemp.PCURRENCY = this.getValue("de-txtPCURRENCY");
        beanTemp.SCARDN = this.getValue("de-txtSCARDN");
        beanTemp.SAUTHOC = this.getValue("de-txtSAUTHOC");
        beanTemp.IDITEMS = this.getValue("de-txtIDITEMS");
        beanTemp.IDITEMT = this.getValue("de-txtIDITEMT");
        beanTemp.INSTANBR = this.getValue("de-txtINSTANBR");
        beanTemp.CERROR = this.getValue("txtCERROR");
        beanTemp.TDOC = this.beanResult.TDOC;
        beanTemp.SPNR = this.getValue("de-txtSPNR");
        beanTemp.ISREFNBR = this.getValue("de-txtISREFNBR");
        beanTemp.TRANSDATE = this.getValue("de-txtTRANSDATE");

        beanTemp.RFDATE = this.getValue("de-txtRFDATE");
        beanTemp.RFAUTOR = this.getValue("de-txtRFAUTOR");
        beanTemp.RFOPERB = this.getValue("de-txtRFOPERB");

        //console.log(beanTemp);
    },
    getData: function () {

        var beanString = JSON.stringify(meDE.bean);
        Ext.Ajax.request({
            url: prototype.url + '/searchTransactionErrorDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
                meDE.beanInfo = res.lstInfo;
                meDE.mostrarData();
            }
        });
    },
    getBreakdownDataGrid: function () {
        this.beanSettlementTktsDetail = {};
        this.beanSettlementTktsDetail.DATE = this.bean.DATE;
        this.beanSettlementTktsDetail.IN_DATE = this.bean.IN_DATE;
        this.beanSettlementTktsDetail.MERCHID = this.bean.MERCHID;
        this.beanSettlementTktsDetail.SPNR = this.bean.SPNR;
        this.beanSettlementTktsDetail.ISREFNBR = this.bean.ISREFNBR;
        this.beanSettlementTktsDetail.IN_PCURRENCY = this.bean.PCURRENCY;
        this.beanSettlementTktsDetail.IN_TGROSAMOUN = this.bean.TGROSAMOUN;
        this.beanSettlementTktsDetail.IN_descSTVAL = this.bean.descSTVAL;
        this.beanSettlementTktsDetail.IN_TRANSDATE = this.bean.BSUMDATE;
        this.beanSettlementTktsDetail.IN_AXPRODAT = this.bean.AXPRODAT;
        this.beanSettlementTktsDetail.IN_FREGLA = this.bean.FREGLA;
        this.beanSettlementTktsDetail.IN_SCARDN = this.bean.SCARDN;
        this.beanSettlementTktsDetail.IN_SAUTHOC = this.bean.SAUTHOC;
        this.beanSettlementTktsDetail.IN_IDITEMT = this.bean.IDITEMT;
        this.beanSettlementTktsDetail.IN_IDITEMS = this.bean.IDITEMS;
        meDE.paramsDetailDEDetTktSettlement.beanString = JSON.stringify(this.beanSettlementTktsDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchDetTktSettlement',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataInfoScan').mask('Loading...'),
            params: {beanString: meDE.paramsDetailDEDetTktSettlement},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridDataInfoScan').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanInfo = res.data;
                for (var i = 0; i < res.data.length; i++) {
                    meDE.lstSendManual.push(res.data[i]);
                }

                meDE.getDataGrid(meDE.beanResult);
                //meDE.calcularMontos();
            }
        });
    },
    getBreakdownDataGridForMatch: function () {
        this.beanSettlementTktsDetail = {};
        this.beanSettlementTktsDetail.DATE = this.bean.DATE;
        this.beanSettlementTktsDetail.IN_DATE = this.bean.IN_DATE;
        this.beanSettlementTktsDetail.MERCHID = this.bean.MERCHID;
        this.beanSettlementTktsDetail.SPNR = this.bean.SPNR;
        this.beanSettlementTktsDetail.ISREFNBR = this.bean.ISREFNBR;
        this.beanSettlementTktsDetail.IN_PCURRENCY = this.bean.PCURRENCY;
        this.beanSettlementTktsDetail.IN_TGROSAMOUN = this.bean.TGROSAMOUN;
        this.beanSettlementTktsDetail.IN_descSTVAL = this.bean.descSTVAL;
        this.beanSettlementTktsDetail.IN_TRANSDATE = this.bean.BSUMDATE;
        this.beanSettlementTktsDetail.IN_AXPRODAT = this.bean.AXPRODAT;
        this.beanSettlementTktsDetail.IN_FREGLA = this.bean.FREGLA;
        this.beanSettlementTktsDetail.IN_SCARDN = this.bean.SCARDN;
        this.beanSettlementTktsDetail.IN_SAUTHOC = this.bean.SAUTHOC;
        this.beanSettlementTktsDetail.IN_IDITEMT = this.bean.IDITEMT;
        this.beanSettlementTktsDetail.IN_IDITEMS = this.bean.IDITEMS;
        meDE.paramsDetailDEDetTktSettlement.beanString = JSON.stringify(this.beanSettlementTktsDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchDetTktSettlement',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataInfoScan').mask('Loading...'),
            params: {beanString: meDE.paramsDetailDEDetTktSettlement},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridDataInfoScan').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanInfo = res.data;
                for (var i = 0; i < res.data.length; i++) {
                    meDE.lstSendManual.push(res.data[i]);
                }
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        //this.setValue('txtCODSOUR', '');        
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {

    },
    onUpdateClick: function (btn) {

//        var beanTemp = {};
//        this.llenarData(beanTemp);
//        beanTemp.option = 'U';
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
//            animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';

                            var msjResult = this.validUpdate();
                            if (msjResult === '') {
                                meDE.MaintenanceA4116(beanTemp);
                            } else {
                                console.log('ELSE');
                                global.Msg({msg: msjResult});
                            }
                        }
                    }
                });
    },
    validUpdate: function () {
        var msjResult = '';
        console.log(this.getValue("de-txtRFDATE"));
        if (this.getValue("de-txtRFDATE") === '' || this.getValue("de-txtRFAUTOR") === '' || this.getValue("de-txtRFOPERB") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    onDeleteClick: function (btn) {

    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA4116">
    MaintenanceA4116: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceDoublePayment',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    /*Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();*/
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    meDE.onNextClick();
                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }
            }
        });
    },
    //</editor-fold>
    DeshabilitarCampoClave: function () {

    },
    Habilitarlbl: function () {

    },
    desHabilitartxt: function () {

    },
    Habilitarlbl1: function () {

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
    },
// </editor-fold>    
    onNextClick: function () {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex < 19) {
            rec = all.getAt(rowIndex + 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex + 1};
            if (this.p.rec === null) {
                Ext.getCmp(prototype.id + '-dataEntry').close();
            } else {
                this.bean = this.p.rec.data;
                if (this.bean.STRFND == '1') {
                    Ext.getCmp(prototype.id + '-btn-update').hide();
                    Ext.getCmp(prototype.id + '-de-txtRFDATE').setReadOnly(true);
                    Ext.getCmp(prototype.id + '-de-txtRFAUTOR').setReadOnly(true);
                    Ext.getCmp(prototype.id + '-de-txtRFOPERB').setReadOnly(true);
                } else {
                    Ext.getCmp(prototype.id + '-de-txtRFDATE').setReadOnly(false);
                    Ext.getCmp(prototype.id + '-de-txtRFAUTOR').setReadOnly(false);
                    Ext.getCmp(prototype.id + '-de-txtRFOPERB').setReadOnly(false);
                    Ext.getCmp(prototype.id + '-btn-update').show();
                }
            }
            this.getData();
            //this.winDataEntry('U', rec, all, rowIndex);
        }
    },   
});