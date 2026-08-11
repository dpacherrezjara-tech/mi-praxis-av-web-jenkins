Ext.define('Ext.Praxis.controller.payments.CargoGuide.CargoGuideController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CargoGuideController',
    fecha: new Date(),
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsObtainData: {},
    init: function (view) {
        me = this;
        prototype.id = 'CargoGuideForm';
        prototype.url = CONTEXTPATH + '/CargoGuide';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetail';
        prototypeProgram.view = 'payments-cargo-guide';
        prototypeProgram.nprog = 'PX00001038';
        prototypeProgram.title = 'Cargo Guide';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
            '#CargoGuideForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CargoGuideForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CargoGuideForm-btnClear': {
                click: this.btnClear_click
            },
            '#CargoGuideForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CargoGuideForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CargoGuideForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CargoGuideForm-btnGenerarCartera': {
                click: this.btnGenerarCartera_click
            },
            '#CargoGuideForm-btnRunProcess': {
                click: this.btnRunProcess_click
            },
            '#CargoGuideForm-btnLinkMPF291': {
                click: this.btnLinkMPF291_click
            },
            '#CargoGuideForm-btnBack': {
                click: this.btnBack_click
            },
            '#CargoGuideForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CargoGuideForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CargoGuideForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CargoGuideForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#CargoGuideForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#CargoGuideForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#CargoGuideForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#CargoGuideForm-cmbDateFromYearARC': {
                select: this.selectComboFromYearARC
            },
            '#CargoGuideForm-cmbDateFromMonthARC': {
                select: this.selectComboFromMonthARC
            },
            '#CargoGuideForm-cmbDateFromDayARC': {
                select: this.selectComboFromDayARC
            },
        });
        // </editor-fold>
    },
    xpanel_afterrender: function () {
        me.obtainData();
        me.btnSearch_click();
    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        // Año actual (ya está bien como número)
        var yearActual = fechaActual.getFullYear();

        // Mes actual CONVERTIDO a string de 2 dígitos
        var monthActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

        // Bind stores
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        // Asignar valores (año como número, mes como string de 2 dígitos)
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        // Lo mismo para combos ARC
        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').setValue("");

        // Combos Dashboard
        Ext.getCmp(prototype.id + '-cmbDateFromYearDashboard').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearDashboard').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthDashboard').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthDashboard').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayDashboard').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayDashboard').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearDashboard').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearDashboard').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthDashboard').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonthDashboard').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromDayDashboard').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayDashboard').setValue("");

        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CURRENCY = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {

                var res = Ext.JSON.decode(response.responseText);
                me.lstCountry = res.lstCountry;
                me.lstCurrencies = res.lstCurrencies;

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstCurrencies,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCurrencies').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbCurrencies').setValue('');

                // Country y Currency para Dashboard (reusan los mismos datos)
                var storeCountryDash = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountryDashboard').bindStore(storeCountryDash);
                Ext.getCmp(prototype.id + '-cmbCountryDashboard').setValue('');

                var storeCurrencyDash = Ext.create('Ext.data.Store', {
                    data: me.lstCurrencies,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCurrencyDashboard').bindStore(storeCurrencyDash);
                Ext.getCmp(prototype.id + '-cmbCurrencyDashboard').setValue('');

                global.clear();
            }
        });

    },
    btnSearch_click: function (obj, e) {
        let fs = Ext.getCmp(prototype.id + '-titleFieldsetBSP');
        let selectedBy = Ext.getCmp(prototype.id + '-cmbInputDate').getValue();

        if (selectedBy === 'S') {
            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">ADATE</span>');
        } else if (selectedBy === 'U') {
            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">PAYDAY</span>');
        }

        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];

        if (selected === 0) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(true);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            Ext.getCmp(prototype.id + '-panelMPF291').setVisible(false);
            Ext.getCmp(prototype.id + '-panelDashboard').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridDataDashboard').setVisible(false);
            this.setFormatParameter();
            this.setGridData();
        } else if (selected === 3) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            Ext.getCmp(prototype.id + '-panelMPF291').setVisible(false);
            Ext.getCmp(prototype.id + '-panelDashboard').setVisible(true);

            var toggleEl = document.getElementById('toggleDashboard');
            var isDetail = toggleEl && toggleEl.checked;
            var typeDoc  = Ext.getCmp(prototype.id + '-cmbTypeDocDashboard').getValue();

            if (isDetail && typeDoc === 'S') {
                me.drillDown.push('-panelGridDataDashboard');
                this.setFormatParameterSettDetailFromDashboard();
                this.setGridDataSettDetail();
            } else if (isDetail && typeDoc === 'T') {
                me.drillDown.push('-panelGridDataDashboard');
                this.setFormatParameterSaleDetailFromDashboard();
                this.setGridDataSaleDetail();
            } else {
                Ext.getCmp(prototype.id + '-panelGridDataDashboard').setVisible(true);
                me.panelActual = '-panelGridDataDashboard';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                this.setFormatParameterDashboard();
                this.setGridDataDashboard();
            }
        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(true);
            Ext.getCmp(prototype.id + '-panelMPF291').setVisible(false);
            Ext.getCmp(prototype.id + '-panelDashboard').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridDataDashboard').setVisible(false);

            let ticketValue = Ext.getCmp(prototype.id + '-txtTicket').getValue();

            if (!ticketValue || ticketValue.trim() === '') {
                return;
            }

            this.setFormatParameterARC();
            this.setGridDataARC();
        } else if (selected === 2) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            Ext.getCmp(prototype.id + '-panelMPF291').setVisible(true);
            Ext.getCmp(prototype.id + '-panelDashboard').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridDataDashboard').setVisible(false);

            let sfileValue = Ext.getCmp(prototype.id + '-txtSFileMPF291').getValue();

            if (!sfileValue || sfileValue.trim() === '') {
                return;
            }

            this.setFormatParameterMPF291();
            this.setGridDataMPF291();
        }
    },
    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue()
                );

        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue()
                );

        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCurrencies').getValue() || '';
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatus').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || '';
        me.bean.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBandoc').getValue() || '';
        me.bean.IN_MONTO = Ext.getCmp(prototype.id + '-txtMonto').getValue() || 0;

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParams');
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF295");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-panelGridDataMPF291').setVisible(false);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    setFormatParameterMPF291: function () {
        me.bean = {};
        me.bean.IN_SFILE = Ext.getCmp(prototype.id + '-txtSFileMPF291').getValue() || '';
        me.bean.IN_CCUST = '';
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatusMPF291').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams, 'searchParamsMPF291');
    },
    setGridDataMPF291: function () {
        win.lblUser_toolTip("Estructura: MPF291");
        me.panelActual = '-panelGridDataMPF291';

        // Mostrar el panel MPF291 y ocultar los otros explicitamente
        Ext.getCmp(prototype.id + '-panelGridDataDetail').setVisible(false);
        Ext.getCmp(prototype.id + '-panelGridDataARC').setVisible(false);
        Ext.getCmp(prototype.id + '-panelGridDataMPF291').setVisible(true);

        // Forzar layout para que el grid tenga dimensiones correctas antes de cargar datos
        Ext.getCmp(prototype.id + '-panelMain').updateLayout();
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMPF291All'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found.' });
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMPF291').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
    },
    setFormatParameterDashboard: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayDashboard').getValue()
                );
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayDashboard').getValue()
                );
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-cmbCustomerDashboard').getValue() || '';
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountryDashboard').getValue() || '';
        me.bean.IN_OPTION = 'P';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams, 'searchParamsDashboard');
    },
    setFormatParameterSaleDetailFromDashboard: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayDashboard').getValue()
                );
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayDashboard').getValue()
                );
        me.bean.IN_CCUST     = Ext.getCmp(prototype.id + '-cmbCustomerDashboard').getValue()  || '';
        me.bean.IN_COUNTRY   = Ext.getCmp(prototype.id + '-cmbCountryDashboard').getValue()   || '';
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCurrencyDashboard').getValue()  || '';
        me.bean.IN_OPTION    = Ext.getCmp(prototype.id + '-cmbInputDateDashboard').getValue() || 'S';
        me.bean.IN_STVAL     = Ext.getCmp(prototype.id + '-cmbStatusDashboard').getValue()    || '';
        me.bean.IN_SFILE     = Ext.getCmp(prototype.id + '-txtSFileDashboard').getValue()     || '';
        var beanString = JSON.stringify(me.bean);
        searchParams = { bean: me.bean, beanString: beanString };
    },
    setFormatParameterSettDetailFromDashboard: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayDashboard').getValue()
                );
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthDashboard').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayDashboard').getValue()
                );
        me.bean.IN_CCUST     = Ext.getCmp(prototype.id + '-cmbCustomerDashboard').getValue()  || '';
        me.bean.IN_COUNTRY   = Ext.getCmp(prototype.id + '-cmbCountryDashboard').getValue()   || '';
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCurrencyDashboard').getValue()  || '';
        me.bean.IN_OPTION    = Ext.getCmp(prototype.id + '-cmbInputDateDashboard').getValue() || 'S';
        me.bean.IN_STVAL     = Ext.getCmp(prototype.id + '-cmbStatusDashboard').getValue()    || '';
        var beanString = JSON.stringify(me.bean);
        searchParams = { bean: me.bean, beanString: beanString };
    },
    setGridDataDashboard: function () {
        win.lblUser_toolTip("Estructura: MPF295 / MPF291");
        me.panelActual = '-panelGridDataDashboard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.getPaggin();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDashboard'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var items = obj.getData().items;
                    if (!items || items.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }

                    var data = items[items.length - 1].data; // última fila — tiene acumulados TOTAL_*

                    Ext.get(prototype.id + '-dashTotalSettVal') && Ext.get(prototype.id + '-dashTotalSettVal').setHtml(Ext.util.Format.number(data.TOTAL_QTY_TOTAL_SETT, '0,000'));
                    Ext.get(prototype.id + '-dashTotalSaleVal') && Ext.get(prototype.id + '-dashTotalSaleVal').setHtml(Ext.util.Format.number(data.TOTAL_QTY_TOTAL_SALE, '0,000'));
                    Ext.get(prototype.id + '-dashMatchSettVal') && Ext.get(prototype.id + '-dashMatchSettVal').setHtml(Ext.util.Format.number((parseInt(data.TOTAL_QTY_MATCH_AUTO_SETT) || 0) + (parseInt(data.TOTAL_QTY_MATCH_MANUAL_SETT) || 0), '0,000'));
                    Ext.get(prototype.id + '-dashMatchSaleVal') && Ext.get(prototype.id + '-dashMatchSaleVal').setHtml(Ext.util.Format.number((parseInt(data.TOTAL_QTY_MATCH_AUTO_SALE) || 0) + (parseInt(data.TOTAL_QTY_MATCH_MANUAL_SALE) || 0), '0,000'));
                    Ext.get(prototype.id + '-dashPendSettVal') && Ext.get(prototype.id + '-dashPendSettVal').setHtml(Ext.util.Format.number(data.TOTAL_QTY_PENDING_MANUAL_SETT, '0,000'));
                    Ext.get(prototype.id + '-dashPendSaleVal') && Ext.get(prototype.id + '-dashPendSaleVal').setHtml(Ext.util.Format.number(data.TOTAL_QTY_PENDING_MANUAL_SALE, '0,000'));

                    var chartSettData = [], chartSaleData = [];
                    for (var i = 0; i < items.length; i++) {
                        var d = items[i].data;
                        chartSettData.push({
                            mes:       d.strFormatDate,
                            totalSett: d.VL_QTY_TOTAL_SETT          || 0,
                            matchSett: (d.VL_QTY_MATCH_AUTO_SETT    || 0) + (d.VL_QTY_MATCH_MANUAL_SETT || 0),
                            pendSett:  d.VL_QTY_PENDING_MANUAL_SETT || 0
                        });
                        chartSaleData.push({
                            mes:       d.strFormatDate,
                            totalSale: d.VL_QTY_TOTAL_SALE          || 0,
                            matchSale: (d.VL_QTY_MATCH_AUTO_SALE    || 0) + (d.VL_QTY_MATCH_MANUAL_SALE || 0),
                            pendSale:  d.VL_QTY_PENDING_MANUAL_SALE || 0
                        });
                    }
                    var chartSett = Ext.getCmp(prototype.id + '-chartDashboard');
                    if (chartSett) { chartSett.getStore().loadData(chartSettData); }
                    var chartSale = Ext.getCmp(prototype.id + '-chartDashboardSale');
                    if (chartSale) { chartSale.getStore().loadData(chartSaleData); }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDashboard').bindStore(storeGridDatas);
        storeGridDatas.load();
    },
    setFormatParameterARC: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayARC').getValue()
                );

        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayARC').getValue()
                );

        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyARC').getValue() || '';
        me.bean.IN_COMAND = Ext.getCmp(prototype.id + '-cmbComand').getValue() || '';
        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFileARC').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue() || '';
        me.bean.IN_NUMGUIA = Ext.getCmp(prototype.id + '-txtTicket').getValue() || '';
        me.bean.IN_NUMFAC  = Ext.getCmp(prototype.id + '-txtNumFacARC').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataARC: function () {
        var me = this;
        Ext.getCmp(prototype.id + '-panelGridDataMPF291').setVisible(false);

        var tabPanel = Ext.getCmp(prototype.id + '-mainTabPanelARC');
        var activeTabTitle = tabPanel.getActiveTab().title;

        var currentUrl = '';
        var currentGridId = '';
        var toolTipStruct = '';

        switch (activeTabTitle) {
            case '1. DAILY':
                currentUrl = prototype.url + '/searchARCDaily';
                currentGridId = prototype.id + '-gridDataDetailARC';
                toolTipStruct = "Estructura: MPF218";
                break;
            case '2. LIBERA':
                currentUrl = prototype.url + '/searchARCLibera';
                currentGridId = prototype.id + '-gridLiberaARC';
                toolTipStruct = "Estructura: MPF_LIBERA";
                break;
            case '3. OPEN':
                currentUrl = prototype.url + '/searchARCOpen';
                currentGridId = prototype.id + '-gridOpenARC';
                toolTipStruct = "Estructura: MPF_OPEN";
                break;
            case '4. PSE':
                currentUrl = prototype.url + '/searchARCPse';
                currentGridId = prototype.id + '-gridPseARC';
                toolTipStruct = "Estructura: MPF_PSE";
                break;
            case '5. GUIAS':
                currentUrl = prototype.url + '/searchARCGuias';
                currentGridId = prototype.id + '-gridGuiasARC';
                toolTipStruct = "Estructura: MPF291";
                break;
        }

        win.lblUser_toolTip(toolTipStruct);
        me.panelActual = '-panelGridDataARC';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: currentUrl
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        global.clear();

        Ext.getCmp(currentGridId).bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

        this.getPaggin();
    },
    onTabChangeARC: function (tabPanel, newCard, oldCard) {
        this.setFormatParameterARC();
        this.setGridDataARC();
    },
    onViewCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const filename = data.NAMEFILE;

        if (!filename) {
            Ext.Msg.alert('Error', 'No se encontró el nombre del archivo.');
            return;
        }

        const imageUrl = prototype.url
                + '/getARCImage'
                + '?filename=' + encodeURIComponent(filename);

        Ext.create('Ext.window.Window', {
            title: 'ARC Image Viewer',
            modal: true,
            width: 1300,
            height: 800,
            layout: 'fit',
            items: [{
                    xtype: 'panel',
                    autoScroll: true,
                    bodyStyle: 'background:#000;',
                    items: [{
                            xtype: 'image',
                            src: imageUrl,
                            style: {
                                display: 'block',
                                transform: 'scale(1.4)',
                                transformOrigin: 'top left',
                                margin: '0'
                            }
                        }]
                }],
            buttons: [{
                    text: 'Close',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
        }).show();

    },
    onDownloadCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;

        const datePed = data.PEDARC;     // "25/12/07"  (YY/MM/DD)
        let filename = data.NAMEFILE;   // sin .txt

        if (!datePed || !filename) {
            Ext.Msg.alert(
                    'Error',
                    'Faltan parámetros para la descarga (Date PED, File Name).'
                    );
            return;
        }

        // PEDARC = YY/MM/DD
        const parts = datePed.split('/');

        if (parts.length !== 3) {
            Ext.Msg.alert('Error', 'Formato de fecha PED inválido: ' + datePed);
            return;
        }

        const year = '20' + parts[0];   // ✅ 25 → 2025

        // asegurar extensión .txt
        if (!filename.toLowerCase().endsWith('.txt')) {
            filename += '.txt';
        }

        const url = prototype.url + '/getTXTARC'
                + '?year=' + encodeURIComponent(year)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    btnExcel_click: function (obj, e) {
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
        var me = this;

        switch (me.panelActual) {
            case '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;

            case '-panelGridDataARC':
                var tabPanel = Ext.getCmp(prototype.id + '-mainTabPanelARC');
                var activeTabTitle = tabPanel.getActiveTab().title;
                var excelUrl = '';

                switch (activeTabTitle) {
                    case '1. DAILY':
                        excelUrl = prototype.url + '/getXLSX_Daily';
                        break;
                    case '2. LIBERA':
                        excelUrl = prototype.url + '/getXLSX_Libera';
                        break;
                    case '3. OPEN':
                        excelUrl = prototype.url + '/getXLSX_Open';
                        break;
                    case '4. PSE':
                        excelUrl = prototype.url + '/getXLSX_Pse';
                        break;
                }

                if (excelUrl !== '') {
                    global.getFile(excelUrl + '?beanString=' + encodeURI(searchParams.beanString));
                }
                break;

            case '-panelGridDataMPF291':
                global.getFile(prototype.url + '/getXLSXMPF291?beanString=' + encodeURI(searchParams.beanString));
                break;

            case '-panelGridDataDashboard':
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURI(searchParams.beanString));
                break;

            default:
                global.Msg({msg: 'Under Construction'});
        }
    },
    buildDate: function (y, m, d) {
        // Convertir a string y limpiar
        y = String(y || '').trim();
        m = String(m || '').trim();
        d = String(d || '').trim();

        if (!y)
            return '';

        // Asegurar que mes tenga 2 dígitos si existe
        if (m) {
            m = m.padStart(2, '0');
            // Asegurar que día tenga 2 dígitos si existe
            if (d) {
                d = d.padStart(2, '0');
            }
        }

        return y + m + d;
    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    onDashboardSettClick: function (column, e, row, colIndex, x, rowData) {
        var stvalMap = { 2: '1', 3: '5', 4: '3' };
        var stval = stvalMap[colIndex] !== undefined ? stvalMap[colIndex] : '';
        var periodo = rowData.data.ADATE;
        if (!periodo) { return; }
        me.drillDown.push(me.panelActual);
        me.bean = {};
        me.bean.IN_FECHA_FROM = periodo;
        me.bean.IN_FECHA_TO   = periodo;
        me.bean.IN_CCUST      = Ext.getCmp(prototype.id + '-cmbCustomerDashboard').getValue()  || '';
        me.bean.IN_COUNTRY    = Ext.getCmp(prototype.id + '-cmbCountryDashboard').getValue()   || '';
        me.bean.IN_SCURRENCY  = '';
        me.bean.IN_OPTION     = Ext.getCmp(prototype.id + '-cmbInputDateDashboard').getValue() || 'P';
        me.bean.IN_STVAL      = stval;
        console.log(me.bean,'me.bean')
        var beanString = JSON.stringify(me.bean);
        searchParams = { bean: me.bean, beanString: beanString };
        me.setGridDataSettDetail();
    },
    setGridDataSettDetail: function () {
        win.lblUser_toolTip("Estructura: MPF295 / MPS587");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: { url: prototype.url + '/searchSettDetail' },
            listeners: {
                beforeload: function (obj) { obj.proxy.extraParams = searchParams; },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) { global.Msg({ msg: 'Data not found.' }); }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
    },
    onDashboardSaleClick: function (column, e, row, colIndex, x, rowData) {
        var stvalMap = { 7: '1', 9: '5', 10: '3' };
        var stval = stvalMap[colIndex] !== undefined ? stvalMap[colIndex] : '';
        var periodo = rowData.data.ADATE;
        if (!periodo) { return; }
        me.drillDown.push(me.panelActual);
        me.bean = {};
        me.bean.IN_FECHA_FROM = periodo;
        me.bean.IN_FECHA_TO   = periodo;
        me.bean.IN_CCUST      = Ext.getCmp(prototype.id + '-cmbCustomerDashboard').getValue()  || '';
        me.bean.IN_COUNTRY    = Ext.getCmp(prototype.id + '-cmbCountryDashboard').getValue()   || '';
        me.bean.IN_SCURRENCY  = '';
        me.bean.IN_OPTION     = Ext.getCmp(prototype.id + '-cmbInputDateDashboard').getValue() || 'P';
        me.bean.IN_STVAL      = stval;
        var beanString = JSON.stringify(me.bean);
        searchParams = { bean: me.bean, beanString: beanString };
        me.setGridDataSaleDetail();
    },
    setGridDataSaleDetail: function () {
        win.lblUser_toolTip("Estructura: MPF291 / MPS573");
        me.panelActual = '-panelGridDataMPF291';
        Ext.getCmp(prototype.id + '-panelGridDataMPF291').setVisible(true);
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: { url: prototype.url + '/searchSaleDetail' },
            listeners: {
                beforeload: function (obj) { obj.proxy.extraParams = searchParams; },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) { global.Msg({ msg: 'Data not found.' }); }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMPF291').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
    },
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual, 'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(640);
                break;
            case '-panelGridDataARC':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(670);
                break;
            case '-panelGridDataMPF291':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                break;
            case '-panelGridDataDashboard':
                me.pagginActual = '';
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(630);
                Ext.getCmp(prototype.id + '-panelGridDataMPF291').setVisible(false);
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginacion ">
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
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
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    selectComboFromYearARC: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearARC');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearARC');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthARC');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonthARC: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDayARC: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayARC');
        comboToDay.setValue(obj.getValue());
    },
    getPeriodoYYYYMM: function (strFormatDate) {
        if (!strFormatDate)
            return null;

        let [anio, mesTxt] = strFormatDate.split('-');
        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return anio + (meses[mesTxt] || '00');
    },
    onUpperValue: function (obj, e, eOpts) {
        let value = obj.getValue().toUpperCase();
        obj.setValue(value);
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

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
    // </editor-fold>
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onDownloadCSV: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const country = data.COUNTRY;
        const dateSett = data.DATESETT;
        const customer = data.CUSTOMER;
        const filename = data.NAMEFILE;

        if (!country || !dateSett || !customer) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (Country, Customer o Settlement Date).');
            return;
        }

        const url = prototype.url + '/getCSV'
                + '?country=' + encodeURIComponent(country)
                + '&dateSett=' + encodeURIComponent(dateSett)
                + '&customer=' + encodeURIComponent(customer)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    onDownloadAllCSV: function () {
        let me = this;
        let url = null;

        switch (me.panelActual) {

            case '-panelGridDataDetail': // BSP
                console.log('ZIP BSP permitido');
                url = prototype.url + '/getBulkCSV';
                break;

            case '-panelGridDataARC': // ARC
                console.log('ZIP ARC permitido');
                url = prototype.url + '/getBulkTXTARC';
                break;

            default:
                global.Msg({msg: 'Under Construction'});
                return;
        }

        if (!searchParams || !searchParams.beanString) {
            Ext.Msg.alert(
                    "Error",
                    "Debe realizar una búsqueda antes de descargar."
                    );
            return;
        }

        console.log("Solicitando ZIP con filtros:", searchParams);
        console.log("Endpoint:", url);

        me.getFileByPost(url, {
            beanString: searchParams.beanString
        });
    },
    getFileByPost: function (url, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", url);
        form.setAttribute("target", "_blank");

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
        form.remove();
    },
    onEditClick: function (column, e, row, colIndex, x, rowData) {
        let data = rowData;
        this.winDataEntry('U', data);
    },
    btnLinkMPF291_click: function () {
        var grid = Ext.getCmp(prototype.id + '-gridDataDetail');
        var selected = grid ? grid.getSelectionModel().getSelection() : [];

        if (!selected || selected.length === 0) {
            Ext.Msg.alert('.:PRAXIS:.', 'Please select a MPF295 record from the grid before linking MPF291 records.');
            return;
        }

        var rec = selected[0];
        var data = rec.data;

        if (!data.SFILE || data.SFILE.trim() === '') {
            Ext.Msg.alert('.:PRAXIS:.', 'The selected MPF295 record does not have a SFILE value to search by.');
            return;
        }

        if (Ext.getCmp(prototype.id + '-mpf291Link')) {
            Ext.getCmp(prototype.id + '-mpf291Link').close();
        }

        Ext.create('Ext.Praxis.view.payments.CargoGuideForm.MPF291LinkForm', {
            id: prototype.id + '-mpf291Link',
            params: {
                mpf295: {
                    CCUST: data.CCUST || '',
                    SFILE: data.SFILE || '',
                    NPAGE: data.NPAGE || '',
                    PAYDAY: data.PAYDAY || '',
                    TYPE: data.TYPE || '',
                    SEQ: data.SEQ || '',
                    CBATCH: data.CBATCH || '',
                    DATEBAT: data.DATEBAT || '',
                    SCOUNTRY: data.SCOUNTRY || ''
                }
            }
        }).show();
    },
    btnGenerarCartera_click: function () {

        var me = this;
        me.bean = {};

        var fromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var fromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var fromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        var toYear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var toMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var toDay = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        if (!fromYear || !fromMonth || !toYear || !toMonth) {
            global.Msg({
                msg: 'Por favor, seleccione un rango de fechas válido antes de exportar.'
            });
            return;
        }

        me.bean.IN_FECHA_FROM = me.buildDate(fromYear, fromMonth, fromDay);
        me.bean.IN_FECHA_TO = me.buildDate(toYear, toMonth, toDay);

        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';

        var beanString = JSON.stringify(me.bean);

        var urlExport = prototype.url + '/exportExcel?beanString=' + encodeURIComponent(beanString);

        window.open(urlExport, '_blank');

    },
    btnRunProcess_click: function () {
        // Antes llamaba directo a /runProcess con beanString='{}' (sin país ni
        // proceso) — de ahí el error de deserialización. Ahora abre el diálogo
        // de selección (país + proceso + FECR para HN); el propio diálogo hace
        // la llamada con el beanString correcto al confirmar.
        if (Ext.getCmp(prototype.id + '-runProcess')) {
            Ext.getCmp(prototype.id + '-runProcess').close();
        }

        Ext.create('Ext.Praxis.view.payments.CargoGuideForm.RunProcessForm', {
            id: prototype.id + '-runProcess'
        }).show();
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.CargoGuideForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: []
            }
        }).show();
    },
}
);