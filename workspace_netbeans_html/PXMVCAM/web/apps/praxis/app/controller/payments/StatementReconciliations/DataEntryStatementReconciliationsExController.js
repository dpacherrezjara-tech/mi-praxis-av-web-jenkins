Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.DataEntryStatementReconciliationsExController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryStatementReconciliationsExController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    searchParamsPending: {},
    beanDetails: {},
    beanAgrupa: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        this.obtainData();

    },
    afterRender: function () {
        $('#StatementReconciliationsForm-btnToggleSwitch').change(function () {
            meDE.validaEntry();
        });

        switch (this.actionCode) {
            case 'U':
                this.getData();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    obtainData: function () {

        this.dataObtain.CARD = 2;
        this.dataObtain.BANK = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.lstCard = res.lstCard;
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').setValue('');
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    validaEntry: function () {

        /*
         * Define estructura
         * 
         * Mediante el CERROR se controlará la existencia de cabeceras
         * 
         * activado:Muestra la estructura normal MPF102 - MPF060
         * 
         * desactivado: Muestra la estrucuctura MPF102 - MPF083 - MPF060 
         */

        let formPend = Ext.getCmp(prototype.id + '-header');
        if (!formPend.isVisible()) {

            Ext.getCmp(prototype.id + '-btn-update').show();
            Ext.getCmp(prototype.id + '-panelScanHead').show();
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOL, '0,000.00'));
            this.setValue('de-txtCOREP', this.beanResult.COREP);

            Ext.getCmp(prototype.id + '-header').show();
            Ext.getCmp(prototype.id + '-detail').hide();
            Ext.getCmp(prototype.id + '-panelScanHead').show();
            Ext.getCmp(prototype.id + '-mainHeader').show();
            Ext.getCmp(prototype.id + '-sumHeader').show();
            Ext.getCmp(prototype.id + '-panelScanCard').hide();
            Ext.getCmp(prototype.id + '-panelScanCard2').hide();
            Ext.getCmp(prototype.id + '-mainDetail').hide();
            Ext.getCmp(prototype.id + '-mainDetail2').hide();
            Ext.getCmp(prototype.id + '-gridColumnDeleteHead').show();
//            Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(870);
            Ext.getCmp(prototype.id + '-titleDetail').show();
//            Ext.getCmp(prototype.id + '-titleFees').show();

            this.onSearchCompleteHeader();

        } else {

            Ext.getCmp(prototype.id + '-btn-update').show();
            Ext.getCmp(prototype.id + '-panelScanHead').show();
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOL, '0,000.00'));
            this.setValue('de-txtCOREP', this.beanResult.COREP);

            Ext.getCmp(prototype.id + '-header').hide();
            Ext.getCmp(prototype.id + '-detail').show();
            Ext.getCmp(prototype.id + '-panelScanHead').hide();
            Ext.getCmp(prototype.id + '-mainHeader').hide();
            Ext.getCmp(prototype.id + '-sumHeader').hide();
            Ext.getCmp(prototype.id + '-panelScanCard').show();
            Ext.getCmp(prototype.id + '-panelScanCard2').show();
            Ext.getCmp(prototype.id + '-mainDetail').show();
            Ext.getCmp(prototype.id + '-mainDetail2').show();
//            Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(780);
            Ext.getCmp(prototype.id + '-titleDetail').hide();
            Ext.getCmp(prototype.id + '-titleFees').hide();

            this.onSearchCompleteDetail();
        }

    },
    mostrarData: function () {

        if (this.beanResult.descSTVAL === 'Match' || this.beanResult.descSTVAL === 'Match Manual') {

            Ext.getCmp(prototype.id + '-MOD').hide();
            Ext.getCmp(prototype.id + '-btnToggleSwitch').hide();
            Ext.getCmp(prototype.id + '-gridColumnDelete').hide();
//            Ext.getCmp(prototype.id + '-panelDataInfoScan').setWidth(1750);
//            Ext.getCmp(prototype.id + '-gridDataInfoScan').setWidth(1450);
            Ext.getCmp(prototype.id + '-panelScanCard').hide();
            Ext.getCmp(prototype.id + '-panelScanCard2').hide();
            Ext.getCmp(prototype.id + '-btn-update').hide();
            Ext.getCmp(prototype.id + '-panelScanHead').hide();
            Ext.getCmp(prototype.id + '-gridColumnDeleteHead').hide();
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOC, '0,000.00'));

            this.setValue('de-txtCOREP', this.beanResult.COREP);
            if (!this.beanResult.COREP.includes("WP") && !this.beanResult.COREP.includes("IP") &&
                    !this.beanResult.COREP.includes("SD") && !(this.beanResult.COREP.includes("FD") &&
                    this.beanResult.SCOUNTRY.includes("UY"))  && !this.beanResult.COREP.includes("NB") &&
                    !this.beanResult.COREP.includes("ET") && !this.beanResult.COREP.includes("WQ") && 
                    !(this.beanResult.COREP.includes("EV") && this.beanResult.SCOUNTRY.includes("PR")) && !this.beanResult.COREP.includes("TB") &&
                    !["CT", "SK","BD"].includes(this.beanResult.COREP) ) {
                //WITH HEADER
                Ext.getCmp(prototype.id + '-header').show();
                Ext.getCmp(prototype.id + '-detail').hide();
                Ext.getCmp(prototype.id + '-mainHeader').show();
                Ext.getCmp(prototype.id + '-sumHeader').show();
                Ext.getCmp(prototype.id + '-panelScanCard').hide();
                Ext.getCmp(prototype.id + '-panelScanCard2').hide();
                Ext.getCmp(prototype.id + '-mainDetail').hide();
                Ext.getCmp(prototype.id + '-mainDetail2').hide();
//                Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(870);
                Ext.getCmp(prototype.id + '-gridDataInfoScanHead').setWidth(1464);
                Ext.getCmp(prototype.id + '-titleDetail').show();
                Ext.getCmp(prototype.id + '-titleFees').show();
                Ext.getCmp(prototype.id + '-gridDataInfoScanFees').show();
                Ext.getCmp(prototype.id + '-Fees').show();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_Fee').show();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_FeeEx').show();
                this.onSearchCompleteHeader();
            } else {
                //WITHOUT HEADER
                Ext.getCmp(prototype.id + '-header').hide();
                Ext.getCmp(prototype.id + '-detail').show();
                Ext.getCmp(prototype.id + '-mainHeader').hide();
                Ext.getCmp(prototype.id + '-sumHeader').hide();
                Ext.getCmp(prototype.id + '-mainDetail').show();
                Ext.getCmp(prototype.id + '-mainDetail2').show();
                Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(730);
                Ext.getCmp(prototype.id + '-titleDetail').hide();
                Ext.getCmp(prototype.id + '-titleFees').hide();
                Ext.getCmp(prototype.id + '-gridDataInfoScanFees').show();
                Ext.getCmp(prototype.id + '-Fees').show();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_Fee').show();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_FeeEx').show();
                this.onSearchCompleteDetail();
            }

        } else {

            Ext.getCmp(prototype.id + '-MOD').show();
            Ext.getCmp(prototype.id + '-btnToggleSwitch').show();
            Ext.getCmp(prototype.id + '-btn-update').show();
            Ext.getCmp(prototype.id + '-panelScanHead').show();
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOL, '0,000.00'));
            this.setValue('de-txtCOREP', this.beanResult.COREP);

            if (!this.beanResult.COREP.includes("WP") && !this.beanResult.COREP.includes("IP") &&
                    !this.beanResult.COREP.includes("SD") && !(this.beanResult.COREP.includes("FD") &&
                    this.beanResult.SCOUNTRY.includes("UY"))  && !this.beanResult.COREP.includes("NB") &&
                    !this.beanResult.COREP.includes("ET") && !this.beanResult.COREP.includes("WQ") && 
                    !(this.beanResult.COREP.includes("EV") && this.beanResult.SCOUNTRY.includes("PR")) && !this.beanResult.COREP.includes("TB") &&
                    !["CT", "SK","BD"].includes(this.beanResult.COREP) ) {
                Ext.getCmp(prototype.id + '-header').show();
                Ext.getCmp(prototype.id + '-detail').hide();
                Ext.getCmp(prototype.id + '-panelScanHead').show();
                Ext.getCmp(prototype.id + '-mainHeader').show();
                Ext.getCmp(prototype.id + '-sumHeader').show();
                Ext.getCmp(prototype.id + '-panelScanCard').hide();
                Ext.getCmp(prototype.id + '-panelScanCard2').hide();
                Ext.getCmp(prototype.id + '-mainDetail').hide();
                Ext.getCmp(prototype.id + '-mainDetail2').hide();
                Ext.getCmp(prototype.id + '-gridColumnDeleteHead').show();
                Ext.getCmp(prototype.id + '-gridDataInfoScanHead').setWidth(1550);
//                Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(870);
                Ext.getCmp(prototype.id + '-titleDetail').show();
                Ext.getCmp(prototype.id + '-titleFees').hide();
                Ext.getCmp(prototype.id + '-gridDataInfoScanFees').hide();
                Ext.getCmp(prototype.id + '-Fees').hide();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_Fee').hide();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_FeeEx').hide();
                this.onSearchCompleteHeader();
            } else {
                Ext.getCmp(prototype.id + '-header').hide();
                Ext.getCmp(prototype.id + '-detail').show();
                Ext.getCmp(prototype.id + '-panelScanHead').hide();
                Ext.getCmp(prototype.id + '-mainHeader').hide();
                Ext.getCmp(prototype.id + '-sumHeader').hide();
                Ext.getCmp(prototype.id + '-panelScanCard').show();
                Ext.getCmp(prototype.id + '-panelScanCard2').show();
                Ext.getCmp(prototype.id + '-mainDetail').show();
                Ext.getCmp(prototype.id + '-mainDetail2').show();
                Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(780);
                Ext.getCmp(prototype.id + '-titleDetail').hide();
                Ext.getCmp(prototype.id + '-titleFees').hide();
                Ext.getCmp(prototype.id + '-gridDataInfoScanFees').hide();
                Ext.getCmp(prototype.id + '-Fees').hide();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_Fee').hide();
                Ext.getCmp(prototype.id + '-de-txtSumAmount_FeeEx').hide();
                this.onSearchCompleteDetail();
            }
        }

        this.setValue('de-txtdescTDOC', this.beanResult.descTDOC);
        this.setValue('de-txtTDOC', this.beanResult.TDOC);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtNAME', this.beanResult.NAME);
        this.setValue('de-txtNAMEP', this.beanResult.NAMEP);
        this.setValue('de-txtCOREP', this.beanResult.COREP);
        this.setValue('de-txtSTVAL', this.beanResult.descSTVAL);
        this.setValue('de-txtSCOUNTRY', this.beanResult.DESC_SCOUNTRY);
        this.setValue('de-txtSCOUNTRY_COD', this.beanResult.SCOUNTRY);
        this.setValue('de-txtSOCIETY', this.beanResult.CCUST);

        this.setValue('de-txtDATECI', this.beanResult.DATECI);
        this.setValue('de-txtTRANCI', this.beanResult.TRANCI);
        this.setValue('de-txtQTYTRAN1', this.beanResult.QTYTRAN1);
        this.setValue('de-txtVALDATE', this.beanResult.VALDATE);
        this.setValue('de-txtMERCHAND', this.beanResult.MERCHAND);
        this.setValue('de-txtBANDOC', this.beanResult.BANDOC);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtNETO', Ext.util.Format.number(this.beanResult.NETO, '0,000.00'));
