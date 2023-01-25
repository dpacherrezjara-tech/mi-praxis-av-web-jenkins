/* global me */

Ext.define('Ext.Praxis.controller.program.ProPaymentsControl.ProPaymentsControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProPaymentsControlController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanCLAtot: '',
    beanCLA: '',
    beanNewAmex: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    searchParamsCard: {},
    searchParamsClari: {},
    searchParamsClariTot: {},
    searchParamsNewAmex: {},
    paramsDetail: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'ProPaymentsControlForm';
        prototype.url = CONTEXTPATH + '/ProPaymentsControl';
//        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ProPaymentsControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ProPaymentsControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ProPaymentsControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#ProPaymentsControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ProPaymentsControlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ProPaymentsControlForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ProPaymentsControlForm-btnBack': {
                click: this.btnBack_click
            },
            '#ProPaymentsControlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ProPaymentsControlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ProPaymentsControlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ProPaymentsControlForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-boxSearchFilter1').hide();
        Ext.getCmp(prototype.id + '-boxSearchFilter2').hide();
        Ext.getCmp(prototype.id + '-boxSearchFilter3').hide();
        Ext.getCmp(prototype.id + '-cmbFecFiltro').hide();
//        Ext.getCmp(prototype.id + '-lblDate').hide();

        Ext.getCmp(prototype.id + '-hboxFilter2').show();
//        Ext.getCmp(prototype.id + '-cmbCASH').hide();
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
//            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    cbxDateFromYear_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    ChangeCheckTotal: function () {
        this.btnSearch_click();
    },
    cmbType_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();

        Ext.getCmp(prototype.id + '-cmbPais').setValue("");
        Ext.getCmp(prototype.id + '-cmbPais').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbFTE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbTARJ').setReadOnly(false);

        Ext.getCmp(prototype.id + '-boxSearchFilter1').hide();
        Ext.getCmp(prototype.id + '-boxSearchFilter2').hide();
        Ext.getCmp(prototype.id + '-boxSearchFilter3').hide();
        Ext.getCmp(prototype.id + '-cmbFecFiltro').hide();

        Ext.getCmp(prototype.id + '-lblDate').show();
        Ext.getCmp(prototype.id + '-hboxFilter2').show();
//        Ext.getCmp(prototype.id + '-cmbCASH').hide();


        Ext.getCmp(prototype.id + '-rbgSELEC').reset();
        Ext.getCmp(prototype.id + '-rbgPEM').reset();


        var country = Ext.getCmp(prototype.id + '-cmbPais').getValue();
        if (country === 'US') {
            Ext.getCmp(prototype.id + '-cmbPais').setValue("All");
        }

        this.mostrarCiertosFiltros(true);

        var type = Ext.getCmp(prototype.id + '-cmbType').getValue();
        if (type === '2' || type === '7') {
            Ext.getCmp(prototype.id + '-cmbPais').setReadOnly(true);
            if (type === '2') {
                Ext.getCmp(prototype.id + '-lblTitulo').setText('By Country');
            } else {
                Ext.getCmp(prototype.id + '-lblTitulo').setText('By USA/States');
            }
        } else if (type === '3') {
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By Credit Card');
        } else if (type === '4') {
            Ext.getCmp(prototype.id + '-cmbFTE').setReadOnly(true);
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By Channel');
        } else if (type === '5') {
            Ext.getCmp(prototype.id + '-boxSearchFilter1').show();
            Ext.getCmp(prototype.id + '-rbgSELEC').reset();
            Ext.getCmp(prototype.id + '-lblTitulo').setText('Credit Card Sales & ACCB');
        } else if (type === '6') {
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By IATA');
        } else if (type === '8') {
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By Fare / Tax');
        } else if (type === '9') {
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By Bank (*)');
        } else if (type === '10') {
            Ext.getCmp(prototype.id + '-boxSearchFilter2').show();
            Ext.getCmp(prototype.id + '-rbgPEM').reset();
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By POS Entry Mode');
        } else if (type === '11') {
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By Phases Status');
        } else if (type === '12') {
            Ext.getCmp(prototype.id + '-lblTitulo').setText('General Totals');
        } else if (type === '13') {
            Ext.getCmp(prototype.id + '-cmbFecFiltro').show();
            Ext.getCmp(prototype.id + '-boxSearchFilter3').show();
            Ext.getCmp(prototype.id + '-hboxFilter2').hide();
            Ext.getCmp(prototype.id + '-cmbFTE').setReadOnly(true);
            Ext.getCmp(prototype.id + '-cmbTARJ').setReadOnly(true);
            Ext.getCmp(prototype.id + '-lblDate').hide();
            Ext.getCmp(prototype.id + '-lblTitulo').setText('Clarifications Requested by Banks');
        } else if (type === '20') {
            this.mostrarCiertosFiltros(false);
            Ext.getCmp(prototype.id + '-lblTitulo').setText('Credit Card New');

        } else {
            Ext.getCmp(prototype.id + '-lblTitulo').setText('By Month / Year');
        }

        me.btnSearch_click();
    },
    mostrarCiertosFiltros: function (visible) {
        Ext.getCmp(prototype.id + '-chkEECC').setVisible(visible);
        Ext.getCmp(prototype.id + '-cmbFTE').setVisible(visible);
        Ext.getCmp(prototype.id + '-lblFTE').setVisible(visible);
        Ext.getCmp(prototype.id + '-cmbTARJ').setVisible(visible);
        Ext.getCmp(prototype.id + '-lblTARJ').setVisible(visible);
        Ext.getCmp(prototype.id + '-lblFINSUMO').setVisible(visible);
        Ext.getCmp(prototype.id + '-cmbFINSUMO').setVisible(visible);
    },
    obtainData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        var cmbType = Ext.getCmp(prototype.id + '-cmbType');
        cmbType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "By Date"],
                ["2", "By Country"],
                ["3", "By Credit Card"],
                ["4", "By Channel"],
                ["5", "Credit Card Sales & ACCB"],
                ["6", "By Iata"],
                ["7", "By USA/States"],
                ["8", "By Fare/Tax"],
//                ["9", "By Bank (*)"],
                ["10", "By POS Entry Mode"],
                ["11", "By Phase Status"],
                ["12", "General Total"],
                ["13", "By Clarification"],
                ["20", "Credit Card New"]
            ]
        }));
        cmbType.setValue("1");

        var cmbFTE = Ext.getCmp(prototype.id + '-cmbFTE');
        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"]
            ]
        }));
        cmbFTE.setValue("");

        var cmbTARJ = Ext.getCmp(prototype.id + '-cmbTARJ');
        cmbTARJ.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["CA", "Cash"],
                ["CC", "Credit Card"]
            ]
        }));
        cmbTARJ.setValue("");

        var cmbFINSUMO = Ext.getCmp(prototype.id + '-cmbFINSUMO');
        cmbFINSUMO.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["E", "Pending"],
                ["P", "In Progress"],
                ["I", "Implemented"]
            ]
        }));
        cmbFINSUMO.setValue("");

        var cmbCASH = Ext.getCmp(prototype.id + '-cmbCASH');
        cmbCASH.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["ee", "CREDIT CARD"],
                ["**", "CASH"],
                ["", "All"]
            ]
        }));
        cmbCASH.setValue("ee");

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SENTDATE", "Reception Date"],
                ["SALEDATE", "Sale Date"]
            ]
        }));
        cmbFecFiltro.setValue("SENTDATE");

        this.dataObtain.COUNTRY = 2;
        this.dataObtain.BANK = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    me.lstCountry = res.lstCountry;
                    Ext.getCmp(prototype.id + '-cmbPais').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbPais').setValue('');

                    Ext.getCmp(prototype.id + '-cmbBank').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstBank, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbBank').setValue('');
                    me.btnSearch_click();

                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        me.bean.IN_PAYMENT = Ext.getCmp(prototype.id + '-cmbTARJ').getValue();
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbPais').getValue();
        me.bean.IN_TOP = 0;
        me.bean.IN_FINSUMO = Ext.getCmp(prototype.id + '-cmbFINSUMO').getValue();
        me.bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();

        var op2 = Ext.getCmp(prototype.id + '-rbgType').getValue();
        me.bean.IN_TDOC = op2.rbgTDOC;

        var chk = Ext.getCmp(prototype.id + '-chkEECC').getValue();
        if (chk === true) {
            me.bean.IN_FLAG = 'Y';
        } else {
            me.bean.IN_FLAG = '';
        }

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
//        console.log(searchParams);
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        var typeSearch = Ext.getCmp(prototype.id + '-cmbType').getValue();

        if (typeSearch === '2') {
//            roScrDashboardPayment.searchCountry(bean);
            this.searchCountry();
        } else if (typeSearch === '3') {
//            roScrDashboardPayment.searchCard(bean);
            this.searchCard();
        } else if (typeSearch === '4') {
            this.searchChannel();
        } else if (typeSearch === '5') {

            var selec = Ext.getCmp(prototype.id + '-rbgSELEC').getValue().rbgSELEC;
            switch (selec) {
                case 'MONTH':
                    Ext.getCmp(prototype.id + '-lblShow').hide();
                    Ext.getCmp(prototype.id + '-cmbCASH').hide();
//                    roScrDashboardPayment.searchPayDelay(bean);
                    this.searchPayDelay();
                    break;
                case 'COUNTRY':
                    Ext.getCmp(prototype.id + '-lblShow').hide();
                    Ext.getCmp(prototype.id + '-cmbCASH').hide();
//                    roScrDashboardPayment.searchPayDelayCountry(bean);
                    this.searchPayDelayCountry();
                    break;
                case 'CARD':

                    Ext.getCmp(prototype.id + '-lblShow').show();
                    Ext.getCmp(prototype.id + '-cmbCASH').show();
//                    bean.SCARCOD     = String(cmbCASH.selectedItem.data);
                    me.bean.SCARCOD = Ext.getCmp(prototype.id + '-cmbCASH').getValue();
                    var beanString = JSON.stringify(me.bean);
                    searchParamsCard = {
                        beanString: beanString,
                        bean: me.bean
                    };
                    this.searchPayDelayCard();
                    break;
            }
        } else if (typeSearch === '6') {
//            roScrDashboardPayment.searchIata(bean);
            this.searchIata();
        } else if (typeSearch === '7') {
            Ext.getCmp(prototype.id + '-cmbPais').setValue("US");
//            roScrDashboardPayment.searchUSAState(bean);
            this.searchUSAState();
        } else if (typeSearch === '8') {
//            roScrDashboardPayment.searchFareTax(bean);
            this.searchFareTax();
        }
