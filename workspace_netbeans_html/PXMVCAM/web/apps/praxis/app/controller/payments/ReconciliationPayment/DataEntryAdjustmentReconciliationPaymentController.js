Ext.define('Ext.Praxis.controller.payments.ReconciliationPayment.DataEntryAdjustmentReconciliationPaymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAdjustmentReconciliationPaymentController',
    meAD: '',
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
    beanSettlementTktsDetail: {},
    paramsDetailDEDetTktSettlement : {},
    beanStringGrid: {},
    sumAmount: 0,
    init: function (view) {
        prototype.id = 'ReconciliationPaymentForm';
        prototype.url = CONTEXTPATH + '/ReconciliationPayment';
        meAD = this;

        this.lstSendManual = [];

        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec.data;

    },
    afterRender: function () {
        //this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {

        this.setValue('de-txtCCUST', this.beanResult.CCUST);
        this.setValue('de-txtPRDA', this.beanResult.PRDA);
        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtMERCHID', this.beanResult.PMERCHID);
        this.setValue('de-txtPAYDATE', this.beanResult.PAYDATE);

        this.setValue('de-txtPCURRENCY', this.beanResult.PCURRENCY);
        this.setValue('de-txtAXPAYNBR', this.beanResult.AXPAYNBR);
        this.setValue('de-txtSMERCHID', this.beanResult.SMERCHID);
        this.setValue('de-txtBSUMDATE', this.beanResult.BSUMDATE);
        this.setValue('de-txtSCARDN', this.beanResult.SCARDN);
        this.setValue('de-txtISREFNBR', this.beanResult.ISREFNBR);
        this.setValue('de-txtCHADJNBR', this.beanResult.CHADJNBR);
        this.setValue('de-txtCHAADJCOD', this.beanResult.CHAADJCOD);
        this.setValue('de-txtRECTYPE', this.beanResult.RECTYPE);
        this.setValue('de-txtSTYPECD', this.beanResult.STYPECD);
        this.setValue('de-txtLMERCHID', this.beanResult.LMERCHID);
        this.setValue('de-txtINVORNBR', this.beanResult.INVORNBR);
        this.setValue('de-txtSPNR', this.beanResult.SPNR);
        this.setValue('de-txtTDOC', this.beanResult.descTDOC);
        this.setValue('de-txtSELLERID', this.beanResult.SELLERID);
        this.setValue('de-txtAXPRODAT', this.beanResult.AXPRODAT);
        this.setValue('de-txtSIREFNBR', this.beanResult.SIREFNBR);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);

        //this.setValue('de-txtTGROSAMOUN', Ext.util.Format.number(this.beanResult.TGROSAMOUN, '0,000.00'));

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);        
    },
    obtainData: function () {
    },
    llenarData: function (beanTemp) {

        beanTemp.PAYDATE = this.getValue("de-txtPAYDATE");
        beanTemp.PRDA = this.getValue("de-txtPRDA");
        beanTemp.BSUMDATE = this.getValue("de-txtBSUMDATE");
        beanTemp.PMERCHID = this.getValue("de-txtMERCHID");
        beanTemp.SMERCHID = this.getValue("de-txtSMERCHID");
        beanTemp.AXPAYNBR = this.getValue("de-txtAXPAYNBR");
        beanTemp.PCURRENCY = this.getValue("de-txtPCURRENCY");
        beanTemp.SCARDN = this.getValue("de-txtSCARDN");
        beanTemp.SAUTHOC = this.getValue("de-txtSAUTHOC");
        beanTemp.IDITEMS = this.getValue("de-txtIDITEMS");
        beanTemp.IDITEMT = this.getValue("de-txtIDITEMT");
        beanTemp.INSTANBR = this.getValue("de-txtINSTANBR");
        beanTemp.CERROR = this.getValue("txtCERROR");

        if (this.getValue("de-txtTGROSAMOUN").trim() !== '') {
            beanTemp.TGROSAMOUN = Number(this.getValue("de-txtTGROSAMOUN").trim().replace(',', ''));
        } else {
            beanTemp.TGROSAMOUN = 0;
        }

        beanTemp.SPNR = this.getValue("de-txtSPNR");
        beanTemp.ISREFNBR = this.getValue("de-txtISREFNBR");
        beanTemp.TRANSDATE = this.getValue("de-txtTRANSDATE");
        beanTemp.lstSendManual = this.lstSendManual;

    },
    getData: function () {
        var beanString = JSON.stringify(meAD.bean);
        Ext.Ajax.request({
            url: prototype.url + '/searchAdjustmentErrorDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAdjustment').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryAdjustment').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meAD.beanResult = res.result;
                meAD.beanInfo = res.lstInfo;
                meAD.mostrarData();
            }
        });
    },

    getDataGrid: function () {
        this.beanSettlementTktsDetail = {},
        this.beanSettlementTktsDetail.DATE = this.bean.DATE;
        this.beanSettlementTktsDetail.IN_DATE = this.bean.IN_DATE;
        this.beanSettlementTktsDetail.PMERCHID = this.bean.PMERCHID;
        this.beanSettlementTktsDetail.SPNR = this.bean.SPNR;
        this.beanSettlementTktsDetail.ISREFNBR = this.bean.ISREFNBR;
        this.beanSettlementTktsDetail.IN_PCURRENCY = this.bean.IN_PCURRENCY;
        this.beanSettlementTktsDetail.IN_TGROSAMOUN = this.bean.TGROSAMOUN;
        this.beanSettlementTktsDetail.IN_descSTVAL = this.bean.descSTVAL;
        this.beanSettlementTktsDetail.IN_TRANSDATE = this.bean.TRANSDATE;
        this.beanSettlementTktsDetail.IN_AXPRODAT = this.bean.AXPRODAT;
        this.beanSettlementTktsDetail.IN_FREGLA = this.bean.FREGLA;
        this.beanSettlementTktsDetail.IN_SCARDN = this.bean.SCARDN;
        this.beanSettlementTktsDetail.IN_SAUTHOC = this.bean.SAUTHOC;
        this.beanSettlementTktsDetail.IN_IDITEMT = this.bean.IDITEMT;
        this.beanSettlementTktsDetail.IN_IDITEMS = this.bean.IDITEMS;
        meAD.paramsDetailDEDetTktSettlement.beanString = JSON.stringify(this.beanSettlementTktsDetail);
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktSettlement'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meAD.paramsDetailDEDetTktSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').unmask();
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').setStore(storeGridDatas);

    },
    limpiarData: function () {
        //this.setValue('txtCODSOUR', '');        
    },
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {

    },
    validacionTicketPNRVacio: function () {
        if (this.getValue("de-txtSPNR").trim() === '') {
            return 'PNR field is empty';
        }

        if (this.getValue("de-txtISREFNBR").trim() === '') {
            return 'Ticket field is empty';
        }
        return '';
    },
    onUpdateClick: function (btn) {
        var txtMsjValidacionTktPNR = this.validacionTicketPNRVacio();
        //var txtMsjInsert = this.validacionInsert();
        var txtMsjDesglose = this.validacionDesglose();
        var txtMsjMontos = this.validacionMontos();

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

    },
    onDeleteClick: function (btn) {

    },
    onCancelClick: function (btn) {
        this.view.close();
    },

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA4116: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceSettlement',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAdjustment').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAdjustment').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    Ext.getCmp(prototype.id + '-dataEntryAdjustment').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryAdjustment').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }

            }
        });
    },
    ValidateTicketPNR: function (beanTemp, btn) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        meAD.msjValidate = 'Failed to Validate Transaction';
        Ext.Ajax.request({
            url: prototype.url + '/ValidateTransaction',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryAdjustment').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryAdjustment').unmask('Loading...');
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
                                        meAD.MaintenanceA4116(beanTemp);
                                    }
                                }
                            });

                } else {
                    global.Msg({msg: res.msjOption});
                }
            }
        });
    },

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
            monto_venta = Number(this.getValue("de-txtTGROSAMOUN").trim().replace(',', ''));
        } else {
            monto_venta = 0;
        }
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
    onTktPnr: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex).data;
        console.log(rec);

        this.setValue('de-txtISREFNBR', rec.ISREFNBR);
        this.setValue('de-txtSPNR', rec.SPNR);

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
    resetScan_keyDownHandler: function () {
        this.getDataGrid(this.beanResult);
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
                meAD.beanInfo = res.lstInfo;
                console.log(meAD.beanInfo);

                if (res.lstInfo.length > 0) {
                    meAD.insertTKT(store_gridInfoScan, res.lstInfo[0]);
                } else {
                    global.Msg({msg: 'Not Found in Sales'});
                }

                meAD.calcularMontos();

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
    removeTKT: function (record) {
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        var rowIndex = store_gridInfoScan.indexOf(record);
        store_gridInfoScan.removeAt(rowIndex);
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
    },
});