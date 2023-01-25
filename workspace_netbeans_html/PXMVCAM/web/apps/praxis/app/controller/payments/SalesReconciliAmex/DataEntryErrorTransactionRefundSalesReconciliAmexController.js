Ext.define('Ext.Praxis.controller.payments.SalesReconciliAmex.DataEntryErrorTransactionRefundSalesReconciliAmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryErrorTransactionRefundSalesReconciliAmexController',
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
    beanSettlementTktsDetail: {},
    paramsDetailDEDetTktSettlement: {},
    sumAmount: 0,
    sumAmountBlocked: 0,
    status_match: ['1', '5', '6', '7'],
    flag_bporev: false,
    // </editor-fold>
    init: function (view) {
        prototype.id = 'SalesReconciliAmexForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliAmex';
        meDE = this;
        this.lstSendManual = [];
        this.lstBlocked = [];

        this.setValue('de-txtSumAmount', this.sumAmount);
        //this.setValue('de-txtSumAmountBlocked', this.sumAmountBlocked);

        Ext.getCmp(prototype.id + '-gridDataInfoBlocked').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataInfoBlocked').getView().refresh();

        Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();

        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec.data;
        //console.log(this.bean);

    },
    afterRender: function () {
//        console.log('afterRender');
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
//                console.log('dd');
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-coupons_refund').show();
                Ext.getCmp(prototype.id + '-gridDataInfoScan').setWidth(970);
                Ext.getCmp(prototype.id + '-panelDataInfoScan').setWidth(975);
                if (['1', '5', '6', '7'].indexOf(this.bean.STVAL) >= 0) {
                    Ext.getCmp(prototype.id + '-btn-update').hide();
                    Ext.getCmp(prototype.id + '-panelScanCard').hide();
                    Ext.getCmp(prototype.id + '-panelScan').hide();
                    Ext.getCmp(prototype.id + '-panelMsiTracing').show();
                    Ext.getCmp(prototype.id + '-gridColumnDelete').hide();
                    Ext.getCmp(prototype.id + '-gridColumnFill').hide();
                    Ext.getCmp(prototype.id + '-coupons_refund').show();
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').setWidth(870);
                    Ext.getCmp(prototype.id + '-panelDataInfoScan').setWidth(875);
                    if (this.bean.STVAL === '5') {
                        Ext.getCmp(prototype.id + '-labelReverse').show();
                        Ext.getCmp(prototype.id + '-btnReverse').show();
                    }
                } else {
                    Ext.getCmp(prototype.id + '-btn-update').show();
                    Ext.getCmp(prototype.id + '-panelBpo').show();
                    if (this.bean.STVAL === '0') {
                        Ext.getCmp(prototype.id + '-openBpoObserv').fireEvent('click', {});
                    }
                }
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

        /*var sMerch = this.beanResult.SMERCHID.trim();
         if (sMerch === '9353227755' || sMerch === '8133735688' || sMerch === '9352724851') {
         Ext.getCmp(prototype.id + '-labelScan').hide();
         Ext.getCmp(prototype.id + '-panelScan').hide();
         Ext.getCmp(prototype.id + '-panelScanCard').hide();
         Ext.getCmp(prototype.id + '-panelDataInfoScan').hide();
         }*/
        /* else {
         Ext.getCmp(prototype.id + '-chkSelection').show();
         }*/
        this.setValue('de-txtZone', this.beanResult.ZONA);
        this.setValue('de-txtCountry', this.beanResult.SCOUNTRY);
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
        this.setValue('de-txtVOID', this.beanResult.descVOID);
        this.setValue('de-txtQTYTKT', this.beanResult.QTYTKT);
        this.setValue('de-txtPASSED_DAYS', this.beanResult.PASSED_DAYS);

        this.setValue('de-txtTGROSAMOUN', Ext.util.Format.number(this.beanResult.TGROSAMOUN, '0,000.00'));
        this.setValue('de-txtSVFOPS', Ext.util.Format.number(this.beanResult.SVFOPS, '0,000.00'));
        this.setValue('de-txtDIFF_AMOUNT', Ext.util.Format.number(this.beanResult.DIFF_AMOUNT, '0,000.00'));
        //this.setValue('de-txtTGROSAMOUC', Ext.util.Format.number(this.beanResult.TGROSAMOUC, '0,000.00'));
        // this.setValue('de-txtFINSAMOUC', Ext.util.Format.number(this.beanResult.FINSAMOUC, '0,000.00'));
        // this.setValue('de-txtSINSAMOUC', Ext.util.Format.number(this.beanResult.SINSAMOUC, '0,000.00'));

        this.setValue('de-txtBpoOBSERV-RO', this.beanResult.OBSERV_BPO);
        this.setValue('de-txtSTCONL', this.beanResult.descSTCONL);
        this.setValue('de-txtFCONTL', this.beanResult.FCONTL);
        this.setValue('de-txtIDCONL', this.beanResult.IDCONL);
        this.setValue('de-txtdescFREGLA', this.beanResult.descFREGLA);
        this.setValue('de-txtFREVERSA', this.beanResult.descFREVERSA);
//        this.setValue('de-txtFADM', this.beanResult.FADM);
//        this.setValue('de-txtFREVADM', this.beanResult.FREVADM);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);

        if (['1', '5', '6', '7'].indexOf(this.bean.STVAL) >= 0) {
            this.getBreakdownDataGridForMatch();
        } else {
            this.getBreakdownDataGrid();
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
        beanTemp.SCOUNTRY = this.getValue("de-txtCountry");
        beanTemp.TDOC = this.beanResult.TDOC;

        if (this.getValue("de-txtTGROSAMOUN").trim() !== '') {
            beanTemp.TGROSAMOUN = Number(this.getValue("de-txtTGROSAMOUN").trim().replaceAll(',', ''));
        } else {
            beanTemp.TGROSAMOUN = 0;
        }

        beanTemp.SPNR = this.getValue("de-txtSPNR");
        beanTemp.ISREFNBR = this.getValue("de-txtISREFNBR");
        beanTemp.TRANSDATE = this.getValue("de-txtTRANSDATE");

        beanTemp.lstSendManual = [];
        //console.log(this.lstSendManual.length);
        for (var i = 0; i < this.lstSendManual.length; i++) {
            //console.log(this.lstSendManual[i]);
            if (this.lstSendManual[i].FDESGLOSE > 0 || this.lstSendManual[i].FDUPLIB > 0) {
                continue
            } else {
                beanTemp.lstSendManual.push(this.lstSendManual[i])
            }
        }
        console.log(beanTemp);

    },
    getData: function () {

        var beanString = JSON.stringify(meDE.bean);
        Ext.Ajax.request({
            url: prototype.url + '/searchTransactionErrorDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryErrorRefund').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask('Loading...');
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

                Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(
                        Ext.create('Ext.data.Store', {data: meDE.lstSendManual, autoLoad: true})
                        );

                //meDE.getDataGrid(meDE.beanResult);
                meDE.calcularMontos();
            }
        });
    },
    getDataGrid: function (beanGrid) {
        var beanStringGrid = JSON.stringify(beanGrid);
        Ext.Ajax.request({
            url: prototype.url + '/gridTransactionError',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataInfoScan').mask('Loading...'),
            params: {beanString: beanStringGrid},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridDataInfoScan').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanInfo = res.lstInfo;

                console.log(meDE.beanInfo);

                for (var i = 0; i < res.lstInfo.length; i++) {
                    if (res.lstInfo[i].FDUPLIB > 0) {
                        //Guardar aquí tkts usados
                        meDE.lstBlocked.push(res.lstInfo[i]);
                    } else {
                        meDE.lstSendManual.push(res.lstInfo[i]);
                    }
                }

                Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(
                        Ext.create('Ext.data.Store', {data: meDE.lstSendManual, autoLoad: true})
                        );
                Ext.getCmp(prototype.id + '-gridDataInfoBlocked').bindStore(
                        Ext.create('Ext.data.Store', {data: meDE.lstBlocked, autoLoad: true})
                        );
                meDE.calcularMontos();
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
    validacionTicketPNRVacio: function (txtMsjMontos) {

        if (this.getValue("de-txtISREFNBR").trim() === '' && txtMsjMontos === '') {

            for (var j = 0; j < this.lstSendManual.length; j++) {
                if (this.lstSendManual[j].FDESGLOSE !== "1") {
                    this.setValue('de-txtISREFNBR', this.lstSendManual[j].A1531TKT.substring(0, 14));
                    break;
                }
            }
            //return 'Ticket field is empty';
        }

        if (this.getValue("de-txtSAUTHOC").trim() === '' && txtMsjMontos === '') {

            for (var j = 0; j < this.lstSendManual.length; j++) {
                if (this.lstSendManual[j].FDESGLOSE !== "1") {
                    this.setValue('de-txtSAUTHOC', this.lstSendManual[j].A1531CAPL);
                    this.setValue('de-txtSCARDN', this.lstSendManual[j].A1531NREF.replaceAll('*', 'X'));
                    break;
                }
            }
            //return 'Ticket field is empty';
        }

        /*if (this.getValue("de-txtSPNR").trim() === '') {
         return 'PNR field is empty';
         }*/

        return '';
    },
    onUpdateClick: function (btn) {
        if (this.flag_bporev === true) {
            this.transactionInStandBy(btn);
        } else {
            //console.log('onUpdateClick');        
            //var txtMsjInsert = this.validacionInsert();
            if (this.beanResult.FREVERSA === '1' || this.beanResult.FREVADM === '1') {
                global.Msg({msg: 'You cannot reconcile this transaction because it has been reversed'});
            } else {
                var txtMsjDesglose = this.validacionDesglose();
                var txtMsjMontos = this.validacionMontos();
                var txtMsjValidacionTktPNR = this.validacionTicketPNRVacio(txtMsjMontos);

                if (txtMsjValidacionTktPNR + txtMsjDesglose + txtMsjMontos === '') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'U';
                    this.ValidateTicketPNR(beanTemp, btn);
                } else {
                    if (txtMsjValidacionTktPNR !== '') {
                        console.log(txtMsjValidacionTktPNR);
                        global.Msg({msg: txtMsjValidacionTktPNR});
                    } else if (txtMsjDesglose !== '') {
                        console.log(txtMsjDesglose);
                        global.Msg({msg: txtMsjDesglose});
                    } else if (txtMsjMontos !== '') {
                        console.log(txtMsjMontos);
                        global.Msg({msg: txtMsjMontos});
                    }

                }
            }
        }
    },
    onDeleteClick: function (btn) {

    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA4116: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceErrorTransaction',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryErrorRefund').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask();
                    //Ext.getCmp(prototype.id + '-dataEntryErrorRefund').close();
                    me.setGridDataMainErrorTransaction();
                    //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    meDE.lstSendManual = [];
                    meDE.lstBlocked = [];
                    meDE.flag_bporev = false;
                    meDE.onNextClick();

                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }

            }
        });
    },
    onNextClick: function () {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex < 19) {
            rec = all.getAt(rowIndex + 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex + 1};
            this.bean = this.p.rec.data;
            this.getData();
            //this.winDataEntry('U', rec, all, rowIndex);
        }
    },
    ValidateTicketPNR: function (beanTemp, btn) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        meDE.msjValidate = 'Failed to Validate Transaction';
        Ext.Ajax.request({
            url: prototype.url + '/ValidateTransaction',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryErrorRefund').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {

                    Ext.Msg.show(
                            {
                                title: '.:PRAXIS:.',
                                msg: 'Are you sure to update?',
                                buttons: Ext.MessageBox.YESNO,
                                scope: this,
                                animateTarget: btn,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        meDE.MaintenanceA4116(beanTemp);
                                    }
                                }
                            });

                } else {
                    global.Msg({msg: res.msjOption});
                }
            }
        });
    },
    //</editor-fold>

    validacionInsert: function () {
        var msjResult = '';
        if (this.getValue("de-txtSPNR") === '' || this.getValue("de-txtISREFNBR") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionDesglose: function () {
        var msjResult = '';
        if (this.lstSendManual.length === 0) {
            msjResult = "You must have at least one ticket.";
        }
        return msjResult;
    },
    validacionMontos: function () {
        var msjResult = '';
        var suma_montos = 0;
        var monto_venta = 0;

        for (var j = 0; j < this.lstSendManual.length; j++) {
            suma_montos = suma_montos + this.lstSendManual[j].A1531VFOP;
        }

        if (this.getValue("de-txtTGROSAMOUN").trim() !== '') {
            monto_venta = Number(this.getValue("de-txtTGROSAMOUN").trim().replaceAll(',', ''));
        } else {
            monto_venta = 0;
        }

        console.log(suma_montos);
        console.log(monto_venta);
        console.log(this.lstSendManual);

        if (suma_montos !== monto_venta) {
            msjResult = "Dont match with Transaction Amount";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
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
    },
// </editor-fold>
    onTktPnr: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex).data;
        console.log(rec);

        this.setValue('de-txtISREFNBR', rec.A1531TKT.substring(0, 14));
        this.setValue('de-txtSPNR', rec.A720PNR);

    },
    cambiarGrillaChk: function () {
        console.log(Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore());
        console.log(Ext.getCmp(prototype.id + '-gridDataInfoBlocked').getStore());
        if (Ext.getCmp(prototype.id + '-chkBlocked').checked) {
            Ext.getCmp(prototype.id + '-panelDataInfoScan').hide();
            Ext.getCmp(prototype.id + '-panelDataInfoBlocked').show();
        } else {
            Ext.getCmp(prototype.id + '-panelDataInfoScan').show();
            Ext.getCmp(prototype.id + '-panelDataInfoBlocked').hide();
        }

    },
    checkManual: function (a, b, bol, rowData, e, f, g, h) {
        console.log(bol);

        if (bol === true) {
            this.lstSendManual.push(rowData.data);
            console.log(this.lstSendManual);
            this.sumAmount = this.sumAmount + rowData.data.A1531VFOP;


        } else {
            this.sumAmount = this.sumAmount - rowData.data.A1531VFOP;
            for (var j = 0; j < this.lstSendManual.length; j++) {
                if (this.lstSendManual[j].A1531TTARJ === rowData.data.A1531TTARJ &&
                        this.lstSendManual[j].A1531NREF === rowData.data.A1531NREF &&
                        this.lstSendManual[j].A1531CAPL === rowData.data.A1531CAPL &&
                        this.lstSendManual[j].A1531VFOP === rowData.data.A1531VFOP &&
                        this.lstSendManual[j].tot_VFOP === rowData.data.tot_VFOP &&
                        this.lstSendManual[j].A720FECVTA === rowData.data.A720FECVTA &&
                        this.lstSendManual[j].A720PNR === rowData.data.A720PNR &&
                        this.lstSendManual[j].A1531TKT === rowData.data.A1531TKT &&
                        this.lstSendManual[j].A720AGENTE === rowData.data.A720AGENTE) {
                    this.lstSendManual.splice(j, 1);
                    console.log(this.lstSendManual);
                }
            }
        }

        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
    },
    clear_keyDownHandler: function () {
        this.setValue('input-txtTKTScan', '');
        this.setValue('txtCard1', '');
        this.setValue('txtCard2', '');
        this.setValue('txtApproval', '');
        this.setValue('txtFromDate', '');
    },
    resetScan_keyDownHandler: function () {
        this.setValue('input-txtTKTScan', '');
        this.setValue('txtCard1', '');
        this.setValue('txtCard2', '');
        this.setValue('txtApproval', '');
        this.setValue('txtFromDate', '');
        this.lstSendManual = [];
        this.lstBlocked = [];
        //Limpiar grilla Scan
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        //Limpiar grilla Bloqueados
        Ext.getCmp(prototype.id + '-gridDataInfoBlocked').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataInfoBlocked').getView().refresh();
        //Reiniciando Scan
        this.getBreakdownDataGrid();
    },
    txtTKTScan_keyDownHandler: function (e, eOpts) {
        this.helpByticket();
    },
    helpByticket: function () {
        this.setValue('de-txtSumAmount', Ext.util.Format.number('0', '0,000.00'));
        this.lstSendManual = [];
        var tkt = this.getValue("input-txtTKTScan");
        var beanGrid = {};
        beanGrid.TKT = tkt;
        var beanStringGrid = JSON.stringify(beanGrid);
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        Ext.Ajax.request({
            url: prototype.url + '/gridTransactionErrorByTKT',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataInfoScan').mask('Loading...'),
            params: {beanString: beanStringGrid},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridDataInfoScan').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanInfo = res.lstInfo;
                console.log(meDE.beanInfo);

                if (res.lstInfo.length > 0) {
                    meDE.insertTKT(store_gridInfoScan, res.lstInfo[0]);
                    /*for (var i = 0; i < res.lstInfo.length; i++) {
                     store_gridInfoScan.add(res.lstInfo[i]);
                     }*/
                } else {
                    global.Msg({msg: 'Not Found in Refund'});
                }

                meDE.calcularMontos();

            }
        });
    },
    addCreditCard_keyDownHandler: function () {
        if ((this.getValue("txtCard1") !== '' && this.getValue("txtCard2") !== '') || this.getValue("input-txtTKTScan") !== '') {
            if (this.getValue("input-txtTKTScan") !== '') {
                this.helpByCreditCard();
            } else {
                this.lstSendManual = [];
                this.lstBlocked = [];

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

                        console.log(meDE.beanInfo);
                        for (var i = 0; i < res.data.length; i++) {
                            meDE.lstSendManual.push(res.data[i]);
                        }

                        meDE.helpByCreditCard();
                    }
                });
            }

        } else {
            global.Msg({msg: 'There are Credit Card / Ticket Fields empty'});
        }
    },
    helpByCreditCard: function () {
        this.setValue('de-txtSumAmount', Ext.util.Format.number('0', '0,000.00'));
        //this.lstSendManual = [];

        //verificacion de fecha segun cuotas
        var fecha_a_validar = "";
        var cant_cuotas = this.getValue("de-txtINSTANBR");
        if (cant_cuotas > 0) {
            fecha_a_validar = this.getValue("de-txtTRANSDATE");
        } else {
            fecha_a_validar = this.getValue("de-txtBSUMDATE");
        }

        var cc1 = this.getValue("txtCard1");
        var cc2 = this.getValue("txtCard2");
        var approval = this.getValue("txtApproval");
        var sales_date = (this.getValue("txtFromDate") === null) ? fecha_a_validar : Ext.util.Format.date(this.getValue("txtFromDate"), 'Ymd');
        var tkt = this.getValue("input-txtTKTScan");
        var beanGrid = {};
        if (cc1.length === 0 && cc2.length === 0) {
            beanGrid.SCARDN = '';
        } else {
            beanGrid.SCARDN = cc1 + '%' + cc2 + '%';
        }

        beanGrid.SAUTHOC = approval;
        beanGrid.BSUMDATE = sales_date;
        beanGrid.INSTANBR = cant_cuotas;
        beanGrid.TKT = tkt;
        beanGrid.TDOC = this.beanResult.TDOC;

        var beanStringGrid = JSON.stringify(beanGrid);
        Ext.Ajax.request({
            url: prototype.url + '/gridTransactionErrorByTKT',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataInfoScan').mask('Loading...'),
            params: {beanString: beanStringGrid},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridDataInfoScan').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var flag_blocked = false;
                var flag_dupli = false;
                meDE.beanInfo = res.lstInfo;
                console.log(meDE.beanInfo);
                if (res.lstInfo.length > 0) {
                    if (res.lstInfo[0].A1531CFOP !== 'CC') {
                        global.Msg({msg: 'Is not Credit Card'});
                    } else if (res.lstInfo[0].A1531TTARJ !== 'AX') {
                        global.Msg({msg: 'Credit Card Is not AMEX'});
                    } else {
                        for (var i = 0; i < res.lstInfo.length; i++) {
                            if (res.lstInfo[i].FDUPLIB > 0) {
                                //Guardar aquí tkts usados
                                meDE.lstBlocked.push(res.lstInfo[i]);
                                flag_blocked = true;
                            } else {
                                for (var j = 0; j < meDE.lstSendManual.length; j++) {
                                    if (meDE.lstSendManual[j].A1531TKT === res.lstInfo[i].A1531TKT) {
                                        flag_dupli = true;
                                    }
                                }
                                if (!flag_dupli) {
                                    meDE.lstSendManual.push(res.lstInfo[i]);
                                }
                            }
                        }
                        console.log(flag_blocked);
                        if (flag_blocked) {
                            global.Msg({msg: 'There are some blocked tickets'});
                        }
                        if (flag_dupli) {
                            global.Msg({msg: 'There are some duplicate tickets'});
                        }
                    }
                } else {
                    global.Msg({msg: 'Not Found in Refund'});
                }

                Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(
                        Ext.create('Ext.data.Store', {data: meDE.lstSendManual, autoLoad: true})
                        );
                Ext.getCmp(prototype.id + '-gridDataInfoBlocked').bindStore(
                        Ext.create('Ext.data.Store', {data: meDE.lstBlocked, autoLoad: true})
                        );

                meDE.calcularMontos();

            }
        });
    },
    insertTKT: function (store_gridInfoScan, objTKT) {
        if (objTKT.A1531CFOP !== 'CC') {
            global.Msg({msg: 'Is not Credit Card'});
        } else if (objTKT.A1531TTARJ !== 'AX') {
            global.Msg({msg: 'Credit Card Is not AMEX'});
        } else {
            for (var i = 0; i < store_gridInfoScan.data.length; i++) {
                if (store_gridInfoScan.data.items[i].data.A1531TTARJ === objTKT.A1531TTARJ &&
                        store_gridInfoScan.data.items[i].data.A1531NREF === objTKT.A1531NREF &&
                        store_gridInfoScan.data.items[i].data.A1531CAPL === objTKT.A1531CAPL &&
                        store_gridInfoScan.data.items[i].data.A1531VFOP === objTKT.A1531VFOP &&
                        store_gridInfoScan.data.items[i].data.tot_VFOP === objTKT.tot_VFOP &&
                        store_gridInfoScan.data.items[i].data.A720FECVTA === objTKT.A720FECVTA &&
                        store_gridInfoScan.data.items[i].data.A720PNR === objTKT.A720PNR &&
                        store_gridInfoScan.data.items[i].data.A1531TKT === objTKT.A1531TKT &&
                        store_gridInfoScan.data.items[i].data.A720AGENTE === objTKT.A720AGENTE) {
                    global.Msg({msg: 'Duplicate Ticket'});
                    return;
                }
            }

            store_gridInfoScan.add(objTKT);
            Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        }
    },
    insertCreditCard: function (store_gridInfoScan, objTKT) {
        store_gridInfoScan.add(objTKT);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        /*if (store_gridInfoScan.data.length === 0) {
         store_gridInfoScan.add(objTKT);
         Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
         } else {
         for (var i = 0; i < store_gridInfoScan.data.length; i++) {
         if (//store_gridInfoScan.data.items[i].data.A1531TTARJ === objTKT.A1531TTARJ &&
         store_gridInfoScan.data.items[i].data.A1531NREF === objTKT.A1531NREF &&
         store_gridInfoScan.data.items[i].data.A1531CAPL === objTKT.A1531CAPL &&
         store_gridInfoScan.data.items[i].data.A1531VFOP === objTKT.A1531VFOP &&
         //store_gridInfoScan.data.items[i].data.tot_VFOP === objTKT.tot_VFOP &&
         store_gridInfoScan.data.items[i].data.A720FECVTA === objTKT.A720FECVTA &&
         store_gridInfoScan.data.items[i].data.A720PNR === objTKT.A720PNR &&
         store_gridInfoScan.data.items[i].data.A1531TKT === objTKT.A1531TKT// && store_gridInfoScan.data.items[i].data.A720AGENTE === objTKT.A720AGENTE
         ) {
         continue;
         } else {
         store_gridInfoScan.add(objTKT);
         Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
         }
         }
         }*/
    },
    removeTKT: function (record) {
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        var rowIndex = store_gridInfoScan.indexOf(record);
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        this.calcularMontos();
    },
    calcularMontos: function () {
        this.sumAmount = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);
            this.sumAmount = this.sumAmount + dataRow1.data.A1531VFOP;
        }
        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
    },
    msiTracking_keyDownHandler: function () {
        Ext.create('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataGridMsiTracking', {
            id: prototype.id + '-msiTrackingGrid',
            params: {
                rec: meDE.beanResult
//                lstCountry: me.lstCountry
            }
        }).show();
    },
    reverseMatch_keyDownHandler: function (btn) {
        var beanTemp = {};
        this.llenarData(beanTemp);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse this transaction?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            meDE.ReverseA4116(beanTemp);
                        }
                    }
                });
    },
    ReverseA4116: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/ReverseTransaction',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryErrorRefund').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask();
                    me.setGridDataMainErrorTransaction();
                    Ext.getCmp(prototype.id + '-dataEntryErrorRefund').close();
                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }

            }
        });
    },
    viewTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var strTkt = rowData.data.ISREFNBR;

        prototypeProgram.view = 'payments-sales-reconcili-amex-form';
        prototypeProgram.nprog = 'PX00000570';
        prototypeProgram.title = 'Sales Reconciliation By Amex';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

        console.log(beanProMasterTicket);
        Ext.getCmp(prototype.id + '-dataEntryErrorRefund').close();
        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    bpoRev_keyDownHandler: function () {
        this.flag_bporev = true;
        Ext.getCmp(prototype.id + '-panelScanCard').hide();
        Ext.getCmp(prototype.id + '-panelBpoObserv').show();
        Ext.getCmp(prototype.id + '-closeBpoObserv').show();
    },
    transactionInStandBy: function (btn) {
        var beanTemp = {};

        beanTemp.AREFNBR = this.beanResult.AREFNBR;
        beanTemp.PRDA = this.beanResult.PRDA;
        beanTemp.TDOC = this.beanResult.TDOC;
        beanTemp.OBSERV_BPO = this.getValue("de-txtBpoOBSERV-RO");

        var beanString = JSON.stringify(beanTemp);

        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update this transaction?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            meDE.BpoRevA4116(beanString);
                        }
                    }
                });
    },
    BpoRevA4116: function (beanString) {
        Ext.Ajax.request({
            url: prototype.url + '/BpoRevTransaction',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryErrorRefund').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-dataEntryErrorRefund').unmask();
                    me.setGridDataMainErrorTransaction();
                    Ext.getCmp(prototype.id + '-dataEntryErrorRefund').close();
                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }
            }
        });
    },
    closeBpoRev_keyDownHandler: function () {
        this.flag_bporev = false;
        Ext.getCmp(prototype.id + '-panelScanCard').show();
        Ext.getCmp(prototype.id + '-panelBpoObserv').hide();
        Ext.getCmp(prototype.id + '-closeBpoObserv').hide();
    }
});