//        this.setValue('de-txtMONEDAPAGO', this.beanResult.MONEDAPAGO);
        this.setValue('de-txtVALDATEL', this.beanResult.VALDATEL);
        this.setValue('de-txtMERCHANDL', this.beanResult.MERCHANDL);
        this.setValue('de-txtBANDOCL', this.beanResult.BANDOCL);
        this.setValue('de-txtCOREPL', this.beanResult.COREPL);
        this.setValue('de-txtSCURRENCYL', this.beanResult.SCURRENCY); //DEBERÍA SER DE LA 060 PERO NO HAY
//        this.setValue('de-txtSDATE', this.beanResult.SDATE);
        this.setValue('de-txtACCNUMBERL', this.beanResult.ACCNUMBERL);
        this.setValue('de-txtACCNUMBER', this.beanResult.ACCNUMBER);
        this.setValue('de-txtACCOUNT', this.beanResult.ACCOUNT);
        this.setValue('de-txtCLAVE1', this.beanResult.CLAVE1);
        this.setValue('de-txtCLAVE3', this.beanResult.CLAVE3);
        this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.DIFF, '0,000.00'));
        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function () {
        var bean = {};
        bean.TDOC = this.getValue("de-txtTDOC");
        bean.CODEBANK = this.getValue("de-txtCODEBANK");
//        bean.CODEBANKA = this.getValue("de-txtCODEBANKA");
        bean.NAME = this.getValue("de-txtNAME");
        bean.STVAL = this.getValue("de-txtSTVAL");
        bean.CCUST = this.getValue("de-txtSOCIETY");
        bean.DATECI = this.getValue("de-txtDATECI");
        bean.QTYTRAN1 = this.getValue("de-txtQTYTRAN1");
        bean.VALDATE = this.getValue("de-txtVALDATE");
        bean.MERCHAND = this.getValue("de-txtMERCHAND");
        bean.BANDOC = this.getValue("de-txtBANDOC");
        bean.NETO = this.getValue("de-txtNETO");
//        bean.MONEDAPAGO = this.getValue("de-txtMONEDAPAGO");
        bean.VALDATEL = this.getValue("de-txtVALDATEL");
        bean.MERCHANDL = this.getValue("de-txtMERCHANDL");
        bean.BANDOCL = this.getValue("de-txtBANDOCL");
        bean.SCURRENCYL = this.getValue("de-txtSCURRENCYL");
        bean.NETOL = this.getValue("de-txtNETOL");
//        bean.SDATE = this.getValue("de-txtSDATE");
        bean.ACCNUMBER = this.getValue("de-txtACCNUMBER");
        bean.DIFF = this.getValue("de-txtDIFF");
        bean.USCR = this.getValue("txtUSCR").trim();
        bean.FECR = this.getValue("txtFECR").trim();
        bean.HOCR = this.getValue("txtHOCR").trim();
        bean.USUP = this.getValue("txtUSUP").trim();
        bean.FEUP = this.getValue("txtFEUP").trim();
        bean.HOUP = this.getValue("txtHOUP").trim();
        console.log(bean.SAGENT);
        return bean;
    },
    getData: function () {
        meDE.bean.data.IN_VALDATE = meDE.bean.data.VALDATE;
        meDE.bean.data.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.bean.data.IN_MERCHAND = meDE.bean.data.MERCHAND;
        meDE.bean.data.IN_TRANCI = meDE.bean.data.TRANCI;
        meDE.bean.data.IN_DATECI = meDE.bean.data.DATECI;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_NETO = meDE.bean.data.NETO + "";
        meDE.bean.data.IN_RED = meDE.bean.data.RED;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        meDE.bean.data.SCURRENCY = meDE.bean.data.SCURRENCY;
        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryEx').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                meDE.beanResult = res.data;
                console.log(meDE.beanResult);

//                meDE.onSearchCompleteDetail();
//                meDE.validaEntry();

                meDE.mostrarData();
            }
        });
    },
    onSearchCompleteDetail: function () {
        meDE.bean.data.IN_FROMADATE = meDE.bean.data.VALDATE;
        meDE.bean.data.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.bean.data.IN_MERCHAND = meDE.bean.data.MERCHAND;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_NETO = meDE.bean.data.NETO + "";
        meDE.bean.data.IN_RED = meDE.bean.data.RED;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        meDE.bean.data.IN_DATECI = meDE.beanResult.DATECI;
        meDE.bean.data.IN_TRANCI = meDE.beanResult.TRANCI;
        meDE.bean.data.IN_ACCNUMBER = meDE.beanResult.ACCNUMBER;
        meDE.bean.data.IN_FUNDSTRGK = meDE.beanResult.FUNDSTRGK;

        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }
        console.log(meDE.bean.data.IN_MERCHAND, 'meDE.bean.data.IN_MERCHAND ')
        console.log(meDE.bean.data.IN_BANDOC, 'meDE.bean.data.IN_BANDOC ')
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_DETAIL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryEx').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    var storeDataNormal = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    var storeDataFees = Ext.create('Ext.data.Store', {
                        data: res.dataFees,
                        autoLoad: true
                    });
                    
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataNormal);
                    Ext.getCmp(prototype.id + '-gridDataInfoScanFees').bindStore(storeDataFees);
                    
                    meDE.calcularMontos();
                    meDE.calcularDiferencias();
                } else {
                    global.Msg({msg: res.Mensaje});
                }

            }
        });
    },
    onSearchCompleteHeader: function () {
        meDE.bean.data.IN_FROMADATE = meDE.bean.data.VALDATE;
        meDE.bean.data.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.bean.data.IN_MERCHAND = meDE.bean.data.MERCHAND;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_NETO = meDE.bean.data.NETO + "";
        meDE.bean.data.IN_RED = meDE.bean.data.RED;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        meDE.bean.data.IN_DATECI = meDE.beanResult.DATECI;
        meDE.bean.data.IN_TRANCI = meDE.beanResult.TRANCI;
        meDE.bean.data.IN_ACCNUMBER = meDE.beanResult.ACCNUMBER;
        meDE.bean.data.IN_FUNDSTRGK = meDE.beanResult.FUNDSTRGK;

        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }

        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_HEADER',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryEx').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScanHead').bindStore(storeData);

                    meDE.calcularMontosHead();

                    var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
                    if (grid) {

                        var view = grid.getView();
                        var firstRow = view.getRow(0);

                        if (firstRow) {

                            var actionColumn = grid.down('actioncolumn');
                            var cell = Ext.fly(view.getCell(firstRow, actionColumn));
                            var button = cell.down('.prx-icon-eye');

                            if (button) {
                                button.dom.click();
                            }

                        }
                    }

                    meDE.calcularMontos();
                    meDE.calcularDiferenciasHead();
                } else {
                    global.Msg({msg: res.Mensaje});
                }

            }
        });
    },
    searchQueryAgrupa: function () {
        this.getDataQueryAgrupa();
    },
    getDataQueryAgrupa: function () {
        this.setFormatParameterQueryAgrupa();
        this.setGridDataQueryAgrupa();
    },
    setFormatParameterQueryAgrupa: function () {
        meDE.beanAgrupa = {};
        var fecha_a_validar = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue();
        meDE.beanAgrupa.IN_FROMADATEAG = (Ext.getCmp(prototype.id + '-txtFromADATEAG').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromADATEAG').getValue("txtFromADATEAG"), 'Ymd');
        meDE.beanAgrupa.IN_TOADATEAG = (Ext.getCmp(prototype.id + '-txtToADATEAG').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToADATEAG').getValue("txtToADATEAG"), 'Ymd');
        meDE.beanAgrupa.IN_LIQUIDACIOAG = Ext.getCmp(prototype.id + '-txtLIQUIDACIOAG').getValue();
        meDE.beanAgrupa.IN_MERCHANDAG = Ext.getCmp(prototype.id + '-txtMERCHANDAG').getValue();
        meDE.beanAgrupa.IN_NETOAG = Ext.getCmp(prototype.id + '-txtNETOAG').getValue();

        var beanString = JSON.stringify(meDE.beanAgrupa);
        searchParamsPending = {
            beanString: beanString,
            bean: meDE.beanAgrupa
        };
        console.log(searchParams, 'searchParams')
    },
    setGridDataQueryAgrupa: function () {
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDataPending = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchBean_AGRUPA'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParamsPending;
                    },
                    load: function (obj) {

                        var pag = Ext.getCmp(prototype.id + '-paggin_Agrupa');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage_Agrupa').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount_Agrupa').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total_Agrupa').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                        meDE.setWidthPieQueryAgrupa();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAgrupa').bindStore(storeGridDataPending);
            Ext.getCmp(prototype.id + '-paggin_Agrupa').bindStore(storeGridDataPending);
        }
    },
    //</editor-fold>
    calcularMontosHead: function () {

        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');

        if (store.getCount() > 0 && store.getCount() < 22) {
            calculateButton.show();
        } else {
            calculateButton.hide();
        }

        this.sumAmount_tot = 0;
        this.sumAmount_com = 0;
        this.sumAmount_net = 0;
        this.sumAmount_imp = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScanHead').getStore();
        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);
            this.sumAmount_tot = this.sumAmount_tot + dataRow1.data.TOTAL;
            this.sumAmount_com = this.sumAmount_com + dataRow1.data.COMISION;
            this.sumAmount_net = this.sumAmount_net + dataRow1.data.NETO;
            this.sumAmount_imp = this.sumAmount_imp + dataRow1.data.IMPORTEPAG;
        }

        this.setValue('de-txtSumAmountHead_Tot', Ext.util.Format.number(this.sumAmount_tot, '0,000.00'));
        this.setValue('de-txtSumAmountHead_Com', Ext.util.Format.number(this.sumAmount_com, '0,000.00'));
        this.setValue('de-txtSumAmountHead_Net', Ext.util.Format.number(this.sumAmount_net, '0,000.00'));
        this.setValue('de-txtSumAmountHead_Imp', Ext.util.Format.number(this.sumAmount_imp, '0,000.00'));
        this.setValue('de-txtQtyHead', store_gridInfoScan.data.length);
        Ext.getCmp(prototype.id + '-gridDataInfoScanHead').getView().refresh();
    },
    calcularMontos: function () {
        console.log('calcularMontos');
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');
        if (store.getCount() > 0 && store.getCount() < 22) {
            calculateButton.show();
        } else {
            calculateButton.hide();
        }

        this.sumAmount_Tot = 0;
        this.sumAmount_Com = 0;
        this.sumAmount_Net = 0;
        this.sumAmount_Imp = 0;
        this.sumAmount_Fee = 0;
        this.lstSendManual = [];
        this.lstSendManualFees = [];
        this.sumAmount_FeeEx = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        var store_gridInfoScanFees = Ext.getCmp(prototype.id + '-gridDataInfoScanFees').getStore();

        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);

            if (dataRow1.data.STMANUAL !== 'Blocked') {
                var total = parseFloat(dataRow1.data.TOTAL) || 0;
                var neto = parseFloat(dataRow1.data.NETO) || 0;
                var comision = parseFloat(dataRow1.data.COMISION) || 0;
                var importe = parseFloat(dataRow1.data.IMPORTEPAG) || 0;

                this.sumAmount_Tot += total;
                this.sumAmount_Com += comision;
                this.sumAmount_Net += neto;
                this.sumAmount_Imp += importe;
                
            }
        }
        
        for (var i = 0; i < store_gridInfoScanFees.data.length; i++) {
            var dataRow1 = store_gridInfoScanFees.data.items[i];
            this.lstSendManualFees.push(dataRow1.data);

                var importe = parseFloat(dataRow1.data.IMPORTE) || 0;
                var importePag = parseFloat(dataRow1.data.IMPORTEPAG) || 0;
                this.sumAmount_Fee += importe;
                this.sumAmount_FeeEx += importePag;
                
        }

        if (this.beanResult.STVAL === '1') {
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOC, '0,000.00'));
            this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.NETO - this.beanResult.NETOC, '0,000.00'));
        } else {
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.sumAmount_Net, '0,000.00'));
            this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.NETO - this.sumAmount_Net, '0,000.00'));
            console.log(Ext.util.Format.number(this.beanResult.NETO - this.sumAmount_Net, '0,000.00'), 'hallar monto');
        }
        this.setValue('de-txtSumAmount_Tot', Ext.util.Format.number(this.sumAmount_Tot, '0,000.00'));
        this.setValue('de-txtSumAmount_Com', Ext.util.Format.number(this.sumAmount_Com, '0,000.00'));
        this.setValue('de-txtSumAmount_Net', Ext.util.Format.number(this.sumAmount_Net, '0,000.00'));
        this.setValue('de-txtSumAmount_Imp', Ext.util.Format.number(this.sumAmount_Imp, '0,000.00'));
        this.setValue('de-txtSumAmount_Fee', Ext.util.Format.number(this.sumAmount_Fee, '0,000.00'));
        this.setValue('de-txtSumAmount_FeeEx', Ext.util.Format.number(this.sumAmount_FeeEx, '0,000.00'));