//	else if(typeSearch == '9'){
//		
//		roScrDashboardPayment.searchBank(bean);
//		
//	}
        else if (typeSearch === '10') {

            var selPOS = Ext.getCmp(prototype.id + '-rbgPEM').getValue().rbgPEM;
            switch (selPOS) {
                case 'MONTH':
                    this.searchPOSMonth();
                    break;
                case 'POS':
                    this.searchPOS();
                    break;
            }
        } else if (typeSearch === '11' || typeSearch === '12') {   //By Phase Status - General Totals
            this.searchPhasesStatus();
        } else if (typeSearch === '13') {
            var chkTOT = Ext.getCmp(prototype.id + '-chkTOT').getValue();
            console.log(chkTOT);
            if (!chkTOT) {
                me.beanCLAtot = {};

                me.beanCLAtot.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                me.beanCLAtot.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                        Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
                me.beanCLAtot.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                        Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

                var opx = Ext.getCmp(prototype.id + '-rbgType').getValue();
                me.beanCLAtot.IN_TDOC = opx.rbgTDOC;
                var opf = Ext.getCmp(prototype.id + '-rbgFlag').getValue();

                if (opf.rbgFlag === undefined) {
                    opf.rbgFlag = 'MONTH';
                }

                me.beanCLAtot.IN_SELECT = opf.rbgFlag;

                var beanString = JSON.stringify(me.beanCLAtot);
                searchParamsClari = {
                    beanString: beanString,
                    bean: me.beanCLAtot
                };
                this.searchClarificationTOT();
            } else {
                me.beanCLA = {};

                me.beanCLA.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                me.beanCLA.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                        Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
                me.beanCLA.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                        Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

                var opx = Ext.getCmp(prototype.id + '-rbgType').getValue();
                me.beanCLA.IN_TDOC = opx.rbgTDOC;
                var opf = Ext.getCmp(prototype.id + '-rbgFlag').getValue();
                me.beanCLA.IN_SELECT = opf.rbgFlag;

                var beanString = JSON.stringify(me.beanCLA);
                searchParamsClariTot = {
                    beanString: beanString,
                    bean: me.beanCLA
                };

                this.searchClarification();

            }
        } else if (typeSearch === '20') {

            me.beanNewAmex = {};

            me.beanNewAmex.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
            me.beanNewAmex.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.beanNewAmex.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();


            me.beanNewAmex.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
            me.beanNewAmex.IN_PAYMENT = Ext.getCmp(prototype.id + '-cmbTARJ').getValue();
            var op2 = Ext.getCmp(prototype.id + '-rbgType').getValue();
            me.beanNewAmex.IN_TDOC = op2.rbgTDOC;


            me.beanNewAmex.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbPais').getValue();
            var chk = Ext.getCmp(prototype.id + '-chkEECC').getValue();
            if (chk === true) {
                me.beanNewAmex.IN_FLAG = 'Y';
            } else {
                me.beanNewAmex.IN_FLAG = '';
            }
            me.beanNewAmex.IN_FINSUMO = Ext.getCmp(prototype.id + '-cmbFINSUMO').getValue();
            me.beanNewAmex.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();


            var beanString = JSON.stringify(me.beanNewAmex);
            searchParamsNewAmex = {
                beanString: beanString,
                bean: me.beanNewAmex
            };

            this.searchNewAmex();
        } else {
            this.search();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="search">
    search: function () {

        console.log('---------------- search --------------');

        win.lblUser_toolTip("Estructura: A3020");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totQTY1').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUS1').setText('0');
                            Ext.getCmp(prototype.id + '-totperc1').setText('0');
                            Ext.getCmp(prototype.id + '-totQTYA').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUSA').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff1').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff2').setText('0');
                            Ext.getCmp(prototype.id + '-totperc3').setText('0');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;

                            if (data.IN_FLAG === 'Y') {
                                Ext.getCmp(prototype.id + '-headMonthConc').setText('Statement');
                                Ext.getCmp(prototype.id + '-headMonthAcc').setText('Paid');
                            } else {
                                Ext.getCmp(prototype.id + '-headMonthConc').setText('Conciliation');
                                Ext.getCmp(prototype.id + '-headMonthAcc').setText('Accepted');
                            }

                            Ext.getCmp(prototype.id + '-totQTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-totperc1').setText("100 %");
                            Ext.getCmp(prototype.id + '-totQTYA').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSA').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff1').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff2').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totperc3').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));
                        }

                        // -------------------- Grafico --------------------------



//                        me.onCreateChart();
//                        Ext.getCmp(prototype.id + '-graficosAños').bindStore(storeGridDatas);

                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-graficosAños').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-graficosAñosAmount').bindStore(storeGridDatas);

        }
    },
    displayChart_ByMonth: function (a, b, c, d) {

        var rbg_Type_tc = Ext.getCmp(prototype.id + '-rbgFlagaa').getValue().rbgFlag;

        switch (rbg_Type_tc) {
            case 'Cpn':
                Ext.getCmp(prototype.id + '-graficosAños').show();
                Ext.getCmp(prototype.id + '-graficosAñosAmount').hide();
                break;
            case 'Amt':
                Ext.getCmp(prototype.id + '-graficosAños').hide();
                Ext.getCmp(prototype.id + '-graficosAñosAmount').show();
                break;
        }

    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        return '$' + layoutContext.renderer(label);
    },
    onCreateChart: function () {
        console.log('onCreateChart');
        var panel = Ext.getCmp(prototype.id + '-chart');

        var chart01 = Ext.create('Ext.panel.Panel', {
            //id: prototype.id + '-graficosAños',
            items: [
                {
                    xtype: 'cartesian',
                    id: prototype.id + '-graficosAños',
//                    width: 1010,
                    height: 420,
                    style: 'background: #3399ff;',
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    captions: {
                        title: {
                            text: 'Total Tickets by Sales Date',
                            alignTo: 'chart'
                        },
                        subtitle: {
                            // text: 'Quarter-wise comparison',
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
//                    store: store04,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['QTY1', 'QTYA', 'diff1'],
                            grid: true,
//                            title: 'Sales in USD',
                            renderer: 'onAxisLabelRender'
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'strFormatDate',
                            title: {
                                text: 'Sales date',
                                translationX: -30
                            },
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['Sales', 'xxx', 'yyy'],
                        xField: 'strFormatDate',
                        yField: ['QTY1', 'QTYA', 'diff1'],
//                        label: {
//                            field: ['QTY1','QTYA', 'diff1'],
//                            display: 'outside',orientation:'horizontal',
//                           // renderer: 'onSeriesLabelRender'
//                           renderer: 'onSeriesLabelRender'
//                        },
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        }
                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel.updateLayout();
                }
            }
//            tbar: [
//                '->',
//                {
//                    xtype: 'button',
//                    text: 'Download',
//                    handler: function(btn, e, eOpts) {
//                        btn.up('panel').down("cartesian").download({
//                            filename: "Suggested documents Rejected Years"
//                        });
//                    }
//                }
//            ]
        });
        panel.add(chart01);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchCountry">
    searchCountry: function () {
        win.lblUser_toolTip("Estructura: A3020");
        me.panelActual = '-boxMainDataCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchCountry'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totQTY1_CO').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_CO').setText('0');
                            Ext.getCmp(prototype.id + '-totQTYA_CO').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_CO').setText('0');
                            Ext.getCmp(prototype.id + '-totperc1_CO').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff1_CO').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff2_CO').setText('0');
                            Ext.getCmp(prototype.id + '-totperc3_CO').setText('0');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            if (me.panelActual === 'boxChart') {
                                me.panelActual = 'boxCountry';
//				displayChart_ByCountry(hSlider.value);
//				Objtemp = A3020Filter(gridDataCountryAC.getItemAt(0));
//				totCht_SVFOPUS1.headerText = formatLngNumber.format(Objtemp.totSVFOPUS1);
//				totCht_perc2.headerText    = formatDblNumber.format(100);
//				totCht_diff2.headerText    = formatLngNumber.format(Objtemp.totdiff2);
//				totCht_perc3.headerText    = formatDblNumber.format(Objtemp.totperc3);
                            } else {
                                me.panelActual = 'boxMainDataCountry';

                                if (data.IN_FLAG === 'Y') {
                                    Ext.getCmp(prototype.id + '-headCountryConc').setText('Statement');
                                    Ext.getCmp(prototype.id + '-headCountryAcc').setText('Paid');
                                } else {
                                    Ext.getCmp(prototype.id + '-headCountryConc').setText('Conciliation');
                                    Ext.getCmp(prototype.id + '-headCountryAcc').setText('Accepted');
                                }

                                Ext.getCmp(prototype.id + '-totQTY1_CO').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                                Ext.getCmp(prototype.id + '-totSVFOPUS1_CO').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                                Ext.getCmp(prototype.id + '-totQTYA_CO').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                                Ext.getCmp(prototype.id + '-totSVFOPUSA_CO').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                                Ext.getCmp(prototype.id + '-totperc1_CO').setText("100 %");
                                Ext.getCmp(prototype.id + '-totdiff1_CO').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                                Ext.getCmp(prototype.id + '-totdiff2_CO').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                                Ext.getCmp(prototype.id + '-totperc3_CO').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));
                            }

                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCountry').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchCard">
    searchCard: function () {
        win.lblUser_toolTip("Estructura: A3020");
        me.panelActual = '-boxMainDataCard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchCard'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totQTY1_CA').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_CA').setText('0');
                            Ext.getCmp(prototype.id + '-totQTYA_CA').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_CA').setText('0');
                            Ext.getCmp(prototype.id + '-totperc1_CA').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff1_CA').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff2_CA').setText('0');
                            Ext.getCmp(prototype.id + '-totperc3_CA').setText('0');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            if (me.panelActual === 'boxChart') {
                                me.panelActual = 'boxCard';
//				displayChart_ByCountry(hSlider.value);
//				Objtemp = A3020Filter(gridDataCountryAC.getItemAt(0));
//				totCht_SVFOPUS1.headerText = formatLngNumber.format(Objtemp.totSVFOPUS1);
//				totCht_perc2.headerText    = formatDblNumber.format(100);
//				totCht_diff2.headerText    = formatLngNumber.format(Objtemp.totdiff2);
//				totCht_perc3.headerText    = formatDblNumber.format(Objtemp.totperc3);
                            } else {
                                me.panelActual = 'boxMainDataCard';

                                if (data.IN_FLAG === 'Y') {
                                    Ext.getCmp(prototype.id + '-headCardConc').setText('Statement');
                                    Ext.getCmp(prototype.id + '-headCardAcc').setText('Paid');
                                } else {
                                    Ext.getCmp(prototype.id + '-headCardConc').setText('Conciliation');
                                    Ext.getCmp(prototype.id + '-headCardAcc').setText('Accepted');
                                }

                                Ext.getCmp(prototype.id + '-totQTY1_CA').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                                Ext.getCmp(prototype.id + '-totSVFOPUS1_CA').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                                Ext.getCmp(prototype.id + '-totQTYA_CA').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                                Ext.getCmp(prototype.id + '-totSVFOPUSA_CA').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                                Ext.getCmp(prototype.id + '-totperc1_CA').setText("100 %");
                                Ext.getCmp(prototype.id + '-totdiff1_CA').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                                Ext.getCmp(prototype.id + '-totdiff2_CA').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                                Ext.getCmp(prototype.id + '-totperc3_CA').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));
                            }

                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCard').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchChannel">
    searchChannel: function () {
        win.lblUser_toolTip("Estructura: A3020");
        me.panelActual = '-boxMainDataChannel';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchChannel'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totQTY1_CH').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_CH').setText('0');
                            Ext.getCmp(prototype.id + '-totQTYA_CH').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_CH').setText('0');
                            Ext.getCmp(prototype.id + '-totperc1_CH').setText('0');

                            Ext.getCmp(prototype.id + '-totdiff1_CH').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff2_CH').setText('0');
                            Ext.getCmp(prototype.id + '-totperc3_CH').setText('0');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            if (data.IN_FLAG === 'Y') {
                                Ext.getCmp(prototype.id + '-headChannelConc').setText('Statement');
                                Ext.getCmp(prototype.id + '-headChannelAcc').setText('Paid');
                            } else {
                                Ext.getCmp(prototype.id + '-headChannelConc').setText('Conciliation');
                                Ext.getCmp(prototype.id + '-headChannelAcc').setText('Accepted');
                            }

                            Ext.getCmp(prototype.id + '-totQTY1_CH').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_CH').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-totQTYA_CH').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_CH').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                            Ext.getCmp(prototype.id + '-totperc1_CH').setText("100 %");

                            Ext.getCmp(prototype.id + '-totdiff1_CH').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff2_CH').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totperc3_CH').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));


                            // ------------------------------- GRAFICO -----------------------------------------------
