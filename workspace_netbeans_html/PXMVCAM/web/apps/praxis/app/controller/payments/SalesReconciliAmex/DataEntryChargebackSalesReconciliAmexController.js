Ext.define('Ext.Praxis.controller.payments.SalesReconciliAmex.DataEntryChargebackSalesReconciliAmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryChargebackSalesReconciliAmexController',
    meCBDE: '',
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
    beanChargebackTktsDetail: {},
    paramsDetailDEDetTktChargeback: {},
    beanStringGrid: {},
    sumAmount: 0,
    init: function (view) {
        prototype.id = 'SalesReconciliAmexForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliAmex';
        meCBDE = this;

        this.lstSendManual = [];

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
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        this.setValue('de-txtMERCHID', this.beanResult.MERCHID);
        this.setValue('de-txtZone', this.beanResult.ZONA);
        this.setValue('de-txtCountry', this.beanResult.SCOUNTRY);
        this.setValue('de-txtBSUMDATE', this.beanResult.BSUMDATE);
        this.setValue('de-txtPAYDATE', this.beanResult.PAYDATE);
        this.setValue('de-txtPRDA', this.beanResult.PRDA);
        this.setValue('de-txtCHADJNBR', this.beanResult.CHADJNBR);
        this.setValue('de-txtCHAADJCOD', this.beanResult.CHAADJCOD);
        this.setValue('de-txtCHAADJDES', this.beanResult.CHAADJDES);
        this.setValue('de-txtLMERCHID', this.beanResult.LMERCHID);
        this.setValue('de-txtSCARDN', this.beanResult.SCARDN);
        this.setValue('de-txtSAUTHOC', this.beanResult.SAUTHOC);
        this.setValue('de-txtISREFNBR', this.beanResult.ISREFNBR);
        this.setValue('de-txtPCURRENCY', this.beanResult.PCURRENCY);
        this.setValue('de-txtGROSAMOUN', Ext.util.Format.number(this.beanResult.GROSAMOUN, '0,000.00'));
        this.setValue('de-txtDISCAMOUN', Ext.util.Format.number(this.beanResult.DISCAMOUN, '0,000.00'));
        this.setValue('de-txtTAXAMOUN', Ext.util.Format.number(this.beanResult.TAXAMOUN, '0,000.00'));
        this.setValue('de-txtNETAMOUN', Ext.util.Format.number(this.beanResult.NETAMOUN, '0,000.00'));        
        this.setValue('de-txtSDATES', this.beanResult.SDATES);
        this.setValue('de-txtSAGENT', this.beanResult.SAGENT);
        this.setValue('de-txtSPNR', this.beanResult.SPNR);
        this.setValue('de-txtIDCONFLE', this.beanResult.IDCONFLE);
        this.setValue('de-txtIDCON', this.beanResult.IDCON);
        this.setValue('de-txtFCONT', this.beanResult.FCONT);
        this.setValue('de-txtSTCON', this.beanResult.STCON);
        
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

        beanTemp.MERCHID = this.getValue("de-txtMERCHID");
        beanTemp.ZONA = this.getValue("de-txtZone");
        beanTemp.SCOUNTRY = this.getValue("de-txtCountry");
        beanTemp.BSUMDATE = this.getValue("de-txtBSUMDATE");
        beanTemp.PAYDATE = this.getValue("de-txtPAYDATE");
        beanTemp.PRDA = this.getValue("de-txtPRDA");
        beanTemp.CHADJNBR = this.getValue("de-txtCHADJNBR");
        beanTemp.CHAADJCOD = this.getValue("de-txtCHAADJCOD");
        beanTemp.CHAADJDES = this.getValue("de-txtCHAADJDES");
        beanTemp.LMERCHID = this.getValue("de-txtLMERCHID");
        beanTemp.SCARDN = this.getValue("de-txtSCARDN");
        beanTemp.SAUTHOC = this.getValue("de-txtSAUTHOC");
        beanTemp.ISREFNBR = this.getValue("de-txtISREFNBR");
        beanTemp.PCURRENCY = this.getValue("de-txtPCURRENCY");
        beanTemp.NETAMOUN = this.getValue("de-txtNETAMOUN");
        beanTemp.SDATES = this.getValue("de-txtSDATES");
        beanTemp.SAGENT = this.getValue("de-txtSAGENT");
        beanTemp.SPNR = this.getValue("de-txtSPNR");
        beanTemp.IDCONFLE = this.getValue("de-txtIDCONFLE");
        beanTemp.IDCON = this.getValue("de-txtIDCON");
        beanTemp.FCONT = this.getValue("de-txtFCONT");
        beanTemp.STCON = this.getValue("de-txtSTCON");
        
    },
    getData: function () {
        var beanString = JSON.stringify(meCBDE.bean);
        Ext.Ajax.request({
            url: prototype.url + '/searchDetTktChargeback',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryChargeback').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryChargeback').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                meCBDE.beanResult = res.data[0];
                meCBDE.mostrarData();
            }
        });
    },
    getDataGrid: function () {
        this.beanChargebackTktsDetail = {},
        this.beanChargebackTktsDetail.CHADJNBR = this.bean.CHADJNBR;
        this.beanChargebackTktsDetail.CHAADJCOD = this.bean.CHAADJCOD;
        this.beanChargebackTktsDetail.MERCHID = this.bean.MERCHID;
        this.beanChargebackTktsDetail.SMERCHID = this.bean.SMERCHID;
        this.beanChargebackTktsDetail.AXPAYNBR = this.bean.AXPAYNBR;
        this.beanChargebackTktsDetail.PRDA = this.bean.PRDA;
        this.beanChargebackTktsDetail.PAYDATE = this.bean.PAYDATE;
        this.beanChargebackTktsDetail.BSUMDATE = this.bean.BSUMDATE;
        this.beanChargebackTktsDetail.ISREFNBR = this.bean.ISREFNBR;
        meCBDE.paramsDetailDEDetTktChargeback.beanString = JSON.stringify(this.beanChargebackTktsDetail);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktChargeback'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meCBDE.paramsDetailDEDetTktChargeback;
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
            url: prototype.url + '/MaintenanceChargeback',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryChargeback').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryChargeback').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    Ext.getCmp(prototype.id + '-dataEntryChargeback').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryChargeback').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
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
                meCBDE.beanInfo = res.lstInfo;
                console.log(meCBDE.beanInfo);

                if (res.lstInfo.length > 0) {
                    meCBDE.insertTKT(store_gridInfoScan, res.lstInfo[0]);
                } else {
                    global.Msg({msg: 'Not Found in Sales'});
                }

                meCBDE.calcularMontos();

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