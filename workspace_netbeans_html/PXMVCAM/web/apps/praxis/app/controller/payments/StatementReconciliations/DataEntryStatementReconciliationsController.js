Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.DataEntryStatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryStatementReconciliationsController',
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
        console.log('afterRender');
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
        console.log('obtainData');
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
    mostrarData: function () {
        console.log('mostrarData');
        if (this.beanResult.descSTVAL === 'Match' || this.beanResult.descSTVAL === 'Match Manual') {

            Ext.getCmp(prototype.id + '-gridColumnDelete').hide();
            Ext.getCmp(prototype.id + '-panelDataInfoScan').setWidth(1137);
            Ext.getCmp(prototype.id + '-gridDataInfoScan').setWidth(1125);
            Ext.getCmp(prototype.id + '-panelScanCard').hide();
            Ext.getCmp(prototype.id + '-panelScanCard2').hide();
            Ext.getCmp(prototype.id + '-btn-update').hide();
            Ext.getCmp(prototype.id + '-panelScanHead').hide();
            Ext.getCmp(prototype.id + '-gridColumnDeleteHead').hide();
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOC, '0,000.00'));
            this.setValue('de-txtCOREP', this.beanResult.COREP);
        } else {
            
            Ext.getCmp(prototype.id + '-btn-update').show();
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOL, '0,000.00'));
            this.setValue('de-txtCOREP', this.beanResult.COREP);
            
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
        this.setValue('de-txtVALDATEL', this.beanResult.VALDATEL);
        this.setValue('de-txtMERCHANDL', this.beanResult.MERCHANDL);
        this.setValue('de-txtBANDOCL', this.beanResult.BANDOCL);
        this.setValue('de-txtCOREPL', this.beanResult.COREPL);
        this.setValue('de-txtSCURRENCYL', this.beanResult.SCURRENCY);
        this.setValue('de-txtACCNUMBERL', this.beanResult.ACCNUMBERL);
        this.setValue('de-txtACCNUMBER', this.beanResult.ACCNUMBER);
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
        console.log('llenarData');
        var bean = {};
        bean.TDOC = this.getValue("de-txtTDOC");
        bean.CODEBANK = this.getValue("de-txtCODEBANK");
        bean.NAME = this.getValue("de-txtNAME");
        bean.STVAL = this.getValue("de-txtSTVAL");
        bean.CCUST = this.getValue("de-txtSOCIETY");
        bean.DATECI = this.getValue("de-txtDATECI");
        bean.QTYTRAN1 = this.getValue("de-txtQTYTRAN1");
        bean.VALDATE = this.getValue("de-txtVALDATE");
        bean.MERCHAND = this.getValue("de-txtMERCHAND");
        bean.BANDOC = this.getValue("de-txtBANDOC");
        bean.NETO = this.getValue("de-txtNETO");
        bean.VALDATEL = this.getValue("de-txtVALDATEL");
        bean.MERCHANDL = this.getValue("de-txtMERCHANDL");
        bean.BANDOCL = this.getValue("de-txtBANDOCL");
        bean.SCURRENCYL = this.getValue("de-txtSCURRENCYL");
        bean.NETOL = this.getValue("de-txtNETOL");
        bean.ACCNUMBER = this.getValue("de-txtACCNUMBER");
        bean.DIFF = this.getValue("de-txtDIFF");
        bean.USCR = this.getValue("txtUSCR").trim();
        bean.FECR = this.getValue("txtFECR").trim();
        bean.HOCR = this.getValue("txtHOCR").trim();
        bean.USUP = this.getValue("txtUSUP").trim();
        bean.FEUP = this.getValue("txtFEUP").trim();
        bean.HOUP = this.getValue("txtHOUP").trim();
        return bean;
    },
    getData: function () {
        console.log('getData');
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
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.data;
                meDE.onSearchCompleteDetail();
                meDE.mostrarData();
            }
        });
    },
    onSearchCompleteDetail: function () {
        console.log('onSearchCompleteDetail');
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

        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_DETAIL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    meDE.calcularMontos();
                    meDE.calcularDiferencias();
                } else {
                    global.Msg({msg: res.Mensaje});
                }

            }
        });
    },

    //</editor-fold>
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

        this.sumAmount = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();

        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);

            if (dataRow1.data.STMANUAL !== 'Blocked') {
                var neto = parseFloat(dataRow1.data.NETO) || 0;
                var comistota = parseFloat(dataRow1.data.COMISTOTA) || 0;

                if (comistota !== 0) {
                    this.sumAmount += neto + comistota;
                } else {
                    this.sumAmount += neto;
                }
            }
        }

        if (this.beanResult.STVAL === '1') {
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOC, '0,000.00'));
            this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.NETO - this.beanResult.NETOC, '0,000.00'));
        } else {
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.sumAmount, '0,000.00'));
            this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.NETO - this.sumAmount, '0,000.00'));
        }
        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        this.setValue('de-txtQty', store_gridInfoScan.data.length);

        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
    },
    calcularDiferencias: function () {
        console.log('calcularDiferencias');
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

        if (comg !== comp && comg !== '') {
            Ext.getCmp(prototype.id + '-de-txtSOCIETYS').setValue(comg);
            Ext.util.CSS.createStyleSheet('.detalle-society { background-color: #d5f4d5 !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-society-textfield { background-color: #d5f4d5 !important; }');
        } else {
            Ext.getCmp(prototype.id + '-de-txtSOCIETYS').setValue(comg);
            Ext.util.CSS.createStyleSheet('.detalle-society { background-color: transparent !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-society-textfield { background-color: #ccdeeb !important; }');
        }

        Ext.getCmp(prototype.id + '-de-txtACCNUMBERL').setValue(ACCNUMBER);
        Ext.getCmp(prototype.id + '-de-txtVALDATEL').setValue(ADATE);
        Ext.getCmp(prototype.id + '-de-txtMERCHANDL').setValue(MERCHAND);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCYL').setValue(SCURRENCY);
        Ext.getCmp(prototype.id + '-de-txtBANDOCL').setValue(BANDOC);

        var acc = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        var accL = Ext.getCmp(prototype.id + '-de-txtACCNUMBERL').getValue();

        if (acc !== accL && acc !== '') {
            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBER { background-color: #d5f4d5 !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBERL-textfield { background-color: #d5f4d5 !important; }');
        } else {
            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBER { background-color: #ccdeeb !important; }');
            Ext.util.CSS.createStyleSheet('.detalle-ACCNUMBERL-textfield { background-color: #ccdeeb !important; }');
        }

        if (store.getCount() > 0 && store.getCount() < 22) {

            var model = grid.getStore().getModel();
            var suma = 0;
            grid.getStore().each(function (record) {
                suma += record.get('NETO');
            });
            var diff = Math.abs(Ext.getCmp(prototype.id + '-de-txtDIFF').getValue().replace(/,/g, '').replace('.00', ''));

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
        this.beanDetails.IN_VALDATE = meDE.bean.data.VALDATE;
        this.beanDetails.IN_CODEBANK = meDE.bean.data.CODEBANK;
        this.beanDetails.IN_MERCHAND = meDE.bean.data.MERCHAND;
        this.beanDetails.IN_BANDOC = meDE.bean.data.BANDOC;
        this.beanDetails.IN_NETO = meDE.bean.data.NETO + "";
        this.beanDetails.IN_RED = meDE.bean.data.RED;
        this.beanDetails.IN_STVAL = meDE.bean.data.STVAL;
        if (this.beanDetails.IN_STVAL === 'Match' || this.beanDetails.IN_STVAL === 'Match Manual') {
            this.beanDetails.IN_STVAL = '1';
        } else {
            this.beanDetails.IN_STVAL = 'P';
        }
        me.paramsDetail.beanString = JSON.stringify(this.beanDetails);
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
    clear_tableNormal: function () {

        win.setValue('de-txtQty', '');
        win.setValue('de-txtSumAmount', '');
        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataClear);

        this.sumAmount = 0;
    },
    cambiaParams: function (checkbox, newValue, oldValue, eOpts) {
        let chkMERCHANT = Ext.getCmp(prototype.id01 + '-chkMERCHANT').getValue();
        let chkKEY = Ext.getCmp(prototype.id01 + '-chkKEY').getValue();
        let chkACCNUMBER = Ext.getCmp(prototype.id01 + '-chkACCNUMBER').getValue();
        let chkADATE = Ext.getCmp(prototype.id01 + '-chkADATE').getValue();
        let chkSDATE = Ext.getCmp(prototype.id01 + '-chkSDATE').getValue();
        var fecha_a_validar = "";
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
            listAux[`${value.descSTVAL}#${value.CCUST}#${value.descTDOC}#${value.SDATE}#${value.SAGENT}#${value.TERMI}#${value.SCARCOD}#${value.SCARDN}#${value.SAUTHOC}#${value.SCURRENCY}#${value.NETO}#${value.RED}#${value.SEQ}`] = "repetido";
        }

        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_DETAIL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    let lstNormal = arrayNormal.length > 0 ? arrayNormal : [];
                    for (let item of res.data) {
                        if (`${item.descSTVAL}#${item.CCUST}#${item.descTDOC}#${item.SDATE}#${item.SAGENT}#${item.TERMI}#${item.SCARCOD}#${item.SCARDN}#${item.SAUTHOC}#${item.SCURRENCY}#${item.NETO}#${item.RED}#${item.SEQ}` in listAux) {
                            continue
                        }
                        lstNormal.push({
                            descSTVAL: item.descSTVAL,
                            CCUST: item.CCUST,
                            descTDOC: item.descTDOC,
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
                            NETO: item.NETO,
                            RED: item.RED,
                            SEQ: item.SEQ
                        })
                    }

                    var storeDataNormal = Ext.create('Ext.data.Store', {
                        data: lstNormal,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataNormal);

                    meDE.calcularMontos();
                    meDE.calcularDiferencias();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            }
        });
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
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    //
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
        var BSVFOP = parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', ''));
        var DIFF = parseFloat(Ext.getCmp(prototype.id + '-de-txtDIFF').getValue().replace(/,/g, '').replace('.00', ''));
        var MONEDA = Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getValue();
        var ACCNUMBER = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        var ACCNUMBERL = Ext.getCmp(prototype.id + '-de-txtACCNUMBERL').getValue();

        let datos = {};

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
            global.Msg({msg: 'There is no data in the scan.'});
            return false;
        }

        if (ACCNUMBER !== ACCNUMBERL) {
            global.Msg({msg: 'The bank account on the Statement is not the same in the Settlement.'});
            return false
        }

    },
    maintenanceBean: function (option) {

        let datos = {};
        console.error('Entró al procesar Registros');

        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        datos = this.procesarRegistros(miGrilla);

        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: datos, option: option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {

                    global.Msg({
                        msg: res.Mensaje,
                        icon: 1,
                        fn: function () {

                            Ext.getCmp(prototype.id + '-dataEntry').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
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
                NETOC: parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', ''))
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