Ext.define('Ext.Praxis.controller.payments.CargoStatus.CargoStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CargoStatusController',
    fecha: new Date(),
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCurrencies: [],
    lstCountry: [],
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsObtainData: {},
    paramsDetailBank: {},
    beanDet: {},
    detBankMode: '',   // 'chargue' = drill-down MPS658 | 'statement' = Detail directo MPS659
    init: function (view) {
        me = this;
        prototype.id = 'CargoStatusForm';
        prototype.url = CONTEXTPATH + '/CargoStatus';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetail';
        prototypeProgram.view = 'payments-BSP-file-download';
        prototypeProgram.nprog = 'PX00001032';
        prototypeProgram.title = 'Downloaded Cash Files';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
            '#CargoStatusForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CargoStatusForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CargoStatusForm-btnClear': {
                click: this.btnClear_click
            },
            '#CargoStatusForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CargoStatusForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CargoStatusForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CargoStatusForm-btnBack': {
                click: this.btnBack_click
            },
            '#CargoStatusForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CargoStatusForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CargoStatusForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CargoStatusForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#CargoStatusForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#CargoStatusForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#CargoStatusForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#CargoStatusForm-cmbDateToYear': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToYearARC').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToYearICCS').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateToMonth': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToMonthARC').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateToDay': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToDayARC').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToDayICCS').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateFromYearARC': {
                select: this.selectComboFromYearARC
            },
            '#CargoStatusForm-cmbDateFromMonthARC': {
                select: this.selectComboFromMonthARC
            },
            '#CargoStatusForm-cmbDateFromDayARC': {
                select: this.selectComboFromDayARC
            },
            '#CargoStatusForm-cmbDateToYearARC': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToYearICCS').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateToMonthARC': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateToDayARC': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToDayICCS').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateFromYearICCS': {
                select: this.selectComboFromYearICCS
            },
            '#CargoStatusForm-cmbDateFromMonthICCS': {
                select: this.selectComboFromMonthICCS
            },
            '#CargoStatusForm-cmbDateFromDayICCS': {
                select: this.selectComboFromDayICCS
            },
            '#CargoStatusForm-cmbDateToYearICCS': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToYearARC').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateToMonthICCS': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToMonthARC').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-cmbDateToDayICCS': {
                select: function (obj) { Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(obj.getValue()); Ext.getCmp(prototype.id + '-cmbDateToDayARC').setValue(obj.getValue()); }
            },
            '#CargoStatusForm-btnGenerarCartera': {
                click: this.btnGenerarCartera_click
            },
        });
        // </editor-fold>
    },
    xpanel_afterrender: function () {
        me.obtainData();
        me.btnSearch_click();

        $('#' + prototype.id + '-btnToggleSwitchCashCD').on('change', 'input.toggle-input', function () {
            var isDetail = $(this).is(':checked');

            // Mostrar/ocultar fila 2 (Status + Bandoc)
            var detailPanel = Ext.getCmp(prototype.id + '-detailFilterStatement');
            if (detailPanel) {
                detailPanel.setVisible(isDetail);
            }

            // Day combos: solo habilitados en Detail
            var cmbFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
            var cmbToDay   = Ext.getCmp(prototype.id + '-cmbDateToDay');
            if (isDetail) {
                cmbFromDay.setDisabled(false);
                cmbToDay.setDisabled(false);
            } else {
                cmbFromDay.setValue('');
                cmbFromDay.setDisabled(true);
                cmbToDay.setValue('');
                cmbToDay.setDisabled(true);
            }

            me.btnSearch_click();
        });

    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        var yearActual = fechaActual.getFullYear();

        var monthActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').setValue("");

        Ext.getCmp(prototype.id + '-cmbDateFromYearICCS').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearICCS').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayICCS').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayICCS').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearICCS').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearICCS').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromDayICCS').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayICCS').setValue("");

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
                
                Ext.getCmp(prototype.id + '-cmbCountryARC').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountryARC').setValue('');
                

                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstCurrencies,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCurrency').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbCurrency').setValue('');
                
                Ext.getCmp(prototype.id + '-cmbCurrencyARC').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbCurrencyARC').setValue('');

                global.clear();
            }
        });

    },
    btnSearch_click: function (obj, e) {
        let fs = Ext.getCmp(prototype.id + '-titleFieldsetBSP');
        let selectedBy = Ext.getCmp(prototype.id + '-cmbInputDate').getValue();

        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];

        if (selected === 0) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(true);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            Ext.getCmp(prototype.id + '-panelICCS').setVisible(false);

            var isDetail = $('#' + prototype.id + '-btnToggleSwitchCashCD input.toggle-input').is(':checked');

            if (!isDetail) {
                this.setFormatParameter();
                this.setGridData();
            } else {
                this.setFormatParameterDetBank();
                this.setGridDataDetBank();  
            }
        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelICCS').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(true);
            this.setFormatParameterARC();
            this.setGridDataARC();
        } else {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            Ext.getCmp(prototype.id + '-panelICCS').setVisible(true);
            this.setFormatParameterICCS();
            this.setGridDataICCS();
        }
    },
    setFormatParameter: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue()
                );

        // Additional
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeSociety').getValue() || '';
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCurrency').getValue() || '';
        me.bean.IN_SEARCH = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParams');
    },
    setFormatParameterDetBank: function () {
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

        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeSociety').getValue() || '';
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCurrency').getValue() || '';
        me.bean.IN_SEARCH = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || '';
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatusCash').getValue() || '';
        me.bean.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOCCash').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParams');
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF287");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
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
                        Ext.get(prototype.id + '-dashTotalVal').setHtml('0');
                        Ext.get(prototype.id + '-dashMatchVal').setHtml('0');
                        Ext.get(prototype.id + '-dashPendVal').setHtml('0');
                    } else {
                        var items = obj.getData().items;
                        var totals = items[items.length - 1].data;
                        Ext.get(prototype.id + '-dashTotalVal').setHtml(Ext.util.Format.number(totals.TOTAL_QTOTAL, '0,000'));
                        Ext.get(prototype.id + '-dashMatchVal').setHtml(Ext.util.Format.number(totals.TOTAL_QMATCH + (totals.TOTAL_QMANUAL || 0), '0,000'));
                        Ext.get(prototype.id + '-dashPendVal').setHtml(Ext.util.Format.number(totals.TOTAL_QPEND, '0,000'));

                        // Llenar gráfico de barras: excluir el último registro (fila de totales)
                        var chartData = [];
                        for (var i = 0; i < items.length - 1; i++) {
                            var d = items[i].data;
                            chartData.push({
                                mes: d.strFormatDate || '',
                                total: d.VL_QTY_TOTAL || 0,
                                match: (d.VL_QTY_MATCH || 0) + (d.VL_QTY_MANUAL || 0),
                                pending: d.VL_QTY_PEND || 0
                            });
                        }
                        var chart = Ext.getCmp(prototype.id + '-chartBSP');
                        if (chart) {
                            chart.getStore().loadData(chartData);
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
    },
    setGridDataDetBank: function () {
        me.detBankMode = 'statement';
        win.lblUser_toolTip("Estructura: MPS659");
        me.panelActual = '-boxDetBank';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetBankStatement'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin12');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        // Título con el rango de fecha buscado
                        var title = (me.bean.IN_FECHA_FROM || '') +
                                    (me.bean.IN_FECHA_TO && me.bean.IN_FECHA_TO !== me.bean.IN_FECHA_FROM
                                        ? ' → ' + me.bean.IN_FECHA_TO : '');

                        var detGrid = Ext.getCmp(prototype.id + '-gridBoxDetBank');
                        detGrid.setTitle('<center style="font-size:12px;color:black;font-weight:bold;">' + title + '</center>');
                        if (detGrid.header) {
                            var headerEl = detGrid.header.getEl();
                            if (headerEl) {
                                headerEl.setStyle('background-color', '#c9daf5');
                            }
                        }
                    }
                    me.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridBoxDetBank').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
        this.getPaggin();
    },
    setFormatParameterARC: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayARC').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayARC').getValue()
                );

        // Additional
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyARC').getValue() || '';
//        me.bean.IN_COMAND = Ext.getCmp(prototype.id + '-cmbComand').getValue() || '';
//        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFileARC').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue() || '';

        // Aliases usados por MPF287Filter (para endpoint searchCartera / MPS661)
        me.bean.IN_CCUST    = me.bean.IN_SOCIETY;
        me.bean.IN_SEARCH   = me.bean.IN_OPTION;
        me.bean.IN_COUNTRY  = '';
        me.bean.IN_SCURRENCY = '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataARC: function () {
        win.lblUser_toolTip("Estructura: MPS661");
        me.panelActual = '-panelGridDataARC';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var n = function (v, fmt) { return Ext.util.Format.number(parseFloat(v) || 0, fmt || '0,000'); };

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {url: prototype.url + '/searchCartera'},
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        var sumIds = ['ARCQTOTAL','ARCQMATCH','ARCPCT','ARCQMANUAL',
                            'ARCFALTAPAGO','ARCFALTAFACT','ARCFACTPEND','ARCPENDPAGO',
                            'ARCNOLIB','ARCFALTAPAGODIF','ARCMATCHOBS',
                            'ARCAMTTOTAL','ARCAMTMATCH','ARCAMTFALTAPAGO','ARCAMTFALTAFACT',
                            'ARCAMTFACTPEND','ARCAMTPENDPAGO','ARCAMTNOLIB','ARCAMTFALTAPAGODIF','ARCAMTMATCHOBS'];
                        Ext.Array.each(sumIds, function (id) {
                            Ext.getCmp(prototype.id + '-sum-' + id).setText('0');
                        });
                        Ext.get(prototype.id + '-dashTotalValARC').setHtml('0');
                        Ext.get(prototype.id + '-dashMatchValARC').setHtml('0');
                        Ext.get(prototype.id + '-dashPendValARC').setHtml('0');
                        return;
                    }

                    var lstData = obj.getData().items.map(function (v) { return v.data; });
                    var totals  = lstData[lstData.length - 1];

                    // ── Dashboard cards ──────────────────────────────────────
                    Ext.get(prototype.id + '-dashTotalValARC').setHtml(n(totals.TOTAL_QTOTAL));
                    Ext.get(prototype.id + '-dashMatchValARC').setHtml(n((parseInt(totals.TOTAL_QMATCH) || 0) + (parseInt(totals.TOTAL_QMANUAL) || 0)));
                    Ext.get(prototype.id + '-dashPendValARC').setHtml(n(totals.TOTAL_QPEND));

                    // ── Fake-summary ─────────────────────────────────────────
                    var tQ = parseInt(totals.TOTAL_QTOTAL) || 0;
                    var mQ = (parseInt(totals.TOTAL_QMATCH) || 0) + (parseInt(totals.TOTAL_QMANUAL) || 0);
                    Ext.getCmp(prototype.id + '-sum-ARCQTOTAL').setText(n(totals.TOTAL_QTOTAL));
                    Ext.getCmp(prototype.id + '-sum-ARCQMATCH').setText(n(totals.TOTAL_QMATCH));
                    Ext.getCmp(prototype.id + '-sum-ARCPCT').setText(n(tQ > 0 ? (mQ * 100 / tQ) : 0, '0.00') + ' %');
                    Ext.getCmp(prototype.id + '-sum-ARCQMANUAL').setText(n(totals.TOTAL_QMANUAL));
                    Ext.getCmp(prototype.id + '-sum-ARCFALTAPAGO').setText(n(0));
                    Ext.getCmp(prototype.id + '-sum-ARCFALTAFACT').setText(n(0));
                    Ext.getCmp(prototype.id + '-sum-ARCFACTPEND').setText(n(0));
                    Ext.getCmp(prototype.id + '-sum-ARCPENDPAGO').setText(n(0));
                    Ext.getCmp(prototype.id + '-sum-ARCNOLIB').setText(n(0));
                    Ext.getCmp(prototype.id + '-sum-ARCFALTAPAGODIF').setText(n(0));
                    Ext.getCmp(prototype.id + '-sum-ARCMATCHOBS').setText(n(0));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTTOTAL').setText(n(totals.TOTAL_AMT_TOTAL, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTMATCH').setText(n(totals.TOTAL_AMT_MATCH, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTFALTAPAGO').setText(n(totals.TOTAL_AMT_FALTA_PAGO, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTFALTAFACT').setText(n(totals.TOTAL_AMT_FALTA_FACTURA, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTFACTPEND').setText(n(totals.TOTAL_AMT_FACTURA_PENDIENTE, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTPENDPAGO').setText(n(totals.TOTAL_AMT_PENDIENTE_PAGO, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTNOLIB').setText(n(totals.TOTAL_AMT_NO_ESTA_EN_LIBERA, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTFALTAPAGODIF').setText(n(totals.TOTAL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-ARCAMTMATCHOBS').setText(n(totals.TOTAL_AMT_MATCH_CON_OBSERVACIONES, '0,000.00'));

                    // ── Build TreeStore (ADATE → NOMBRE1) ───────────────────
                    var mesesProcesados = [];
                    var dataRoot = {text: '.', expanded: true, children: []};

                    Ext.Array.each(lstData, function (value) {
                        var mes = value.strFormatDate;
                        if (Ext.Array.indexOf(mesesProcesados, mes) === -1) {
                            mesesProcesados.push(mes);
                            var V_QTOTAL = 0, V_QMATCH = 0, V_QMANUAL = 0, V_QPEND = 0;
                            var V_FP = 0, V_FF = 0, V_FPEND = 0, V_PP = 0, V_NL = 0, V_FPD = 0, V_MO = 0;
                            var V_AMTTOTAL = 0, V_AMTMATCH = 0, V_AMTFP = 0, V_AMTFF = 0;
                            var V_AMTFPEND = 0, V_AMTPP = 0, V_AMTNL = 0, V_AMTFPD = 0, V_AMTMO = 0;
                            var children = [];

                            var parentADATE = '';
                            Ext.Array.each(lstData, function (det) {
                                if (det.strFormatDate !== mes) { return; }
                                if (!parentADATE && det.ADATE) { parentADATE = det.ADATE.substring(0, 6); }
                                var dqTotal   = parseInt(det.VL_QTY_TOTAL)  || 0;
                                var dqMatch   = parseInt(det.VL_QTY_MATCH)  || 0;
                                var dqManual  = parseInt(det.VL_QTY_MANUAL) || 0;
                                var dqPend    = parseInt(det.VL_QTY_PEND)   || 0;
                                V_QTOTAL  += dqTotal;  V_QMATCH  += dqMatch;
                                V_QMANUAL += dqManual; V_QPEND   += dqPend;
                                V_FP  += parseInt(det.VL_QTY_FALTA_PAGO)    || 0;
                                V_FF  += parseInt(det.VL_QTY_FALTA_FACTURA)  || 0;
                                V_FPEND += parseInt(det.VL_QTY_FACTURA_PENDIENTE) || 0;
                                V_PP  += parseInt(det.VL_QTY_PENDIENTE_PAGO) || 0;
                                V_NL  += parseInt(det.VL_QTY_NO_ESTA_EN_LIBERA)   || 0;
                                V_FPD += parseInt(det.VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA) || 0;
                                V_MO  += parseInt(det.VL_QTY_MATCH_CON_OBSERVACIONES)         || 0;
                                V_AMTTOTAL  += parseFloat(det.VL_AMT_TOTAL)  || 0;
                                V_AMTMATCH  += parseFloat(det.VL_AMT_MATCH)  || 0;
                                V_AMTFP     += parseFloat(det.VL_AMT_FALTA_PAGO)    || 0;
                                V_AMTFF     += parseFloat(det.VL_AMT_FALTA_FACTURA) || 0;
                                V_AMTFPEND  += parseFloat(det.VL_AMT_FACTURA_PENDIENTE)  || 0;
                                V_AMTPP     += parseFloat(det.VL_AMT_PENDIENTE_PAGO)     || 0;
                                V_AMTNL     += parseFloat(det.VL_AMT_NO_ESTA_EN_LIBERA)  || 0;
                                V_AMTFPD    += parseFloat(det.VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA) || 0;
                                V_AMTMO     += parseFloat(det.VL_AMT_MATCH_CON_OBSERVACIONES)         || 0;
                                children.push({
                                    strFormatDate: '', NOMBRE1: det.NOMBRE1, ADATE: det.ADATE,
                                    VL_QTY_TOTAL: dqTotal, VL_QTY_MATCH: dqMatch, VL_QTY_MANUAL: dqManual,
                                    PCT_PROCESADO: dqTotal > 0 ? ((dqMatch + dqManual) * 100 / dqTotal) : 0,
                                    VL_QTY_PEND: dqPend,
                                    VL_QTY_FALTA_PAGO: parseInt(det.VL_QTY_FALTA_PAGO)    || 0,
                                    VL_QTY_FALTA_FACTURA: parseInt(det.VL_QTY_FALTA_FACTURA) || 0,
                                    VL_QTY_FACTURA_PENDIENTE: parseInt(det.VL_QTY_FACTURA_PENDIENTE) || 0,
                                    VL_QTY_PENDIENTE_PAGO: parseInt(det.VL_QTY_PENDIENTE_PAGO) || 0,
                                    VL_QTY_NO_ESTA_EN_LIBERA: parseInt(det.VL_QTY_NO_ESTA_EN_LIBERA) || 0,
                                    VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA: parseInt(det.VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA) || 0,
                                    VL_QTY_MATCH_CON_OBSERVACIONES: parseInt(det.VL_QTY_MATCH_CON_OBSERVACIONES) || 0,
                                    VL_AMT_TOTAL: parseFloat(det.VL_AMT_TOTAL) || 0,
                                    VL_AMT_MATCH: parseFloat(det.VL_AMT_MATCH) || 0,
                                    VL_AMT_FALTA_PAGO: parseFloat(det.VL_AMT_FALTA_PAGO) || 0,
                                    VL_AMT_FALTA_FACTURA: parseFloat(det.VL_AMT_FALTA_FACTURA) || 0,
                                    VL_AMT_FACTURA_PENDIENTE: parseFloat(det.VL_AMT_FACTURA_PENDIENTE) || 0,
                                    VL_AMT_PENDIENTE_PAGO: parseFloat(det.VL_AMT_PENDIENTE_PAGO) || 0,
                                    VL_AMT_NO_ESTA_EN_LIBERA: parseFloat(det.VL_AMT_NO_ESTA_EN_LIBERA) || 0,
                                    VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA: parseFloat(det.VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA) || 0,
                                    VL_AMT_MATCH_CON_OBSERVACIONES: parseFloat(det.VL_AMT_MATCH_CON_OBSERVACIONES) || 0,
                                    leaf: true
                                });
                            });

                            dataRoot.children.push({
                                strFormatDate: mes, NOMBRE1: '', ADATE: parentADATE,
                                VL_QTY_TOTAL: V_QTOTAL, VL_QTY_MATCH: V_QMATCH, VL_QTY_MANUAL: V_QMANUAL,
                                PCT_PROCESADO: V_QTOTAL > 0 ? ((V_QMATCH + V_QMANUAL) * 100 / V_QTOTAL) : 0,
                                VL_QTY_PEND: V_QPEND,
                                VL_QTY_FALTA_PAGO: V_FP, VL_QTY_FALTA_FACTURA: V_FF,
                                VL_QTY_FACTURA_PENDIENTE: V_FPEND, VL_QTY_PENDIENTE_PAGO: V_PP,
                                VL_QTY_NO_ESTA_EN_LIBERA: V_NL, VL_QTY_FALTA_PAGO_DIFERENCIA_EN_LIBERA: V_FPD,
                                VL_QTY_MATCH_CON_OBSERVACIONES: V_MO,
                                VL_AMT_TOTAL: V_AMTTOTAL, VL_AMT_MATCH: V_AMTMATCH,
                                VL_AMT_FALTA_PAGO: V_AMTFP, VL_AMT_FALTA_FACTURA: V_AMTFF,
                                VL_AMT_FACTURA_PENDIENTE: V_AMTFPEND, VL_AMT_PENDIENTE_PAGO: V_AMTPP,
                                VL_AMT_NO_ESTA_EN_LIBERA: V_AMTNL, VL_AMT_FALTA_PAGO_DIFERENCIA_EN_LIBERA: V_AMTFPD,
                                VL_AMT_MATCH_CON_OBSERVACIONES: V_AMTMO,
                                expanded: false,
                                children: children
                            });
                        }
                    });

                    var storeTree = Ext.create('Ext.data.TreeStore', {root: dataRoot});
                    Ext.getCmp(prototype.id + '-treeDataDetailARC').setStore(storeTree);

                    // ── Chart ────────────────────────────────────────────────
                    var chartData = [];
                    Ext.Array.each(dataRoot.children, function (mes) {
                        chartData.push({
                            mes: mes.strFormatDate,
                            total: mes.VL_QTY_TOTAL,
                            match: mes.VL_QTY_MATCH + mes.VL_QTY_MANUAL,
                            pending: mes.VL_QTY_PEND
                        });
                    });
                    var chartARC = Ext.getCmp(prototype.id + '-chartARC');
                    if (chartARC) { chartARC.getStore().loadData(chartData); }
                }
            }
        });
        global.clear();
        storeGridDatas.load();
          this.getPaggin();
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
                                transform: 'scale(1.4)', // 🔍 nivel de zoom
                                transformOrigin: 'top left', // 🎯 foco arriba izquierda
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
    setFormatParameterICCS: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayICCS').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayICCS').getValue()
                );

        // Additional
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyICCS').getValue() || '';
        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFileICCS').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateICCS').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataICCS: function () {
        win.lblUser_toolTip("Estructura: MPF304");
        me.panelActual = '-panelGridDataICCS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchICCS'
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
        Ext.getCmp(prototype.id + '-gridDataDetailICCS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },

    setGridDataDetBankChargue: function () {
        win.lblUser_toolTip("Estructura: MPS658");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetBankChargue'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, records, successful, eOpts) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
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
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridDataARC':
                global.getFile(prototype.url + '/getXLSXARC?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-boxDetBank':
                if (me.detBankMode === 'statement') {
                    global.getFile(prototype.url + '/getXLSXDetBankStatement?beanString=' + encodeURI(searchParams.beanString));
                } else {
                    global.getFile(prototype.url + '/getXLSXDetBank?beanString=' + encodeURI(me.paramsDetailBank.beanString));
                }
                break;
            default:
                global.Msg({msg: 'Under Construction'});
        }
    },
    btnGenerarCartera_click: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Generar Excel de Cartera?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    // Construir parámetros igual que setFormatParameterDetBank
                    var bean = {};
                    bean.IN_FECHA_FROM = me.buildDate(
                        Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(),
                        Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(),
                        Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue()
                    );
                    bean.IN_FECHA_TO = me.buildDate(
                        Ext.getCmp(prototype.id + '-cmbDateToYear').getValue(),
                        Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue(),
                        Ext.getCmp(prototype.id + '-cmbDateToDay').getValue()
                    );
                    bean.IN_CCUST  = Ext.getCmp(prototype.id + '-typeSociety').getValue()  || '';
                    bean.IN_SEARCH = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || '';

                    global.getFile(prototype.url + '/getXLSXCartera?beanString=' + encodeURI(JSON.stringify(bean)));
                }
            }
        });
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
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual, 'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(630);
                break;
            case  '-panelGridDataARC':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                me.pagginActual = '-paggin';
                break;
            case  '-boxDetBank':
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                me.pagginActual = '-paggin12';
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(650);
                break;
            case  '-boxDetCartera':
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                me.pagginActual = '-paggin12';
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(650);
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
            comboFromMonth.setValue(comboToMonth.getValue());
        }
        me.syncDateFilters('');
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
        me.syncDateFilters('');
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
        me.syncDateFilters('');
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
            comboFromMonth.setValue(comboToMonth.getValue());
        }
        me.syncDateFilters('ARC');
    },
    selectComboFromMonthARC: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToMonth.setValue(obj.getValue());
        me.syncDateFilters('ARC');
    },
    selectComboFromDayARC: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayARC');
        comboToDay.setValue(obj.getValue());
        me.syncDateFilters('ARC');
    },

    selectComboFromYearICCS: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearICCS');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromDayICCS');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthICCS');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue());
        }
        me.syncDateFilters('ICCS');
    },
    selectComboFromMonthICCS: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthICCS');
        comboToMonth.setValue(obj.getValue());
        me.syncDateFilters('ICCS');
    },
    selectComboFromDayICCS: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayICCS');
        comboToDay.setValue(obj.getValue());
        me.syncDateFilters('ICCS');
    },
    syncDateFilters: function (source) {
        var groups = ['', 'ARC', 'ICCS'];
        var fromYear  = Ext.getCmp(prototype.id + '-cmbDateFromYear'  + source).getValue();
        var fromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth' + source).getValue();
        var fromDay   = Ext.getCmp(prototype.id + '-cmbDateFromDay'   + source).getValue();
        var toYear    = Ext.getCmp(prototype.id + '-cmbDateToYear'    + source).getValue();
        var toMonth   = Ext.getCmp(prototype.id + '-cmbDateToMonth'   + source).getValue();
        var toDay     = Ext.getCmp(prototype.id + '-cmbDateToDay'     + source).getValue();
        Ext.Array.each(groups, function (g) {
            if (g === source) { return; }
            Ext.getCmp(prototype.id + '-cmbDateFromYear'  + g).setValue(fromYear);
            Ext.getCmp(prototype.id + '-cmbDateFromMonth' + g).setValue(fromMonth);
            Ext.getCmp(prototype.id + '-cmbDateFromDay'   + g).setValue(fromDay);
            Ext.getCmp(prototype.id + '-cmbDateToYear'    + g).setValue(toYear);
            Ext.getCmp(prototype.id + '-cmbDateToMonth'   + g).setValue(toMonth);
            Ext.getCmp(prototype.id + '-cmbDateToDay'     + g).setValue(toDay);
        });
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

            case '-panelGridDataICCS': // NUEVO: ICCS
                console.log('ZIP ICCS permitido');
                url = prototype.url + '/getBulkCSVIccs';
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
    updateFilesICCS: function () {
        var me = this;

        // Bloqueamos la grilla para que el usuario espere (Ajusta el ID si tu grilla se llama distinto)
        var grid = Ext.getCmp(prototype.id + '-xpanel');
        if (grid) {
            grid.mask('Escaneando archivos en red, por favor espere...');
        }

        Ext.Ajax.request({
            url: prototype.url + '/scanICCSFiles',
            method: 'POST',
            timeout: 600000,
            success: function (response, options) {
                if (grid) {
                    grid.unmask();
                }

                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    Ext.Msg.alert('Proceso Completado', res.message + '<br><br><b>Archivos nuevos registrados:</b> ' + res.totalProcesados);

                    // Opcional: Aquí puedes llamar a tu función de búsqueda para que la grilla se recargue sola
                    // me.onSearch(); 
                } else {
                    // Si el Java mandó success: false por algún catch
                    Ext.Msg.alert('Atención', res.message);
                }
            },
            failure: function (response, options) {
                if (grid) {
                    grid.unmask();
                }
                Ext.Msg.alert('Error', 'Ocurrió un problema de comunicación con el servidor.');
            }
        });
    },
    onDownloadICCS: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const ccust = data.CCUST;
        const filename = data.NAMEFILE;
        const yearFile = data.YEARFILE;

        if (!ccust || !filename || !yearFile) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (Customer, Filename o Year).');
            return;
        }

        const url = prototype.url + '/getCSVIccs'
                + '?ccust=' + encodeURIComponent(ccust)
                + '&filename=' + encodeURIComponent(filename)
                + '&yearFile=' + encodeURIComponent(yearFile);

        console.log('Solicitando:', url);

        global.getFile(url);
    },

    onGridDetBankChargue: function (column, e, row, colIndex, x, rowData) {
        me.beanDet = {};
        let data = rowData.data;

        let stVal = '';
        switch (colIndex) {
            case 2:
                stVal = '1';
                break;
            case 4:
                stVal = '5';
                break;
            case 5:
                stVal = '3';
                break;
            default:
                stVal = '';
                break;
        }

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetBank';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        me.beanDet.IN_CCUST = Ext.getCmp(prototype.id + '-typeSociety').getValue() || '';
        me.beanDet.IN_STVAL = stVal;
        me.beanDet.IN_SEARCH = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || '';
        me.beanDet.IN_FECHA_FROM = data.ADATE;
        me.beanDet.IN_FECHA_TO = data.ADATE;
        me.beanDet.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.beanDet.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCurrency').getValue() || '';
        me.paramsDetailBank.beanString = JSON.stringify(this.beanDet);
        this.setGridDetBankChargue();
    },
    setGridDetBankChargue: function () {
        me.detBankMode = 'chargue';
        win.lblUser_toolTip("Estructura: MPF287");

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetBankChargue'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailBank;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin12');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;

                        var detGrid = Ext.getCmp(prototype.id + '-gridBoxDetBank');
                        detGrid.setTitle('<center style="font-size:12px;color:black;font-weight:bold;">' + me.beanDet.IN_FECHA_FROM + '</center>');
                        if (detGrid.header) {
                            var headerEl = detGrid.header.getEl();
                            if (headerEl) {
                                headerEl.setStyle('background-color', '#c9daf5');
                            }
                        }
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridBoxDetBank').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
        this.getPaggin();
    },

    onGridDetCarteraChargue: function (column, e, row, colIndex, x, rowData) {
        me.beanDet = {};
        var data = rowData.data;
        var isLeaf = data.leaf === true;

        var stVal = '';
        switch (colIndex) {
            case 4:  stVal = '1'; break; // Auto   -> Match
            case 6:  stVal = '1'; break; // Manual -> Match
            case 8:  stVal = '2'; break; // Falta Pago
            case 10: stVal = '3'; break; // Falta Factura
            case 12: stVal = '4'; break; // Factura Pendiente
            case 14: stVal = '5'; break; // Pendiente Pago
            case 16: stVal = '6'; break; // No Esta en Libera
            case 18: stVal = '7'; break; // Falta Pago / Dif en Libera
            case 20: stVal = '8'; break; // Match con Observaciones
            default: stVal = ''; break;  // Total o NOMBRE1 -> todos
        }

        // padre -> mes completo sin filtro de aerolinea
        // hijo  -> mes del padre + filtro por NOMBRE1
        var adate   = data.ADATE || '';
        var nombre1 = isLeaf ? (data.NOMBRE1 || '') : '';

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetCartera';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        me.beanDet.IN_CCUST       = Ext.getCmp(prototype.id + '-typeSocietyARC').getValue() || '';
        me.beanDet.IN_STVAL       = stVal;
        me.beanDet.IN_SEARCH      = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue() || '';
        me.beanDet.IN_FECHA_FROM  = adate;
        me.beanDet.IN_FECHA_TO    = adate;
        me.beanDet.IN_COUNTRY     = Ext.getCmp(prototype.id + '-cmbCountryARC').getValue() || '';
        me.beanDet.IN_SCURRENCY   = Ext.getCmp(prototype.id + '-cmbCurrencyARC').getValue() || '';
        me.beanDet.IN_NOMBRE1     = nombre1;
        me.paramsDetailCartera    = { beanString: JSON.stringify(me.beanDet) };
        this.setGridDetCarteraChargue();
    },
    setGridDetCarteraChargue: function () {
        win.lblUser_toolTip("Estructura: MPF288");

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCarteraChargue'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailCartera;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin12');
                    if (pag) {
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found.' });
                    } else {
                        var detGrid = Ext.getCmp(prototype.id + '-gridBoxDetCartera');
                        var titulo = me.beanDet.IN_NOMBRE1
                            ? me.beanDet.IN_FECHA_FROM + ' | ' + me.beanDet.IN_NOMBRE1
                            : me.beanDet.IN_FECHA_FROM;
                        detGrid.setTitle('<center style="font-size:12px;color:black;font-weight:bold;">' + titulo + '</center>');
                        if (detGrid.header) {
                            var headerEl = detGrid.header.getEl();
                            if (headerEl) { headerEl.setStyle('background-color', '#c9daf5'); }
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridBoxDetCartera').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
        this.getPaggin();
    },







}
);