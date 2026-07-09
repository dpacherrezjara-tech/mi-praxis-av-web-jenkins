Ext.define('Ext.Praxis.controller.payments.Cash.CashController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CashController',
    isDashboardCash: true,
    isDashboardCredit: true,
    IN_SOCIETY_CASH: '',
    IN_SOCIETY_CREDIT: '',

    fecha: new Date(),
    bean: {},
    beanSecundary: {},
    drillDown: [],
    lstCountry: [],
    panelActual: '',
    me: '',

    searchParams: {},
    searchParamsSecundary: {},
    paramsDetailSource: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'CashForm';
        prototype.url = CONTEXTPATH + '/Cash';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-vskMain').items.items;
        me.panelActual = '-boxMainData';
        prototypeProgram.view = 'payments-cash-form';
        prototypeProgram.nprog = 'PX00001023';
        prototypeProgram.title = 'Cash';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
            '#CashForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CashForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CashForm-btnClear': {
                click: this.btnClear_click
            },
            '#CashForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CashForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CashForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CashForm-btnBack': {
                click: this.btnBack_click
            },
            '#CashForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CashForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CashForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CashForm-btn-pag-last': {
                click: this.pagLast
            },
            '#CashForm-cmbDateFromYearCash': {
                select: this.selectComboFromYearCash
            },
            '#CashForm-cmbDateFromMonthCash': {
                select: this.selectComboFromMonthCash
            },
            '#CashForm-cmbDateFromDayCash': {
                select: this.selectComboFromDayCash
            },
            '#CashForm-cmbDateFromYearCredit': {
                select: this.selectComboFromYearCredit
            },
            '#CashForm-cmbDateFromMonthCredit': {
                select: this.selectComboFromMonthCredit
            },
            '#CashForm-cmbDateFromDayCredit': {
                select: this.selectComboFromDayCredit
            },
        });
        // </editor-fold>
    },
    xpanel_afterrender: function (obj, e) {

        $('#CashForm-btnToggleSwitchCashCD').on('change', function () {
            me.showFiltersCash();
            me.btnSearch_click();
        });

        $('#CashForm-btnToggleSwitchCreditCD').on('change', function () {
            me.showFiltersCredit();
            me.btnSearch_click();
        });

        me.obtainData();
        me.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Obtener Data ">
    obtainData: function () {

        let fechaHoy = new Date();
        let year = fechaHoy.getFullYear();
        let month = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // "01" – "12"
        let day = String(fechaHoy.getDate()).padStart(2, '0');

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYearCash').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDayCash').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYearCredit').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthCredit').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDayCredit').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYearCash').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDayCash').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateFromYearCredit').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonthCredit').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDayCredit').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateToYearCash').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonthCash').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDayCash').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYearCredit').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonthCredit').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDayCredit').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYearCash').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonthCash').setValue('12');
        Ext.getCmp(prototype.id + '-cmbDateToDayCash').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateToYearCredit').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonthCredit').setValue('12');
        Ext.getCmp(prototype.id + '-cmbDateToDayCredit').setValue('');

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    CFUENTECASH: 2, COUNTRY: 2
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    Ext.getCmp(prototype.id + '-cmbCountryCash').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );

                    Ext.getCmp(prototype.id + '-cmbCountryCredit').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    win.setValue('cmbCountryCash', '');
                    win.setValue('cmbCountryCredit', '');

                    var allowedCodes = ['All', 'BSP', 'ARC'];
                    var filteredCfuente = res.lstsCfuenteCash.filter(function(item) {
                        return allowedCodes.indexOf(item.NAME) !== -1;
                    });
                    filteredCfuente.push({CCUST: '', CODE: 'VTA-DIRECTA', NAME: 'VTA-DIRECTA', COUNTRY: '', CURRENC: ''});

                    Ext.getCmp(prototype.id + '-cmbCfuenteCash').bindStore(
                            Ext.create('Ext.data.Store', {data: filteredCfuente, autoLoad: true})
                            );

                    Ext.getCmp(prototype.id + '-cmbCfuenteCredit').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstsCfuenteCash, autoLoad: true})
                            );
                    win.setValue('cmbCfuenteCash', '');
                    win.setValue('cmbCfuenteCredit', '');

                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Buscar en Credito o Cash ">
    btnSearch_click: function (obj, e) {
        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];

        if (selected === 0) {
            Ext.getCmp(prototype.id + '-panelCash').setVisible(true);
            Ext.getCmp(prototype.id + '-panelCredit').setVisible(false);
            if (me.isDashboardCash) {
                this.setFormatParameterDashboard();
                this.setGridDataDashboard();
            } else {
                this.setFormatParameterDetailSecundary();
                this.setGridDataDetailSecundary();
            }
        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-panelCash').setVisible(false);
            Ext.getCmp(prototype.id + '-panelCredit').setVisible(true);
            if (me.isDashboardCredit) {
                this.setFormatParameterDashboardCredit();
                this.setGridDataDashboardCredit();
            } else {
                this.setFormatParameterDetailSecundaryCredit();
                this.setGridDataDetailSecundaryCredit();
            }
        }
    },
    // </editor-fold>

    // SOLO CASH
    // <editor-fold defaultstate="collapsed" desc="Mostrar Filtros Detalle Cash ">
    showFiltersCash: function () {
        var toggleComponent = Ext.getCmp(prototype.id + '-btnToggleSwitchCashCD');
        if (!toggleComponent) {
            console.error('Toggle component not found');
            return;
        }

        var panelId = prototype.id + '-panelHeight';
        var panel = Ext.getCmp(panelId);

        var checkbox = toggleComponent.getEl().down('input[type="checkbox"]');
        if (checkbox) {
            var isChecked = checkbox.dom.checked;

            var dayFromCash = Ext.getCmp(prototype.id + '-cmbDateFromDayCash');
            var dayToCash = Ext.getCmp(prototype.id + '-cmbDateToDayCash');
            var monthFromCash = Ext.getCmp(prototype.id + '-cmbDateFromMonthCash');
            var monthToCash = Ext.getCmp(prototype.id + '-cmbDateToMonthCash');
            var yearFromCash = Ext.getCmp(prototype.id + '-cmbDateFromYearCash');
            var yearToCash = Ext.getCmp(prototype.id + '-cmbDateToYearCash');
            var societyCash = Ext.getCmp(prototype.id + '-typeSocietyCash');
            var inputDateCash = Ext.getCmp(prototype.id + '-cmbInputDateCash');

            if (isChecked) {

                var fechaHoy = new Date();
                var yearActual = fechaHoy.getFullYear();
                var monthActual = String(fechaHoy.getMonth() + 1).padStart(2, '0');
                var dayActual = String(fechaHoy.getDate()).padStart(2, '0');

                yearFromCash.setValue(yearActual);
                monthFromCash.setValue(monthActual);
                dayFromCash.setValue('01');  // Primero del mes

                yearToCash.setValue(yearActual);
                monthToCash.setValue(monthActual);
                dayToCash.setValue(dayActual);  // Día actual

                Ext.getCmp(prototype.id + '-titleFieldsetAccounting').setVisible(true);
                Ext.getCmp(prototype.id + '-titleFieldsetSale').setVisible(true);
                dayFromCash.setDisabled(false);
                dayToCash.setDisabled(false);
                societyCash.setDisabled(false);
                inputDateCash.setDisabled(true);
                inputDateCash.setValue('1');

                monthFromCash.setDisabled(false);
                monthToCash.setDisabled(false);

                me.isDashboardCash = false;
                panel.setHeight(580);

            } else {
                var yearActual = new Date().getFullYear();

                yearFromCash.setValue(yearActual);
                monthFromCash.setValue('01');  // Enero
                dayFromCash.setValue('');  // Vacío o '01'

                yearToCash.setValue(yearActual);
                monthToCash.setValue('12');  // Diciembre
                dayToCash.setValue('');  // Vacío o '31'

                Ext.getCmp(prototype.id + '-titleFieldsetAccounting').setVisible(false);
                Ext.getCmp(prototype.id + '-titleFieldsetSale').setVisible(false);
                dayFromCash.setDisabled(true);
                dayToCash.setDisabled(true);
                societyCash.setDisabled(true);
                inputDateCash.setDisabled(false);

                me.isDashboardCash = true;
                panel.setHeight(680);
            }
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Dashboard Cash ">
    setFormatParameterDashboard: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthCash').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCash').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCash').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'setFormatParameterDashboard');
    },
    setGridDataDashboard: function () {
        win.lblUser_toolTip("Estructura: MPF108");
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxConsultas').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxConsultas').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }

                    // Convertir Ext data → arreglo plano
                    let lstData = obj.data.items.map(v => v.data);

                    // Tomar el último (que trae acumulados desde Java)
                    const ultimo = lstData[lstData.length - 1];

                    let TOTAL_QSALES = ultimo.TOTAL_QSALES;
                    let TOTAL_QMATCH = ultimo.TOTAL_QMATCH;
                    let TOTAL_QMANUAL = ultimo.TOTAL_QMANUAL;
                    let TOTAL_QPEND = ultimo.TOTAL_QPEND;
                    let TOTAL_PCT_MATCH = ultimo.TOTAL_PCT_MATCH;
                    let TOTAL_QPOLIPE = ultimo.TOTAL_QPOLIPE;
                    let TOTAL_QPOLIC = ultimo.TOTAL_QPOLIC;

                    // ---------- CONSTRUCCIÓN DEL TREE ----------
                    let mesesProcesados = [];
                    let dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Array.each(lstData, function (value) {
                        let mes = value.strFormatDate;

                        if (!mesesProcesados.includes(mes)) {

                            // Acumulados por MES
                            let V_QSALES = 0, V_QMATCH = 0, V_QMANUAL = 0, V_QPEND = 0, V_QPOLIPE = 0, V_QPOLIC = 0;

                            Ext.Array.each(lstData, function (v) {
                                if (mes === v.strFormatDate) {
                                    V_QSALES += v.QSALES;
                                    V_QMATCH += v.QMATCH;
                                    V_QMANUAL += v.QMANUAL;
                                    V_QPEND += v.QPEND;
                                    V_QPOLIPE += v.QPOLIPE;
                                    V_QPOLIC += v.QPOLIC;
                                }
                            });

                            // % por mes
                            let pctMes = 0;
                            if (V_QSALES > 0) {
                                pctMes = ((V_QMATCH + V_QMANUAL) * 100) / V_QSALES;
                            }

                            mesesProcesados.push(mes);

                            let nodoMes = {
                                strFormatDate: mes,
                                QSALES: V_QSALES,
                                QMATCH: V_QMATCH,
                                QMANUAL: V_QMANUAL,
                                QPEND: V_QPEND,
                                PCT_MATCH: pctMes,
                                QPOLIPE: V_QPOLIPE,
                                QPOLIC: V_QPOLIC,
                                expanded: false,
                                children: []
                            };

                            // Insertar sociedades hijas
                            Ext.Array.each(lstData, function (det) {
                                if (det.strFormatDate === mes) {
                                    nodoMes.children.push({
                                        strFormatDate: det.strFormatDate,
                                        CCUST: det.CCUST,
                                        QSALES: det.QSALES,
                                        QMATCH: det.QMATCH,
                                        QMANUAL: det.QMANUAL,
                                        QPEND: det.QPEND,
                                        PCT_MATCH: det.PCT_MATCH,
                                        QPOLIPE: det.QPOLIPE,
                                        QPOLIC: det.QPOLIC,
                                        leaf: true
                                    });
                                }
                            });

                            dataRoot.children.push(nodoMes);
                        }
                    });

                    // Setear TreeStore
                    let storeTree = Ext.create('Ext.data.TreeStore', {root: dataRoot});
                    Ext.getCmp(prototype.id + '-gridSumaryMain').setStore(storeTree);

                    Ext.getCmp(prototype.id + '-TOTAL_QSALES').setText(Ext.util.Format.number(TOTAL_QSALES, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QMATCH').setText(Ext.util.Format.number(TOTAL_QMATCH, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_PCT_MATCH').setText(Ext.util.Format.number(TOTAL_PCT_MATCH, '0.00') + ' %');
                    Ext.getCmp(prototype.id + '-TOTAL_QMANUAL').setText(Ext.util.Format.number(TOTAL_QMANUAL, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPEND').setText(Ext.util.Format.number(TOTAL_QPEND, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLIPE').setText(Ext.util.Format.number(TOTAL_QPOLIPE, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLIC').setText(Ext.util.Format.number(TOTAL_QPOLIC, '0,000'));

                    let dataBar = [];

                    Ext.Array.each(dataRoot.children, function (mes) {

                        let matchMes = mes.QMATCH + mes.QMANUAL;

                        dataBar.push({
                            month: mes.strFormatDate, // Ej: 2025-Jan
                            TicketTotal: mes.QSALES,
                            TicketMatch: matchMes,
                            TicketPending: mes.QPEND
                        });
                    });

                    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                    dataBar.sort((a, b) => {
                        const [yearA, monA] = a.month.split('-');
                        const [yearB, monB] = b.month.split('-');

                        const diffYear = parseInt(yearA) - parseInt(yearB);
                        if (diffYear !== 0)
                            return diffYear;

                        return monthOrder.indexOf(monA) - monthOrder.indexOf(monB);
                    });

                    let chart = Ext.getCmp(prototype.id + '-displayBarSM');

                    chart.setStore({
                        fields: ['month', 'TicketTotal', 'TicketMatch', 'TicketPending'],
                        data: dataBar
                    });

                    let serie = chart.getSeries()[0];
                    serie.setXField('month');
                    serie.setYField(['TicketTotal', 'TicketMatch', 'TicketPending']);
                    serie.setTitle(['Total', 'Match', 'Pending']);

                }
            }
        });
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada por Fuente Cash ">
    onGridDataDetailSource: function (column, e, rowIndex, colIndex, rowData) {
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};

        const societyNamesCash = {'133': 'LACSA', '134': 'AVIANCA', '202': 'TACA', '547': 'AEROGAL'};

        let societyLabel;
        if (esPadre) {
            me.bean.IN_SOCIETY = "";
            societyLabel = 'AV GROUP';
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
            societyLabel = societyNamesCash[rowPadre.CCUST] || rowPadre.CCUST;
        }

        me.bean.IN_FECHA_FROM = fecha;
        me.bean.IN_FECHA_TO = fecha;
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCash').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCash').getValue();
        me.IN_SOCIETY_CASH = me.bean.IN_SOCIETY;
        me.paramsDetailSource.beanString = JSON.stringify(me.bean);

        let lblContext = Ext.getCmp(prototype.id + '-lblContextDetailSourceCash');
        if (lblContext) {
            lblContext.setText(societyLabel + '  —  ' + rowPadre.strFormatDate);
        }

        console.log(me.bean, 'searchParams');
        this.setGridDataDetailSource();
    },
    setGridDataDetailSource: function () {
        if (me.panelActual !== '-panelGridDataDetailCash') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailCash';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF300");
        console.log(me.panelActual, 'me.panelActual');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailSourceCash'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailSource;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }

                    // Último registro
                    let lastRecord = obj.last();
                    let lastData = lastRecord.data;

                    let TOTAL_QSALES = lastData.TOTAL_QSALES;
                    let TOTAL_QMATCH = lastData.TOTAL_QMATCH;
                    let TOTAL_QMANUAL = lastData.TOTAL_QMANUAL;
                    let TOTAL_QPEND = lastData.TOTAL_QPEND;
                    let TOTAL_PCT_MATCH = lastData.TOTAL_PCT_MATCH;
                    let TOTAL_QPOLIPE = lastData.TOTAL_QPOLIPE;
                    let TOTAL_QPOLIC = lastData.TOTAL_QPOLIC;

                    Ext.getCmp(prototype.id + '-TOTAL_QSALES_SOURCE').setText(Ext.util.Format.number(TOTAL_QSALES, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QMATCH_SOURCE').setText(Ext.util.Format.number(TOTAL_QMATCH, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_PCT_MATCH_SOURCE').setText(Ext.util.Format.number(TOTAL_PCT_MATCH, '0.00') + ' %');
                    Ext.getCmp(prototype.id + '-TOTAL_QMANUAL_SOURCE').setText(Ext.util.Format.number(TOTAL_QMANUAL, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPEND_SOURCE').setText(Ext.util.Format.number(TOTAL_QPEND, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLIPE_SOURCE').setText(Ext.util.Format.number(TOTAL_QPOLIPE, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLIC_SOURCE').setText(Ext.util.Format.number(TOTAL_QPOLIC, '0,000'));

                    let lst = obj.data.items.map(v => v.data);

                    let dataBar = [];

                    Ext.Array.each(lst, function (value) {

                        let matchTotal = value.QMATCH + value.QMANUAL;

                        dataBar.push({
                            source: value.CFUENTE,
                            TicketTotal: value.QSALES,
                            TicketMatch: matchTotal,
                            TicketPending: value.QPEND
                        });
                    });

                    dataBar.sort(function (a, b) {
                        return b.TicketTotal - a.TicketTotal;
                    });

                    let chart = Ext.getCmp(prototype.id + '-displayBarSMSource');

                    chart.setStore({
                        fields: ['source', 'TicketTotal', 'TicketMatch', 'TicketPending'],
                        data: dataBar
                    });

                    let serie = chart.getSeries()[0];

                    serie.setXField('source');
                    serie.setYField(['TicketTotal', 'TicketMatch', 'TicketPending']);
                    serie.setTitle(['Total', 'Match', 'Pending']);

                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSourceCash').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada pendientes Fuente Cash ">
    onGridDataDetailPrincipalSource: function (IN_ACCOUNT, column, e, rowIndex, colIndex, rowData) {
        let rowPadre = rowData.record.data;
        me.bean = {};

        const societyNamesCash = {'133': 'LACSA', '134': 'AVIANCA', '202': 'TACA', '547': 'AEROGAL'};
        const accountLabelsCash = {'': 'Tickets W/O Settlement', 'C': 'Tickets Pending Accounted'};

        me.bean.IN_SOCIETY = me.IN_SOCIETY_CASH;
        me.bean.IN_FECHA_FROM = rowPadre.SDATE;
        me.bean.IN_FECHA_TO = rowPadre.SDATE;
        me.bean.IN_ACCOUNT = IN_ACCOUNT;
        me.bean.IN_CFUENTE = (rowPadre.CFUENTE || "").trim();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCash').getValue();

        me.paramsDetailSource.beanString = JSON.stringify(me.bean);

        let lblContext = Ext.getCmp(prototype.id + '-lblContextPrincipalSourceCash');
        if (lblContext) {
            let societyLabel = societyNamesCash[me.IN_SOCIETY_CASH] || 'AV GROUP';
            let tipoBajada = accountLabelsCash[IN_ACCOUNT] || '';
            lblContext.setText(societyLabel + '  —  ' + rowPadre.SDATE + '  —  ' + tipoBajada);
        }

        console.log(me.bean, 'searchParamsDetailPrincipal');
        this.setGridDataDetailPrincipalSource();
    },
    setGridDataDetailPrincipalSource: function () {
        if (me.panelActual !== '-panelGridDataDetailPrincipalSourceCash') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailPrincipalSourceCash';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF300");
        console.log(me.panelActual, 'me.panelActual');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailPrincipalSource'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailSource;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    console.log(obj.data, 'obj.data')
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailPrincipalSourceCash').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada pendientes  Cash ">
    onGridDataDetailPrincipal: function (IN_ACCOUNT, column, e, rowIndex, colIndex, rowData) {
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};

        const societyNamesCash = {'133': 'LACSA', '134': 'AVIANCA', '202': 'TACA', '547': 'AEROGAL'};
        const accountLabelsCash = {'': 'Tickets W/O Settlement', 'C': 'Tickets Pending Accounted'};

        let societyLabel;
        if (esPadre) {
            me.bean.IN_SOCIETY = "";
            societyLabel = 'AV GROUP';
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
            societyLabel = societyNamesCash[rowPadre.CCUST] || rowPadre.CCUST;
        }

        me.bean.IN_FECHA_FROM = fecha;
        me.bean.IN_FECHA_TO = fecha;
        me.bean.IN_ACCOUNT = IN_ACCOUNT;
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCash').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCash').getValue();

        me.paramsDetailSource.beanString = JSON.stringify(me.bean);

        let lblContext = Ext.getCmp(prototype.id + '-lblContextPrincipalCash');
        if (lblContext) {
            let tipoBajada = accountLabelsCash[IN_ACCOUNT] || '';
            lblContext.setText(societyLabel + '  —  ' + rowPadre.strFormatDate + '  —  ' + tipoBajada);
        }

        console.log(me.bean, 'searchParamsDetailPrincipal');
        this.setGridDataDetailPrincipal();
    },
    setGridDataDetailPrincipal: function () {
        if (me.panelActual !== '-panelGridDataDetailPrincipalCash') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailPrincipalCash';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF300");
        console.log(me.panelActual, 'me.panelActual');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailPrincipal'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailSource;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    console.log(obj.data, 'obj.data')
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailPrincipalCash').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Detalle Cash ">
    setFormatParameterDetailSecundary: function () {
        me.beanSecundary = {};

        me.beanSecundary.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDayCash').getValue();
        me.beanSecundary.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayCash').getValue();
        me.beanSecundary.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyCash').getValue();
        me.beanSecundary.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.beanSecundary.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCash').getValue();
        me.beanSecundary.IN_SPAYMENT = Ext.getCmp(prototype.id + '-paymentMethodCash').getValue();
        me.beanSecundary.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatusCash').getValue();
        me.beanSecundary.IN_AGENT = Ext.getCmp(prototype.id + '-txtAGENTECash').getValue();
        me.beanSecundary.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKETCash').getValue();
        me.beanSecundary.IN_INVOICE = Ext.getCmp(prototype.id + '-txtINVOICECash').getValue();
        me.beanSecundary.IN_CURRENCY = Ext.getCmp(prototype.id + '-txtCURRENCYCash').getValue();
        me.beanSecundary.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOCCash').getValue();
        me.beanSecundary.IN_STATUSACC = Ext.getCmp(prototype.id + '-cmbStatusAccountingCash').getValue();
        me.beanSecundary.IN_TDOC = Ext.getCmp(prototype.id + '-DOCTYPECash').getValue();

        var beanString = JSON.stringify(me.beanSecundary);
        me.searchParamsSecundary = {
            bean: me.beanSecundary,
            beanString: beanString
        };

        console.log(me.searchParamsSecundary, 'setFormatParameterDetailSecundary')
    },
    setGridDataDetailSecundary: function () {
        win.lblUser_toolTip("Estructura: MPF300");
        me.panelActual = '-panelGridDataDetailSecundary';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailSecundary'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParamsSecundary;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSecundary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // SOLO CREDITO

    // <editor-fold defaultstate="collapsed" desc="Mostrar Filtros Detalle Credito ">
    showFiltersCredit: function () {
        var toggleComponent = Ext.getCmp(prototype.id + '-btnToggleSwitchCreditCD');
        if (!toggleComponent) {
            console.error('Toggle component not found');
            return;
        }

        var checkbox = toggleComponent.getEl().down('input[type="checkbox"]');
        if (checkbox) {
            var isChecked = checkbox.dom.checked;

            var dayFromCredit = Ext.getCmp(prototype.id + '-cmbDateFromDayCredit');
            var dayToCredit = Ext.getCmp(prototype.id + '-cmbDateToDayCredit');
            var monthFromCredit = Ext.getCmp(prototype.id + '-cmbDateFromMonthCredit');
            var monthToCredit = Ext.getCmp(prototype.id + '-cmbDateToMonthCredit');
            var yearFromCredit = Ext.getCmp(prototype.id + '-cmbDateFromYearCredit');
            var yearToCredit = Ext.getCmp(prototype.id + '-cmbDateToYearCredit');
            var societyCredit = Ext.getCmp(prototype.id + '-typeSocietyCredit');
            var inputDateCredit = Ext.getCmp(prototype.id + '-cmbInputDateCredit');

            if (isChecked) {

                var fechaHoy = new Date();
                var yearActual = fechaHoy.getFullYear();
                var monthActual = String(fechaHoy.getMonth() + 1).padStart(2, '0');
                var dayActual = String(fechaHoy.getDate()).padStart(2, '0');

                yearFromCredit.setValue(yearActual);
                monthFromCredit.setValue(monthActual);
                dayFromCredit.setValue('01');  // Primero del mes

                yearToCredit.setValue(yearActual);
                monthToCredit.setValue(monthActual);
                dayToCredit.setValue(dayActual);  // Día actual

//                Ext.getCmp(prototype.id + '-titleFieldsetAccounting').setVisible(true);
                Ext.getCmp(prototype.id + '-titleFieldsetSaleCredit').setVisible(true);
                dayFromCredit.setDisabled(false);
                dayToCredit.setDisabled(false);
                societyCredit.setDisabled(false);
                inputDateCredit.setDisabled(true);
                inputDateCredit.setValue('1');

                monthFromCredit.setDisabled(false);
                monthToCredit.setDisabled(false);

                me.isDashboardCredit = false;

            } else {
                var yearActual = new Date().getFullYear();

                yearFromCredit.setValue(yearActual);
                monthFromCredit.setValue('01');  // Enero
                dayFromCredit.setValue('');  // Vacío o '01'

                yearToCredit.setValue(yearActual);
                monthToCredit.setValue('12');  // Diciembre
                dayToCredit.setValue('');  // Vacío o '31'

//                Ext.getCmp(prototype.id + '-titleFieldsetAccounting').setVisible(false);
                Ext.getCmp(prototype.id + '-titleFieldsetSaleCredit').setVisible(false);
                dayFromCredit.setDisabled(true);
                dayToCredit.setDisabled(true);
                societyCredit.setDisabled(true);
                inputDateCredit.setDisabled(false);

                me.isDashboardCredit = true;
            }
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Dashboard Credito ">
    setFormatParameterDashboardCredit: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYearCredit').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthCredit').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYearCredit').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthCredit').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCredit').getValue();
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCredit').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCredit').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'setFormatParameterDashboard');
    },
    setGridDataDashboardCredit: function () {
        win.lblUser_toolTip("Estructura: MPF108");
        me.panelActual = '-boxMainDataCredit';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCredit'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxConsultas').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxConsultas').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }

                    // Convertir Ext data → arreglo plano
                    let lstData = obj.data.items.map(v => v.data);

                    // Tomar el último (que trae acumulados desde Java)
                    const ultimo = lstData[lstData.length - 1];

                    let TOTAL_QSALES = ultimo.TOTAL_QSALES;
                    let TOTAL_QMATCH = ultimo.TOTAL_QMATCH;
                    let TOTAL_QMANUAL = ultimo.TOTAL_QMANUAL;
                    let TOTAL_QPEND = ultimo.TOTAL_QPEND;
                    let TOTAL_PCT_MATCH = ultimo.TOTAL_PCT_MATCH;
                    let TOTAL_QPOLIPE = ultimo.TOTAL_QPOLIPE;
                    let TOTAL_QPOLIC = ultimo.TOTAL_QPOLIC;

                    // ---------- CONSTRUCCIÓN DEL TREE ----------
                    let mesesProcesados = [];
                    let dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Array.each(lstData, function (value) {
                        let mes = value.strFormatDate;

                        if (!mesesProcesados.includes(mes)) {

                            // Acumulados por MES
                            let V_QSALES = 0, V_QMATCH = 0, V_QMANUAL = 0, V_QPEND = 0, V_QPOLIPE = 0, V_QPOLIC = 0;

                            Ext.Array.each(lstData, function (v) {
                                if (mes === v.strFormatDate) {
                                    V_QSALES += v.QSALES;
                                    V_QMATCH += v.QMATCH;
                                    V_QMANUAL += v.QMANUAL;
                                    V_QPEND += v.QPEND;
                                    V_QPOLIPE += v.QPOLIPE;
                                    V_QPOLIC += v.QPOLIC;
                                }
                            });

                            // % por mes
                            let pctMes = 0;
                            if (V_QSALES > 0) {
                                pctMes = ((V_QMATCH + V_QMANUAL) * 100) / V_QSALES;
                            }

                            mesesProcesados.push(mes);

                            let nodoMes = {
                                strFormatDate: mes,
                                QSALES: V_QSALES,
                                QMATCH: V_QMATCH,
                                QMANUAL: V_QMANUAL,
                                QPEND: V_QPEND,
                                PCT_MATCH: pctMes,
                                QPOLIPE: V_QPOLIPE,
                                QPOLIC: V_QPOLIC,
                                expanded: false,
                                children: []
                            };

                            // Insertar sociedades hijas
                            Ext.Array.each(lstData, function (det) {
                                if (det.strFormatDate === mes) {
                                    nodoMes.children.push({
                                        strFormatDate: det.strFormatDate,
                                        CCUST: det.CCUST,
                                        QSALES: det.QSALES,
                                        QMATCH: det.QMATCH,
                                        QMANUAL: det.QMANUAL,
                                        QPEND: det.QPEND,
                                        PCT_MATCH: det.PCT_MATCH,
                                        QPOLIPE: det.QPOLIPE,
                                        QPOLIC: det.QPOLIC,
                                        leaf: true
                                    });
                                }
                            });

                            dataRoot.children.push(nodoMes);
                        }
                    });

                    // Setear TreeStore
                    let storeTree = Ext.create('Ext.data.TreeStore', {root: dataRoot});
                    Ext.getCmp(prototype.id + '-gridSumaryMainCredit').setStore(storeTree);

                    Ext.getCmp(prototype.id + '-TOTAL_QSALESCREDIT').setText(Ext.util.Format.number(TOTAL_QSALES, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QMATCHCREDIT').setText(Ext.util.Format.number(TOTAL_QMATCH, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_PCT_MATCHCREDIT').setText(Ext.util.Format.number(TOTAL_PCT_MATCH, '0.00') + ' %');
                    Ext.getCmp(prototype.id + '-TOTAL_QMANUALCREDIT').setText(Ext.util.Format.number(TOTAL_QMANUAL, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPENDCREDIT').setText(Ext.util.Format.number(TOTAL_QPEND, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLIPECREDIT').setText(Ext.util.Format.number(TOTAL_QPOLIPE, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLICCREDIT').setText(Ext.util.Format.number(TOTAL_QPOLIC, '0,000'));

                    let dataBar = [];

                    Ext.Array.each(dataRoot.children, function (mes) {

                        let matchMes = mes.QMATCH + mes.QMANUAL;

                        dataBar.push({
                            month: mes.strFormatDate, // Ej: 2025-Jan
                            TicketTotal: mes.QSALES,
                            TicketMatch: matchMes,
                            TicketPending: mes.QPEND
                        });
                    });

                    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                    dataBar.sort((a, b) => {
                        const [yearA, monA] = a.month.split('-');
                        const [yearB, monB] = b.month.split('-');

                        const diffYear = parseInt(yearA) - parseInt(yearB);
                        if (diffYear !== 0)
                            return diffYear;

                        return monthOrder.indexOf(monA) - monthOrder.indexOf(monB);
                    });

                    let chart = Ext.getCmp(prototype.id + '-displayBarSMCredit');

                    chart.setStore({
                        fields: ['month', 'TicketTotal', 'TicketMatch', 'TicketPending'],
                        data: dataBar
                    });

                    let serie = chart.getSeries()[0];
                    serie.setXField('month');
                    serie.setYField(['TicketTotal', 'TicketMatch', 'TicketPending']);
                    serie.setTitle(['Total', 'Match', 'Pending']);

                }
            }
        });
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada por Fuente Credito ">
    onGridDataDetailSourceCredito: function (column, e, rowIndex, colIndex, rowData) {
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};

        const societyNamesCredit = {'133': 'LACSA', '134': 'AVIANCA', '202': 'TACA', '547': 'AEROGAL'};

        let societyLabel;
        if (esPadre) {
            me.bean.IN_SOCIETY = "";
            societyLabel = 'AV GROUP';
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
            societyLabel = societyNamesCredit[rowPadre.CCUST] || rowPadre.CCUST;
        }

        me.bean.IN_FECHA_FROM = fecha;
        me.bean.IN_FECHA_TO = fecha;
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCredit').getValue();
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCredit').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCredit').getValue();
        me.IN_SOCIETY_CREDIT = me.bean.IN_SOCIETY;
        me.paramsDetailSource.beanString = JSON.stringify(me.bean);

        let lblContext = Ext.getCmp(prototype.id + '-lblContextDetailSourceCredit');
        if (lblContext) {
            lblContext.setText(societyLabel + '  —  ' + rowPadre.strFormatDate);
        }

        console.log(me.bean, 'searchParams');
        this.setGridDataDetailSourceCredito();
    },
    setGridDataDetailSourceCredito: function () {
        if (me.panelActual !== '-panelGridDataDetailCredit') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailCredit';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF100");
        console.log(me.panelActual, 'me.panelActual');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailSourceCredit'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailSource;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }

                    // Último registro
                    let lastRecord = obj.last();
                    let lastData = lastRecord.data;

                    let TOTAL_QSALES = lastData.TOTAL_QSALES;
                    let TOTAL_QMATCH = lastData.TOTAL_QMATCH;
                    let TOTAL_QMANUAL = lastData.TOTAL_QMANUAL;
                    let TOTAL_QPEND = lastData.TOTAL_QPEND;
                    let TOTAL_PCT_MATCH = lastData.TOTAL_PCT_MATCH;
                    let TOTAL_QPOLIPE = lastData.TOTAL_QPOLIPE;
                    let TOTAL_QPOLIC = lastData.TOTAL_QPOLIC;

                    Ext.getCmp(prototype.id + '-TOTAL_QSALES_SOURCECredit').setText(Ext.util.Format.number(TOTAL_QSALES, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QMATCH_SOURCECredit').setText(Ext.util.Format.number(TOTAL_QMATCH, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_PCT_MATCH_SOURCECredit').setText(Ext.util.Format.number(TOTAL_PCT_MATCH, '0.00') + ' %');
                    Ext.getCmp(prototype.id + '-TOTAL_QMANUAL_SOURCECredit').setText(Ext.util.Format.number(TOTAL_QMANUAL, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPEND_SOURCECredit').setText(Ext.util.Format.number(TOTAL_QPEND, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLIPE_SOURCECredit').setText(Ext.util.Format.number(TOTAL_QPOLIPE, '0,000'));
                    Ext.getCmp(prototype.id + '-TOTAL_QPOLIC_SOURCECredit').setText(Ext.util.Format.number(TOTAL_QPOLIC, '0,000'));

                    let lst = obj.data.items.map(v => v.data);

                    let dataBar = [];

                    Ext.Array.each(lst, function (value) {

                        let matchTotal = value.QMATCH + value.QMANUAL;

                        dataBar.push({
                            source: value.CFUENTE,
                            TicketTotal: value.QSALES,
                            TicketMatch: matchTotal,
                            TicketPending: value.QPEND
                        });
                    });

                    dataBar.sort(function (a, b) {
                        return b.TicketTotal - a.TicketTotal;
                    });

                    let chart = Ext.getCmp(prototype.id + '-displayBarSMSourceCredit');

                    chart.setStore({
                        fields: ['source', 'TicketTotal', 'TicketMatch', 'TicketPending'],
                        data: dataBar
                    });

                    let serie = chart.getSeries()[0];

                    serie.setXField('source');
                    serie.setYField(['TicketTotal', 'TicketMatch', 'TicketPending']);
                    serie.setTitle(['Total', 'Match', 'Pending']);

                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSourceCredit').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada pendientes Fuente Credito ">
    onGridDataDetailPrincipalSourceCredit: function (IN_ACCOUNT, column, e, rowIndex, colIndex, rowData) {
        let rowPadre = rowData.record.data;
        me.bean = {};

        const societyNamesCredit = {'133': 'LACSA', '134': 'AVIANCA', '202': 'TACA', '547': 'AEROGAL'};
        const accountLabelsCredit = {'': 'Tickets W/O Settlement', 'C': 'Tickets Pending Accounted'};

        me.bean.IN_SOCIETY = me.IN_SOCIETY_CREDIT;
        me.bean.IN_FECHA_FROM = rowPadre.SDATE;
        me.bean.IN_FECHA_TO = rowPadre.SDATE;
        me.bean.IN_ACCOUNT = IN_ACCOUNT;
        me.bean.IN_CFUENTE = (rowPadre.CFUENTE || "").trim();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCredit').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCredit').getValue();

        me.paramsDetailSource.beanString = JSON.stringify(me.bean);

        let lblContext = Ext.getCmp(prototype.id + '-lblContextPrincipalSourceCredit');
        if (lblContext) {
            let societyLabel = societyNamesCredit[me.IN_SOCIETY_CREDIT] || 'AV GROUP';
            let tipoBajada = accountLabelsCredit[IN_ACCOUNT] || '';
            lblContext.setText(societyLabel + '  —  ' + rowPadre.SDATE + '  —  ' + tipoBajada);
        }

        console.log(me.bean, 'searchParamsDetailPrincipal');
        this.setGridDataDetailPrincipalSourceCredit();
    },
    setGridDataDetailPrincipalSourceCredit: function () {
        if (me.panelActual !== '-panelGridDataDetailPrincipalSourceCredit') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailPrincipalSourceCredit';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF100");
        console.log(me.panelActual, 'me.panelActual');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailPrincipalSourceCredit'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailSource;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    console.log(obj.data, 'obj.data')
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailPrincipalSourceCredit').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada pendientes  Credito ">
    onGridDataDetailPrincipalCredit: function (IN_ACCOUNT, column, e, rowIndex, colIndex, rowData) {
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};

        const societyNamesCredit = {'133': 'LACSA', '134': 'AVIANCA', '202': 'TACA', '547': 'AEROGAL'};
        const accountLabelsCredit = {'': 'Tickets W/O Settlement', 'C': 'Tickets Pending Accounted'};

        let societyLabel;
        if (esPadre) {
            me.bean.IN_SOCIETY = "";
            societyLabel = 'AV GROUP';
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
            societyLabel = societyNamesCredit[rowPadre.CCUST] || rowPadre.CCUST;
        }

        me.bean.IN_FECHA_FROM = fecha;
        me.bean.IN_FECHA_TO = fecha;
        me.bean.IN_ACCOUNT = IN_ACCOUNT;
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCredit').getValue();
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCredit').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbInputDateCredit').getValue();

        me.paramsDetailSource.beanString = JSON.stringify(me.bean);

        let lblContext = Ext.getCmp(prototype.id + '-lblContextPrincipalCredit');
        if (lblContext) {
            let tipoBajada = accountLabelsCredit[IN_ACCOUNT] || '';
            lblContext.setText(societyLabel + '  —  ' + rowPadre.strFormatDate + '  —  ' + tipoBajada);
        }

        console.log(me.bean, 'searchParamsDetailPrincipal');
        this.setGridDataDetailPrincipalCredit();
    },
    setGridDataDetailPrincipalCredit: function () {
        if (me.panelActual !== '-panelGridDataDetailPrincipalCredit') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailPrincipalCredit';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF100");
        console.log(me.panelActual, 'me.panelActual');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailPrincipalCredit'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailSource;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    console.log(obj.data, 'obj.data')
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailPrincipalCredit').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Detalle Credito ">
    setFormatParameterDetailSecundaryCredit: function () {
        me.beanSecundary = {};

        me.beanSecundary.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYearCredit').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthCredit').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDayCredit').getValue();
        me.beanSecundary.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYearCredit').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthCredit').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayCredit').getValue();
        me.beanSecundary.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyCredit').getValue();
        me.beanSecundary.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCredit').getValue();
        me.beanSecundary.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbCfuenteCredit').getValue();
        me.beanSecundary.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatusCredit').getValue();
        me.beanSecundary.IN_TDOC = Ext.getCmp(prototype.id + '-DOCTYPECredit').getValue();
        me.beanSecundary.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKETCredit').getValue();
        me.beanSecundary.IN_PNR = Ext.getCmp(prototype.id + '-txtPNRCredit').getValue();
        me.beanSecundary.IN_SCARDN = Ext.getCmp(prototype.id + '-txtSCARDNCredit').getValue();
        me.beanSecundary.IN_SCARDNCOR = Ext.getCmp(prototype.id + '-txtSCARDNCORCredit').getValue();
        me.beanSecundary.IN_AUTHORIZATION = Ext.getCmp(prototype.id + '-txtAUTHORIZATIONCredit').getValue();
        me.beanSecundary.IN_CCTYPE = Ext.getCmp(prototype.id + '-txtCCTYPECredit').getValue();
        me.beanSecundary.IN_AGENT = Ext.getCmp(prototype.id + '-txtAGENTECash').getValue();
        me.beanSecundary.IN_CURRENCY = Ext.getCmp(prototype.id + '-txtCURRENCYCredit').getValue();

        var amountValue = Ext.getCmp(prototype.id + '-txtAMOUNTCredit').getValue();

        if (amountValue === '' || amountValue === null || amountValue === undefined) {
            me.beanSecundary.IN_AMOUNT = 0; 
        } else {
            me.beanSecundary.IN_AMOUNT = parseFloat(amountValue) || 0;
        }

        var beanString = JSON.stringify(me.beanSecundary);
        me.searchParamsSecundary = {
            bean: me.beanSecundary,
            beanString: beanString
        };

        console.log(me.searchParamsSecundary, 'setFormatParameterDetailSecundary')
    },
    setGridDataDetailSecundaryCredit: function () {
        win.lblUser_toolTip("Estructura: MPF100");
        me.panelActual = '-panelGridDataDetailSecundaryCredit';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailSecundaryCredit'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParamsSecundary;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSecundaryCredit').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Helpers ">
    selectComboFromYearCash: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearCash');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearCash');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthCash');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthCash');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonthCash: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthCash');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDayCash: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayCash');
        comboToDay.setValue(obj.getValue());
    },
    selectComboFromYearCredit: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearCredit');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearCredit');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthCredit');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthCredit');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue());
        }
    },
    selectComboFromMonthCredit: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthCredit');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDayCredit: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayCredit');
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
    getPaggin: function () {
        me.pagginActual = '';
        var panel = Ext.getCmp(prototype.id + '-panelHeight');
        switch (me.panelActual) {
            case  '-panelGridDataDetailCash':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                panel.setHeight(740);
                break;
            case  '-panelGridDataDetailPrincipalCash':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                panel.setHeight(600);
                break;
            case  '-panelGridDataDetailPrincipalSourceCash':
                me.pagginActual = '-paggin3';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                panel.setHeight(600);
                break;
            case  '-panelGridDataDetailSecundary':
                me.pagginActual = '-paggin2';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                panel.setHeight(580);
                break;


            case  '-panelGridDataDetailCredit':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                panel.setHeight(740);
                break;
            case  '-panelGridDataDetailPrincipalSourceCredit':
                me.pagginActual = '-paggin3';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                panel.setHeight(600);
                break;
            case  '-panelGridDataDetailPrincipalCredit':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                panel.setHeight(600);
                break;
            case  '-panelGridDataDetailSecundaryCredit':
                me.pagginActual = '-paggin2';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                panel.setHeight(580);
                break;

            default:
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                panel.setHeight(720);
                break;
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Excels ">
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
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURIComponent(searchParams.beanString));
                break;
            case  '-panelGridDataDetailCash':
                global.getFile(prototype.url + '/getXLSXDashboardSource?beanString=' + encodeURIComponent(me.paramsDetailSource.beanString));
                break;
            case  '-panelGridDataDetailPrincipalSourceCash':
                global.getFile(prototype.url + '/getXLSXDetailPrincipalSource?beanString=' + encodeURI(me.paramsDetailSource.beanString));
                break;
            case  '-panelGridDataDetailPrincipalCash':
                global.getFile(prototype.url + '/getXLSXDetailPrincipal?beanString=' + encodeURI(me.paramsDetailSource.beanString));
                break;
            case  '-panelGridDataDetailSecundary':
                global.getFile(prototype.url + '/getXLSXDetailSecundary?beanString=' + encodeURI(me.searchParamsSecundary.beanString));
                break;

//            CREDIT EXCEL
            case  '-boxMainDataCredit':
                global.getFile(prototype.url + '/getXLSXDashboardCredit?beanString=' + encodeURIComponent(searchParams.beanString));
                break;
            case  '-panelGridDataDetailCredit':
                global.getFile(prototype.url + '/getXLSXDashboardSourceCredit?beanString=' + encodeURIComponent(me.paramsDetailSource.beanString));
                break;
            case  '-panelGridDataDetailPrincipalSourceCredit':
                global.getFile(prototype.url + '/getXLSXDetailPrincipalSourceCredit?beanString=' + encodeURI(me.paramsDetailSource.beanString));
                break;
            case  '-panelGridDataDetailPrincipalCredit':
                global.getFile(prototype.url + '/getXLSXDetailPrincipalCredit?beanString=' + encodeURI(me.paramsDetailSource.beanString));
                break;
            case  '-panelGridDataDetailSecundaryCredit':
                global.getFile(prototype.url + '/getXLSXDetailSecundaryCredit?beanString=' + encodeURI(me.searchParamsSecundary.beanString));
                break;
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Actualizar Sumario">
    updateSummarySales: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to update the sales summary?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.executeUpdateSummarySales();
                }
            }
        });
    },
    executeUpdateSummarySales: function () {

        Ext.getCmp(prototype.id + '-boxConsultas').mask('Updating sales summary...');

        // Obtener parámetros necesarios
        var params = {
            beanString: JSON.stringify({
                IN_CCUST: '134'
            })
        };

        // Llamar al endpoint para ejecutar el SP
        Ext.Ajax.request({
            url: prototype.url + '/updateSummary',
            method: 'POST',
            params: params,
            timeout: 300000, // 5 minutos (el SP puede tomar tiempo)
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-boxConsultas').unmask();

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    global.Msg({
                        msg: 'Sales summary updated successfully!',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });

                    me.btnSearch_click();

                    console.log('MPS440 executed:', res.message);
                } else {
                    global.Msg({
                        msg: 'Error updating summary: ' + res.message,
                        icon: Ext.Msg.ERROR
                    });
                }
            },
            failure: function (response, options) {
                Ext.getCmp(prototype.id + '-boxConsultas').unmask();
                global.Msg({
                    msg: 'Server error: ' + response.statusText,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },
    // </editor-fold>































    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.CashForm.DataEntryTicket', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: []
            }
        }).show();
    },

    // <editor-fold defaultstate="collapsed" desc="Utilidades">

    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    btnBack_click: function (obj, e) {
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
//                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-typeSociety').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-txtAGENTE').setValue('');
        Ext.getCmp(prototype.id + '-txtTICKET').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    cbxDateFromYear_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    cbxDateFromMonth_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        if (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() != '') {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(false);
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        }
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
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

    onViewCreditCardClick: function () {
        window.location.hash = 'payments-sales-reconciliation-form';
    }
    // </editor-fold>
}
);