//                            displayChart06_Channel();

                            var list = obj.data;
                            console.log(list);

                            var lstNew_CH = [];
                            for (var i = 0; i < list.length; i++) {
                                var item = {};
                                item.perc1 = list.items[i].data.perc1;
                                item.strDescription = list.items[i].data.strDescription + ' , ' + Ext.util.Format.number(item.perc1, '0,000.00') + '%';
//                                if(Ext.util.Format.number(item.perc1, '0,000.00') > 0){
                                lstNew_CH.push(item);
//                                }

                            }

                            var storeDataNew_CH = Ext.create('Ext.data.Store', {
                                data: lstNew_CH,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayChart06_Channel').bindStore(storeDataNew_CH);

                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataChannel').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-displayChart06_Channel').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchIata">
    searchIata: function () {
        win.lblUser_toolTip("Estructura: A3264");
        me.panelActual = '-boxMainIata';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-boxPaginacion').show();

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchIata'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totQTY1_IA').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_IA').setText('0');
                            Ext.getCmp(prototype.id + '-totQTYA_IA').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_IA').setText('0');
                            Ext.getCmp(prototype.id + '-totperc1_IA').setText('0');

                            Ext.getCmp(prototype.id + '-totdiff1_IA').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff2_IA').setText('0');
                            Ext.getCmp(prototype.id + '-totperc3_IA').setText('0');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            if (data.IN_FLAG === 'Y') {
                                Ext.getCmp(prototype.id + '-headIataConc').setText('Statement');
                                Ext.getCmp(prototype.id + '-headIataAcc').setText('Paid');
                            } else {
                                Ext.getCmp(prototype.id + '-headIataConc').setText('Conciliation');
                                Ext.getCmp(prototype.id + '-headIataAcc').setText('Accepted');
                            }

                            Ext.getCmp(prototype.id + '-totQTY1_IA').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_IA').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-totQTYA_IA').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_IA').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                            Ext.getCmp(prototype.id + '-totperc1_IA').setText("100 %");

                            Ext.getCmp(prototype.id + '-totdiff1_IA').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff2_IA').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totperc3_IA').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataIata').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchPayDelay">
    searchPayDelay: function () {
        win.lblUser_toolTip("Estructura: A3020");
        me.panelActual = '-boxPayDelay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchPayDelay'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totQSALES').setText('0');
                            Ext.getCmp(prototype.id + '-totASALES').setText('0');
                            Ext.getCmp(prototype.id + '-totPERC').setText('0');

                            Ext.getCmp(prototype.id + '-totQDAY5').setText('0');
                            Ext.getCmp(prototype.id + '-totADAY5').setText('0');
                            Ext.getCmp(prototype.id + '-totQDAY10').setText('0');
                            Ext.getCmp(prototype.id + '-totADAY10').setText('0');
                            Ext.getCmp(prototype.id + '-totQDAY15').setText('0');
                            Ext.getCmp(prototype.id + '-totADAY15').setText('0');

                            Ext.getCmp(prototype.id + '-totQOTHER').setText('0');
                            Ext.getCmp(prototype.id + '-totAOTHER').setText('0');

                            Ext.getCmp(prototype.id + '-totQTOTAL').setText('0');
                            Ext.getCmp(prototype.id + '-totATOTAL').setText('0');
                            Ext.getCmp(prototype.id + '-totPERTOT').setText('0');

                            Ext.getCmp(prototype.id + '-100%').setText('0%');

                            Ext.getCmp(prototype.id + '-lblTotPERC_5').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_10').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_15').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_O20').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_PEND').setText('0%');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-totQSALES').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totASALES').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPERC').setText('100');

                            Ext.getCmp(prototype.id + '-totQDAY5').setText(Ext.util.Format.number(data.totQDAY5, '0,000'));
                            Ext.getCmp(prototype.id + '-totADAY5').setText(Ext.util.Format.number(data.totADAY5, '0,000'));
                            Ext.getCmp(prototype.id + '-totQDAY10').setText(Ext.util.Format.number(data.totQDAY10, '0,000'));
                            Ext.getCmp(prototype.id + '-totADAY10').setText(Ext.util.Format.number(data.totADAY10, '0,000'));
                            Ext.getCmp(prototype.id + '-totQDAY15').setText(Ext.util.Format.number(data.totQDAY15, '0,000'));
                            Ext.getCmp(prototype.id + '-totADAY15').setText(Ext.util.Format.number(data.totADAY15, '0,000'));

                            Ext.getCmp(prototype.id + '-totQOTHER').setText(Ext.util.Format.number(data.totQOTHER, '0,000'));
                            Ext.getCmp(prototype.id + '-totAOTHER').setText(Ext.util.Format.number(data.totAOTHER, '0,000'));

                            Ext.getCmp(prototype.id + '-totQTOTAL').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totATOTAL').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totPERTOT').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));

                            Ext.getCmp(prototype.id + '-lblTotPERC_5').setText(Ext.util.Format.number(data.perc_5, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_10').setText(Ext.util.Format.number(data.perc_10, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_15').setText(Ext.util.Format.number(data.perc_15, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_O20').setText(Ext.util.Format.number(data.perc_O20, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotPERC_PEND').setText(Ext.util.Format.number(data.totperc3, '0,000.00') + '%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPayDelay').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchPayDelayCountry">
    searchPayDelayCountry: function () {
        win.lblUser_toolTip("Estructura: A3020");
        me.panelActual = '-boxPayDelayCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchPayDelayCountry'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totC_QSALES').setText('0');
                            Ext.getCmp(prototype.id + '-totC_ASALES').setText('0');
                            Ext.getCmp(prototype.id + '-totC_PERC').setText('0');

                            Ext.getCmp(prototype.id + '-totC_QDAY5').setText('0');
                            Ext.getCmp(prototype.id + '-totC_ADAY5').setText('0');
                            Ext.getCmp(prototype.id + '-totC_QDAY10').setText('0');
                            Ext.getCmp(prototype.id + '-totC_ADAY10').setText('0');
                            Ext.getCmp(prototype.id + '-totC_QDAY15').setText('0');
                            Ext.getCmp(prototype.id + '-totC_ADAY15').setText('0');

                            Ext.getCmp(prototype.id + '-totC_QOTHER').setText('0');
                            Ext.getCmp(prototype.id + '-totC_AOTHER').setText('0');

                            Ext.getCmp(prototype.id + '-totC_QTOTAL').setText('0');
                            Ext.getCmp(prototype.id + '-totC_ATOTAL').setText('0');
                            Ext.getCmp(prototype.id + '-totC_PERTOT').setText('0');

                            Ext.getCmp(prototype.id + '-100%Country').setText('0%');

                            Ext.getCmp(prototype.id + '-lblTotC_PERC_5').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_10').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_15').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_O20').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_PEND').setText('0%');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-totC_QSALES').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_ASALES').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_PERC').setText('100');

                            Ext.getCmp(prototype.id + '-totC_QDAY5').setText(Ext.util.Format.number(data.totQDAY5, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_ADAY5').setText(Ext.util.Format.number(data.totADAY5, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_QDAY10').setText(Ext.util.Format.number(data.totQDAY10, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_ADAY10').setText(Ext.util.Format.number(data.totADAY10, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_QDAY15').setText(Ext.util.Format.number(data.totQDAY15, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_ADAY15').setText(Ext.util.Format.number(data.totADAY15, '0,000'));

                            Ext.getCmp(prototype.id + '-totC_QOTHER').setText(Ext.util.Format.number(data.totQOTHER, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_AOTHER').setText(Ext.util.Format.number(data.totAOTHER, '0,000'));

                            Ext.getCmp(prototype.id + '-totC_QTOTAL').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_ATOTAL').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totC_PERTOT').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));

                            Ext.getCmp(prototype.id + '-lblTotC_PERC_5').setText(Ext.util.Format.number(data.perc_5, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_10').setText(Ext.util.Format.number(data.perc_10, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_15').setText(Ext.util.Format.number(data.perc_15, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_O20').setText(Ext.util.Format.number(data.perc_O20, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotC_PERC_PEND').setText(Ext.util.Format.number(data.totperc3, '0,000.00') + '%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPayDelayCountry').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchPayDelayCard">
    searchPayDelayCard: function () {
        win.lblUser_toolTip("Estructura: A3020");
        me.panelActual = '-boxPayDelayCard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        console.log(searchParamsCard);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchPayDelayCard'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParamsCard;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totCC_QSALES').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_ASALES').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_PERC').setText('0');

                            Ext.getCmp(prototype.id + '-totCC_QDAY5').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_ADAY5').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_QDAY10').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_ADAY10').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_QDAY15').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_ADAY15').setText('0');

                            Ext.getCmp(prototype.id + '-totCC_QOTHER').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_AOTHER').setText('0');

                            Ext.getCmp(prototype.id + '-totCC_QTOTAL').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_ATOTAL').setText('0');
                            Ext.getCmp(prototype.id + '-totCC_PERTOT').setText('0');

                            Ext.getCmp(prototype.id + '-100%Card').setText('0%');

                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_5').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_10').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_15').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_O20').setText('0%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_PEND').setText('0%');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-totCC_QSALES').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_ASALES').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_PERC').setText('100');

                            Ext.getCmp(prototype.id + '-totCC_QDAY5').setText(Ext.util.Format.number(data.totQDAY5, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_ADAY5').setText(Ext.util.Format.number(data.totADAY5, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_QDAY10').setText(Ext.util.Format.number(data.totQDAY10, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_ADAY10').setText(Ext.util.Format.number(data.totADAY10, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_QDAY15').setText(Ext.util.Format.number(data.totQDAY15, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_ADAY15').setText(Ext.util.Format.number(data.totADAY15, '0,000'));

                            Ext.getCmp(prototype.id + '-totCC_QOTHER').setText(Ext.util.Format.number(data.totQOTHER, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_AOTHER').setText(Ext.util.Format.number(data.totAOTHER, '0,000'));

                            Ext.getCmp(prototype.id + '-totCC_QTOTAL').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_ATOTAL').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totCC_PERTOT').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));

                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_5').setText(Ext.util.Format.number(data.perc_5, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_10').setText(Ext.util.Format.number(data.perc_10, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_15').setText(Ext.util.Format.number(data.perc_15, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_O20').setText(Ext.util.Format.number(data.perc_O20, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotCC_PERC_PEND').setText(Ext.util.Format.number(data.totperc3, '0,000.00') + '%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPayDelayCard').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchUSAState">
    searchUSAState: function () {
        win.lblUser_toolTip("Estructura: A3264");
        me.panelActual = '-boxMainDataStates';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchUSAState'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totQTY1_ST').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_ST').setText('0');
                            Ext.getCmp(prototype.id + '-totQTYA_ST').setText('0');
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_ST').setText('0');

                            Ext.getCmp(prototype.id + '-totdiff1_ST').setText('0');
                            Ext.getCmp(prototype.id + '-totdiff2_ST').setText('0');
                            Ext.getCmp(prototype.id + '-totperc3_ST').setText('0');

                            Ext.getCmp(prototype.id + '-totperc1_ST').setText('0');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            if (data.IN_FLAG === 'Y') {
                                Ext.getCmp(prototype.id + '-headStateConc').setText('Statement');
                                Ext.getCmp(prototype.id + '-headStateAcc').setText('Paid');
                            } else {
                                Ext.getCmp(prototype.id + '-headStateConc').setText('Conciliation');
                                Ext.getCmp(prototype.id + '-headStateAcc').setText('Accepted');
                            }
                            Ext.getCmp(prototype.id + '-totperc1_ST').setText('100 %');

                            Ext.getCmp(prototype.id + '-totQTY1_ST').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUS1_ST').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-totQTYA_ST').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSA_ST').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));

                            Ext.getCmp(prototype.id + '-totdiff1_ST').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff2_ST').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totperc3_ST').setText(Ext.util.Format.number(data.totperc3, '0,000.00'));
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataStates').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchFareTax">
    searchFareTax: function () {
        win.lblUser_toolTip("Estructura: IMF077");
        me.panelActual = '-boxMainFareTax';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchFareTax'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-lblFT_QTY1').setText('');
                            Ext.getCmp(prototype.id + '-lblFT_SVFOPUS1').setText('');
                            Ext.getCmp(prototype.id + '-lblFT_Perc1').setText('');

                            Ext.getCmp(prototype.id + '-lblFT_FARE').setText('');
                            Ext.getCmp(prototype.id + '-lblFT_AYQ1').setText('');
                            Ext.getCmp(prototype.id + '-lblFT_AYR1').setText('');
                            Ext.getCmp(prototype.id + '-lblFT_TAX1').setText('');

                            Ext.getCmp(prototype.id + '-label%').setText('');
                            Ext.getCmp(prototype.id + '-100%FareTax').setText('');

                            Ext.getCmp(prototype.id + '-lblTotFARE').setText('');
                            Ext.getCmp(prototype.id + '-lblTotAYQ1').setText('');
                            Ext.getCmp(prototype.id + '-lblTotAYR1').setText('');
                            Ext.getCmp(prototype.id + '-lblTotTAX1').setText('');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-lblFT_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-lblFT_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                            Ext.getCmp(prototype.id + '-lblFT_Perc1').setText('100.00');

                            Ext.getCmp(prototype.id + '-lblFT_FARE').setText(Ext.util.Format.number(data.totFARE, '0,000'));
                            Ext.getCmp(prototype.id + '-lblFT_AYQ1').setText(Ext.util.Format.number(data.totAYQ1, '0,000'));
                            Ext.getCmp(prototype.id + '-lblFT_AYR1').setText(Ext.util.Format.number(data.totAYR1, '0,000'));
                            Ext.getCmp(prototype.id + '-lblFT_TAX1').setText(Ext.util.Format.number(data.totTAX1, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotFARE').setText(Ext.util.Format.number(data.perc2, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotAYQ1').setText(Ext.util.Format.number(data.perc4, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotAYR1').setText(Ext.util.Format.number(data.perc_10, '0,000.00') + '%');
                            Ext.getCmp(prototype.id + '-lblTotTAX1').setText(Ext.util.Format.number(data.perc3, '0,000.00') + '%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataFareTax').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchPOS">
    searchPOS: function () {
        win.lblUser_toolTip("Estructura: A3264");
        me.panelActual = '-boxMainDataPOS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchPOS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totPO_QTY1').setText('0');
                            Ext.getCmp(prototype.id + '-totPO_SVFOPUS1').setText('0.00');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-totPO_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPO_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPOS').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchPOSMonth">
    searchPOSMonth: function () {
        win.lblUser_toolTip("Estructura: A3264");
        me.panelActual = '-boxMainDataPEM';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchPOSMonth'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-totP_QTY1').setText('0');
                            Ext.getCmp(prototype.id + '-totP_SVFOPUS1').setText('0.00');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-totP_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totP_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPEM').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchPhasesStatus">
    searchPhasesStatus: function () {

        var type = Ext.getCmp(prototype.id + '-cmbType').getValue();
//        console.log(type);
        if (type === '11') {
            win.lblUser_toolTip("Estructura: A3271");
            me.panelActual = '-boxMainDataPhases';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            var msj = this.validateFields();
            if (msj !== '') {
                global.Msg({msg: msj
                });
            } else {
                var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                    proxy: {
                        url: prototype.url + '/searchPhasesStatus'
                    }, listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = searchParams;
                        },
                        load: function (obj) {
                            if (obj.data.length === 0) {
                                Ext.getCmp(prototype.id + '-totPP_QTY1').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS1').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_QTY2').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS2').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc1').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_QTYA').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSA').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc2').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_QTYSABO').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSABO').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc3').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc4').setText('0%');
                                global.Msg({
                                    msg: 'Data not found.'
                                });
                            } else {
                                var data = obj.data.items[0].data;
                                //                            console.log(data);

                                Ext.getCmp(prototype.id + '-totPP_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));

                                Ext.getCmp(prototype.id + '-totPP_QTY2').setText(Ext.util.Format.number(data.totQTY2, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS2').setText(Ext.util.Format.number(data.totSVFOPUS2, '0,000'));
                                if (data.totSVFOPUS2 > 0) {
                                    Ext.getCmp(prototype.id + '-totPP_Perc1').setText(Ext.util.Format.number((data.totSVFOPUS2 * 100) / data.totSVFOPUS1, '0,000.00'));
                                } else {
                                    Ext.getCmp(prototype.id + '-totPP_Perc1').setText(0);
                                }

                                Ext.getCmp(prototype.id + '-totPP_QTYA').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSA').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                                if (data.totSVFOPUSA > 0) {
                                    Ext.getCmp(prototype.id + '-totPP_Perc2').setText(Ext.util.Format.number((data.totSVFOPUSA * 100) / data.totSVFOPUS1, '0,000.00'));
                                } else {
                                    Ext.getCmp(prototype.id + '-totPP_Perc2').setText(0);
                                }


                                Ext.getCmp(prototype.id + '-totPP_QTYSABO').setText(Ext.util.Format.number(data.totQTYSABO, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSABO').setText(Ext.util.Format.number(data.totSVFOPUSABO, '0,000'));
                                if (data.totSVFOPUSABO > 0) {
                                    Ext.getCmp(prototype.id + '-totPP_Perc3').setText(Ext.util.Format.number((data.totSVFOPUSABO * 100) / data.totSVFOPUS1, '0,000.00'));
                                } else {
                                    Ext.getCmp(prototype.id + '-totPP_Perc3').setText(0);
                                }
                                Ext.getCmp(prototype.id + '-totPP_Perc4').setText('100%');

                                // ---------------------------------------------------------------------------------

                                var lstDataGrafic = obj.data.items;
                                var lstNew = [];

                                var tot = 0;
                                for (var i = 0; i < lstDataGrafic.length; i++) {
                                    if (i <= 1) {
                                        var item = {};
                                        item.perc4 = lstDataGrafic[i].data.perc4;
                                        item.strDescription = lstDataGrafic[i].data.strDescription + ' , ' + Ext.util.Format.number(item.perc4, '0,000.00') + '%';
                                        lstNew.push(item);
                                    } else {
                                        tot = tot + lstDataGrafic[i].data.perc4;
                                    }
                                }

                                var item2 = {};
                                item2.perc4 = tot;
                                item2.strDescription = 'Others, ' + Ext.util.Format.number(item2.perc4, '0,000.00') + '%';
                                lstNew.push(item2);

                                var storeGridDatasGrafic = Ext.create('Ext.data.Store', {
                                    data: lstNew,
                                    autoLoad: true
                                });
                                Ext.getCmp(prototype.id + '-displayChart08_Country').bindStore(storeGridDatasGrafic);

                            }
                            //                        me.setWidthPie();
                        }
                    }
                });

                global.clear();
                Ext.getCmp(prototype.id + '-gridDataPhasesStatus').bindStore(storeGridDatas);
//                Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            }
        } else if (type === '12') {
            win.lblUser_toolTip("Estructura: A3271");
            me.panelActual = '-boxMainDataPhases1';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            var msj = this.validateFields();
            if (msj !== '') {
                global.Msg({msg: msj
                });
            } else {
                var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                    proxy: {
                        url: prototype.url + '/searchPhasesStatus'
                    }, listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = searchParams;
                        },
                        load: function (obj) {
                            if (obj.data.length === 0) {
                                Ext.getCmp(prototype.id + '-totPP_QTY11').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS11').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_QTY21').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS21').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc11').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_QTYA1').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSA1').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc21').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_QTYSABO1').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSABO1').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc31').setText('0');
                                Ext.getCmp(prototype.id + '-totPP_Perc41').setText('0%');
                                global.Msg({
                                    msg: 'Data not found.'
                                });
                            } else {
                                var lstNew = [];
                                var data = obj.data.items[0].data;
                                //                            console.log(data);

                                Ext.getCmp(prototype.id + '-totPP_QTY11').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS11').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));

                                Ext.getCmp(prototype.id + '-totdiff11').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                                Ext.getCmp(prototype.id + '-totdiff21').setText(Ext.util.Format.number(data.totdiff2, '0,000'));

                                Ext.getCmp(prototype.id + '-totdiff31').setText(Ext.util.Format.number(data.totdiff3, '0,000'));
                                Ext.getCmp(prototype.id + '-totDiffConci1').setText(Ext.util.Format.number(data.TotDiffConci1, '0,000'));
                                Ext.getCmp(prototype.id + '-totDiffConci2').setText(Ext.util.Format.number(data.TotDiffConci2, '0,000'));

                                Ext.getCmp(prototype.id + '-totDiffConci3').setText(Ext.util.Format.number(data.TotDiffConci3, '0,000'));

                                Ext.getCmp(prototype.id + '-totPP_QTY21').setText(Ext.util.Format.number(data.totQTY2, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUS21').setText(Ext.util.Format.number(data.totSVFOPUS2, '0,000'));
                                if (data.totSVFOPUS2 > 0) {
                                    Ext.getCmp(prototype.id + '-totPP_Perc11').setText(Ext.util.Format.number((data.totSVFOPUS2 * 100) / data.totSVFOPUS1, '0,000.00'));
                                } else {
                                    Ext.getCmp(prototype.id + '-totPP_Perc11').setText(0);
                                }

                                Ext.getCmp(prototype.id + '-totPP_QTYA1').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSA1').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                                if (data.totSVFOPUSA > 0) {
                                    Ext.getCmp(prototype.id + '-totPP_Perc21').setText(Ext.util.Format.number((data.totSVFOPUSA * 100) / data.totSVFOPUS1, '0,000.00'));
                                } else {
                                    Ext.getCmp(prototype.id + '-totPP_Perc21').setText(0);
                                }


                                Ext.getCmp(prototype.id + '-totPP_QTYSABO1').setText(Ext.util.Format.number(data.totQTYSABO, '0,000'));
                                Ext.getCmp(prototype.id + '-totPP_SVFOPUSABO1').setText(Ext.util.Format.number(data.totSVFOPUSABO, '0,000'));
                                if (data.totSVFOPUSABO > 0) {
                                    Ext.getCmp(prototype.id + '-totPP_Perc31').setText(Ext.util.Format.number((data.totSVFOPUSABO * 100) / data.totSVFOPUS1, '0,000.00'));
                                } else {
                                    Ext.getCmp(prototype.id + '-totPP_Perc31').setText(0);
                                }

                                Ext.getCmp(prototype.id + '-totPP_Perc41').setText('100%');

                                // ------------------------------ GRAFICO ---------------------------------


                                var data = obj.data.items[0].data;
                                var list = obj.data;
                                console.log(list);

                                
                                if(list.length >= 6){
                                    for (var i = 0; i < 6; i++) {
                                        var item = {};
                                        item.perc4 = list.items[i].data.perc4;
                                        item.strDescription = list.items[i].data.strDescription + ' , ' + Ext.util.Format.number(item.perc4, '0,000.00') + '%';
                                        lstNew.push(item);

                                    }
                                }else{
                                    var item = {};
                                    item.perc4 = list.items[0].data.perc4;
                                    item.strDescription = list.items[0].data.strDescription + ' , ' + Ext.util.Format.number(item.perc4, '0,000.00') + '%';
                                    lstNew.push(item);
                                }

                                var storeDataNew = Ext.create('Ext.data.Store', {
                                    data: lstNew,
                                    autoLoad: true
                                });
                                Ext.getCmp(prototype.id + '-displayPayChart01').bindStore(storeDataNew);

                            }
                            //                        me.setWidthPie();
                        }
                    }
                });

                global.clear();
                Ext.getCmp(prototype.id + '-gridDataPhasesStatus1').bindStore(storeGridDatas);