//        console.log(this.sumAmount_Tot);
//        console.log(this.sumAmount_Com);
//        console.log(this.sumAmount_Net);
//        console.log(this.sumAmount_Imp);
//        console.log(this.sumAmount_Fee);
        this.setValue('de-txtQty', store_gridInfoScan.data.length);

        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        Ext.getCmp(prototype.id + '-gridDataInfoScanFees').getView().refresh();
    },
    calcularDiferenciasHead: function () {
        console.log('calcularDiferenciasHEADER');
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');

        if (store.getCount() > 0 && store.getCount() < 22) {

            var model = grid.getStore().getModel();
            var suma = 0;
            grid.getStore().each(function (record) {
                suma += record.get('NETO');
            });
            var diff = Math.abs(Ext.getCmp(prototype.id + '-de-txtSumAmountHead_Net').getValue().replace(/,/g, '').replace('.00', ''));
            console.log(diff);

            let formHeader = Ext.getCmp(prototype.id + '-panelScanHead');
            if (!formHeader.isVisible()) {
                diff = diff + 12.84;
            }

            var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
            var store = grid.getStore();
            var records = store.getRange();
            this.desmarcarRegistros(records);
            if (diff !== 0) {
                var timeout = 6000; // 6 segundos
                var startTime = new Date().getTime();

                var findCombinationsWithTimeout = function () {
                    var currentTime = new Date().getTime();
                    if (currentTime - startTime < timeout) {
                        this.findCombinations(records, 0, 0, [], diff);
                    } else {
                        console.log('Tiempo límite alcanzado. La búsqueda se ha interrumpido.');
                    }
                }.bind(this);
                setTimeout(findCombinationsWithTimeout, 0);
            } else {
                this.desmarcarRegistros(records);
            }
        }

    },
    calcularDiferencias: function () {
        console.log('calcular diferencias');
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');

        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');

        var models = grid.getStore().getModel();
        var comg = '';
        var MERCHAND = '';
        var BANDOC = '';
        var SCURRENCY = '';
        var ACCNUMBER = '';
        var ADATE = '';
        grid.getStore().each(function (record) {
            comg = record.get('CCUST').trim();
            MERCHAND = record.get('MERCHAND').trim();
            BANDOC = record.get('BANDOC').trim();
            SCURRENCY = record.get('SCURRENCY').trim();
            ACCNUMBER = record.get('ACCNUMBER').trim();
            ADATE = record.get('ADATE').trim();
        });

        var comp = Ext.getCmp(prototype.id + '-de-txtSOCIETY').getValue();

//        if (comg !== comp && comg !== '') {
//            Ext.getCmp(prototype.id + '-de-txtSOCIETYS').setValue(comg);
//            Ext.util.CSS.createStyleSheet('.detalle-society { background-color: #d5f4d5 !important; }');
//            Ext.util.CSS.createStyleSheet('.detalle-society-textfield { background-color: #d5f4d5 !important; }');
//        } else {
//            Ext.getCmp(prototype.id + '-de-txtSOCIETYS').setValue(comg);
//            Ext.util.CSS.createStyleSheet('.detalle-society { background-color: transparent !important; }');
//            Ext.util.CSS.createStyleSheet('.detalle-society-textfield { background-color: #ccdeeb !important; }');
//        }

        Ext.getCmp(prototype.id + '-de-txtACCNUMBERL').setValue(ACCNUMBER);
        Ext.getCmp(prototype.id + '-de-txtVALDATEL').setValue(ADATE);
        Ext.getCmp(prototype.id + '-de-txtMERCHANDL').setValue(MERCHAND);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCYL').setValue(SCURRENCY);
        Ext.getCmp(prototype.id + '-de-txtBANDOCL').setValue(BANDOC);

        var acc = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        var accL = Ext.getCmp(prototype.id + '-de-txtACCNUMBERL').getValue();

//        if (acc !== accL && acc !== '') {
//            console.log('test1');
//            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBER { background-color: #d5f4d5 !important; }');
//            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBERL-textfield { background-color: #d5f4d5 !important; }');
//        } else {
//            console.log('test2');
//            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBER { background-color: #ccdeeb !important; }');
//            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBERL-textfield { background-color: #ccdeeb !important; }');
//        }

        if (store.getCount() > 0 && store.getCount() < 22) {

            var model = grid.getStore().getModel();
            var suma = 0;
            grid.getStore().each(function (record) {
                suma += record.get('NETO');
            });
            var diff = Math.abs(Ext.getCmp(prototype.id + '-de-txtDIFF').getValue().replace(/,/g, '').replace('.00', ''));
            console.log(diff);

            var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');
            var store = grid.getStore();
            var records = store.getRange();
            this.desmarcarRegistros(records);
            if (diff !== 0) {
                var timeout = 6000; // 6 segundos
                var startTime = new Date().getTime();

                var findCombinationsWithTimeout = function () {
                    var currentTime = new Date().getTime();
                    if (currentTime - startTime < timeout) {
                        this.findCombinations(records, 0, 0, [], diff);
                    } else {
                        console.log('Tiempo límite alcanzado. La búsqueda se ha interrumpido.');
                    }
                }.bind(this);

                setTimeout(findCombinationsWithTimeout, 0);
            } else {
                this.desmarcarRegistros(records);
            }
        }
    },

    findCombinations: function (records, index, sum, combination, diff) {
        if (sum === diff) {
            this.mostrarCombinacionValida(combination, diff);
            combination.forEach(function (record) {
                record.set('isInValidCombination', true);
            });
            return;
        }
        if (index >= records.length || sum > diff) {
            return;
        }

        this.findCombinations(records, index + 1, sum + records[index].get('NETO'), combination.concat(records[index]), diff);
        this.findCombinations(records, index + 1, sum, combination, diff);
    },

    getExcel: function (records, index, sum, combination, diff) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function () {
//        this.beanDetails.IN_VALDATE = meDE.bean.data.VALDATE;
//        this.beanDetails.IN_CODEBANK = meDE.bean.data.CODEBANK;
//        this.beanDetails.IN_MERCHAND = meDE.bean.data.MERCHAND;
//        this.beanDetails.IN_BANDOC = meDE.bean.data.BANDOC;
//        this.beanDetails.IN_NETO = meDE.bean.data.NETO + "";
//        this.beanDetails.IN_RED = meDE.bean.data.RED;
//        this.beanDetails.IN_STVAL = meDE.bean.data.STVAL;
//        this.beanDetails.IN_FUNDSTRGK = Ext.getCmp(prototype.id + '-txtFUNDSTRGK').getValue();
//        if (this.beanDetails.IN_STVAL === 'Match' || this.beanDetails.IN_STVAL === 'Match Manual') {
//            this.beanDetails.IN_STVAL = '1';
//        } else {
//            this.beanDetails.IN_STVAL = 'P';
//        }

        let chkMERCHANT = Ext.getCmp(prototype.id01 + '-chkMERCHANT').getValue();
        let chkKEY = Ext.getCmp(prototype.id01 + '-chkKEY').getValue();
        let chkACCNUMBER = Ext.getCmp(prototype.id01 + '-chkACCNUMBER').getValue();
        let chkADATE = Ext.getCmp(prototype.id01 + '-chkADATE').getValue();
        let chkSDATE = Ext.getCmp(prototype.id01 + '-chkSDATE').getValue();
        var fecha_a_validar = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue();
        this.beanDetails.IN_FROMADATE = (Ext.getCmp(prototype.id + '-txtFromADATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromADATE').getValue(), 'Ymd');
        this.beanDetails.IN_TOADATE = (Ext.getCmp(prototype.id + '-txtToADATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToADATE').getValue(), 'Ymd');
        this.beanDetails.IN_FROMSDATE = (Ext.getCmp(prototype.id + '-txtFromSDATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromSDATE').getValue(), 'Ymd');
        this.beanDetails.IN_TOSDATE = (Ext.getCmp(prototype.id + '-txtToSDATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToSDATE').getValue(), 'Ymd');
        this.beanDetails.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbSCARCOD').getValue();

        this.beanDetails.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-txtACCNUMBER').getValue();
        if (this.beanDetails.IN_ACCNUMBER === '') {
            this.beanDetails.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        }
        if (!chkACCNUMBER) {
            this.beanDetails.IN_ACCNUMBER = '';
        }

        this.beanDetails.IN_FUNDSTRGK = Ext.getCmp(prototype.id + '-txtFUNDSTRGK').getValue();
        if (this.beanDetails.IN_FUNDSTRGK === '') {
            this.beanDetails.IN_FUNDSTRGK = Ext.getCmp(prototype.id + '-de-txtACCOUNT').getValue();
        }
        if (!chkKEY) {
            this.beanDetails.IN_FUNDSTRGK = '';
        }

        this.beanDetails.IN_MERCHAND = Ext.getCmp(prototype.id + '-txtMERCHANT').getValue();
        if (this.beanDetails.IN_MERCHAND === '') {
            this.beanDetails.IN_MERCHAND = Ext.getCmp(prototype.id + '-de-txtMERCHAND').getValue();
        }
        if (!chkMERCHANT) {
            this.beanDetails.IN_MERCHAND = meDE.bean.data.MERCHAND;
        }

        if (this.beanDetails.IN_FROMADATE === '') {
            this.beanDetails.IN_FROMADATE = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue();
        }
        if (!chkADATE) {
            this.beanDetails.IN_FROMADATE = '';
        }

        this.beanDetails.IN_CODEBANK = meDE.bean.data.CODEBANK;
        this.beanDetails.IN_BANDOC = meDE.bean.data.BANDOC;
        this.beanDetails.IN_strNETO = Ext.getCmp(prototype.id + '-txtNETO').getValue();
        this.beanDetails.IN_RED = meDE.bean.data.RED;
        this.beanDetails.IN_STVAL = meDE.bean.data.STVAL;
        if (this.beanDetails.IN_STVAL === 'Match' || this.beanDetails.IN_STVAL === 'Match Manual') {
            this.beanDetails.IN_STVAL = '1';
        } else {
            this.beanDetails.IN_STVAL = 'P';
        }
        me.paramsDetail.beanString = JSON.stringify(this.beanDetails);
        console.log(this.beanDetails);
        global.getFile(prototype.url + '/getXLSXEntry?beanString=' + encodeURI(me.paramsDetail.beanString));
    },
    mostrarCombinacionValida: function (combination, diff) {
        console.log('Se encontró una combinación válida:');
        console.log('Valor deseado:', diff);
        console.log('Registros:');
        combination.forEach(function (record) {
            console.log(record.get('NETO'));
        });
    },
    desmarcarRegistros: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidCombination')) {
                record.set('isInValidCombination', false);
            }
        });
    },
    marcarClientes: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidClient')) {
                record.set('isInValidClient', true);
            }
        });
    },
    desmarcarClientes: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidClient')) {
                record.set('isInValidClient', false);
            }
        });
    },
    removeTKT: function (grid, rowIndex, colIndex) {

        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        this.calcularMontos();
        var checkbox = Ext.getCmp(prototype.id01 + '-chkMERCHANT');
        var estaMarcado = checkbox.getValue();
        if (estaMarcado) {
//            console.log('El checkbox está marcado');
            meDE.calcularDiferencias();
        } else {
//            console.log('El checkbox no está marcado');
        }
    },
    removeTKTHEADER: function (grid, rowIndex, colIndex) {

        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScanHead').getStore();
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScanHead').getView().refresh();
        this.calcularMontosHead();

//        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
//        if (grid) {
//
//            var view = grid.getView();
//            var firstRow = view.getRow(0);
//
//            if (firstRow) {
//
//                var actionColumn = grid.down('actioncolumn');
//                var cell = Ext.fly(view.getCell(firstRow, actionColumn));
//                var button = cell.down('.prx-icon-eye');
//
//                if (button) {
//                    button.dom.click();
//                }
//
//            }
//        }
//
//        meDE.calcularMontos();
        meDE.calcularDiferenciasHead();

        this.clear_tableNormal();
    },
    clear_keyDownHandlerHead: function () {

        this.setValue('txtFromADATEHE', null);
        this.setValue('txtToADATEHE', null);
        this.setValue('txtLIQUIDACIOHE', '');
        this.setValue('txtMERCHANDHE', '');
        this.setValue('txtNETOHE', '');

    },
    clear_keyDownHandler: function () {

        this.setValue('txtFromADATE', null);
        this.setValue('txtToADATE', null);
        this.setValue('txtFromSDATE', null);
        this.setValue('txtToSDATE', null);
        this.setValue('txtACCNUMBER', '');
        this.setValue('txtFUNDSTRGK', '');
        this.setValue('txtNETO', '');
        this.setValue('cmbSCARCOD', '');

    },
    selectAdateFiltro: function () {
        if (win.getValue('txtFromADATE').trim() === '') {
            this.inhabilitarFiltrosAdate();
        } else {
            this.habilitarFiltrosAdate();
        }
    },
    inhabilitarFiltrosAdate: function () {
        win.enabled('txtToADATE', false);
        win.setValue('txtToADATE', '');
    },
    habilitarFiltrosAdate: function () {
        win.enabled('txtToADATE', true);
    },
    selectSdateFiltro: function () {
        if (win.getValue('txtFromADATE').trim() === '') {
            this.inhabilitarFiltrosSdate();
        } else {
            this.habilitarFiltrosSdate();
        }
    },
    inhabilitarFiltrosSdate: function () {
        win.enabled('txtToSDATE', false);
        win.setValue('txtToSDATE', '');
    },
    habilitarFiltrosSdate: function () {
        win.enabled('txtToSDATE', true);
    },
    clear_tableHeader: function () {

        win.setValue('de-txtQtyHead', '');
        win.setValue('de-txtSumAmountHead_Tot', '');
        win.setValue('de-txtSumAmountHead_Com', '');
        win.setValue('de-txtSumAmountHead_Net', '');
        win.setValue('de-txtSumAmountHead_Imp', '');

        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScanHead').bindStore(storeDataClear);

        this.sumAmount = 0;
        this.clear_tableNormal();
    },
    clear_tableNormal: function () {

        win.setValue('de-txtQty', '');
        win.setValue('de-txtSumAmount_Net', '');
        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataClear);

        this.sumAmount = 0;
    },
    allRefreshDataEntry: function () {
        this.onSearchPendingDetail();
    },
    viewDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        meDE.bean.data.IN_FROMADATE = rowData.data.FLIQUIDACI;
        meDE.bean.data.IN_MERCHAND = rowData.data.MERCHAND;
        meDE.bean.data.IN_LIQUIDACIO = rowData.data.LIQUIDACIO;

        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_PRE_DETAIL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryEx').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    var storeDataNormal = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    var storeDataFees = Ext.create('Ext.data.Store', {
                        data: res.dataFees,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataNormal);
                    Ext.getCmp(prototype.id + '-gridDataInfoScanFees').bindStore(storeDataFees);

                    meDE.calcularMontos();
                } else {
                    console.log('error DETAIL');
                    global.Msg({msg: res.Mensaje});
                }
            }
        });

    },
    cambiaParams: function (checkbox, newValue, oldValue, eOpts) {
        let chkMERCHANT = Ext.getCmp(prototype.id01 + '-chkMERCHANT').getValue();
        let chkKEY = Ext.getCmp(prototype.id01 + '-chkKEY').getValue();
        let chkACCNUMBER = Ext.getCmp(prototype.id01 + '-chkACCNUMBER').getValue();
        let chkADATE = Ext.getCmp(prototype.id01 + '-chkADATE').getValue();
        let chkSDATE = Ext.getCmp(prototype.id01 + '-chkSDATE').getValue();
        var fecha_a_validar = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue();
        meDE.bean.data.IN_FROMADATE = (Ext.getCmp(prototype.id + '-txtFromADATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromADATE').getValue(), 'Ymd');
        meDE.bean.data.IN_TOADATE = (Ext.getCmp(prototype.id + '-txtToADATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToADATE').getValue(), 'Ymd');
        meDE.bean.data.IN_FROMSDATE = (Ext.getCmp(prototype.id + '-txtFromSDATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromSDATE').getValue(), 'Ymd');
        meDE.bean.data.IN_TOSDATE = (Ext.getCmp(prototype.id + '-txtToSDATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToSDATE').getValue(), 'Ymd');
        meDE.bean.data.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbSCARCOD').getValue();

        meDE.bean.data.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-txtACCNUMBER').getValue();
        if (meDE.bean.data.IN_ACCNUMBER === '') {
            meDE.bean.data.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        }
        if (!chkACCNUMBER) {
            meDE.bean.data.IN_ACCNUMBER = '';
        }

        meDE.bean.data.IN_FUNDSTRGK = Ext.getCmp(prototype.id + '-txtFUNDSTRGK').getValue();
        if (meDE.bean.data.IN_FUNDSTRGK === '') {
            meDE.bean.data.IN_FUNDSTRGK = Ext.getCmp(prototype.id + '-de-txtACCOUNT').getValue();
        }
        if (!chkKEY) {
            meDE.bean.data.IN_FUNDSTRGK = '';
        }

        meDE.bean.data.IN_MERCHAND = Ext.getCmp(prototype.id + '-txtMERCHANT').getValue();
        if (meDE.bean.data.IN_MERCHAND === '') {
            meDE.bean.data.IN_MERCHAND = Ext.getCmp(prototype.id + '-de-txtMERCHAND').getValue();
        }
        if (!chkMERCHANT) {
            meDE.bean.data.IN_MERCHAND = meDE.bean.data.MERCHAND;
        }

        if (meDE.bean.data.IN_FROMADATE === '') {
            meDE.bean.data.IN_FROMADATE = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue();
        }
        if (!chkADATE) {
            meDE.bean.data.IN_FROMADATE = '';
        }

        meDE.bean.data.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_strNETO = Ext.getCmp(prototype.id + '-txtNETO').getValue();
        meDE.bean.data.IN_RED = meDE.bean.data.RED;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }

        if (
                !this.bean.data.IN_FROMADATE &&
                !this.bean.data.IN_TOADATE &&
                !this.bean.data.IN_FROMSDATE &&
                !this.bean.data.IN_TOSDATE &&
                !this.bean.data.IN_SCARCOD &&
                !this.bean.data.IN_ACCNUMBER &&
                !this.bean.data.IN_VALDATE &&
                !this.bean.data.IN_FUNDSTRGK &&
                !this.bean.data.IN_strNETO
                ) {
            global.Msg({msg: 'Fields to Scan must be filled out'});
            return;
        }

        // Obtener el componente del grid
        let gridComponentNormalon = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        let dataGrid = gridComponentNormalon.getStore().getData().items;
        let constructorExcluir = {}.constructor;
        let arrayConstructor = dataGrid.filter(function (elemento) {
            return elemento.constructor !== constructorExcluir;
        });
        let arrayNormal = [];
        if (arrayConstructor.length > 0) {
            for (let value of arrayConstructor) {
                arrayNormal.push(value.data);
            }
        }
        let listAux = {};

        for (let value of arrayNormal) {
            listAux[`${value.descSTVAL}#${value.CCUST}#${value.descTDOC}#${value.FUNDSTRGK}#${value.SDATE}#${value.SAGENT}#${value.TERMI}#${value.SCARCOD}#${value.SCARDN}#${value.SAUTHOC}#${value.SCURRENCY}#${value.NETO}#${value.RED}#${value.SEQ}`] = "repetido";
        }

        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_DETAIL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryEx').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    let lstNormal = arrayNormal.length > 0 ? arrayNormal : [];
                    for (let item of res.data) {
                        if (`${item.descSTVAL}#${item.CCUST}#${item.descTDOC}#${item.FUNDSTRGK}#${item.SDATE}#${item.SAGENT}#${item.TERMI}#${item.SCARCOD}#${item.SCARDN}#${item.SAUTHOC}#${item.SCURRENCY}#${item.NETO}#${item.RED}#${item.SEQ}` in listAux) {
                            console.log('repetido');
                            continue
                        }
                        lstNormal.push({
                            descSTVAL: item.descSTVAL,
                            CCUST: item.CCUST,
                            descTDOC: item.descTDOC,
                            FUNDSTRGK: item.FUNDSTRGK,
                            SDATE: item.SDATE,
                            SAGENT: item.SAGENT,
                            TERMI: item.TERMI,
                            SCARCOD: item.SCARCOD,
                            SCARDN: item.SCARDN,
                            SAUTHOC: item.SAUTHOC,
                            SCURRENCY: item.SCURRENCY,
                            MERCHAND: item.MERCHAND,
                            BANDOC: item.BANDOC,
                            CORES: item.CORES,
                            ACCNUMBER: item.ACCNUMBER,
                            ADATE: item.ADATE,
                            TOTAL: item.TOTAL,
                            COMISION: item.COMISION,
                            MONEDAPAGO: item.MONEDAPAGO,
                            IMPORTEPAG: item.IMPORTEPAG,
                            NETO: item.NETO,
                            RED: item.RED,
                            SEQ: item.SEQ
                        })
                    }

                    var storeDataNormal = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    var storeDataFees = Ext.create('Ext.data.Store', {
                        data: res.dataFees,
                        autoLoad: true
                    });
                    
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataNormal);
                    Ext.getCmp(prototype.id + '-gridDataInfoScanFees').bindStore(storeDataFees);
                    
                    meDE.calcularMontos();
                    meDE.calcularDiferencias();
                } else {
                    console.log('entra aqui')
                    global.Msg({msg: res.Mensaje});
                }
            }
        });

    },
    cambiaParamsHeader: function (checkbox, newValue, oldValue, eOpts) {
        meDE.bean.data = {};
        var fecha_a_validar = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue();
        console.log(fecha_a_validar);
        console.log(fecha_a_validar);
        console.log(fecha_a_validar);
        console.log(fecha_a_validar);
        console.log(fecha_a_validar);
        console.log(fecha_a_validar);

        meDE.bean.data.IN_FROMADATEHE = (Ext.getCmp(prototype.id + '-txtFromADATEHE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromADATEHE').getValue(), 'Ymd') + "";
        meDE.bean.data.IN_TOADATEHE = (Ext.getCmp(prototype.id + '-txtToADATEHE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToADATEHE').getValue(), 'Ymd') + "";
        meDE.bean.data.IN_LIQUIDACIOHE = Ext.getCmp(prototype.id + '-txtLIQUIDACIOHE').getValue() + "";
        meDE.bean.data.IN_MERCHANDHE = Ext.getCmp(prototype.id + '-txtMERCHANDHE').getValue() + "";
        meDE.bean.data.IN_NETOHE = Ext.getCmp(prototype.id + '-txtNETOHE').getValue();

        if (meDE.bean.data.IN_FROMADATEHE === '') {
            meDE.bean.data.IN_FROMADATEHE = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue() + "";
        }

        if (
                !this.bean.data.IN_FROMADATEHE &&
                !this.bean.data.IN_TOADATEHE &&
                !this.bean.data.IN_LIQUIDACIOHE &&
                !this.bean.data.IN_MERCHANDHE &&
                !this.bean.data.IN_NETOHE
                ) {
            global.Msg({msg: 'Fields to Scan must be filled out'});
            return;
        }

        // Obtener el componente del grid
        let gridComponentNormalon = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
        let dataGrid = gridComponentNormalon.getStore().getData().items;
        let constructorExcluir = {}.constructor;
        let arrayConstructor = dataGrid.filter(function (elemento) {
            return elemento.constructor !== constructorExcluir;
        });
        let arrayNormal = [];
        if (arrayConstructor.length > 0) {
            for (let value of arrayConstructor) {
                arrayNormal.push(value.data);
            }
        }
        let listAux = {};

        for (let value of arrayNormal) {
            listAux[`${value.descSTVAL}#${value.CCUST}#${value.PRDA}#${value.CODPRO}#${value.FLIQUIDACI}#${value.LIQUIDACIO}#${value.MERCHAND}#${value.MONEDA}#${value.MONEDALIQ}#${value.PAISLIQ}#${value.TOTAL}#${value.COMISION}#${value.NETO}`] = "repetido";
        }
        console.log(meDE.bean.data);
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_HEADER',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryEx').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    let lstHeader = arrayNormal.length > 0 ? arrayNormal : [];
                    for (let item of res.data) {
                        if (`${item.descSTVAL}#${item.CCUST}#${item.PRDA}#${item.CODPRO}#${item.FLIQUIDACI}#${item.LIQUIDACIO}#${item.MERCHAND}#${item.MONEDA}#${item.MONEDALIQ}#${item.PAISLIQ}#${item.TOTAL}#${item.COMISION}#${item.NETO}` in listAux) {
                            console.log('repetido');
                            continue
                        }
                        lstHeader.push({
                            descSTVAL: item.descSTVAL,
                            CCUST: item.CCUST,
                            PRDA: item.PRDA,
                            CODPRO: item.CODPRO,
                            FLIQUIDACI: item.FLIQUIDACI,
                            LIQUIDACIO: item.LIQUIDACIO,
                            MERCHAND: item.MERCHAND,
                            MONEDA: item.MONEDA,
                            MONEDALIQ: item.MONEDALIQ,
                            PAISLIQ: item.PAISLIQ,
                            TOTAL: item.TOTAL,
                            COMISION: item.COMISION,
                            NETO: item.NETO
                        });
                    }

                    var storeDataNormal = Ext.create('Ext.data.Store', {
                        data: lstHeader,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScanHead').bindStore(storeDataNormal);

                    meDE.calcularMontosHead();

                    var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
                    if (grid) {

                        var view = grid.getView();
                        var firstRow = view.getRow(0);

                        if (firstRow) {

                            var actionColumn = grid.down('actioncolumn');
                            var cell = Ext.fly(view.getCell(firstRow, actionColumn));
                            var button = cell.down('.prx-icon-eye');

                            if (button) {
                                button.dom.click();
                            }
                        }
                    }

                    meDE.calcularMontos();
                    meDE.calcularDiferenciasHead();
                } else {
                    console.log('entra aqui')
                    global.Msg({msg: res.Mensaje});
                }
            }
        });

    },
    onGridAgrupa: function () {

        let formPend = Ext.getCmp(prototype.id + '-formQueryAgrupa');
        if (!formPend.isVisible()) {
//            Ext.getCmp(prototype.id + '-dataEntryEx').setWidth(1900);
//            Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(870);
            Ext.getCmp(prototype.id + '-spacerPanel').show();
            Ext.getCmp(prototype.id + '-formQueryAgrupa').show();
            Ext.getCmp(prototype.id + '-dataEntryEx').setX(10);
            this.getDataQueryAgrupa();
        } else {
//            Ext.getCmp(prototype.id + '-dataEntryEx').setWidth(1190);
//            Ext.getCmp(prototype.id + '-dataEntryEx').setHeight(870);
            Ext.getCmp(prototype.id + '-formQueryAgrupa').hide();
            Ext.getCmp(prototype.id + '-spacerPanel').hide();
            Ext.getCmp(prototype.id + '-dataEntryEx').setX(410);
        }

    },
    setWidthPieQueryAgrupa: function () {
        Ext.getCmp(prototype.id + '-pie_Agrupa').setVisible(true);
    },
    exportQueryPend: function () {
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcelQueryPending();
                    }
                }
            });
        }
    },
    exportExcelQueryAgrupa: function () {
        this.setFormatParameterQueryAgrupa();
        global.getFile(prototype.url + '/getXLSXAgrupa?beanString=' + encodeURI(searchParamsPending.beanString));
    },
    cleanFiltersQueryPend: function () {
        Ext.getCmp(prototype.id + '-txtFromADATEAG').setValue('');
        Ext.getCmp(prototype.id + '-txtToADATEAG').setValue('');
        Ext.getCmp(prototype.id + '-txtLIQUIDACIOAG').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHANDAG').setValue('');
        Ext.getCmp(prototype.id + '-txtNETOAG').setValue('');
    },

    pagFirst: function (obj, e) {

        var pag = Ext.getCmp(prototype.id + '-paggin_Agrupa');
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {

        var pag = Ext.getCmp(prototype.id + '-paggin_Agrupa');
        pag.movePrevious();
    },
    pagNext: function (obj, e) {

        var pag = Ext.getCmp(prototype.id + '-paggin_Agrupa');
        pag.moveNext();
    },
    pagLast: function (obj, e) {

        var pag = Ext.getCmp(prototype.id + '-paggin_Agrupa');
        pag.moveLast();
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
//<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtSCOUNTRY', '');
        this.setValue('cmbSTVAL', '');
        this.setValue('txtADATE', '');
        this.setValue('txtCODEBANK', '');
        this.setValue('txtBANDOC', '');
        this.setValue('txtSCURRENCY', '');
        this.setValue('txtNETO', '');
        this.setValue('txtQTYTRAN1', '');
        this.setValue('txtQTYTRAN3', '');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {

    },
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
                    console.log('onSaveClick');
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.maintenanceBean(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        var deci = this.preexecuteOption();
        console.log('deci', deci);
        if (deci) {
            Ext.Msg.show({
                title: '.:Confirmation:.',
                msg: 'Are you sure to Update?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        beanTemp = this.llenarData();

                        var msjResult = this.validacionInsert(beanTemp);
                        console.log('onSaveClick');
                        if (msjResult === '') {
                            beanTemp.option = 'U';
                            this.maintenanceBean(beanTemp);
                        } else {
                            global.Msg({msg: msjResult});
                        }
                    }
                }
            });
        }
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
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    preexecuteOption: function () {
        //Modificacion

        var ASVFOP = parseFloat(Ext.getCmp(prototype.id + '-de-txtNETO').getValue().replace(/,/g, '').replace('.00', ''));
        var BSVFOP = parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount_Net').getValue().replace(/,/g, '').replace('.00', ''));
        var BSVFOPHead = parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmountHead_Net').getValue().replace(/,/g, '').replace('.00', ''));
        var DIFF = parseFloat(Ext.getCmp(prototype.id + '-de-txtDIFF').getValue().replace(/,/g, '').replace('.00', ''));
        var MONEDA = Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getValue();
        var ACCNUMBER = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        var ACCNUMBERL = Ext.getCmp(prototype.id + '-de-txtACCNUMBERL').getValue();

        let datos = {};

        let formHeader = Ext.getCmp(prototype.id + '-panelScanHead');
        if (!formHeader.isVisible()) {
            //Validar datos de la cabecera 
            let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
            datos = this.procesarRegistros(miGrilla);

            if (DIFF !== 0 && MONEDA !== 'COP') {
                global.Msg({msg: 'The Sum Amount is not equal to the Transaction Amount Stattement.'});
                return false;
            }

            if (DIFF == 0) {
                console.log('entra a DIF = 0', DIFF);
                return true;
            } else if (DIFF !== 0 && DIFF < 100) {
                console.log('entra a DIF < 100', DIFF);
                return true;
            } else {
                console.log('entra a ELSE', DIFF);
                global.Msg({msg: 'The Sum Amount is not equal to the Transaction Amount Stattement.'});
                return false;
            }

            if (Array.isArray(datos) && datos.length === 0) {
                console.log('detalle GG');
                global.Msg({msg: 'There is no data in the scan.'});
                return false;
            }

        } else {

            console.log('detalle');
            let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');
            datos = this.procesarRegistrosHeader(miGrilla);

            if (Array.isArray(datos) && datos.length === 0) {
                console.log('detalle GG');
                global.Msg({msg: 'There is no data in the scan.'});
                return false
            } else {
                return true
            }

        }

//        if ( ACCNUMBER !== ACCNUMBERL) {
//             global.Msg({msg: 'The bank account on the Statement is not the same in the Settlement.'});
//             return false
//        }





    },
    maintenanceBean: function (option) {

        let datos = {};
        console.error('Entró al procesar Registros');

        let formHeader = Ext.getCmp(prototype.id + '-panelScanHead');
        if (!formHeader.isVisible()) {

            let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
            datos = this.procesarRegistros(miGrilla);

            Ext.Ajax.request({
                url: prototype.url + '/executeOption',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: datos, option: option},
                beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-dataEntryEx').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    console.log(res);
                    if (res.success) {

                        global.Msg({
                            msg: res.Mensaje,
                            icon: 1,
                            fn: function () {

                                Ext.getCmp(prototype.id + '-dataEntryEx').close();
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        });
                    } else
                        global.Msg({msg: res.sesion});
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    Ext.getCmp(prototype.id + '-dataEntryEx').unmask();
                }
            });
        } else {
            let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScanHead');

            console.log('detalle - executeOptionHead');
            datos = this.procesarRegistrosHeader(miGrilla);

            Ext.Ajax.request({
                url: prototype.url + '/executeOptionHead',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: datos, option: option},
                beforerequest: Ext.getCmp(prototype.id + '-dataEntryEx').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-dataEntryEx').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    console.log(res);
                    if (res.success) {

                        global.Msg({
                            msg: res.Mensaje,
                            icon: 1,
                            fn: function () {

                                if (res.Mensaje.includes('The Sum Amount is not equal')) {

                                } else {
                                    Ext.getCmp(prototype.id + '-dataEntryEx').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }

                            }
                        });
                    } else
                        global.Msg({msg: res.sesion});
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    Ext.getCmp(prototype.id + '-dataEntryEx').unmask();
                }
            });
        }
    },
    //</editor-fold>

    procesarRegistros: function (grilla) {
        var listaDeDatos = [];
        grilla.getStore().each(function (record) {

            let registro = {
                CODEBANK: Ext.getCmp(prototype.id + '-de-txtCODEBANK').getValue(),
                VALDATE: Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue(),
                DATECI: Ext.getCmp(prototype.id + '-de-txtDATECI').getValue(),
                TRANCI: Ext.getCmp(prototype.id + '-de-txtTRANCI').getValue(),
                TDOC: Ext.getCmp(prototype.id + '-de-txtTDOC').getValue(),
                MERCHAND: Ext.getCmp(prototype.id + '-de-txtMERCHAND').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                COREPL: record.get('CORES').trim(),
                SDATE: record.get('SDATE').trim(),
                SAGENT: record.get('SAGENT').trim(),
                TERMI: record.get('TERMI').trim(),
                SCARCOD: record.get('SCARCOD').trim(),
                SCARDN: record.get('SCARDN').trim(),
                SAUTHOC: record.get('SAUTHOC').trim(),
                SCURRENCY: 'COP',
                TOTAL: record.get('TOTAL'),
                NETO: record.get('NETO'),
                RED: record.get('RED').trim(),
                SEQ: record.get('SEQ').trim(),
                NETOC: parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount_Net').getValue().replace(/,/g, '').replace('.00', ''))
            };

            listaDeDatos.push(registro);
        });

        console.log(listaDeDatos, 'listaDeDatos');
        var datosEnJSON = Ext.JSON.encode(listaDeDatos);
        return datosEnJSON;
    },

    procesarRegistrosHeader: function (grilla) {

        let formHeader = Ext.getCmp(prototype.id + '-panelScanHead');
        //para las cabeceras se está tomando el campo CERROR 20240723
        var CERROR = 'DD';
        if (formHeader.isVisible()) {
            CERROR = 'CC';
        }

        var listaDeDatos = [];
        grilla.getStore().each(function (record) {

            let registro = {
                CCUST: record.get('CCUST').trim(),
                PRDA: record.get('PRDA').trim(),
                CODPRO: record.get('CODPRO').trim(),
                FLIQUIDACI: record.get('FLIQUIDACI').trim(),
                LIQUIDACIO: record.get('LIQUIDACIO').trim(),
                MERCHAND: record.get('MERCHAND').trim(),
                MONEDA: record.get('MONEDA').trim(),
                MONEDALIQ: record.get('MONEDALIQ').trim(),
                PAISLIQ: record.get('PAISLIQ').trim(),
                TOTAL: record.get('TOTAL'),
                COMISION: record.get('COMISION'),
                NETO: record.get('NETO'),
                VALDATE: Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue(),
                DATECI: Ext.getCmp(prototype.id + '-de-txtDATECI').getValue(),
                TRANCI: Ext.getCmp(prototype.id + '-de-txtTRANCI').getValue(),
                TDOC: Ext.getCmp(prototype.id + '-de-txtTDOC').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                NETOC: parseFloat(Ext.getCmp(prototype.id + '-de-txtNETO').getValue().replace(/,/g, '').replace('.00', '')),
                CERROR: CERROR
            };

            listaDeDatos.push(registro);
        });

        console.log(listaDeDatos, 'listaDeDatos');
        var datosEnJSON = Ext.JSON.encode(listaDeDatos);
        return datosEnJSON;
    },
    validacionInsert: function (beanTemp) {
        var msjResult = '';

        if (this.getValue("de-txtdescTDOC") === '') {
            msjResult = "Document type cannot be empty.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

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
        if (this.getValue("txtCODSOUR") == '') {
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
    }
// </editor-fold>
});