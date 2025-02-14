Ext.define('Ext.Praxis.controller.payments.ManualConciliation.ManualConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ManualConciliationController',
    fecha: new Date(),
    childs: '',
    stack: [],
    beanTemp: {},
    beanDet: {},
    beanDet2: {},
    beanDet3: {},
    beanDetCardNbr: {},
    beanDetCardByS: {},
    beanDetCardNbrByS: {},
    beanDetTicket: {},
    beanboxDetTktS2: {},
    beanDebits: {},
    beanDetCountryDebits: {},
    beanDetSett: {},
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    flag: '',
    flagStatus: '',
    flagDrilDownByDay: '',
    nivel_usr: '',
    lstBank: [],
    bean_detail: [],
    bean_detailT: [],
    lstCard: [],
    lstCountry: [],
    listaCampos: [],
    lstParametros: [],
    beanTW: {},
    beanF2: {},
    beanDetailTW: {},
    beanDetailF2: {},
    me: '',
    searchParams: {},
    searchParamsbeanGraf: {},
    paramsObtainData: {},
    paramsDetail: {},
    init: function (view) {
        me = this;
        prototype.id = 'ManualConciliationForm';
        prototype.url = CONTEXTPATH + '/ManualConciliation';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            // -------------------Eventos Genericos --------------------
            '#ManualConciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ManualConciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ManualConciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#ManualConciliationForm-btnAdd': {
                click: this.btnAdd_clickRules
            },
            '#ManualConciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ManualConciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ManualConciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#ManualConciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ManualConciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ManualConciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ManualConciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ManualConciliationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#ManualConciliationForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#ManualConciliationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#ManualConciliationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#ManualConciliationForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#ManualConciliationForm-cmbDateToDay': {
                select: this.selectComboToDay
            },
            '#ManualConciliationForm-rbgType': {
                change: this.cmbTranType_changeHandler
            },
            '#ManualConciliationForm-imgSwap1': {
                click: this.btnImgSwap1
            },
            '#ManualConciliationForm-btnBackTW': {
                click: this.btnBackTW_click
            },
            '#ManualConciliationForm-btnBackGraf': {
                click: this.btnDisplay_click
            },
            '#ManualConciliationForm-btnSearchGraf': {
                click: this.btnChangeGraf
            },
            '#ManualConciliationForm-cmbDateFromYearGraf': {
                select: this.selectComboFromYearGraf
            },
            '#ManualConciliationForm-cmbDateToYearGraf': {
                select: this.selectComboToYearGraf
            },
            '#ManualConciliationForm-cmbDateFromMonthGraf': {
                select: this.selectComboFromMonthGraf
            },
            '#ManualConciliationForm-cmbDateToMonthGraf': {
                select: this.selectComboToMonthGraf
            },

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.getRules();
        this.setStoreDataTW();
        this.obtainFields('MPF101', '');

        this.setStoreData();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    btnDisplay_click: function () {

        var option = Ext.getCmp(prototype.id + '-panelGraf');
        if (option.isVisible()) {
            option.setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridDataMain').show();
            Ext.getCmp(prototype.id + '-contentFilter').show();
            Ext.getCmp(prototype.id + '-contentOptions').show();
            this.setFormatParameter();
        } else {

            Ext.getCmp(prototype.id + '-rbChart_IA').items.items[1].setValue(true);
            Ext.getCmp(prototype.id + '-rbChart_IA').cheked = true;

            option.setVisible(true);
            this.setFormatParameterGraf();
            Ext.getCmp(prototype.id + '-panelGridDataMain').hide();
            Ext.getCmp(prototype.id + '-contentFilter').hide();
            Ext.getCmp(prototype.id + '-contentOptions').hide();

            Ext.getCmp(prototype.id + '-rbFaseII').show();
            Ext.getCmp(prototype.id + '-rbFaseI').hide();
            this.searchGrafLiqII();

        }

    },
    //<editor-fold defaultstate="collapsed" desc="setStoreData">
    setStoreData: function () {
        var month = this.fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-cmbDateYearTW').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateMonthTW').bindStore(win.getStoreMonth(true));

        var mes = Ext.String.leftPad(this.fecha.getMonth() + 1, 2, '0');
        Ext.getCmp(prototype.id + '-cmbDateYearTW').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonthTW').setValue(mes);

        var cmbTipoFecha = Ext.getCmp(prototype.id + '-cmbTipoFecha');
        cmbTipoFecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sales Date"],
                ["PAYDATE", "Payment Date"]
            ]
        }));
        cmbTipoFecha.setValue("SDATE");

        this.onRefreshClick();
    },
    //</editor-fold>
    btnSearch_click: function (obj, e) {
        console.log('btnSearch_click');
        if (Ext.getCmp(prototype.id + '-panelMain').isVisible()) {
            this.search();
        }
    },
    onRefreshClick: function () {
        console.log('btnRefresh_click');
        win.lblUser_toolTip("Estructura: IMF101");

        var grid = Ext.getCmp(prototype.id + '-gridDataColumns');
        var store = grid.getStore();

        // Buscar el registro marcado
        var selectedRecord = store.findRecord('select', true, 0, false, false, true);

        if (selectedRecord) {
            var rquery = selectedRecord.get('RQUERY'); // Obtener el valor de RQUERY
            var tquery = selectedRecord.get('TQUERY'); // Obtener el valor de RQUERY
            var ttable = selectedRecord.get('TTABLE'); // Obtener el valor de RQUERY
            console.log('RQUERY seleccionado:', rquery);
            console.log('TQUERY seleccionado:', tquery);
            console.log('Table seleccionada:', ttable);

            me.beanDetailTW.IN_FECHA = Ext.getCmp(prototype.id + '-cmbDateYearTW').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTW').getValue();
            me.beanDetailTW.RQUERY = rquery;
            me.beanDetailTW.TQUERY = tquery;
            me.beanDetailTW.TTABLE = ttable;
            me.beanDetailTW.strSQL = this.armandoQuery();
            me.viewMPF101_clickHandler(me.beanDetailTW);
        } else {
            console.log('No hay ningún registro seleccionado.');
        }
    },
    isVerifyMultiSelect: function (element) {
        let comboBox = element.getValue();
        if (comboBox.length > 1) {
            return true;
        } else {
            return false;
        }
    },
    joinMultiSelect: function (element) {
        let comboBox = element.getValue();
        return comboBox.join('|');
    },
    setFormatParameter: function () {
        var bean = {};

        bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        bean.IN_TDOC = this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbTDOC'));
        console.log(Ext.getCmp(prototype.id + '-cmbTDOC').getValue(), 'combo multiple')

        var beanString = JSON.stringify(bean);
        searchParams = {
            beanString: beanString,
            bean: bean
        };
    },
    setParameterTW: function () {
        var bean = {};

        var grid = Ext.getCmp(prototype.id + '-gridDataColumns');
        var store = grid.getStore();

        var selectedRecord = store.findRecord('select', true, 0, false, false, true);

        if (selectedRecord) {
            var rquery = selectedRecord.get('RQUERY'); // Obtener el valor de RQUERY
            var tquery = selectedRecord.get('TQUERY'); // Obtener el valor de RQUERY
            var ttable = selectedRecord.get('TTABLE'); // Obtener el valor de RQUERY
            console.log('RQUERY seleccionado:', rquery);
            console.log('TQUERY seleccionado:', tquery);
            console.log('Table seleccionada:', ttable);

            bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbDateYearTW').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTW').getValue();
            bean.RQUERY = rquery;
            bean.TQUERY = tquery;
            bean.TTABLE = ttable;
            bean.strSQL = this.armandoQuery();

            var beanString = JSON.stringify(bean);
            searchParams = {
                beanString: beanString,
                bean: bean
            };
        } else {
            global.Msg({msg: '...You must select a rule...'
            }); 
        }
    },
    btnImgSwap1: function () {
        var panel1 = Ext.getCmp(prototype.id + '-gridData');
        var panel2 = Ext.getCmp(prototype.id + '-gridDataSwap');
        if (panel1.isVisible()) {
            panel1.setVisible(false);
            panel2.setVisible(true);
        } else {
            panel1.setVisible(true);
            panel2.setVisible(false);
        }
    },
    onEditClick: function (grid, rowIndex, colIndex, item, e, record, actionItem) {

        item.disable();
        var rec = grid.getStore().getAt(rowIndex);

        this.searchBean(rec);

        setTimeout(function () {
            item.enable();
        }, 1000);

    },
    searchBean: function (rec) {

        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(rec.data)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var beanCons = res.result;
                    console.log('beanCons');
                    console.log(beanCons);
                    if (beanCons !== null) {
                        me.winDataEntry('U', beanCons);
                    } else {
                        global.Msg({
                            msg: 'An error has ocurred. Please contact our System Department'
                        });
                    }
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    winDataEntry: function (action, beanCons) {

        action = action === null || action === undefined ? 'U' : action;

        Ext.create('Ext.Praxis.view.payments.ManualConciliationForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                lstCountry: me.lstCountry,
                lstCard: me.lstCard,
                lstBank: me.lstBank,
                beanCons: beanCons
            }
        }).show();

    },
    validateFields: function () {
        var msj = '';
        return msj;
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            if (me.panelActual !== '-panelGridData') {
                me.setWidthPie();
            }
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    showTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.NUMREF.substr(0, 3) === '139') {
            console.log('RowData');
            console.log(rowData.data);
            me.viewMasterTkt(rowData.data);
        }
    },
    viewMasterTkt: function (data) {

        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.NUMREF.substr(0, 3);
        beanProMasterTicket.IN_FORMA = data.NUMREF.substr(3, 4);
        beanProMasterTicket.IN_SERIE = data.NUMREF.substr(7, 6);
        console.log(beanProMasterTicket);
        //beanProMasterTicket.IN_SEQ = data.SEQRO;

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    btnClear_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-cmbFTE').setValue('');
        Ext.getCmp(prototype.id + '-txtPNR').setValue('');
        Ext.getCmp(prototype.id + '-txtAUTHOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbNEGOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbCOMENTF').setValue('');
        Ext.getCmp(prototype.id + '-txtAGENCY').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-txtAMOUNT').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');

    },
    btnExcel_click: function (obj, e) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?..',
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
        this.setParameterTW();
        switch (me.panelActual) {
            case  '-panelGridDataMain':
                global.getFile(prototype.url + '/getXLSXMain?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        console.log(ancho);
        if (ancho > 650) {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(650);
        }
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';

        switch (me.panelActual) {
            case  '-panelGridDataMain':
                me.pagginActual = '-paggin';
                break;
        }
    },

    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        console.log(pag, 'pag')
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    obtainFields: function (tabla, parametro) {

        Ext.Ajax.request({
            url: prototype.url + '/obtainFields',
            method: 'POST',
            timeout: 60000000,
            params: {tabla: tabla},
            success: function (response, options) {

                var res = Ext.JSON.decode(response.responseText);

                var resCampos = res.lstData;

                me.listaCampos = [];
                me.listaCampos.push({code: "", name: "All", tabla: "", size: "", tipo: "", fieldSys: "", userfield: "", label: ""});
                var listaCamposGB = [];
                listaCamposGB.push({code: "", name: "All", tabla: "", size: "", tipo: "", fieldSys: "", userfield: "", label: ""});

                for (var i = 0; i < resCampos.length; i++) {

                    var datosCampos = {};

                    datosCampos = {
                        code: resCampos[i].TABNAME + '.' + resCampos[i].SYSTFIELD,
                        name: resCampos[i].DESCRIPT,
                        tabla: resCampos[i].TABNAME,
                        size: resCampos[i].LENGHTF,
                        tipo: resCampos[i].DATATYPE,
                        fieldSys: resCampos[i].SYSTFIELD,
                        userfield: resCampos[i].USERFIELD,
                        label: resCampos[i].USERFIELD + ' - ' + resCampos[i].DESCRIPT
                    };

                    me.listaCampos.push(datosCampos);

                    if (resCampos[i].SUBSTRFL === 'Y') {
                        listaCamposGB.push(datosCampos);
                    }
                }

                for (var i = 1; i < 8; i++) {

                    var storeDataCombo = Ext.create('Ext.data.Store', {
                        fields: ['data'],
                        data: me.listaCampos,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-cmbCampo' + i).getStore().removeAll();
                    Ext.getCmp(prototype.id + '-cmbCampo' + i).bindStore(Ext.clone(storeDataCombo));
                    Ext.getCmp(prototype.id + '-cmbCampo' + i).setValue('');
                }

                if (parametro === 'back') {
                    me.mostrarFiltrosMPF100();
                }
            }
        });


    },
    changecmbCampo: function (nbr) {
        var idtxt = '-txtCampo' + nbr;
        var idcmb = '-cmbCampo' + nbr;

        if (Ext.getCmp(prototype.id + idcmb).getValue() === null) {
            Ext.getCmp(prototype.id + idcmb).getStore().load();
            Ext.getCmp(prototype.id + idtxt).setValue('');
        } else {
            Ext.getCmp(prototype.id + idtxt).setValue(Ext.getCmp(prototype.id + idcmb).getValue());
        }
    },
    imgInfo_clickHandler: function (nbr) {

        var idtxt = '-txtCampo' + nbr;
        var idcmb = '-cmbCampo' + nbr;

        if (Ext.getCmp(prototype.id + idtxt).isVisible()) {
            Ext.getCmp(prototype.id + idtxt).hide();
            Ext.getCmp(prototype.id + idcmb).show();
        } else {
            Ext.getCmp(prototype.id + idtxt).show();
            Ext.getCmp(prototype.id + idcmb).hide();
        }

    },
    imgClearFields: function () {

        for (var nbr = 1; nbr < 8; nbr++) {
            var v_txtCampoText = Ext.getCmp(prototype.id + '-txtCampo' + nbr);
            var v_cmbCampo = Ext.getCmp(prototype.id + '-cmbCampo' + nbr);
            //var v_cmbCampoB = Ext.getCmp(prototype.id + '-cmbCampo' + nbr + 'B');
            var v_cmbOperador = Ext.getCmp(prototype.id + '-cmbOperador' + nbr);
            var v_txtValue = Ext.getCmp(prototype.id + '-txtValue' + nbr);
            var v_txtValueBetween = Ext.getCmp(prototype.id + '-txtValue' + nbr + 'B');
            var v_hbox = Ext.getCmp(prototype.id + '-hb_Between' + nbr);

            v_txtCampoText.setValue('');
            v_txtCampoText.show();
            v_cmbCampo.setValue('');
            v_cmbCampo.hide();
            v_cmbCampo.getStore().load();
        }
    },
    setStoreDataTW: function () {

        for (var i = 2; i < 8; i++) {
            var cmbConector = Ext.getCmp(prototype.id + '-cmbConector' + i);
            cmbConector.bindStore(Ext.create('Ext.data.ArrayStore', {
                autoLoad: false,
                fields: ['code', 'name'],
                data: [
                    ["AND", "AND"],
                    ["OR", "OR"]
                ]}));
            cmbConector.setValue('AND');
        }

        Ext.Ajax.request({
            url: prototype.url + '/getOperadores',
            method: 'POST',
            timeout: 60000000,
            params: {
                tabla: ''
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstOperadores = res.data;
                var dataOP = [];

                dataOP.push({data: "", label: "All", help: ""});

                for (var j = 0; j < lstOperadores.length; j++) {
                    var itemOP = {
                        data: lstOperadores[j].OPERADOR,
                        label: lstOperadores[j].OPERADOR,
                        help: lstOperadores[j].DESCRIPT
                    };
                    dataOP.push(itemOP);
                }
                var storeDataOP = Ext.create('Ext.data.Store', {
                    fields: ['data', 'label', 'help'],
                    data: dataOP,
                    autoLoad: true
                });

                for (var i = 1; i < 8; i++) {
                    Ext.getCmp(prototype.id + '-cmbOperador' + i).bindStore(storeDataOP);
                    Ext.getCmp(prototype.id + '-cmbOperador' + i).setValue('');
                }
            }
        });
    },
    armandoQuery: function () {
        //Armando Query ===========================================
        var strSQL = '';
        var temp = '';
        var temp2 = '';
        var campo = '';
        var esPrim = false;
        var dataType = '';
        //=========================================================
        //Campo 1 =================================================


        for (var i = 1; i < 8; i++) {

            var idtxtCampo = '-txtCampo' + i;
            var idcmbCampo = '-cmbCampo' + i;
            var idcmbCampoB = '-cmbCampo' + i + 'B';
            var idtxtValue = '-txtValue' + i;
            var idtxtValueB = '-txtValue' + i + 'B';
            var idcmbOperador = '-cmbOperador' + i;
            var idcmbConector = '-cmbConector' + i;

            var txtCampo = Ext.getCmp(prototype.id + idtxtCampo);
            var cmbCampo = Ext.getCmp(prototype.id + idcmbCampo).getValue();
            var cmbCampoB = Ext.getCmp(prototype.id + idcmbCampoB).getValue();
            var txtValue = Ext.getCmp(prototype.id + idtxtValue);
            var txtValueB = Ext.getCmp(prototype.id + idtxtValueB).getValue();
            var cmbConector = '';
            if (esPrim) {
                cmbConector = Ext.getCmp(prototype.id + idcmbConector).getValue();
            }

            var cmbOperador = Ext.getCmp(prototype.id + idcmbOperador).getValue();

            if (txtCampo.isVisible()) {
                campo = this.getSystFieldByUserField(txtCampo.getValue().toUpperCase());
            } else {
                campo = this.getSystFieldByUserField(cmbCampo.toUpperCase());
            }
            if (campo !== '' && (txtValue.getValue() !== '' || cmbCampoB !== '')) {

                if (txtValue.isVisible()) {
                    dataType = '';
                    temp = txtValue.getValue().toUpperCase();
                    temp2 = txtValueB.toUpperCase();
                } else {
                    temp = cmbCampoB.toUpperCase();
                    dataType = 'N';
                }
                if (esPrim) {
                    strSQL += cmbConector.toUpperCase();
                }
                strSQL += " " + campo + " " + this.getConectorSql(cmbOperador, '', temp, temp2, dataType);
                esPrim = true;
            }
        }
        return strSQL;
    },
    getConectorSql: function (operador, combo, campo1, campo2, dataType) {
        var operadorEq = '';
        var param = campo1.split(',');
        var open = " '", close = "' ";
        if (dataType == "N") {
            open = " ", close = " ";
        }

        switch (operador.trim()) {
            case 'EQ':
                operadorEq = '=' + open + campo1 + close;
                break;
            case 'GT':
                operadorEq = '>' + open + campo1 + close;
                break;
            case 'LT':
                operadorEq = '<' + open + campo1 + close;
                ;
                break;
            case 'GE':
                operadorEq = '>=' + open + campo1 + close;
                break;
            case 'LE':
                operadorEq = '<=' + open + campo1 + close;
                break;
            case 'NE':
                operadorEq = '<>' + open + campo1 + close;
                break;
            case 'LIKE':
                operadorEq = ' LIKE ' + open + campo1 + close;
                break;
            case 'NLIKE':
                operadorEq = 'NOT LIKE' + open + campo1 + close;
                break;
            case 'LIST':
                operadorEq = 'IN ('
                for (var c = 0; c < param.length; c++) {
                    operadorEq += param[c]
                    if (c + 2 <= param.length) {
                        operadorEq += ',';
                    }
                }
                operadorEq += ') ';
                break;
            case 'NLIST':
                operadorEq = 'NOT IN ('
                for (var j = 0; j < param.length; j++) {
                    operadorEq += param[j]
                    if (j + 2 <= param.length) {
                        operadorEq += ',';
                    }
                }
                operadorEq += ') ';
                break;
            case 'BETWEEN':
                operadorEq = ' BETWEEN ' + open + campo1 + close + ' AND ' + open + campo2 + close + ' ';
                break;
            default:
                operadorEq = '=';
                break;
        }

        return operadorEq;
    },
    getSystFieldByUserField: function (campo) {

        var objCampo;
        var campoA1248 = '';

        for (var j = 0; j < me.listaCampos.length; j++) {
            objCampo = me.listaCampos[j];
            if (objCampo["userfield"] === campo.trim()) {
                campoA1248 = objCampo["fieldSys"];
                break;
            }
        }
        return campoA1248;
    },
    imgClearRowAll: function (nbr) {
        for (var j = 1; j < 8; j++) {
            me.imgClearRow(String(j));
        }
    },
    imgClearRow: function (nbr) {

        var v_txtCampoText = Ext.getCmp(prototype.id + '-txtCampo' + nbr);
        var v_cmbCampo = Ext.getCmp(prototype.id + '-cmbCampo' + nbr);
        var v_cmbOperador = Ext.getCmp(prototype.id + '-cmbOperador' + nbr);
        var v_txtValue = Ext.getCmp(prototype.id + '-txtValue' + nbr);
        var v_txtValueBetween = Ext.getCmp(prototype.id + '-txtValue' + nbr + 'B');
        var v_hbox = Ext.getCmp(prototype.id + '-hb_Between' + nbr);

        if (nbr !== '1') {
            //SelectedIndex = 0
            var cb = Ext.getCmp(prototype.id + '-cmbConector' + nbr);
            cb.setValue(cb.getStore().getAt(0).get(cb.valueField));
        }

        v_txtCampoText.setValue('');
        v_cmbCampo.setValue('');
        v_cmbOperador.setValue('');
        v_txtValue.setValue('');
        v_txtValueBetween.setValue('');
        v_hbox.hide();
    },
    search: function () {
        win.lblUser_toolTip("Estructura: IMF101");

        me.beanDetailTW.IN_FECHA = Ext.getCmp(prototype.id + '-cmbDateYearTW').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTW').getValue();
        me.beanDetailTW.strSQL = this.armandoQuery();
        me.viewMPF101_clickHandler(me.beanDetailTW);

    },
    getRules: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/getRules'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {};
                },
                load: function (obj, obj2, success, response, obj5) {

                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataColumns').bindStore(storeGridDatas);

    },
    viewMPF101_clickHandler: function (beanDet) {
        console.log('viewMPF101_clickHandler');
        console.log(beanDet, 'beanDet')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMPF101Teleworking'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-panelGridDataMain').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: MPF101");

                    Ext.getCmp(prototype.id + '-panelGridDataMain').unmask();

                    if (obj.data.length > 0) {
                        var Objtemp = obj.data.items[0].data;

                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        let lstData = []
                        for (let value of obj.data.items) {
                            lstData.push(value.data)
                        }
                        let a = [];
                        let dataRoot = {text: '.', expanded: false, children: []};

                        Ext.Object.each(lstData, function (index, value) {
                            if (a.indexOf(value.UNIKEY) < 0) {
                                let V_SVFOP = 0;
                                Ext.Object.each(lstData, function (index, valuex) {
                                    if (value.UNIKEY === valuex.UNIKEY) {
                                        V_SVFOP += valuex.SVFOP_100;
                                    }
                                });
                                a.push(value.UNIKEY);
                                dataRoot.children.push({
                                    UNIKEY: value.UNIKEY,
                                    QTY: value.QTY_101,
                                    SVFOP: value.SVFOP_101,
                                    SVFOP_100: V_SVFOP,
                                    SCURRENCY: value.SCURRENCY_101,
                                    TDOC: value.TDOC_101,
                                    SDATE: value.SDATE_101,
                                    PAYDATE: value.PAYDATE,
                                    CODEBANK: value.CODEBANK,
                                    MERCHNC: value.MERCHNC,
                                    ACCNUMBER: value.ACCNUMBER,
                                    TERMI: value.TERMI,
                                    TQUERY: value.TQUERY,
                                    SAGENT: value.SAGENT_101,
                                    SCARCOD: value.SCARCOD_101,
                                    SCARDN: value.SCARDN_101,
                                    SAUTHOC: value.SAUTHOC_101,
                                    SEQNUM: value.SEQNUM,
                                    expanded: false, children: []
                                });
                                let b = [];
                                Ext.Object.each(lstData, function (index, value01) {
                                    if (value.UNIKEY === value01.UNIKEY) {
                                        dataRoot.children[a.indexOf(value.UNIKEY)].children.push({
                                            UNIKEY: value01.UNIKEY,
                                            TKT: value01.TKT,
                                            QTY: value01.QTY_100,
                                            SVFOP_100: value01.SVFOP_100,
                                            SCURRENCY: value01.SCURRENCY_100,
                                            TDOC: value01.TDOC_100,
                                            SDATE: value01.SDATE_100,
                                            SAGENT: value01.SAGENT_100,
                                            SCARCOD: value01.SCARCOD_100,
                                            SCARDN: value01.SCARDN_100,
                                            SAUTHOC: value01.SAUTHOC_100,
                                            leaf: true
                                        });
                                    }
                                });
                            }
                        });

                        console.log(dataRoot);

                        var storeTree = Ext.create('Ext.data.TreeStore', {
                            root: dataRoot
                        });

                        Ext.getCmp(prototype.id + '-gridDataMain').setStore(storeTree);

                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    guardaFiltroMPF100: function () {

        me.lstParametros = [];

        for (var i = 1; i < 8; i++) {

            var idtxtCampo = '-txtCampo' + i;
            var idcmbCampo = '-cmbCampo' + i;
            var idcmbCampoB = '-cmbCampo' + i + 'B';
            var idtxtValue = '-txtValue' + i;
            var idtxtValueB = '-txtValue' + i + 'B';
            var idcmbOperador = '-cmbOperador' + i;
            var idcmbConector = '-cmbConector' + i;

            var txtCampo = Ext.getCmp(prototype.id + idtxtCampo).getValue();
            var cmbCampo = Ext.getCmp(prototype.id + idcmbCampo).getValue();
            var cmbCampoB = Ext.getCmp(prototype.id + idcmbCampoB).getValue();
            var txtValue = Ext.getCmp(prototype.id + idtxtValue).getValue();
            var txtValueB = Ext.getCmp(prototype.id + idtxtValueB).getValue();
            var cmbConector = '';
            if (i > 1) {
                cmbConector = Ext.getCmp(prototype.id + idcmbConector).getValue();
            }
            var cmbOperador = Ext.getCmp(prototype.id + idcmbOperador).getValue();

            me.lstParametros.push({txtCampo: txtCampo, cmbCampo: cmbCampo, txtValue: txtValue, cmbConector: cmbConector, cmbOperador: cmbOperador});
        }
        console.log(me.lstParametros);

    },
    mostrarFiltrosMPF100: function () {

        for (var i = 1; i < 8; i++) {

            var idtxtCampo = '-txtCampo' + i;
            var idcmbCampo = '-cmbCampo' + i;
            var idtxtValue = '-txtValue' + i;
            var idcmbOperador = '-cmbOperador' + i;
            var idcmbConector = '-cmbConector' + i;

            var v_obj = me.lstParametros[i - 1];

            Ext.getCmp(prototype.id + idtxtCampo).setValue(v_obj.txtCampo);
            Ext.getCmp(prototype.id + idcmbCampo).setValue(v_obj.txtCampo);

            Ext.getCmp(prototype.id + idtxtValue).setValue(v_obj.txtValue);
            if (i > 1) {
                Ext.getCmp(prototype.id + idcmbConector).setValue(v_obj.cmbConector);
            }
            Ext.getCmp(prototype.id + idcmbOperador).setValue(v_obj.cmbOperador);
        }
    },
    selectedChild: function (padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.id + '-' + child)
            this.stack.push(prototype.id + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        if (paggin === null) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
        } else {
            var pagData = paggin.getPageData();

            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);

            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);

            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-boxPagDetail').show();

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + child).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-boxPagDetail').setWidth(width);
        }
    },
    peek: function () {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    getCheckedCount: function () {
        var grid = Ext.getCmp(prototype.id + '-gridDataMain');
        var store = grid.getStore();

        var count = store.queryBy(function (record) {
            return record.get('select') === true;
        }).length;

        return count;
    },
    getGrillData: async function (btn) {
        var dato = this.getCheckedCount();

        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to conciliate ' + dato + ' records ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.executeOption();
                }
            }
        });
    },
    executeOption: async function () {

        let miGrilla = Ext.getCmp(prototype.id + '-gridDataMain');
        let datos = {};
        if (miGrilla) {

            datos = await this.procesarRegistros(miGrilla);
            if (miGrilla) {
                Ext.Ajax.request({
                    url: prototype.url + '/executeGrillUpdate',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos},
                    beforerequest: Ext.getCmp(prototype.id + '-panelGridDataMain').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-panelGridDataMain').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else {
                            global.Msg({msg: res.Mensaje});
                        }
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-panelGridDataMain').unmask();
                    }
                });
            } else {
                console.log('nadine');
            }
        } else {
            console.error('No se pudo encontrar la grilla con el ID especificado.');
        }
    },
    procesarRegistros: async function (grilla) {
        
        var grid = Ext.getCmp(prototype.id + '-gridDataColumns');
        var store = grid.getStore();

        var selectedRecord = store.findRecord('select', true, 0, false, false, true);

        if (selectedRecord) {
            var codrule = selectedRecord.get('CODRULE'); // Obtener el valor de RQUERY
            var rquery = selectedRecord.get('RQUERY'); // Obtener el valor de RQUERY
            var tquery = selectedRecord.get('TQUERY'); // Obtener el valor de RQUERY
            var ttable = selectedRecord.get('TTABLE'); // Obtener el valor de RQUERY
 
        } else {
            global.Msg({msg: '...You must select a rule...'
            }); 
        }
        
        let listaDeDatos = [];
        var grid = Ext.getCmp(prototype.id + '-gridDataMain');
        var store = grid.getStore();
        var selectedRecords = store.getRange().filter(record => record.get('select'));

        if (selectedRecords.length === 0) {
            console.warn("No hay registros seleccionados.");
            return null;
        }

        selectedRecords.forEach(function (record) {
            let registro = {
                TDOC: record.get('TDOC'),
                SDATE: record.get('SDATE'),
                PAYDATE: record.get('PAYDATE'),
                CODEBANK: record.get('CODEBANK'),
                MERCHNC: record.get('MERCHNC'),
                ACCNUMBER: record.get('ACCNUMBER'),
                TERMI: record.get('TERMI'),
                SAGENT: record.get('SAGENT'),
                SCARCOD: record.get('SCARCOD'),
                SCARDN: record.get('SCARDN'),
                SAUTHOC: record.get('SAUTHOC'),
                SEQ: record.get('SEQ'),
                SCURRENCY: record.get('SCURRENCY'),
                VFOP: record.get('SVFOP_101'),
                RQUERY: rquery,
                TQUERY: tquery,
                RULE: codrule
            };

            listaDeDatos.push(registro);
        });

        let datosEnJSON = Ext.JSON.encode(listaDeDatos);
        return datosEnJSON;
    },
    getGrillDataAll: async function (btn) {
        var dato = Ext.getCmp(prototype.id + '-lbl-total').text;

        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to conciliate ' + dato + ' records ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.executeOptionAll();
                }
            }
        });

    },
    executeOptionAll: async function () {

        var grid = Ext.getCmp(prototype.id + '-gridDataMain');
        var store = grid.getStore();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', true);
            record.commit();
        });
        store.resumeEvents();
        grid.getView().refresh();

        me.beanDetailTW.IN_FECHA = Ext.getCmp(prototype.id + '-cmbDateYearTW').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTW').getValue();
        me.beanDetailTW.strSQL = this.armandoQuery();

        Ext.Ajax.request({
            url: prototype.url + '/executeAllUpdate',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.beanDetailTW)},
            beforerequest: Ext.getCmp(prototype.id + '-panelGridDataMain').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-panelGridDataMain').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    global.Msg({
                        msg: res.Mensaje,
                        icon: 1,
                        fn: function () {
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-panelGridDataMain').unmask();
            }
        });
    },
    btnAdd_clickRules: function () {
        this.winDataEntryRules('I');
    },
    onEditClickRules: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntryRules('U', rec);
    },
    winDataEntryRules: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.ManualConciliationForm.DataEntryRules', {
            id: prototype.id + '-dataEntryRules',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
});