//                Ext.getCmp(prototype.id + '-displayPayChart01').bindStore(storeGridDatas);
            }
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchClarificationTOT">
    searchClarificationTOT: function () {
        win.lblUser_toolTip("Estructura: A2342/A2343");

        var IN_SELECT = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rbgFlag;
        console.log(IN_SELECT);
        if (IN_SELECT === 'MONTH' || IN_SELECT === undefined) {

            me.panelActual = '-boxMainDataCLAtot';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
            var tit_IN_DATE = '';
            if (IN_DATE === 'SALEDATE') {
                tit_IN_DATE = 'Sales';
            } else {
                tit_IN_DATE = 'Reception';
            }

            var msj = this.validateFields();
            if (msj !== '') {
                global.Msg({msg: msj
                });
            } else {
                var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                    proxy: {
                        url: prototype.url + '/searchClarificationTOT'
                    }, listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = searchParamsClari;
                        },
                        load: function (obj) {
                            if (obj.data.length === 0) {
                                global.Msg({
                                    msg: 'Data not found.'
                                });
                            } else {
                                console.log(obj.data);
                                var lstTemp = [];
                                var data = obj.data.items[0].data;
//                                console.log(data);

                                Ext.getCmp(prototype.id + '-adgTitFechatot').setText(tit_IN_DATE);

                                Ext.getCmp(prototype.id + '-lblTotQTYCLARtot').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARStot').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARPtot').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCLARtot').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCHGBKtot').setText(Ext.util.Format.number(data.totQTYCHGBK, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCHGBUtot').setText(Ext.util.Format.number(data.totAMTCHGBU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARRtot').setText(Ext.util.Format.number(data.totQTYCLARR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTREVCUtot').setText(Ext.util.Format.number(data.totAMTREVCU, '0,000'));
                                Ext.getCmp(prototype.id + '-lngTotQTYBANKtot').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
                                Ext.getCmp(prototype.id + '-dblTotAMTBANKtot').setText(Ext.util.Format.number(data.dblTotAMTBANK, '0,000'));

                                Ext.getCmp(prototype.id + '-lblTotperAns').setText(Ext.util.Format.number(data.TotperAnsw, '0,000') + '%');
                                Ext.getCmp(prototype.id + '-lblTotperNoAns').setText(Ext.util.Format.number(data.TotperNoAnsw, '0,000') + '%');
                                Ext.getCmp(prototype.id + '-lblTotper').setText(Ext.util.Format.number(data.totper, '0,000') + '%');

                                console.log(data);

                                var sum = data.dblTotAMTCLARU - data.dblTotAMTBANK;
                                var item = {};

                                item.LABEL = 'Total Received - ' + Ext.util.Format.number(sum, '0,000.00');
                                item.AMOUNT_ON_PERCENT = sum;
                                lstTemp.push(item);

                                item = {};
                                item.LABEL = 'Total ChargedBack - ' + Ext.util.Format.number(data.dblTotAMTBANK, '0,000.00');
                                item.AMOUNT_ON_PERCENT = data.dblTotAMTBANK;
                                lstTemp.push(item);


                                var storeData1er = Ext.create('Ext.data.Store', {
                                    data: lstTemp,
                                    autoLoad: true
                                });
                                Ext.getCmp(prototype.id + '-displayChart_ByClarification02').bindStore(storeData1er);


                            }
                        }
                    }
                });

                global.clear();
                Ext.getCmp(prototype.id + '-gridDataCLAtot').bindStore(storeGridDatas);
                Ext.getCmp(prototype.id + '-displayChart_ByClarification01').bindStore(storeGridDatas);
            }
        } else {
            me.panelActual = '-boxGroupDataCLAtot';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            var titIN_SELECT = '';
            if (IN_SELECT === 'CODEBANK') {
                titIN_SELECT = 'Bank';
            } else {
                titIN_SELECT = 'Credit Card';
            }

            var msj = this.validateFields();
            if (msj !== '') {
                global.Msg({msg: msj
                });
            } else {
                var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                    proxy: {
                        url: prototype.url + '/searchClarificationTOT'
                    }, listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = searchParamsClari;
                        },
                        load: function (obj) {
                            if (obj.data.length === 0) {
                                Ext.getCmp(prototype.id + '-lblTotQTYCLAR_Gt').setText('0');
                                Ext.getCmp(prototype.id + '-lblTotAMTCLAR_Gt').setText('0');
                                Ext.getCmp(prototype.id + '-lblTotQTYCHGBK_Gt').setText('0');
                                Ext.getCmp(prototype.id + '-lblTotAMTCHGBU_Gt').setText('0');
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARR_Gt').setText('0');
                                Ext.getCmp(prototype.id + '-lblTotAMTREVCU_Gt').setText('0');
                                Ext.getCmp(prototype.id + '-lngTotQTYBANK_Gt').setText('0');
                                Ext.getCmp(prototype.id + '-dblTotAMTBANK_Gt').setText('0');
                                global.Msg({
                                    msg: 'Data not found.'
                                });
                            } else {
                                var data = obj.data.items[0].data;
                                //                            console.log(data);

                                Ext.getCmp(prototype.id + '-adgTitGrouptot').setText(titIN_SELECT);

                                Ext.getCmp(prototype.id + '-lblTotQTYCLARS_Gt').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLAR_Gt').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCLAR_Gt').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARP_Gt').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCHGBK_Gt').setText(Ext.util.Format.number(data.totQTYCHGBK, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCHGBU_Gt').setText(Ext.util.Format.number(data.totAMTCHGBU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARR_Gt').setText(Ext.util.Format.number(data.totQTYCLARR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTREVCU_Gt').setText(Ext.util.Format.number(data.totAMTREVCU, '0,000'));
                                Ext.getCmp(prototype.id + '-lngTotQTYBANK_Gt').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
                                Ext.getCmp(prototype.id + '-dblTotAMTBANK_Gt').setText(Ext.util.Format.number(data.dblTotAMTBANK, '0,000'));

                                Ext.getCmp(prototype.id + '-lblTotperAnsGt').setText(Ext.util.Format.number(data.TotperAnsw, '0,000') + '%');
                                Ext.getCmp(prototype.id + '-lblTotperNoAnsGt').setText(Ext.util.Format.number(data.TotperNoAnsw, '0,000') + '%');
                                Ext.getCmp(prototype.id + '-lblTotper').setText(Ext.util.Format.number(data.totper, '0,000') + '%');
                            }
                            //                        me.setWidthPie();
                        }
                    }
                });

                global.clear();
                Ext.getCmp(prototype.id + '-gridGroupCLAtot').bindStore(storeGridDatas);
                //            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            }

        }


    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="searchClarification">
    searchClarification: function () {
        win.lblUser_toolTip("Estructura: A2342/A2343");

        var IN_SELECT = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rbgFlag;
        if (IN_SELECT === 'MONTH') {

            me.panelActual = '-boxMainDataCLA';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
            var tit_IN_DATE = '';
            if (IN_DATE === 'SALEDATE') {
                tit_IN_DATE = 'Sales';
            } else {
                tit_IN_DATE = 'Reception';
            }

            var msj = this.validateFields();
            if (msj !== '') {
                global.Msg({msg: msj
                });
            } else {
                var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                    proxy: {
                        url: prototype.url + '/searchClarification'
                    }, listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = searchParamsClariTot;
                        },
                        load: function (obj) {
                            if (obj.data.length === 0) {
                                global.Msg({
                                    msg: 'Data not found.'
                                });
                            } else {
                                var data = obj.data.items[0].data;
                                //                            console.log(data);

                                Ext.getCmp(prototype.id + '-adgTitFecha').setText(tit_IN_DATE);

//                                Ext.getCmp(prototype.id + '-lblTotQTYCLARtot').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARS').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARP').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQNMATCH').setText(Ext.util.Format.number(data.lngTotQNMATCH, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLAR').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCLAR').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));

                                Ext.getCmp(prototype.id + '-lblTotQTYCHGBK').setText(Ext.util.Format.number(data.totQTYCHGBK, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCHGBU').setText(Ext.util.Format.number(data.totAMTCHGBU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARR').setText(Ext.util.Format.number(data.totQTYCLARR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTREVCU').setText(Ext.util.Format.number(data.totAMTREVCU, '0,000'));
                                Ext.getCmp(prototype.id + '-lngTotQTYBANK').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
                                Ext.getCmp(prototype.id + '-dblTotAMTBANK').setText(Ext.util.Format.number(data.dblTotAMTBANK, '0,000'));
                            }
                            //                        me.setWidthPie();
                        }
                    }
                });

                global.clear();
                Ext.getCmp(prototype.id + '-gridDataCLA').bindStore(storeGridDatas);
                //            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            }
        } else {
            me.panelActual = '-boxGroupDataCLA';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            var titIN_SELECT = '';
            if (IN_SELECT === 'CODEBANK') {
                titIN_SELECT = 'Bank';
            } else {
                titIN_SELECT = 'Credit Card';
            }

            var msj = this.validateFields();
            if (msj !== '') {
                global.Msg({msg: msj
                });
            } else {
                var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                    proxy: {
                        url: prototype.url + '/searchClarification'
                    }, listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = searchParamsClari;
                        },
                        load: function (obj) {
                            if (obj.data.length === 0) {
//                                Ext.getCmp(prototype.id + '-lblTotQTYCLAR_Gt').setText('0');
//                                Ext.getCmp(prototype.id + '-lblTotAMTCLAR_Gt').setText('0');
//                                Ext.getCmp(prototype.id + '-lblTotQTYCHGBK_Gt').setText('0');
//                                Ext.getCmp(prototype.id + '-lblTotAMTCHGBU_Gt').setText('0');
//                                Ext.getCmp(prototype.id + '-lblTotQTYCLARR_Gt').setText('0');
//                                Ext.getCmp(prototype.id + '-lblTotAMTREVCU_Gt').setText('0');
//                                Ext.getCmp(prototype.id + '-lngTotQTYBANK_Gt').setText('0');
//                                Ext.getCmp(prototype.id + '-dblTotAMTBANK_Gt').setText('0');
                                global.Msg({
                                    msg: 'Data not found.'
                                });
                            } else {
                                var data = obj.data.items[0].data;
                                //                            console.log(data);

                                Ext.getCmp(prototype.id + '-adgTitGroup').setText(titIN_SELECT);

                                Ext.getCmp(prototype.id + '-lblTotQTYCLARS_G').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARP_G').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQNMATCH_G').setText(Ext.util.Format.number(data.lngTotQNMATCH, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLAR_G').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCLAR_G').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));

                                Ext.getCmp(prototype.id + '-lblTotQTYCHGBK_G').setText(Ext.util.Format.number(data.totQTYCHGBK, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCHGBU_G').setText(Ext.util.Format.number(data.totAMTCHGBU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARR_G').setText(Ext.util.Format.number(data.totQTYCLARR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTREVCU_G').setText(Ext.util.Format.number(data.totAMTREVCU, '0,000'));
                                Ext.getCmp(prototype.id + '-lngTotQTYBANK_G').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
                                Ext.getCmp(prototype.id + '-dblTotAMTBANK_G').setText(Ext.util.Format.number(data.dblTotAMTBANK, '0,000'));
                            }
                            //                        me.setWidthPie();
                        }
                    }
                });

                global.clear();
                Ext.getCmp(prototype.id + '-gridGroupDataCLA').bindStore(storeGridDatas);
                //            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            }

        }


    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="OnGridDetBank">
    OnGridDetBank: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDetPEMBank';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.SetOnGridDetBank();
    },
    SetOnGridDetBank: function () {
        win.lblUser_toolTip("Estructura: A3264");
//        me.setWidthPie();
//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetPEMBank'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                              me.dataGrid = obj.data;
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            Ext.getCmp(prototype.id + '-gridDataPEMBank').setTitle('<center style="font-size:12px;">Operation Date : ' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-totPB_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPB_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPEMBank').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="OnGridDetAgent">
    OnGridDetAgent: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDetPEMAgent';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.SetOnGridDetAgent();
    },
    SetOnGridDetAgent: function () {
        win.lblUser_toolTip("Estructura: A3264");
//        me.setWidthPie();
//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetPEMAgent'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {

                            Ext.getCmp(prototype.id + '-totPA_QTY1').setText('0');
                            Ext.getCmp(prototype.id + '-totPA_SVFOPUS1').setText('0.00');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                              me.dataGrid = obj.data;
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            Ext.getCmp(prototype.id + '-gridDataPEMAgent').setTitle('<center style="font-size:12px;">Operation Date : ' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-totPA_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPA_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPEMAgent').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="OnGridDetPhasesBank">
    OnGridDetPhasesBank: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var typ = Ext.getCmp(prototype.id + '-cmbType').getValue();
        console.log(typ);
        if (typ === '11') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxMainDetPhasesBank';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.paramsDetail.beanString = JSON.stringify(rowData.data);
            this.SetOnGridDetPhasesBank();
        } else if (typ === '12') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxMainDetPhasesBank1';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.paramsDetail.beanString = JSON.stringify(rowData.data);
            this.SetOnGridDetPhasesBank1();
        }
//        
    },
    SetOnGridDetPhasesBank: function () {
        win.lblUser_toolTip("Estructura: A3271");
//        me.setWidthPie();
//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetPhasesBank'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-gridDataPhasesBank').setTitle('');

                            Ext.getCmp(prototype.id + '-totPPB_QTY1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_QTY2').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS2').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_QTYA').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSA').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc2').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_QTYSABO').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSABO').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc3').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc4').setText('0%');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            //                            console.log(data);

                            Ext.getCmp(prototype.id + '-gridDataPhasesBank').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

                            Ext.getCmp(prototype.id + '-totPPB_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));

                            Ext.getCmp(prototype.id + '-totPPB_QTY2').setText(Ext.util.Format.number(data.totQTY2, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS2').setText(Ext.util.Format.number(data.totSVFOPUS2, '0,000'));
                            if (data.totSVFOPUS2 > 0) {
                                Ext.getCmp(prototype.id + '-totPPB_Perc1').setText(Ext.util.Format.number((data.totSVFOPUS2 * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPB_Perc1').setText(0);
                            }

                            Ext.getCmp(prototype.id + '-totPPB_QTYA').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSA').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                            if (data.totSVFOPUSA > 0) {
                                Ext.getCmp(prototype.id + '-totPPB_Perc2').setText(Ext.util.Format.number((data.totSVFOPUSA * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPB_Perc2').setText(0);
                            }


                            Ext.getCmp(prototype.id + '-totPPB_QTYSABO').setText(Ext.util.Format.number(data.totQTYSABO, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSABO').setText(Ext.util.Format.number(data.totSVFOPUSABO, '0,000'));
                            if (data.totSVFOPUSABO > 0) {
                                Ext.getCmp(prototype.id + '-totPPB_Perc3').setText(Ext.util.Format.number((data.totSVFOPUSABO * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPB_Perc3').setText(0);
                            }

                            Ext.getCmp(prototype.id + '-totPPB_Perc4').setText('100%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPhasesBank').bindStore(storeGridDatas);
        }
    },
    SetOnGridDetPhasesBank1: function () {
        win.lblUser_toolTip("Estructura: A3271");
//        me.setWidthPie();
//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetPhasesBank'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-gridDataPhasesBank1').setTitle('');

                            Ext.getCmp(prototype.id + '-totPPB_QTY11').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS11').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_QTY21').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS21').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc11').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_QTYA1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSA1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc21').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_QTYSABO1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSABO1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc31').setText('0');
                            Ext.getCmp(prototype.id + '-totPPB_Perc41').setText('0%');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            //                            console.log(data);

                            Ext.getCmp(prototype.id + '-gridDataPhasesBank1').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

                            Ext.getCmp(prototype.id + '-totPPB_QTY11').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS11').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));

                            Ext.getCmp(prototype.id + '-totdiff111').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff211').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff311').setText(Ext.util.Format.number(data.totdiff3, '0,000'));
                            Ext.getCmp(prototype.id + '-totDiffConci11').setText(Ext.util.Format.number(data.TotDiffConci1, '0,000'));
                            Ext.getCmp(prototype.id + '-totDiffConci21').setText(Ext.util.Format.number(data.TotDiffConci2, '0,000'));
                            Ext.getCmp(prototype.id + '-totDiffConci31').setText(Ext.util.Format.number(data.TotDiffConci3, '0,000'));

                            Ext.getCmp(prototype.id + '-totPPB_QTY21').setText(Ext.util.Format.number(data.totQTY2, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUS21').setText(Ext.util.Format.number(data.totSVFOPUS2, '0,000'));
                            if (data.totSVFOPUS2 > 0) {
                                Ext.getCmp(prototype.id + '-totPPB_Perc11').setText(Ext.util.Format.number((data.totSVFOPUS2 * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPB_Perc11').setText(0);
                            }


                            Ext.getCmp(prototype.id + '-totPPB_QTYA1').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSA1').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                            if (data.totSVFOPUSA > 0) {
                                Ext.getCmp(prototype.id + '-totPPB_Perc21').setText(Ext.util.Format.number((data.totSVFOPUSA * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPB_Perc21').setText(0);
                            }


                            Ext.getCmp(prototype.id + '-totPPB_QTYSABO1').setText(Ext.util.Format.number(data.totQTYSABO, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPB_SVFOPUSABO1').setText(Ext.util.Format.number(data.totSVFOPUSABO, '0,000'));
                            if (data.totSVFOPUSABO > 0) {
                                Ext.getCmp(prototype.id + '-totPPB_Perc31').setText(Ext.util.Format.number((data.totSVFOPUSABO * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPB_Perc31').setText(0);
                            }

                            Ext.getCmp(prototype.id + '-totPPB_Perc41').setText('100%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPhasesBank1').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="OnGridDetPhasesCard">
    OnGridDetPhasesCard: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var typ = Ext.getCmp(prototype.id + '-cmbType').getValue();
//        console.log(typ);
        if (typ === '11') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxMainDetPhasesCard';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.paramsDetail.beanString = JSON.stringify(rowData.data);
            this.SetOnGridDetPhasesCard();
        } else if (typ === '12') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxMainDetPhasesCard1';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.paramsDetail.beanString = JSON.stringify(rowData.data);
            this.SetOnGridDetPhasesCard1();
        }
//        
    },
    SetOnGridDetPhasesCard: function () {
        win.lblUser_toolTip("Estructura: A3271");
//        me.setWidthPie();
//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetPhasesCard'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-gridDataPhasesCard').setTitle('');

                            Ext.getCmp(prototype.id + '-totPPC_QTY1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_QTY2').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS2').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_QTYA').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSA').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc2').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_QTYSABO').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSABO').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc3').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc4').setText('0%');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            //                            console.log(data);

                            Ext.getCmp(prototype.id + '-gridDataPhasesCard').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

                            Ext.getCmp(prototype.id + '-totPPC_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));

                            Ext.getCmp(prototype.id + '-totPPC_QTY2').setText(Ext.util.Format.number(data.totQTY2, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS2').setText(Ext.util.Format.number(data.totSVFOPUS2, '0,000'));
                            if (data.totSVFOPUS2 > 0) {
                                Ext.getCmp(prototype.id + '-totPPC_Perc1').setText(Ext.util.Format.number((data.totSVFOPUS2 * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPC_Perc1').setText(0);
                            }

                            Ext.getCmp(prototype.id + '-totPPC_QTYA').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSA').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                            if (data.totSVFOPUSA > 0) {
                                Ext.getCmp(prototype.id + '-totPPC_Perc2').setText(Ext.util.Format.number((data.totSVFOPUSA * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPC_Perc2').setText(0);
                            }


                            Ext.getCmp(prototype.id + '-totPPC_QTYSABO').setText(Ext.util.Format.number(data.totQTYSABO, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSABO').setText(Ext.util.Format.number(data.totSVFOPUSABO, '0,000'));
                            if (data.totSVFOPUSABO > 0) {
                                Ext.getCmp(prototype.id + '-totPPC_Perc3').setText(Ext.util.Format.number((data.totSVFOPUSABO * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPC_Perc3').setText(0);
                            }

                            Ext.getCmp(prototype.id + '-totPPC_Perc4').setText('100%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPhasesCard').bindStore(storeGridDatas);
        }
    },
    SetOnGridDetPhasesCard1: function () {
        win.lblUser_toolTip("Estructura: A3271");
//        me.setWidthPie();
//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetPhasesCard'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-gridDataPhasesCard1').setTitle('');

                            Ext.getCmp(prototype.id + '-totPPC_QTY11').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS11').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_QTY21').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS21').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc11').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_QTYA1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSA1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc21').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_QTYSABO1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSABO1').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc31').setText('0');
                            Ext.getCmp(prototype.id + '-totPPC_Perc41').setText('0%');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            //                            console.log(data);

                            Ext.getCmp(prototype.id + '-gridDataPhasesCard1').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

                            Ext.getCmp(prototype.id + '-totPPC_QTY11').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS11').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));

                            Ext.getCmp(prototype.id + '-totdiff1111').setText(Ext.util.Format.number(data.totdiff1, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff2111').setText(Ext.util.Format.number(data.totdiff2, '0,000'));
                            Ext.getCmp(prototype.id + '-totdiff3111').setText(Ext.util.Format.number(data.totdiff3, '0,000'));
                            Ext.getCmp(prototype.id + '-totDiffConci111').setText(Ext.util.Format.number(data.TotDiffConci1, '0,000'));
                            Ext.getCmp(prototype.id + '-totDiffConci211').setText(Ext.util.Format.number(data.TotDiffConci2, '0,000'));
                            Ext.getCmp(prototype.id + '-totDiffConci311').setText(Ext.util.Format.number(data.TotDiffConci3, '0,000'));

                            Ext.getCmp(prototype.id + '-totPPC_QTY21').setText(Ext.util.Format.number(data.totQTY2, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUS21').setText(Ext.util.Format.number(data.totSVFOPUS2, '0,000'));
                            if (data.totSVFOPUS2 > 0) {
                                Ext.getCmp(prototype.id + '-totPPC_Perc11').setText(Ext.util.Format.number((data.totSVFOPUS2 * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPC_Perc11').setText(0);
                            }

                            Ext.getCmp(prototype.id + '-totPPC_QTYA1').setText(Ext.util.Format.number(data.totQTYA, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSA1').setText(Ext.util.Format.number(data.totSVFOPUSA, '0,000'));
                            if (data.totSVFOPUSA > 0) {
                                Ext.getCmp(prototype.id + '-totPPC_Perc21').setText(Ext.util.Format.number((data.totSVFOPUSA * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPC_Perc21').setText(0);
                            }


                            Ext.getCmp(prototype.id + '-totPPC_QTYSABO1').setText(Ext.util.Format.number(data.totQTYSABO, '0,000'));
                            Ext.getCmp(prototype.id + '-totPPC_SVFOPUSABO1').setText(Ext.util.Format.number(data.totSVFOPUSABO, '0,000'));
                            if (data.totSVFOPUSABO > 0) {
                                Ext.getCmp(prototype.id + '-totPPC_Perc31').setText(Ext.util.Format.number((data.totSVFOPUSABO * 100) / data.totSVFOPUS1, '0,000.00'));
                            } else {
                                Ext.getCmp(prototype.id + '-totPPC_Perc31').setText(0);
                            }

                            Ext.getCmp(prototype.id + '-totPPC_Perc41').setText('100%');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPhasesCard1').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="viewDetBank">
    viewDetBank: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetailBank';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.searchDetClarifBank();
    },
    searchDetClarifBank: function () {
        win.lblUser_toolTip("Estructura: A2342");
//        me.setWidthPie();
//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetClarifBank'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLARS').setText('0');
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLARP').setText('0');
                            Ext.getCmp(prototype.id + '-lblTotDB_QNMATCH').setText('0');
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLAR').setText('0');
                            Ext.getCmp(prototype.id + '-lblTotDB_AMTCLAR').setText('0');

                            Ext.getCmp(prototype.id + '-lblTotQTYCHGBK_DB').setText('0');
                            Ext.getCmp(prototype.id + '-lblTotAMTCHGBU_DB').setText('0');
                            Ext.getCmp(prototype.id + '-lblTotQTYCLARR_DB').setText('0');
                            Ext.getCmp(prototype.id + '-lblTotAMTREVCU_DB').setText('0');
                            Ext.getCmp(prototype.id + '-lngTotQTYBANK_DB').setText('0');
                            Ext.getCmp(prototype.id + '-dblTotAMTBANK_DB').setText('0');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                              me.dataGrid = obj.data;
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                            if (IN_DATE === 'SALEDATE') {
                                Ext.getCmp(prototype.id + '-gridDetBank').setTitle('<center style="font-size:12px;">Sales Date : ' + data.strFormatDate + '</center>');
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetBank').setTitle('<center style="font-size:12px;">Reception Date: ' + data.strFormatDate + '</center>');
                            }

                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLARS').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLARP').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QNMATCH').setText(Ext.util.Format.number(data.lngTotQNMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLAR').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_AMTCLAR').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotQTYCHGBK_DB').setText(Ext.util.Format.number(data.totQTYCHGBK, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotAMTCHGBU_DB').setText(Ext.util.Format.number(data.totAMTCHGBU, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQTYCLARR_DB').setText(Ext.util.Format.number(data.totQTYCLARR, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotAMTREVCU_DB').setText(Ext.util.Format.number(data.totAMTREVCU, '0,000'));
                            Ext.getCmp(prototype.id + '-lngTotQTYBANK_DB').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
                            Ext.getCmp(prototype.id + '-dblTotAMTBANK_DB').setText(Ext.util.Format.number(data.dblTotAMTBANK, '0,000'));
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetBank').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>


    // <editor-fold defaultstate="collapsed" desc="searchNewAmex">
    searchNewAmex: function () {
        win.lblUser_toolTip("Estructura: IMF145");
        me.panelActual = '-boxNewAmex';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchNewAmex'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParamsNewAmex;
                },
                load: function (obj) {
                    console.log(obj.data);
                    console.log(obj.data.items[0].data);
                    if (obj.data.length === 0) {
//                        Ext.getCmp(prototype.id + '-lblFT_QTY1').setText('');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        var data = obj.data.items[0].data;
////                            console.log(data);
//                        Ext.getCmp(prototype.id + '-lblFT_QTY1').setText(Ext.util.Format.number(data.totQTY1, '0,000'));
//                        Ext.getCmp(prototype.id + '-lblFT_SVFOPUS1').setText(Ext.util.Format.number(data.totSVFOPUS1, '0,000'));
//                        Ext.getCmp(prototype.id + '-lblFT_Perc1').setText('100.00');
//                        Ext.getCmp(prototype.id + '-lblTotTAX1').setText(Ext.util.Format.number(data.perc3, '0,000.00') + '%');
                    }
//                        me.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridNewAmex').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-grafNewCC').bindStore(storeGridDatas);
    },
    // </editor-fold>    
    OnviewNewAmexDetCountry: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxNewAmexByCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.SetOnGridNewAmexDetCountry();
    },
    SetOnGridNewAmexDetCountry: function () {
        win.lblUser_toolTip("Estructura: IMF145");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchNewAmexByCountry'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            console.log(obj.data);
                            var data = obj.data.items[0].data;
                            console.log(data);

                            Ext.getCmp(prototype.id + '-gridNewAmexByCountry').setTitle('<center style="font-size:12px;">Sales Date : ' + data.IN_FECHA + '</center>');
                            
                            
                            // --------------------------------- GRAFICO -----------------------------
                            var lstDataGrafic = obj.data.items;
                            var lstNew = [];
                            var tot = 0;
                            
                            for (var i = 0; i < lstDataGrafic.length; i++) {
                                if (i <= 1) {
                                    var item = {};
                                    item.percSales = lstDataGrafic[i].data.percSales;
                                    item.SCOUNTRY = lstDataGrafic[i].data.SCOUNTRY + ' , ' + Ext.util.Format.number(item.percSales, '0,000.00') + '%';
                                    lstNew.push(item);
                                } else {
                                    tot = tot + lstDataGrafic[i].data.percSales;
                                }
                            }

                            var item2 = {};
                            item2.percSales = tot;
                            item2.SCOUNTRY = 'Others, ' + Ext.util.Format.number(item2.percSales, '0,000.00') + '%';
                            lstNew.push(item2);
                            
                            console.log(' ------------ NEW -------------');
                            console.log(lstNew);

                            var storeGridDatasGrafic = Ext.create('Ext.data.Store', {
                                data: lstNew,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-chart_NewCC_Country').bindStore(storeGridDatasGrafic);
                            
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridNewAmexByCountry').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridNewAmexByCountry').setStore(storeGridDatas);
        }
    },
    cmbTDOC_changeHandler: function () {
        this.btnSearch_click();
    },
    cmbTranType_changeHandler: function () {
        this.btnSearch_click();
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
//    onEditClick: function(grid, rowIndex, colIndex) {
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.program.ProPaymentsControlForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
//            me.setWidthPie();
//            this.getPaggin();
//            if (me.pagginActual !== '') {
//                var pag = Ext.getCmp(prototype.id + me.pagginActual);
//                var pagData = pag.getPageData();
//                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('01');
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

    },
    btnExcel_click: function (obj, e) {

//        this.setFormatParameter();
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
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {

        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
//                console.log(me.panelActual);
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-boxGroupData':
//                console.log(me.panelActual);
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + searchParams.beanString);
                break;
//            case  '-boxGroupData':
//                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
//                break;
            default:
//                console.log(me.panelActual);
//                global.Msg(
//                        {msg: 'Under Construction'
//                        });
        }

    },
    btnFilter_click: function (obj) {

        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
//        switch (me.panelActual) {
//            case  '-panelGridData':
//        console.log(prototype.id + '-pie');
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
//        console.log(ancho);
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-boxDetDay':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetCardNbr':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetMerchant':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetBankByS':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetDayByS':
                me.pagginActual = '-paggin6';
                break;
            case '-boxMainIata':
                me.pagginActual = '-paggin7';
                break;
//            case '-boxByMerchant':
//                me.pagginActual = '-paggin8';
//                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
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
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);