
Ext.define('Ext.Praxis.controller.payments.Cash.CashController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CashController',
    fecha: new Date(),
    bean: {},
    beanSecundary: {},
    drillDown: [],
    lstCountry: [],
    panelActual: '',
    me: '',
    IN_SOCIETY: '',
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
            '#CashForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#CashForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
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
            }
        });
        // </editor-fold>
    },
    xpanel_afterrender: function (obj, e) {
        me.obtainData();
        me.btnSearch_click();
    },
    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

//        var cmbPERNUM = Ext.getCmp(prototype.id + '-cmbPERNUM');
//        cmbPERNUM.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "All"],
//                ["01", "01"],
//                ["02", "02"],
//                ["03", "03"],
//                ["04", "04"]
//            ]
//        }));
//        cmbPERNUM.setValue("");

//        var cmbPROCIND = Ext.getCmp(prototype.id + '-cmbPROCIND');
//        cmbPROCIND.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "All"],
//                ["1", "1 - BILLED ELECTRONICALLY"],
//                ["2", "2 - BILLED ELECTRONICALLY"],
//                ["3", "3"],
//                ["4", "4 - NOT PRESENTED TO CARD COMPANY"]
//            ]
//        }));
//        cmbPROCIND.setValue("");

//        var cmbTRANSTYPE = Ext.getCmp(prototype.id + '-cmbTRANSTYPE');
//        cmbTRANSTYPE.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["S", "SALES"],
//                ["R", "REFUNDS"]
//            ]
//        }));
//        cmbTRANSTYPE.setValue("S");

        this.dataObtain.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    COUNTRY: 2, CARD: 2, USERPERMIS: 2, NPROG: sessionStorage.getItem('nprog')
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    win.setValue('cmbCountry', '');
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    changeView: function (obj, e) {
        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.setDateFilters(selected);
        me.btnSearch_click();
    },
    btnSearch_click: function (obj, e) {
        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];

        if (selected === 0) {
            Ext.getCmp(prototype.id + '-titleFieldsetSale').setVisible(false);
            Ext.getCmp(prototype.id + '-titleFieldsetAccounting').setVisible(false);
            this.setFormatParameterDashboard();
            this.setGridDataDashboard();
        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-titleFieldsetSale').setVisible(true);
            Ext.getCmp(prototype.id + '-titleFieldsetAccounting').setVisible(true);
            this.setFormatParameterDetailSecundary();
            this.setGridDataDetailSecundary();
        }
    },
    setFormatParameterDetailSecundary: function () {
        me.beanSecundary = {};

        me.beanSecundary.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        me.beanSecundary.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.beanSecundary.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSociety').getValue();
        me.beanSecundary.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.beanSecundary.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        me.beanSecundary.IN_AGENT = Ext.getCmp(prototype.id + '-txtAGENTE').getValue();
        me.beanSecundary.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
        me.beanSecundary.IN_STATUSACC = Ext.getCmp(prototype.id + '-cmbStatusAccounting').getValue();

        var beanString = JSON.stringify(me.beanSecundary);
        me.searchParamsSecundary = {
            bean: me.beanSecundary,
            beanString: beanString
        };

        console.log(me.searchParamsSecundary, 'setFormatParameterDetailSecundary')
    },
    setGridDataDetailSecundary: function () {
        win.lblUser_toolTip("Estructura: MPF108");
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
    setFormatParameterDashboard: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'setFormatParameterDashboard')
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
    onGridDataDetailPrincipal: function (IN_ACCOUNT, column, e, rowIndex, colIndex, rowData) {
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};

        if (esPadre) {
            me.bean.IN_SOCIETY = "";
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
        }
        
        me.bean.IN_FECHA_FROM = fecha;
        me.bean.IN_FECHA_TO = fecha;
        me.bean.IN_ACCOUNT = IN_ACCOUNT;

        me.paramsDetailSource.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'searchParamsDetailPrincipal');
        this.setGridDataDetailPrincipal();
    },
    setGridDataDetailPrincipal: function () {
        if (me.panelActual !== '-panelGridDataDetailPrincipal') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailPrincipal';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF300");
        console.log(me.panelActual, 'me.panelActual')
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
        Ext.getCmp(prototype.id + '-gridDataDetailPrincipal').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        me.getPaggin();
    },
    onGridDataDetailPrincipalSource: function (IN_ACCOUNT, column, e, rowIndex, colIndex, rowData) {
        let rowPadre = rowData.record.data;
        me.bean = {};
        console.log(rowPadre, 'rowPadre')
        me.bean.IN_SOCIETY = me.IN_SOCIETY
        me.bean.IN_FECHA_FROM = rowPadre.SDATE;
        me.bean.IN_FECHA_TO = rowPadre.SDATE;
        me.bean.IN_ACCOUNT = IN_ACCOUNT;
        me.bean.IN_CFUENTE = (rowPadre.CFUENTE || "").trim();

        me.paramsDetailSource.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'searchParamsDetailPrincipal');
        this.setGridDataDetailPrincipalSource();
    },
    setGridDataDetailPrincipalSource: function () {
        if (me.panelActual !== '-panelGridDataDetailPrincipalSource') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailPrincipalSource';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF300");
        console.log(me.panelActual, 'me.panelActual')
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
        Ext.getCmp(prototype.id + '-gridDataDetailPrincipalSource').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        me.getPaggin();
    },
    onGridDataDetailSource: function (column, e, rowIndex, colIndex, rowData) {
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};

        if (esPadre) {
            me.bean.IN_SOCIETY = "";
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
        }

        me.bean.IN_FECHA_FROM = fecha;
        me.bean.IN_FECHA_TO = fecha;
        me.IN_SOCIETY = me.bean.IN_SOCIETY
        me.paramsDetailSource.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'searchParams');
        this.setGridDataDetailSource();
    },
    setGridDataDetailSource: function () {
        if (me.panelActual !== '-panelGridDataDetail') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetail';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        win.lblUser_toolTip("Estructura: MPF300");
        console.log(me.panelActual, 'me.panelActual')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailSource'
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
        Ext.getCmp(prototype.id + '-gridDataDetailSource').bindStore(storeGridDatas);
        me.getPaggin();
    },
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
    btnExcel_click: function (obj, e) {
        console.log(me.searchParamsSecundary)
        console.log(this.searchParamsSecundary)
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
            case  '-panelGridDataDetailSecundary':
                global.getFile(prototype.url + '/getXLSXDetailSecundary?beanString=' + encodeURI(me.searchParamsSecundary.beanString));
                break;
            case  '-panelGridDataDetailPrincipal':
                global.getFile(prototype.url + '/getXLSXDetailPrincipal?beanString=' + encodeURI(me.paramsDetailSource.beanString));
                break;
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURIComponent(searchParams.beanString));
                break;
            case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSXDashboardSource?beanString=' + encodeURIComponent(me.paramsDetailSource.beanString));
                break;
            case  '-panelGridDataDetailPrincipalSource':
                global.getFile(prototype.url + '/getXLSXDetailPrincipalSource?beanString=' + encodeURI(me.paramsDetailSource.beanString));
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilidades">
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataDetailPrincipal':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                break;
            case  '-panelGridDataDetailSecundary':
                me.pagginActual = '-paggin2';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                break;
            case  '-panelGridDataDetailPrincipalSource':
                me.pagginActual = '-paggin3';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                break;
            default:
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break;
        }
    },
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
    setDateFilters: function (mode) {
        let year = this.fecha.getFullYear();
        let month = (this.fecha.getMonth() + 1).toString().padStart(2, '0');
        let day = this.fecha.getDate().toString().padStart(2, '0');

        if (mode === 0) {

            Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');

            Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(year);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        }

        if (mode === 1) {

            Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('06');
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
//            Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('01');

            Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(year);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('06');
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
//            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('01');
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
        console.log("FAAA")
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
    // </editor-fold>
}
);