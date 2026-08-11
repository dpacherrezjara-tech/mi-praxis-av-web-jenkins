Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.StatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StatementReconciliationsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanBank: {},
    objDetail: {},
    beanDay: {},
    beanDayByS: {},
    beanLiquida: {},
    beanLiquidaDate: {},
    beanLiquiCash: {},
    beanLiquidaByS: {},
    beanDetails: {},
    beanDetailMPF060: {},
    beanDetBankByS: {},
    beanDetCross: {},
    beanPendings: {},
    beanProceLiqByS: {},
    beanLiqDetail: {},
    beanDayLiqByS: {},
    beanDetailLiqByS: {},
    paginActual: '',
    recGlobal: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    fileLIQvsEC: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    isDashboardCash: true,
    searchParams: {},
    paramsDetail: {},
    paramsDetailSource: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        prototypeProgram.view = 'statement-reconciliations-form';
        prototypeProgram.nprog = 'PX00000287';
        prototypeProgram.title = 'Bank Statement Reconciliations';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
//          -------------------Eventos Genericos --------------------
            '#StatementReconciliationsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#StatementReconciliationsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#StatementReconciliationsForm-btnClear': {
                click: this.btnClear_click
            },
            '#StatementReconciliationsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#StatementReconciliationsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#StatementReconciliationsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#StatementReconciliationsForm-btnBack': {
                click: this.btnBack_click
            },
            '#StatementReconciliationsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#StatementReconciliationsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#StatementReconciliationsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#StatementReconciliationsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#StatementReconciliationsForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#StatementReconciliationsForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#StatementReconciliationsForm-cmbDateFromYearCash': {
                select: this.selectComboFromYearCash
            },
            '#StatementReconciliationsForm-cmbDateToYearCash': {
                select: this.selectComboToYearCash
            },
            '#StatementReconciliationsForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#StatementReconciliationsForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#StatementReconciliationsForm-cmbDateFromMonthCash': {
                select: this.selectComboFromMonthCash
            },
            '#StatementReconciliationsForm-cmbDateToMonthCash': {
                select: this.selectComboToMonthCash
            },
            '#StatementReconciliationsForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#StatementReconciliationsForm-cmbDateDayCash': {
                select: this.selectComboFromDayCash
            },
            '#StatementReconciliationsForm-cmbDateToDay': {
                select: this.selectComboToDay
            },
            '#StatementReconciliationsForm-cmbCOREP': {
                select: this.selectCombocmbCOREP
            },
            '#StatementReconciliationsForm-cmbBank': {
                select: this.selectCombocmbBank
            }

        });
        // </editor-fold>
    },
    xpanel_afterrender: function (obj, e) {

        $('#StatementReconciliationsForm-btnToggleSwitchFT').change(function () {
            me.procesador();
        });

        $('#StatementReconciliationsForm-btnToggleSwitchFT').change(function (e) {
            var isExterior = e.target.checked; 

            var cmbMoneda = Ext.getCmp(prototype.id + '-cmbCode'); 

            if (!cmbMoneda) {
                console.error("No se encontró el combo de monedas en la vista.");
                return;
            }

            var storeMoneda = cmbMoneda.getStore();

            storeMoneda.clearFilter();

            storeMoneda.filterBy(function(record) {
                var currencyCode = record.get('A005KEY');

                if (currencyCode === '') return true; 

                if (!isExterior) {
                    return currencyCode === 'COP';
                } else {
                    return currencyCode !== 'COP';
                }
            });

            if (!isExterior) { 
                cmbMoneda.setValue(''); 
//                cmbMoneda.setReadOnly(true); 

                Ext.getCmp(prototype.id + '-COL').setStyle('font-weight', 'bold');
                Ext.getCmp(prototype.id + '-EXT').setStyle('font-weight', 'normal');
            } else { 
//                cmbMoneda.setReadOnly(false); 
                cmbMoneda.setValue(''); // Limpiamos para que elijan

                Ext.getCmp(prototype.id + '-COL').setStyle('font-weight', 'normal');
                Ext.getCmp(prototype.id + '-EXT').setStyle('font-weight', 'bold');
            }
        });

        $('#StatementReconciliationsForm-btnToggleSwitchFTBKP').change(function (e, target) {
            
            var isExterior = e.target.checked; 
            console.log("¿Es Exterior? ", isExterior);

            var cmbMoneda = Ext.getCmp(prototype.id + '-cmbCode'); 

            if (!cmbMoneda) {
                console.error("No se encontró el combo de monedas en la vista.");
                return;
            }

            if (!isExterior) { 
                cmbMoneda.setValue('COP'); // Forzamos a COP
                cmbMoneda.setReadOnly(true); // Lo bloqueamos para que no puedan cambiarlo

                // Opcional: Resaltamos la etiqueta visualmente
                Ext.getCmp(prototype.id + '-COL').setStyle('font-weight', 'bold');
                Ext.getCmp(prototype.id + '-EXT').setStyle('font-weight', 'normal');

            } else { 
                // ----- MODO EXTERIOR (Azul) -----
                cmbMoneda.setReadOnly(false); // Lo desbloqueamos
                cmbMoneda.setValue(''); // Limpiamos el combo para obligarlos a elegir

                // Opcional: Resaltamos la etiqueta visualmente
                Ext.getCmp(prototype.id + '-COL').setStyle('font-weight', 'normal');
                Ext.getCmp(prototype.id + '-EXT').setStyle('font-weight', 'bold');
            }
            
            
//            if (me.panelActual === '-panelGridData') {
//                me.btnSearch_click();
//                var checkbox = Ext.getCmp(prototype.id + '-btnToggleSwitchCASH').getEl().down("#chkCash").dom.checked;
//                var isActive = checkbox.checked;
//                console.log("Activo? ", isActive);
//            }
        });

        $('#StatementReconciliationsForm-btnToggleSwitchCashCD').on('change', function () {
            me.drillDown = []
            me.showFiltersCash();
            me.btnSearch_click();
        });

        this.obtainData(function () {
            me.btnSearch_click();
        });
    },
    // <editor-fold defaultstate="collapsed" desc="Obtener Data ">
    obtainData: function (callback) { // <-- 1. SE AGREGA EL PARÁMETRO CALLBACK AQUÍ

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateFromYearCash').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYearCash').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateToYearCash').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonthCash').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYearCash').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonthCash').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        Ext.getCmp(prototype.id + '-cmbDateDayCash').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayCash').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateDayCash').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayCash').setValue("");


        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["VALDATE", "Payment Date"],
            ]
        }));
        cmbDateSel.setValue("VALDATE");

        var cmbEFTE = Ext.getCmp(prototype.id + '-cmbEFTE');
        cmbEFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["BX", "BANAMEX"],
                ["4401", "BANAMEX BOOMER CTA 4401"],
                ["8221", "BANAMEX BOOMER CTA 8221"],
                ["9133", "BANAMEX OPER.FRANQ. 9133"]
            ]
        }));
        cmbEFTE.setValue("");

        var cmbTTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN');
        cmbTTRAN.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["C", "Charge"],
                ["A", "Pay"]
            ]
        }));
        cmbTTRAN.setValue("");

        this.dataObtain.BANK = 2;
        this.dataObtain.COUNTRY = 2;
        this.dataObtain.COREP = 2;
        this.dataObtain.USERPERMIS = 2;
        this.dataObtain.CURRENCY = 1;
        this.dataObtain.NPROG = sessionStorage.getItem('nprog');


        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res,'res')
                var lstBank = res.lstBank;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstBank,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbBank').setValue('');

                var lstCountry = res.lstCountry;
                me.lstCountry = lstCountry;
                var storeDataCountry = Ext.create('Ext.data.Store', {
                    data: lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeDataCountry);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                Ext.getCmp(prototype.id + '-cmbCountryCash').bindStore(storeDataCountry);
                Ext.getCmp(prototype.id + '-cmbCountryCash').setValue('');

                var lstProcessor = res.lstProcessor;
                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: lstProcessor,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('');
                
                var lstCurrencies = res.lstCurrencies;
                var storeDataCurrencies = Ext.create('Ext.data.Store', {
                    data: lstCurrencies,
                    autoLoad: true
                });
                
                 storeDataCurrencies.filterBy(function(record) {
                var currencyCode = record.get('A005KEY');

                if (currencyCode === '') return true; 

                return currencyCode === 'COP';
            });
                
                Ext.getCmp(prototype.id + '-cmbCode').bindStore(storeDataCurrencies);
                Ext.getCmp(prototype.id + '-cmbCode').setValue('');

                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Buscar en Credito o Cash ">
    btnSearch_click: function (obj, e) {

        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        var anchoFilter = Ext.getCmp(prototype.id + '-contentFilter');
        var anchoOption = Ext.getCmp(prototype.id + '-contentOptions');
        var anchoInfo = Ext.getCmp(prototype.id + '-panelHeight');
        this.drillDown = [];

        if (selected === 0) {
            anchoInfo.setHeight(680);
            anchoFilter.setWidth(1700);
            anchoOption.setWidth(1700);
            anchoInfo.setWidth(1700);
            Ext.getCmp(prototype.id + '-panelCash').setVisible(true);
            Ext.getCmp(prototype.id + '-panelCredit').setVisible(false);

            if (me.isDashboardCash) {
                this.setFormatParameterDashabordCash();
                this.setGridDataDashboardCash();
            } else {
                anchoInfo.setHeight(590);
                this.setFormatParameterDetailSecundary();
                this.setGridDataDetailSecundary();
            }

        } else if (selected === 1) {
            anchoFilter.setWidth(1800);
            anchoOption.setWidth(1800);
            anchoInfo.setWidth(1800);
            anchoInfo.setHeight(720);
            Ext.getCmp(prototype.id + '-panelCash').setVisible(false);
            Ext.getCmp(prototype.id + '-panelCredit').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridData').show();
            this.setFormatParameter();
            if (Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() !== '') {
                this.searchMPF060();
                this.mostrarCamposCredit();
            } else if (Ext.getCmp(prototype.id + '-txtBANDOC').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbDateDay').getValue() !== ''
                    || Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() !== ''  || Ext.getCmp(prototype.id + '-cmbCode').getValue() !== '') {
                this.btnSearch_BANDOC();
                this.mostrarCamposCredit();
            } else {
                this.setGridData();
                this.mostrarCamposCredit();
            }
        }
    },
    // </editor-fold>

    //SOLO CASH

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

            var dayFromCash = Ext.getCmp(prototype.id + '-cmbDateDayCash');
            var dayToCash = Ext.getCmp(prototype.id + '-cmbDateToDayCash');
            var monthFromCash = Ext.getCmp(prototype.id + '-cmbDateFromMonthCash');
            var monthToCash = Ext.getCmp(prototype.id + '-cmbDateToMonthCash');
            var yearFromCash = Ext.getCmp(prototype.id + '-cmbDateFromYearCash');
            var yearToCash = Ext.getCmp(prototype.id + '-cmbDateToYearCash');
            var societyCash = Ext.getCmp(prototype.id + '-typeSocietyCash');

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

                Ext.getCmp(prototype.id + '-cmbStatusCash').setVisible(true);
                Ext.getCmp(prototype.id + '-cmbTypeSourceCash').setVisible(true);
                Ext.getCmp(prototype.id + '-txtBANDOCASH').setVisible(true);
                Ext.getCmp(prototype.id + '-typeSocietyCas22h').setVisible(true);
                dayFromCash.setDisabled(false);
                dayToCash.setDisabled(false);
                societyCash.setDisabled(false);

                monthFromCash.setDisabled(false);
                monthToCash.setDisabled(false);

                me.isDashboardCash = false;
                panel.setHeight(580);

            } else {

                var yearActual = new Date().getFullYear();

                yearFromCash.setValue(yearActual);
                monthFromCash.setValue('01');
                dayFromCash.setValue('');

                yearToCash.setValue(yearActual);
                monthToCash.setValue('12');
                dayToCash.setValue('');

                Ext.getCmp(prototype.id + '-cmbStatusCash').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbTypeSourceCash').setVisible(false);
                Ext.getCmp(prototype.id + '-txtBANDOCASH').setVisible(false);
                Ext.getCmp(prototype.id + '-typeSocietyCas22h').setVisible(false);
                dayFromCash.setDisabled(true);
                dayToCash.setDisabled(true);
                societyCash.setDisabled(true);

                me.isDashboardCash = true;
                panel.setHeight(680);
            }
        }
    },
    // Type Source solo tiene sentido si el registro ya está conciliado (CCUSTPRO
    // recién se define al conciliar) -- se muestra solo con Status = Match (1) o
    // Match Manual (5). Si se cambia a cualquier otro status (ej. Pending), se
    // oculta y se resetea a "All" para no dejar un filtro escondido aplicado.
    onStatusCashSelect: function (combo, record) {
        var value = combo.getValue();
        var cmbTypeSource = Ext.getCmp(prototype.id + '-cmbTypeSourceCash');
        if (!cmbTypeSource) {
            return;
        }
        if (value === '1' || value === '5') {
            cmbTypeSource.setVisible(true);
        } else {
            cmbTypeSource.setValue('');
            cmbTypeSource.setVisible(false);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Parametros Dashboard Cash ">
    setFormatParameterDashabordCash: function () {
        me.bean = {};

        var fecFrom = Ext.getCmp(prototype.id + '-cmbDateFromYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').getValue()
                + Ext.getCmp(prototype.id + '-cmbDateDayCash').getValue();

                console.log(Ext.getCmp(prototype.id + '-cmbDateFromYearCash').getValue(),'AAAA');

        var fecTo = Ext.getCmp(prototype.id + '-cmbDateToYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthCash').getValue()
                + Ext.getCmp(prototype.id + '-cmbDateToDayCash').getValue();

        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.bean.IN_FECHA_FROM = fecFrom;
        me.bean.IN_FECHA_TO = fecTo;
        
        console.log(fecFrom,'fecFrom')
        console.log(fecTo,'fecTo')
        console.log(me.bean,'fecTo')

        var beanString = JSON.stringify(me.bean);
        me.searchParams = {
            beanString: beanString,
            bean: me.bean
        };

        console.log(searchParams, 'WAAAAAAAAAAAAAAAAAAAAAAA')
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Dashboard Cash ">
    setGridDataDashboardCash: function () {
        win.lblUser_toolTip("Estructura: MPF194");

        me.panelActual = '-panelGridDataCashDashboard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDashboardCash'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-panelGridDataCashDashboard').mask('Loading...');
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-panelGridDataCashDashboard').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }

                    // Convertir Ext data → arreglo plano
                    let lstData = obj.data.items.map(v => v.data);

                    // Tomar el último (que trae acumulados desde Java)
                    const ultimo = lstData[lstData.length - 1];

                    let TOTAL_QSALES = ultimo.TOTAL_QSTATEMENT;
                    let TOTAL_QMATCH = ultimo.TOTAL_QMATCH;
                    let TOTAL_QMANUAL = ultimo.TOTAL_QMANUAL;
                    let TOTAL_QPEND = ultimo.TOTAL_QPEND;
                    let TOTAL_PCT_MATCH = ultimo.TOTAL_PCT_MATCH;

                    // ---------- CONSTRUCCIÓN DEL TREE ----------
                    let mesesProcesados = [];
                    let dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Array.each(lstData, function (value) {
                        let mes = value.strFormatDate;

                        if (!mesesProcesados.includes(mes)) {

                            // Acumulados por MES
                            let V_QSTATEMENT = 0, V_QMATCH = 0, V_QMANUAL = 0, V_QPEND = 0;

                            Ext.Array.each(lstData, function (v) {
                                if (mes === v.strFormatDate) {
                                    V_QSTATEMENT += v.QSTATEMENT;
                                    V_QMATCH += v.QMATCH;
                                    V_QMANUAL += v.QMANUAL;
                                    V_QPEND += v.QPEND;
                                }
                            });

                            // % por mes
                            let pctMes = 0;
                            if (V_QSTATEMENT > 0) {
                                pctMes = ((V_QMATCH + V_QMANUAL) * 100) / V_QSTATEMENT;
                            }

                            mesesProcesados.push(mes);

                            let nodoMes = {
                                strFormatDate: mes,
                                QSALES: V_QSTATEMENT,
                                QMATCH: V_QMATCH,
                                QMANUAL: V_QMANUAL,
                                QPEND: V_QPEND,
                                PCT_MATCH: pctMes,
                                expanded: false,
                                children: []
                            };

                            // Insertar sociedades hijas
                            Ext.Array.each(lstData, function (det) {
                                if (det.strFormatDate === mes) {
                                    nodoMes.children.push({
                                        strFormatDate: det.strFormatDate,
                                        CCUST: det.CCUST,
                                        QSALES: det.QSTATEMENT,
                                        QMATCH: det.QMATCH,
                                        QMANUAL: det.QMANUAL,
                                        QPEND: det.QPEND,
                                        PCT_MATCH: det.PCT_MATCH,
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

                    let dataBar = [];

                    Ext.Array.each(dataRoot.children, function (mes) {

                        let matchMes = mes.QMATCH + mes.QMANUAL;

                        dataBar.push({
                            month: mes.strFormatDate, // Ej: 2025-Jan
                            StatementTotal: mes.QSALES,
                            StatementMatch: matchMes,
                            StatementPending: mes.QPEND
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
                        fields: ['month', 'StatementTotal', 'StatementMatch', 'StatementPending'],
                        data: dataBar
                    });

                    let serie = chart.getSeries()[0];
                    serie.setXField('month');
                    serie.setYField(['StatementTotal', 'StatementMatch', 'StatementPending']);
                    serie.setTitle(['Total', 'Match', 'Pending']);

                }
            }
        });
        Ext.getCmp(prototype.id + '-pie').setVisible(false);
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Detalle Cash ">
    setFormatParameterDetailSecundary: function () {
        me.beanSecundary = {};

        var selectedAccounts = me.getSelectedAccountCodes();
        me.beanSecundary.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateDayCash').getValue();
        me.beanSecundary.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYearCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthCash').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayCash').getValue();
        me.beanSecundary.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyCash').getValue();
        me.beanSecundary.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.beanSecundary.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatusCash').getValue();
        me.beanSecundary.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOCASH').getValue();
        me.beanSecundary.IN_TYPE_SOURCE = Ext.getCmp(prototype.id + '-cmbTypeSourceCash').getValue();
        me.beanSecundary.IN_ACCOUNTS = selectedAccounts;
        console.log(me.beanSecundary, 'me.beanSecundary')
        var beanString = JSON.stringify(me.beanSecundary);
        me.searchParamsSecundary = {
            bean: me.beanSecundary,
            beanString: beanString
        };

        console.log(me.searchParamsSecundary, 'setFormatParameterDetailSecundary')
    },
    setGridDataDetailSecundary: function () {
        console.log(me.searchParamsSecundary, 'me.searchParamsSecundary')
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
                load: function (obj, records, successful, operation) {

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                        return;
                    }
                    var response = operation.getResponse();
                    var responseData = Ext.decode(response.responseText);

                    if (responseData.cuentas && Ext.isArray(responseData.cuentas)) {
                        me.loadAccountsCombo(responseData.cuentas, true);
                    }

                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                }
            }
        });
//        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSecundary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        me.setWidthPie();
        me.getPaggin();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada por Cliente Dashboard ">
    onGridDataDetailCash: function (column, e, rowIndex, colIndex, rowData) {
        console.log(1)
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};

        if (esPadre) {
            me.bean.IN_SOCIETY = "";
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
        }
        console.log(2)
        me.bean.IN_FECHA_FROM = fecha;
        me.bean.IN_FECHA_TO = fecha;
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.paramsDetailSource.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'searchParams');
        console.log(3)
        this.setGridDataDetailCash();
    },
    setGridDataDetailCash: function () {
        win.lblUser_toolTip("Estructura: MPF194");
        console.log(4)
        console.log(me.panelActual, 'me.panelActualme.panelActual')
        if (me.panelActual !== '-panelGridDataCash') {
            console.log(2222)
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataCash';

            // 1. PAUSAMOS EL MOTOR DE RENDERIZADO DE EXTJS
            Ext.suspendLayouts();

            global.selectedChild(me.childs, prototype.id + me.panelActual);

            // 2. LO REANUDAMOS FORZANDO A QUE DIBUJE TODO DE GOLPE
            Ext.resumeLayouts(true);

            console.log(3333)
        }

        console.log(5)
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchCash'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailSource;
                    ;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin19');
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
                        var value = Ext.getCmp(prototype.id + '-htDate');
                        if (data.IN_DATE === "DATEP") {
                            value.setText = "Deposit";
                        } else {
                            value.setText = "Payment";
                        }
                    }
                    me.setWidthPie();
                }
            }
        });
//        global.clear();
        Ext.getCmp(prototype.id + '-gridDataCash').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin19').bindStore(storeGridDatas);
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Mostrando Bajada Pendiente por Cliente Dashboard ">
    onGridDataDetailPendingCash: function (column, e, rowIndex, colIndex, rowData) {
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
        me.bean.IN_STVAL = '3';
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountryCash').getValue();
        me.paramsDetailSource.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'searchParams');
        this.setGridDataDetailPendingCash();
    },
    setGridDataDetailPendingCash: function () {
        win.lblUser_toolTip("Estructura: MPF194");
        if (me.panelActual !== '-panelGridDataDetailSecundaryPending') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetailSecundaryPending';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailSecundary'
            }, listeners: {
                beforeload: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailSource;
                    ;
                },
                load: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin19');
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
                        var value = Ext.getCmp(prototype.id + '-htDate2');
                        if (data.IN_DATE === "DATEP") {
                            value.setText = "Deposit";
                        } else {
                            value.setText = "Payment";
                        }
                    }
                    me.setWidthPie();
                }
            }
        });
//        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSecundaryPending').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin19').bindStore(storeGridDatas);
    },
    // </editor-fold>



























    setGridDataCash: function () {
        win.lblUser_toolTip("Estructura: MPF194");



        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchCash'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetailSource;
                        ;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin19');
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
                            var value = Ext.getCmp(prototype.id + '-htDate');
                            if (data.IN_DATE === "DATEP") {
                                value.setText = "Deposit";
                            } else {
                                value.setText = "Payment";
                            }
                        }
                        me.setWidthPie();
                    }
                }
            });
//            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCash').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin19').bindStore(storeGridDatas);
        }
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

    onGridDetLiquidaCashBKP: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetLiquiCash';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var cant = 0;
        switch (columnNum) {
            case 0:
                console.log('ENTRA A FECHA');
                rowData.data.IN_STVAL = "";
                cant = rowData.data.lngQTMATCH;
                break;
            case 1:
                console.log('ENTRA A MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQTMANUAL;
                break;
            case 3:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQMANUAL;
                break;
            case 4:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "3";
                cant = rowData.data.lngQTPEND;
                break;
        }


        var selectedAccounts = me.getSelectedAccountCodes();

        this.beanLiquiCash.IN_STVAL = rowData.data.IN_STVAL;
        this.beanLiquiCash.IN_ADATE = rowData.data.SDATE;
        this.beanLiquiCash.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        this.beanLiquiCash.IN_ACCOUNTS = selectedAccounts;
        me.paramsDetail.beanString = JSON.stringify(this.beanLiquiCash);
        console.log(this.beanLiquiCash, 'this.AAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        this.setGridDataDetLiquidaCash();
    },
    setGridDataDetLiquidaCashBKP: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetLiquidCash'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj, records, successful, operation) {
                        console.log(obj, 'obAAAAAAAAAAAAAAj')
                        var pag = Ext.getCmp(prototype.id + '-paggin20');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        console.log(obj.data, "Esto es lo que recibo");
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            win.setText('lblTittleCash', data.strTitulo);

                            var response = operation.getResponse();
                            var responseData = Ext.decode(response.responseText);

                            if (responseData.cuentas && Ext.isArray(responseData.cuentas)) {
                                me.loadAccountsCombo(responseData.cuentas, true);
                            }


                        }
                    }
                }
            });
//            global.clear();
            Ext.getCmp(prototype.id + '-gridDetLiquiCash').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin20').bindStore(storeGridDatas);
        }
    },

    procesador: function () {
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            Ext.getCmp(prototype.id + '-TEST').show();
        } else {
            Ext.getCmp(prototype.id + '-TEST').hide();
        }
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    pendingBuss_changeHandler: function (e) {
        let statusCheck = e.checked;
        if (statusCheck) {
            Ext.getCmp(prototype.id + '-cmbNEGOC').show();
            Ext.getCmp(prototype.id + '-cmbNEGOC').setValue('B');
            this.searchMPF060();

        } else {
            Ext.getCmp(prototype.id + '-cmbNEGOC').hide();
            Ext.getCmp(prototype.id + '-cmbNEGOC').setValue('');
            this.setFormatParameter();
            this.setGridData();
        }
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();

        me.bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtLiquida').getValue();
        me.bean.IN_AFTE = Ext.getCmp(prototype.id + '-cmbEFTE').getValue();
        me.bean.IN_TTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN').getValue();

        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.IN_COREP = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();

        var fecFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue()
                + Ext.getCmp(prototype.id + '-cmbDateDay').getValue();

        var fecTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue()
                + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_FECHA_FROM = fecFrom;
        me.bean.IN_FECHA_TO = fecTo;


        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            me.bean.IN_EXT = 'N';
        } else {
            me.bean.IN_EXT = 'Y';
        }

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },

    searchMPF060: function () {
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetailMPF060';
        global.selectedChild(this.childs, prototype.id + me.panelActual);

        this.beanDetailMPF060.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        this.beanDetailMPF060.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        this.beanDetailMPF060.strDayFrom = Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        this.beanDetailMPF060.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        this.beanDetailMPF060.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        this.beanDetailMPF060.strDayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        this.beanDetailMPF060.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue();
        this.beanDetailMPF060.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        this.beanDetailMPF060.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetailMPF060.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        this.beanDetailMPF060.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        this.beanDetailMPF060.IN_COREP = Ext.getCmp(prototype.id + '-cmbCOREP').getValue()
        this.beanDetailMPF060.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue()
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDetailMPF060.IN_EXT = 'N';
        } else {
            this.beanDetailMPF060.IN_EXT = 'Y';
        }
        me.paramsDetail.beanString = JSON.stringify(this.beanDetailMPF060);
        this.setGridDataDetMPF060();
    },
    setGridDataDetMPF060: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDataDetMPF060'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin18');
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
                            Ext.getCmp(prototype.id + '-gridDataDetailMPF060').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetailMPF060').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin18').bindStore(storeGridDatas);
        }
    },

    onDataEntryMPF060: function (grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);
        me.recGlobal = grid.getStore().getAt(rowIndex);
        this.winDataEntryMPF060('U', rec);



    },
    winDataEntryMPF060: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntryMPF060', {
            id: prototype.id + '-dataEntryMPF060',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                controllerParent: me,
                panelActual: me.panelActual,
                paramsGrid: me.paramsDetail
            }
        }).show();
    },
    setGridData: function () {
//        console.log(searchParams,'searchParams')
        console.log(me.searchParams, 'searchParams')
        win.lblUser_toolTip("Estructura: MPF102");
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
                        var pag = Ext.getCmp(prototype.id + '-paggin');
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
                            var value = Ext.getCmp(prototype.id + '-htDate');
                            if (data.IN_DATE === "DATEP") {
                                value.setText = "Deposit";
                            } else {
                                value.setText = "Payment";
                            }
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },

    onGridDetProceLIQByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 8:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQTMATCH;
                break;
            case 10:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQTMANUAL;
                break;
            case 11:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "3";
                cant = rowData.data.lngQTPEND;
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetProceLIQ';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanProceLiqByS.IN_DATE = rowData.data.SDATE;
            this.beanProceLiqByS.strFormatDate = rowData.data.strFormatDate;
            this.beanProceLiqByS.IN_BANK = rowData.data.IN_CBANK;
            this.beanProceLiqByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanProceLiqByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanProceLiqByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanProceLiqByS.IN_COREP = rowData.data.IN_COREP;

            let proces = Ext.getCmp(prototype.id + '-TEST');
            if (!proces.isVisible()) {
                this.beanProceLiqByS.IN_EXT = 'N';
            } else {
                this.beanProceLiqByS.IN_EXT = 'Y';
            }

            me.paramsDetail.beanString = JSON.stringify(this.beanProceLiqByS);

            this.setGridDataDetProceLIQByS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetProceLIQByS: function () {
        win.lblUser_toolTip("Estructura: MPF060");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetProceLiq'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin14');
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

                            Ext.getCmp(prototype.id + '-gridDataDetProceLIQ').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetProceLIQ').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin14').bindStore(storeGridDatas);
        }
    },
    onViewClickLiqDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetLiqDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanLiqDetail.IN_DATE = rowData.data.SDATE;
        this.beanLiqDetail.strFormatDate = rowData.data.strFormatDate;
        this.beanLiqDetail.IN_BANK = rowData.data.IN_BANK;
        this.beanLiqDetail.IN_STVAL = '3';
        this.beanLiqDetail.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanLiqDetail.IN_TDOC = rowData.data.IN_TDOC;
        this.beanLiqDetail.IN_COREP = rowData.data.IN_COREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanLiqDetail.IN_EXT = 'N';
        } else {
            this.beanLiqDetail.IN_EXT = 'Y';
        }

        me.paramsDetail.beanString = JSON.stringify(this.beanLiqDetail);

        this.setGridDataDetLiqDetail();
    },

    setGridDataDetLiqDetail: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetLiqDetail'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin17');
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
                            Ext.getCmp(prototype.id + '-gridDataDetLiqDetail').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetLiqDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin17').bindStore(storeGridDatas);
        }
    },
    onGridDetBank: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetProce';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanBank.IN_TDOC = rowData.data.IN_TDOC;
        this.beanBank.IN_DATE = rowData.data.IN_DATE;
        this.beanBank.IN_SDATE = rowData.data.SDATE;
        this.beanBank.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanBank.IN_BANK = rowData.data.IN_BANK;
        this.beanBank.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanBank.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanBank.strFormatDate = rowData.data.strFormatDate;
        this.beanBank.IN_COREP = rowData.data.IN_COREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanBank.IN_EXT = 'N';
        } else {
            this.beanBank.IN_EXT = 'Y';
        }

        me.paramsDetail.beanString = JSON.stringify(this.beanBank);
        this.setGridDataDetBank();
    },

    setGridDataDetBank: function () {
        win.lblUser_toolTip("Estructura: MPF102");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetBank'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
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

                            Ext.getCmp(prototype.id + '-gridDetProce').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetProce').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
        }
    },

    onGridDetDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.beanDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDay.IN_DATE = rowData.data.IN_DATE;
        this.beanDay.IN_SDATEE = rowData.data.IN_SDATE;
        this.beanDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDay.IN_CBANK = rowData.data.CBANK == '**' ? this.beanDay.IN_CBANK = rowData.data.CBANK : this.beanDay.IN_CBANK = rowData.data.IN_CBANK;
        this.beanDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDay.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDay.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDay.IN_COREP = rowData.data.COREP;
        this.beanDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDay.strCREJEC = rowData.data.strCREJEC;
        this.beanDay.strDescripcion = rowData.data.strDescripcion;
        this.beanDay.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDay.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDay.IN_EXT = 'N';
        } else {
            this.beanDay.IN_EXT = 'Y';
        }

        me.paramsDetail.beanString = JSON.stringify(this.beanDay);
        this.setGridDataDetDay();
    },

    setGridDataDetDay: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDay'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
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
                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },

    onGridDetDayProcLIQByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDayProcLIQByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDayLiqByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDayLiqByS.IN_DATE = rowData.data.IN_DATE;
        this.beanDayLiqByS.IN_CBANK = rowData.data.CBANK;
        this.beanDayLiqByS.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDayLiqByS.IN_COREP = rowData.data.COREP;
        this.beanDayLiqByS.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDayLiqByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDayLiqByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDayLiqByS.strDescripcion = rowData.data.strDescripcion;
        this.beanDayLiqByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDayLiqByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDayLiqByS.IN_EXT = 'N';
        } else {
            this.beanDayLiqByS.IN_EXT = 'Y';
        }

        me.paramsDetail.beanString = JSON.stringify(this.beanDayLiqByS);

        this.setGridDataDetDayProcLIQByS();
    },

    setGridDataDetDayProcLIQByS: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDayProcLIQByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin15');
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
                            Ext.getCmp(prototype.id + '-lblTittleProcLIQByS').setText(data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDayProcLIQByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin15').bindStore(storeGridDatas);
        }
    },

    onGridDetLiquida: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetLiquida';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanLiquidaDate.IN_TDOC = rowData.data.IN_TDOC;
        this.beanLiquidaDate.IN_DATE = rowData.data.IN_DATE;
        this.beanLiquidaDate.IN_SDATE = rowData.data.SDATE;
        this.beanLiquidaDate.IN_CBANK = rowData.data.IN_CBANK;
        this.beanLiquidaDate.IN_STVAL = "";
        this.beanLiquidaDate.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanLiquidaDate.IN_SDATEE = rowData.data.IN_SDATEE;
        this.beanLiquidaDate.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanLiquidaDate.IN_QTYTRAN1 = rowData.data.QTYTRAN1;
        this.beanLiquidaDate.strFormatDate = rowData.data.strFormatDate;
        this.beanLiquidaDate.strCREJEC = rowData.data.strCREJEC;
        this.beanLiquidaDate.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanLiquidaDate.IN_COREP = rowData.data.IN_COREP;
        this.beanLiquidaDate.strDescripcion = rowData.data.strDescripcion;
        this.beanLiquidaDate.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanLiquidaDate.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanLiquidaDate.IN_EXT = 'N';
        } else {
            this.beanLiquidaDate.IN_EXT = 'Y';
        }

        me.paramsDetail.beanString = JSON.stringify(this.beanLiquidaDate);
        this.setGridDataDetLiquida();
    },

    onGridDetLiquidaStvalDrill: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetLiquida';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanLiquida.IN_DATE = rowData.data.IN_DATE;
        this.beanLiquida.IN_TDOC = rowData.data.IN_TDOC;
        this.beanLiquida.IN_STVAL = rowData.data.IN_STVAL;
        this.beanLiquida.IN_SDATE = rowData.data.SDATE;
        this.beanLiquida.IN_SDATEE = rowData.data.IN_SDATEE;
        this.beanLiquida.IN_CBANK = rowData.data.IN_CBANK;
        this.beanLiquida.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanLiquida.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanLiquida.IN_COREP = rowData.data.IN_COREP;
        this.beanLiquida.strDescripcion = rowData.data.strDescripcion;
        this.beanLiquida.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanLiquida.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

        me.paramsDetail.beanString = JSON.stringify(this.beanLiquida);
        this.setGridDataDetLiquida();
    },

    setGridDataDetLiquida: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetLiquida'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
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
                            win.setText('lblTittleByLiquidaS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetLiquida').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    onGridDetLiquidaByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQMATCH;
                break;
            case 2:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQDIFF;
                break;
            case 4:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "P";
                cant = rowData.data.lngQPEND;
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetLiquidaByS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanLiquidaByS.IN_DATE = rowData.data.IN_DATE;
            this.beanLiquidaByS.IN_SDATE = rowData.data.SDATE;
            this.beanLiquidaByS.IN_CBANK = rowData.data.IN_CBANK;
            this.beanLiquidaByS.IN_SDATEE = rowData.data.IN_SDATEE;
            this.beanLiquidaByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanLiquidaByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanLiquidaByS.IN_COREP = rowData.data.IN_COREP;
            this.beanLiquidaByS.strDescripcion = rowData.data.strDescripcion
            this.beanLiquidaByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY
            this.beanLiquidaByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP

            me.paramsDetail.beanString = JSON.stringify(this.beanLiquidaByS);
            this.setGridDataDetLiquidaByS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetLiquidaByS: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetLiquidaByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
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
                            Ext.getCmp(prototype.id + '-gridDetLiquidaByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetLiquidaByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
        }
    },

    onGridDetSalesDirect: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetSalesDirect';

        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log(me.panelActual, "llego aqui 1");
        this.beanLiquiCash.IN_STVAL = "1";
        this.beanLiquiCash.IN_ADATE = rowData.data.SDATE;
        me.paramsDetail.beanString = JSON.stringify(this.beanLiquiCash);
        this.setGridDataSalesDirect();
    },

    ///toggle tap




    ///



    ///RADRIO GROUP PARA MOSTRAR DETALLE MPF102


    cmbTranType_changeHandler: function (group, newValue) {

        var option = newValue.rbgTypeCASH;

        // Ocultar ambos paneles
        Ext.getCmp(prototype.id + '-panelGridDataCash').hide();
        Ext.getCmp(prototype.id + '-panelGridDataCashDetail').hide();

        // Cambiar visibilidad según la opción
        if (option === 'Normal') {

            Ext.getCmp(prototype.id + '-panelGridDataCash').show();
            Ext.getCmp(prototype.id + '-gridDetLiquiCash').show();
            me.panelActual = '-panelGridDataCash';

            this.setGridDataCash();

        } else if (option === 'Detalle') {

            Ext.getCmp(prototype.id + '-panelGridDataCashDetail').show();
            Ext.getCmp(prototype.id + '-gridDetLiquiCash').hide();
            me.panelActual = '-panelGridDataCashDetail';

            this.setFormatParameterDetailCash();
            this.setGridDataDetalleCash();

        }

        // 

    },

    //grilla para mostrar
    /////





    setFormatParameterDetailCash: function () {

        me.panelActual = '-panelGridDataCashDetail';





        me.objDetail = {};


        me.objDetail.IN_BANDOC = '';
        me.objDetail.IN_COUNTRY = '';
        me.objDetail.IN_STVAL = '';
        me.objDetail.IN_ADATE_FROM = '';
        me.objDetail.IN_ADATE_TO = '';



        me.objDetail.beanString = JSON.stringify(me.objDetail);


//        this.setGridDataDetalleCash();
//       


    },

    setGridDataDetalleCash: function () {
        win.lblUser_toolTip("Estructura: MPF102 detalla fer");
        me.setWidthPie();

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchCashDetail'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.objDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin22');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        console.log(obj.data, "Esto es lo que recibo");
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
//                        else {
//                            var data = obj.data.items[0].data;
//                            win.setText('lblDetailCash', data.strTitulo);
//                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridCashDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin22').bindStore(storeGridDatas);
        }
    },

    ////////////////////////////
    ////////////////////////////77

    setGridDataSalesDirect: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        console.log("llego aqui 2  ");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetSalesDirect'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin21');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        console.log(obj.data, "Esto es lo que recibo");
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            win.setText('lblTittleCashSalesDirect', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetSalesDirect').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin21').bindStore(storeGridDatas);
        }
    },

    onGridDetDetails: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.STVAL != 'Match' && rowData.data.STVAL != 'Match Manual') {
            return false
        }
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDetails';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetails.BANDOC = rowData.data.BANDOC;
        this.beanDetails.VALDATE = rowData.data.VALDATE;
        this.beanDetails.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetails.CODEBANK = rowData.data.CODEBANK;
        this.beanDetails.strCREJEC = rowData.data.strCREJEC;
        this.beanDetails.strTitulo = "Bank : " + this.beanDetails.CODEBANK + " - Bandoc : " + this.beanDetails.BANDOC;
        me.paramsDetail.beanString = JSON.stringify(this.beanDetails);

        this.setGridDataDetDetails();
    },

    setGridDataDetDetails: function () {
        win.lblUser_toolTip("Estructura: MPF101");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDetails'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
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
                            Ext.getCmp(prototype.id + '-gridDetDetails').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDetails').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    onGridDetDetailProceByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDetailProceByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetailLiqByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetailLiqByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetailLiqByS.IN_SDATE = rowData.data.SDATE;
        this.beanDetailLiqByS.IN_CBANK = rowData.data.IN_CBANK;
        this.beanDetailLiqByS.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetailLiqByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetailLiqByS.IN_COREP = rowData.data.IN_COREP;
        this.beanDetailLiqByS.strDescripcion = rowData.data.strDescripcion;
        this.beanDetailLiqByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDetailLiqByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetailLiqByS);

        this.setGridDataDetDetailProceByS();
    },

    setGridDataDetDetailProceByS: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDetailProceByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin16');
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
                            Ext.getCmp(prototype.id + '-gridDataDetDetailProceByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetDetailProceByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin16').bindStore(storeGridDatas);
        }
    },

    //<editor-fold defaultstate="collapsed" desc="onGridDetBankS">
    onGridDetBankS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var cant = 0;
        let consultPath = '';
        let gridId = '';
        let panelId = '';
        let pagginId = '';
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQMATCH;
                consultPath = 'searchDetBankByS';
                gridId = 'gridDataDetProceByS';
                panelId = 'panelGridDetProceByS';
                pagginId = 'paggin11';
                break;
            case 3:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQMANUAL;
                consultPath = 'searchDetBankByS';
                gridId = 'gridDataDetProceByS';
                panelId = 'panelGridDetProceByS';
                pagginId = 'paggin11';
                break;
            case 4:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "P";
                cant = rowData.data.lngQPEND;
                consultPath = 'searchDetBankByPend';
                panelId = 'panelGridDetProceByPend';
                gridId = 'gridDataDetProceByPend';
                pagginId = 'paggin13';
                break;
            case 6:
                console.log('ENTRA AL PEND1');
                rowData.data.IN_STVAL = "E";
                cant = rowData.data.lngQPEND1;
                consultPath = 'searchDetBankByPend';
                panelId = 'panelGridDetProceByPend';
                gridId = 'gridDataDetProceByPend';
                pagginId = 'paggin13';
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = `-${panelId}`;

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetBankByS.IN_DATE = rowData.data.IN_DATE;
            this.beanDetBankByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetBankByS.IN_SDATE = rowData.data.SDATE;
            this.beanDetBankByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetBankByS.IN_SDATEE = rowData.data.IN_SDATE;
            this.beanDetBankByS.IN_BANK = rowData.data.IN_BANK;
            this.beanDetBankByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanDetBankByS.IN_COREP = rowData.data.IN_COREP;
            let proces = Ext.getCmp(prototype.id + '-TEST');
            if (!proces.isVisible()) {
                this.beanDetBankByS.IN_EXT = 'N';
            } else {
                this.beanDetBankByS.IN_EXT = 'Y';
            }

            me.paramsDetail.beanString = JSON.stringify(this.beanDetBankByS);
            this.setGridDataDetBankS(consultPath, gridId, pagginId);

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetBankS: function (consultPath, gridId, pagginId) {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + `/${consultPath}`
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + "-" + pagginId);
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
                        Ext.getCmp(prototype.id + `-${gridId}`).setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + "-" + gridId).bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + "-" + pagginId).bindStore(storeGridDatas);
    },
    onGridDetCountryByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

    },
    onGridDetDayBySS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDayByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDayByS.IN_CBANK = rowData.data.CBANK == '**' ? this.beanDayByS.IN_CBANK = rowData.data.CBANK : this.beanDayByS.IN_CBANK = rowData.data.IN_CBANK;
        this.beanDayByS.IN_DATE = rowData.data.IN_DATE;
        this.beanDayByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDayByS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDayByS.IN_SDATEE = rowData.data.IN_SDATE;
        this.beanDayByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDayByS.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDayByS.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDayByS.IN_COREP = rowData.data.COREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDayByS.IN_EXT = 'N';
        } else {
            this.beanDayByS.IN_EXT = 'Y';
        }

        this.beanDayByS.strDescripcion = rowData.data.strDescripcion;
        this.beanDayByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDayByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;
        me.paramsDetail.beanString = JSON.stringify(this.beanDayByS);
        this.setGridDataDetDayByS();
    },
    onGridDetDayByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;

        switch (columnNum) {
            case 4:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQMATCH;
                break;
            case 5:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQDIFF;
                break;
            case 7:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "P";
                cant = rowData.data.lngQPEND;
                break;
        }
        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetDayByS'

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetBankByS.IN_DATE = rowData.data.IN_DATE;
            this.beanDetBankByS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetBankByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetBankByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetBankByS.IN_SDATEE = rowData.data.IN_SDATE;
            this.beanDetBankByS.IN_CBANK = rowData.data.CBANK == '**' ? this.beanDetBankByS.IN_CBANK = rowData.data.CBANK : this.beanDetBankByS.IN_CBANK = rowData.data.IN_CBANK;
            this.beanDetBankByS.IN_COUNTRY = rowData.data.SCOUNTRY;
            this.beanDetBankByS.IN_COREP = rowData.data.COREP;
            this.beanDetBankByS.strDescripcion = rowData.data.strDescripcion;
            this.beanDetBankByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
            this.beanDetBankByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

            let proces = Ext.getCmp(prototype.id + '-TEST');
            if (!proces.isVisible()) {
                this.beanDetBankByS.IN_EXT = 'N';
            } else {
                this.beanDetBankByS.IN_EXT = 'Y';
            }

            me.paramsDetail.beanString = JSON.stringify(this.beanDetBankByS);
            this.setGridDataDetDayByS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetDayByS: function ( ) {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDayByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin9');
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
                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetDayByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
        }
    },
    onGridDetQtyByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        let qty = rowData.data.lngQACCB;
        if (qty > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetDayByS';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetDayByS.strFecFiltro = rowData.data.strFecFiltro;
            this.beanDetDayByS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetDayByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetDayByS.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetDayByS.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetDayByS.SCARCOD = rowData.data.SCARCOD;
            this.beanDetDayByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetDayByS.SCURRENCY = rowData.data.SCURRENCY;
            this.beanDetDayByS.SORIG = rowData.data.SORIG;
            this.beanDetDayByS.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetDayByS.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetDayByS.IN_BANK = rowData.data.IN_BANK;
            this.beanDetDayByS.SCOUNTRY = rowData.data.SCOUNTRY;
            this.beanDetDayByS.IN_FTE = rowData.data.IN_FTE;
            this.beanDetDayByS.IN_ADYEN = rowData.data.IN_ADYEN;
            this.beanDetDayByS.strFormatDate = rowData.data.strFormatDate;
            this.beanDetDayByS.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetDayByS.strDescCard = rowData.data.strDescCard;
            this.beanDetDayByS.strSORIG = rowData.data.strSORIG;
            this.beanDetDayByS.strDescCountry = rowData.data.strDescCountry;
            this.beanDetDayByS.strTitulo = rowData.data.strTitulo;
            this.beanDetDayByS.IN_CODEBANK = rowData.data.CODEBANK;

            me.paramsDetail.beanString = JSON.stringify(this.beanDetDayByS);
            this.setGridDataDetDayByS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    onGridDataCross: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        let qty = rowData.data.QTYTRAN1;
        if (qty > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataCross';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetCross.IN_VALDATE = rowData.data.VALDATE;
            this.beanDetCross.IN_CODEBANK = rowData.data.CODEBANK;
            this.beanDetCross.IN_MERCHAND = rowData.data.MERCHAND;

            me.paramsDetail.beanString = JSON.stringify(this.beanDetCross);
            this.setGridDataCross();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataCross: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCross'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
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
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCross').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    eventKey_BANDOC: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            if (Ext.getCmp(prototype.id + '-txtBANDOC').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbDateDay').getValue() !== ''
                    || Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbStatus').getValue() !== '') {
                this.btnSearch_BANDOC();
            } else {
                this.btnSearch_click();
            }

        }
    },
    btnSearch_BANDOC: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDetails';
        global.selectedChild(this.childs, prototype.id + me.panelActual);

        this.beanDetails.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        this.beanDetails.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        this.beanDetails.strDayFrom = Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        this.beanDetails.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        this.beanDetails.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        this.beanDetails.strDayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        this.beanDetails.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue();
        this.beanDetails.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        this.beanDetails.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetails.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        this.beanDetails.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        this.beanDetails.IN_COREP = Ext.getCmp(prototype.id + '-cmbCOREP').getValue()
        this.beanDetails.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCode').getValue()
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDetails.IN_EXT = 'N';
        } else {
            this.beanDetails.IN_EXT = 'Y';
        }
        me.paramsDetail.beanString = JSON.stringify(this.beanDetails);
        this.setGridDataDetBANDOC();
    },
    setGridDataDetBANDOC: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        
        console.log(me.paramsDetail,'me.paramsDetail')
        
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDetails'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
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
                            Ext.getCmp(prototype.id + '-gridDetDetails').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDetails').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);



        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        me.recGlobal = grid.getStore().getAt(rowIndex);

        if (rec.data.SCOUNTRY === 'CO' && rec.data.SCURRENCY === 'COP') {
            this.winDataEntry('U', rec);
        } else {
            this.winDataEntryEx('U', rec);
        }

    },
    onEditClickCash: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        me.recGlobal = grid.getStore().getAt(rowIndex);
        console.log(rec, "esta es la informacion que voy a enviar")
        this.winDataEntryCash('U', rec);


    },
    onEditClickSalesDirect: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        me.recGlobal = grid.getStore().getAt(rowIndex);
        console.log(rec, "esta es la informacion que voy a enviar")
        this.winDataEntrySalesDirect('U', rec);


    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                controllerParent: me,
                panelActual: me.panelActual,
                paramsGrid: me.paramsDetail
            }
        }).show();
    },
    winDataEntryEx: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntryEx', {
            id: prototype.id + '-dataEntryEx',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    winDataEntryCash: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntryCash', {
            id: prototype.id + '-dataEntryCash',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                controllerParent: me,
                panelActual: me.panelActual,
                paramsGrid: me.paramsDetail
            }
        }).show();
    },
    winDataEntrySalesDirect: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntrySalesDirect', {
            id: prototype.id + '-dataEntrySalesDirect',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                controllerParent: me,
                panelActual: me.panelActual,
                paramsGrid: me.paramsDetail
            }
        }).show();
    },

    onCallSummaryMPF132: function () {
        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();

        console.log(selected, 'selected')

        if (selected === 0) {

            Ext.getCmp(prototype.id + '-boxConsultas').mask('Updating sales summary...');

            var params = {
                beanString: JSON.stringify({
                    IN_CCUST: '134'
                })
            };

            Ext.Ajax.request({
                url: prototype.url + '/updateSummary',
                method: 'POST',
                params: params,
                timeout: 300000,
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

                        console.log('MPS343 executed:', res.message);
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

        } else {
            Ext.Ajax.request({
                url: prototype.url + '/onCallProgramBySummary',
                method: 'POST',
                timeout: 60000000,
                params: {},
                beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    console.log(res);
                    if (res.success) {
                        let objResult = res.result;
                        global.Msg({msg: objResult.MESSAGE});
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                    } else
                        global.Msg({msg: res.sesion});
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                }
            });
        }

        return;

    },
    btnBack_click: function (obj, e) {
        me.clearAccountsCombo();
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            // ⭐⭐⭐ RESETEAR RADIOGROUP SOLO SI SE REGRESA DE DETALLE CASH ⭐⭐⭐
//            if (me.panelActual === '-panelGridDataCash') {
//                var rg = Ext.getCmp(prototype.id + '-rbgTypeCASH');
//                if (rg) {
//                    rg.suspendEvent('change');
//                    rg.setValue({rbgTypeCASH: 'Normal'});
//                    rg.resumeEvent('change');
//                }
//                this.setGridDataCash();
//            }
            this.setWidthPie();
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
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-txtLiquida').setValue('');
        Ext.getCmp(prototype.id + '-cmbTTRAN').setValue('');
        Ext.getCmp(prototype.id + '-txtBANDOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbEFTE').setValue('');
        Ext.getCmp(prototype.id + '-cmbTDOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');


//        Ext.getCmp(prototype.id + '-FEC_FROM').setValue('');
//        Ext.getCmp(prototype.id + '-FEC_TO').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');

    },
    btnExcel_click: function (obj, e) {

        this.setFormatParameter();
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

        console.log('oeoeoeoe');
        console.log(me.panelActual);


        console.log(me.panelActual === '-panelGridDataCashDashboard', '222')
        if (me.panelActual === '-panelGridDataCashDashboard') {
            this.setFormatParameterDashabordCash();
        } else {
            this.setFormatParameter();
        }

        console.log(this.searchParams, 'this.searchParams')
        console.log(me.searchParams, 'this.searchParams')

        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-boxDetBank':
                global.getFile(prototype.url + '/getXLSXbank?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case  '-boxDetDay':
                global.getFile(prototype.url + '/getXLSXDay?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case  '-boxDetLiquida':
                global.getFile(prototype.url + '/getXLSXLiquida?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case  '-boxDetLiquidaByS':
                global.getFile(prototype.url + '/getXLSXLiquidaByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetBankByS':
                global.getFile(prototype.url + '/getXLSXBankByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetDayByS':
                global.getFile(prototype.url + '/getXLSXDayByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetLiqDetail':
                global.getFile(prototype.url + '/getXLSXDetLiqDetail?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetDetailProceByS':
                global.getFile(prototype.url + '/getXLSXDetDetailProceByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-boxDetDetails':
                global.getFile(prototype.url + '/getXLSXDetDetails?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
                // Excel de Cash 
            case '-panelGridDataCash':
                global.getFile(prototype.url + '/getXLSXDetCashMain?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-boxDetLiquiCash':
                global.getFile(prototype.url + '/getXLSXDetCashMainExtract?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDataDetailSecundary':
                global.getFile(prototype.url + '/getXLSXDetailSecundary?beanString=' + encodeURI(me.searchParamsSecundary.beanString));
                break;
            case '-panelGridDataDetailSecundaryPending':
                global.getFile(prototype.url + '/getXLSXDetCashMainExtractPending?beanString=' + encodeURI(me.paramsDetailSource.beanString));
                break;
            case '-panelGridDataCashDashboard':
                console.log("ENTRE ACA BROTHER")
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURI(this.searchParams.beanString));
                break;
        }
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
                var bytes = new Uint8Array(resultByte);
                var blob = new Blob([bytes], {type: "application/png"});

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });
    },

    onLoadClick_conciliaEC: function (valorExt, file, form, tolerancia) {

//        var valorExt = Ext.getCmp(prototype.id + '-cmbExt').getValue();

        if (valorExt === 'E') {
            var msjPregunta = '', msjError = '';
            msjPregunta = 'Sure to load file?';

            if (msjError === '') {
                Ext.MessageBox.show({
                    title: 'Icon Support',
                    msg: msjPregunta,
                    buttons: Ext.MessageBox.OKCANCEL,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (btn) {
                        if (btn === 'ok') {
                            me.onFileLoadToTemp(file, form);
                        }
                    }
                });
            }
        } else if (valorExt === 'C') {
            var msjPregunta = '', msjError = '';
            if (tolerancia) {
                msjPregunta = 'Are you sure you can reconcile with tolerance?';
            } else {
                msjPregunta = 'Are you sure you can reconcile differences??';
            }


            if (msjError === '') {
                Ext.MessageBox.show({
                    title: 'Icon Support',
                    msg: msjPregunta,
                    buttons: Ext.MessageBox.OKCANCEL,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (btn) {
                        if (btn === 'ok') {
                            me.onFileLoadColombia(file, form, tolerancia);
                        }
                    }
                });
            }
        }
    },
    onFileLoadToTemp_bk: function () {



        var me = this;
        let beanValidation = {}

        beanValidation.IN_ACCNUMBER = '***********';
        var fileField = Ext.getCmp(prototype.id + '-file');
        var file = fileField.fileInputEl.dom.files[0];
        let beanString = JSON.stringify(beanValidation);
        if (!file) {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }

        // Crear una instancia de FormData para enviar el archivo
        var formData = new FormData();
        formData.append('excelfile', file);

        // Realizar una solicitud AJAX para cargar el archivo
        Ext.Ajax.request({
            url: prototype.url + '/setUploadLiquivsEC',
            method: 'POST',
            rawData: formData,
            params: {beanString: beanString},
            // Configurar el tipo de contenido adecuado y el encabezado
            headers: {
                'Content-Type': null // Dejar que el navegador establezca el tipo de contenido
            },
            success: function (response) {

                var res = Ext.JSON.decode(response.responseText);
                var msjResult = res.msjResult;
                global.Msg({msg: msjResult});
//                var res = Ext.decode(response.responseText);
//                console.log(res);
//                if (res.success) {
//                    var msjResult = res.msjResult;
////                    let msjResult = res.msjResult;
////                    if(objResult.isInvalid){
////                        global.Msg({msg: "The account number is different"});
////                        return false;
////                    }
//                    console.log('*************************************')
//                    console.log( msjResult)
//                    global.Msg({msg: msjResult});
////                    let numberWithCommas = me.formatNumberWithCommas_string(objResult.netoAcum);
////                    Ext.getCmp(prototype.id + '-de-txtSumAmount').setValue(numberWithCommas);
////                    me.validationAmount();
//                    // No es necesario restaurar el archivo ya que no se borra el campo de archivo
//                } else {
//                    global.Msg({msg: "Error Excel Load"});
//                }
            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },

    onFileLoadToTemp: function (file, form) {

//    console.log('onFileLoadToTemp');

        var me = this;
        let beanValidation = {}

        beanValidation.IN_ACCNUMBER = '***********';
//        var fileField = Ext.getCmp(prototype.id + '-file');
//        var file = fileField.fileInputEl.dom.files[0];

//        var file = Ext.getCmp(prototype.id + '-file').getValue();
        let beanString = JSON.stringify(beanValidation);
        if (!file) {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }

//        var form = Ext.getCmp(prototype.id + '-formLIQvsEC').getForm();

        // Realizar una solicitud AJAX para cargar el archivo
        form.submit({
            url: prototype.url + '/setUploadLiquivsEC',
            waitMsg: 'Uploading your sure to upload the file...',
//            method: 'POST',
//            rawData: formData,
            params: {fileName: file, beanString: beanString},
//            // Configurar el tipo de contenido adecuado y el encabezado
//            headers: {
//                'Content-Type': null // Dejar que el navegador establezca el tipo de contenido
//            },
            success: function (f, o) {

                var res = Ext.decode(o.response.responseText);
                var msjResult = res.msjResult;
                global.Msg({msg: msjResult});

            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },

    onFileLoadColombia: function (file, form, tolerancia) {

        console.log('onFileLoadColombia');

        var me = this;
        let beanValidation = {}

        beanValidation.IN_ACCNUMBER = '***********';
        if (tolerancia) {
            tolerancia = 'Y'
        } else {
            tolerancia = 'N'
        }
//        var fileField = Ext.getCmp(prototype.id + '-file');
//        var file = fileField.fileInputEl.dom.files[0];

//        var file = Ext.getCmp(prototype.id + '-file').getValue();
        let beanString = JSON.stringify(beanValidation);
        if (!file) {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }

//        var form = Ext.getCmp(prototype.id + '-formLIQvsEC').getForm();

        // Realizar una solicitud AJAX para cargar el archivo
        form.submit({
            url: prototype.url + '/setUploadLiquivsECColombia',
            waitMsg: 'Uploading your sure to upload the file...',
//            method: 'POST',
//            rawData: formData,
            params: {fileName: file, beanString: beanString, tolerancia: tolerancia},
//            // Configurar el tipo de contenido adecuado y el encabezado
//            headers: {
//                'Content-Type': null // Dejar que el navegador establezca el tipo de contenido
//            },
            success: function (f, o) {

                var res = Ext.decode(o.response.responseText);
                var msjResult = res.msjResult;
                global.Msg({msg: msjResult});

            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },

    onLoadConciliation: function (obj, e) {
        var win = Ext.create('Ext.window.Window', {
            title: 'Upload file',
            modal: true,
            width: 600,
            bodyPadding: 18,
            resizable: false,
            closable: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            bodyStyle: 'background-color: #F9FAFB; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);',
            defaults: {
                labelAlign: 'right',
                labelWidth: 90,
                margin: '10 0 10 0',
                style: 'background-color:white; border-radius:6px;'
            },
            items: [
                {
                    xtype: 'combo',
                    hidden: true,
//                    id: prototype.id + '-cmbExt',
                    itemId: 'cmbTipo',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                            ["C", "Col"], ["E", "Ext"]
                        ]
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: false,
                    width: 50,
                    value: "C",
                    hidden: false,
                    typeAhead: true,
                    valueField: 'value', displayField: 'description',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    listeners: {
                        change: function (cmb, newValue) {
                            var win = cmb.up('window');

                            var chkTolerance = win.down('#chkTolerance');
                            var lblTolerance = win.down('#lblTolerance');

                            if (newValue === 'E') {
                                chkTolerance.hide();
                                lblTolerance.hide();
                            } else {
                                chkTolerance.show();
                                lblTolerance.show();
                            }
                        }
                    }
                },
                {xtype: 'tbspacer', width: 20, height: 20},
                {
                    xtype: 'form',
                    id: prototype.id + '-formLIQvsEC',
                    itemId: 'formLIQvsEC',
                    border: false,
//                    bodyStyle: 'background-color: #E3EAF9;',
                    items: [{

                            xtype: 'filefield',
//                        id: prototype.id + '-file',
                            itemId: 'file',
                            name: 'excelfile',
                            allowBlank: true,
                            accept: '.xlsx, .xls',
                            labelWidth: 85,
                            width: 300,
                            buttonAlign: 'left',
                            buttonText: 'Select excel...',
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text: '<strong>Select</strong>',
                                width: 60,
                                style: 'margin-right: 10px;' // Agregamos un margen derecho al botón
                            }
                        }]
                },
                {xtype: 'tbspacer', width: 20, height: 20},
                {
                    xtype: 'label',
                    text: 'Tolerance',
                    itemId: 'lblTolerance',
                    align: 'left',
                    width: 50,
                    style: 'text-align: left;',
                    hidden: false,
                    margin: '12 0 0 0'
                },
                {xtype: 'tbspacer', width: 10, height: 20},
                {
                    xtype: 'checkbox',
                    itemId: 'chkTolerance',
                    inputValue: 'Tolerance',
                    name: 'chkTolerance',
                    value: true,
                    boxLabelAlign: 'before',
                    listeners: {
                        change: 'changeTolerance'
                    }
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    iconCls: 'x-fa fa-times',
                    scale: 'medium',
                    style: `
                        background-color: #A9B4C2;
                        color: white;
                        font-weight: bold;
                        border-radius: 6px;
                        padding: 6px 18px;
                    `,
                    handler: function () {
                        win.close();
                    }
                },
                {
                    text: 'Conciliar',
                    iconCls: 'x-fa fa-file-excel',
                    scale: 'medium',
                    style: `
                        background-color: #1E88E5;
                        color: white;
                        font-weight: bold;
                        border-radius: 6px;
                        padding: 6px 22px;
                    `,
                    handler: function () {
                        var tipo = win.down('#cmbTipo').getValue(),
                                file = win.down('#file').getValue(),
//                            form = win.down('#formLIQvsEC').getForm(),
                                form = Ext.getCmp(prototype.id + '-formLIQvsEC').getForm(),
                                tolerancia = win.down('#chkTolerance').getValue();


                        if (!tipo || !file || !form) {
                            Ext.Msg.alert('Error', 'Please select tipo  and file.');
                            return;
                        }
//
//                        var fecha = year + month + day;
//                        Ext.Msg.alert('Selected', 'Generating report for: ' + fecha + ' - Sequence ' + seq);

                        this.onLoadClick_conciliaEC(tipo, file, form, tolerancia)
//                        win.close();
                    },
                    scope: this
                }
            ]
        });

        win.show();
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
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        console.log(me.panelActual, 'me.panelActualme.panelActual')
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-boxDetBank':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataDetailSecundary':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetDay':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetLiquida':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetDetails':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetLiquidaByS':
                me.pagginActual = '-paggin7';
                break;
            case '-boxByLiquida':
                me.pagginActual = '-paggin8';
                break;
            case '-panelGridDetDayByS':
                me.pagginActual = '-paggin9';
                break;
            case '-panelPendings':
                me.pagginActual = '-paggin10';
                break;
            case '-panelGridDetProceByS':
                me.pagginActual = '-paggin11';
                break;
            case '-boxDetProce':
                me.pagginActual = '-paggin12';
                break;
            case '-panelGridDetProceByPend':
                me.pagginActual = '-paggin13';
                break;
            case '-panelGridDetProceLIQ':
                me.pagginActual = '-paggin14';
                break;
            case '-panelGridDetDayProcLIQByS':
                me.pagginActual = '-paggin15';
                break;
            case '-panelGridDetDetailProceByS':
                me.pagginActual = '-paggin16';
                break;
            case '-panelGridDetLiqDetail':
                me.pagginActual = '-paggin17';
                break;
            case '-panelGridDataDetailMPF060':
                me.pagginActual = '-paggin18';
                break;
            case '-panelGridDataCash':
                me.pagginActual = '-paggin19';
                break;
            case '-boxDetLiquiCash':
                me.pagginActual = '-paggin20';
                break;
            case '-boxDetSalesDirect':
                me.pagginActual = '-paggin21';
                break;
            case '-panelGridDataCashDetail':
                me.pagginActual = '-paggin22';
                break;
            case '-panelGridDataCashDashboard':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break;

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
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboToYear: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (comboToYear.getValue() < comboFromYear.getValue()) {
            comboFromYear.setValue(comboToYear.getValue());
        }
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
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
    selectComboToYearCash: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearCash');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearCash');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthCash');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthCash');
        if (comboToYear.getValue() < comboFromYear.getValue()) {
            comboFromYear.setValue(comboToYear.getValue());
        }
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
        if (obj.getValue() != '') {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(false);

        } else {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        }
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
    selectComboFromMonthCash: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthCash');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearCash');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearCash');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthCash');
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
     selectComboFromDayCash: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayCash');
        comboToDay.setValue(obj.getValue());
    },
    selectComboToDay: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateDay');
        if (comboFromMonth.getValue() === comboToMonth.getValue()) {
            if (obj.getValue() < comboFromDay.getValue()) {
                comboFromDay.setValue(obj.getValue());
            }
        }
        if (comboFromDay.getValue() === '') {

            comboFromDay.setValue(obj.getValue())
        }
    },
    /*     
     * Funciones para CASH    
     */
    // 🔹 Función para ocultar los campos (modo CASH)
    ocultarCamposCredit: function () {
        var ids = [
            '-cmbCOREP',
            '-cmbDateSel',
            '-COL',
            '-btnToggleSwitchFT',
            '-EXT',
            '-cmbTDOC',
            '-cmbBank',
            '-cmbExt',
            '-formLIQvsEC',
            '-btn_Concilia_LIQvsEC',
            '-pendingBuss',
            '-labelpendingBuss',
//            '-cmbDateFromYear',',
//            '-cmbDateDay',
//            '-cmbDateToYear',
//            '-cmbDateToMonth',
//            '-cmbDateToDay'
//            '-cmbDateFromMonth



        ];
        console.log("Ocultando campos (Cash)");

        Ext.Array.forEach(ids, function (id) {
            var cmp = Ext.getCmp(prototype.id + id);
            if (cmp) {
                cmp.setVisible(false);
            }
        });

        // 1️⃣ PRIMERO mostrar el contenedor de Fechas
//        var fc = Ext.getCmp(prototype.id + '-fcDateRange');
//        if (fc)
//            fc.setVisible(true);

        // 2️⃣ Luego mostrar los radios (evita colapso visual)
        var cashCmp = Ext.getCmp(prototype.id + '-rbgTypeCASH');
        if (cashCmp) {
            cashCmp.show();
//            cashCmp.updateLayout(); // fuerza re-layout
        }


//        var cntDocSap = Ext.getCmp(prototype.id + '-cntDocSap');
////        var typeSocietyCas22h = Ext.getCmp(prototype.id + '-typeSocietyCas22h');
//        if (cntDocSap) {
//            cntDocSap.setVisible(true);
////            typeSocietyCas22h.setVisible(true);
//            cntDocSap.setMargin('10 0 -10 -30'); // lo alineas  en modo CASH
//        }


    },

    // para ocultar en 

// 🔹 Función para mostrar los campos (modo CREDITCARD)
    mostrarCamposCredit: function () {
        var ids = [
            '-cmbCOREP',
            '-cmbDateSel',
            '-COL',
            '-btnToggleSwitchFT',
            '-EXT',
            '-cmbTDOC',
            '-cmbBank',
            '-cmbExt',
            '-formLIQvsEC',
            '-btn_Concilia_LIQvsEC',
            '-pendingBuss',
            '-labelpendingBuss',
            '-txtBANDOC',
            '-cmbDateFromYear',
            '-cmbDateFromMonth',
            '-cmbDateDay',
            '-cmbDateToYear',
            '-cmbDateToMonth',
            '-cmbDateToDay'


        ];
        console.log("Mostrando campos (CreditCard)");

        Ext.Array.forEach(ids, function (id) {
            var cmp = Ext.getCmp(prototype.id + id);
            if (cmp) {
                cmp.setVisible(true);
            }
        });

        var cashCmp = Ext.getCmp(prototype.id + '-rbgTypeCASH');
        if (cashCmp) {
            cashCmp.setVisible(false);
        }



//        var fc = Ext.getCmp(prototype.id + '-fcDateRange');
//        if (fc) {
//            fc.setVisible(false);
//        }

//        var cntDocSap = Ext.getCmp(prototype.id + '-cntDocSap');
//        if (cntDocSap) {
//            cntDocSap.setMargin('0 0 -20 0'); // regresa a su lugar original
//        }

//        var typeSocietyCas22h = Ext.getCmp(prototype.id + '-typeSocietyCas22h');
//        typeSocietyCas22h.setVisible(false);

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
        console.log(pag, "Esto mueve la pag")
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
    onGridDetLiquidaCash: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetLiquiCash';
        console.log(rowData.data, "Esto es mi detalle");
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var cant = 0;

        switch (columnNum) {
            case 0:
                console.log('ENTRA A FECHA');
                rowData.data.IN_STVAL = "";
                cant = rowData.data.lngQTMATCH;
                break;
            case 1:
                console.log('ENTRA A MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQTMANUAL;
                break;
            case 3:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQMANUAL;
                break;
            case 4:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "3";
                cant = rowData.data.lngQTPEND;
                break;
        }

        // Obtener cuentas seleccionadas
        var selectedAccounts = me.getSelectedAccountCodes();

        // Configurar bean
        this.beanLiquiCash.IN_STVAL = rowData.data.IN_STVAL;
        this.beanLiquiCash.IN_SOCIETY = rowData.data.IN_SOCIETY;
        this.beanLiquiCash.IN_ADATE = rowData.data.SDATE;
        this.beanLiquiCash.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();

        // Llamar función actualizada pasando las cuentas
        this.setGridDataDetLiquidaCash(selectedAccounts);
    },
    setGridDataDetLiquidaCash: function (selectedAccounts) {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();

        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            // Obtener cuentas seleccionadas si no se pasan como parámetro
            if (!selectedAccounts && me.getSelectedAccountCodes) {
                selectedAccounts = me.getSelectedAccountCodes();
            }

            // Actualizar bean con cuentas seleccionadas
            if (selectedAccounts && selectedAccounts.length > 0) {
                var accountsString = selectedAccounts.map(function (account) {
                    return "'" + account + "'";
                }).join(',');
                this.beanLiquiCash.IN_ACCOUNTS = accountsString;
            } else {
                // Si no hay cuentas seleccionadas, enviar array vacío o eliminar propiedad
                this.beanLiquiCash.IN_ACCOUNTS = "";
            }

            // Actualizar parámetros con el bean actualizado
            me.paramsDetail.beanString = JSON.stringify(this.beanLiquiCash);

            console.log('Parámetros enviados:', me.paramsDetail.beanString);

            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetLiquidCash'
                },
                listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj, records, successful, operation) {
                        console.log(obj, 'obAAAAAAAAAAAAAAj');
                        var pag = Ext.getCmp(prototype.id + '-paggin20');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        console.log(obj.data, "Esto es lo que recibo");

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            win.setText('lblTittleCash', data.strTitulo);

                            var response = operation.getResponse();
                            var responseData = Ext.decode(response.responseText);

                            if (responseData.cuentas && Ext.isArray(responseData.cuentas)) {
                                me.loadAccountsCombo(responseData.cuentas, true);
                            }
                        }
                    }
                }
            });

//            global.clear();
            Ext.getCmp(prototype.id + '-gridDetLiquiCash').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin20').bindStore(storeGridDatas);
        }
    },
    getSelectedAccountCodes: function () {
        var combo = Ext.getCmp(prototype.id + '-typeSocietyCas22h');

        if (!combo || !combo.store) {
            return "";
        }

        var selectedCodes = [];

        combo.store.each(function (record) {
            if (record.get('checked')) {
                selectedCodes.push(record.get('code'));
            }
        });

        return selectedCodes.join(',');
    },
    loadAccountsCombo: function (cuentasArray, preserveSelections) {
        var combo = Ext.getCmp(prototype.id + '-typeSocietyCas22h');

        if (!combo) {
            console.error('Combo no encontrado:', prototype.id + '-typeSocietyCas22h');
            return;
        }

        // Guardar las selecciones actuales ANTES de limpiar
        var previousSelections = [];
        if (preserveSelections && combo.store) {
            combo.store.each(function (record) {
                if (record.get('checked')) {
                    previousSelections.push(record.get('code'));
                }
            });
            console.log('Selecciones anteriores a preservar:', previousSelections);
        }

        var storeData = [];

        Ext.each(cuentasArray, function (cuenta) {
            if (cuenta && cuenta.trim() !== '') {
                var cuentaCode = cuenta.trim();
                var wasSelected = false;

                // Verificar si esta cuenta estaba seleccionada anteriormente
                if (preserveSelections && previousSelections.indexOf(cuentaCode) !== -1) {
                    wasSelected = true;
                    console.log('Preservando selección para cuenta:', cuentaCode);
                }

                storeData.push({
                    code: cuentaCode,
                    name: cuentaCode,
                    checked: wasSelected
                });
            }
        });

        storeData.sort(function (a, b) {
            return a.code.localeCompare(b.code);
        });

        // Cargar nuevos datos preservando selecciones
        combo.store.loadData(storeData);

        // Sincronizar el valor del combo con las selecciones preservadas
        if (preserveSelections && previousSelections.length > 0) {
            // Filtrar solo las cuentas que existen en los nuevos datos
            var validSelections = previousSelections.filter(function (code) {
                return storeData.some(function (item) {
                    return item.code === code;
                });
            });

            if (validSelections.length > 0) {
                combo.setValue(validSelections);
                console.log('Selecciones restauradas:', validSelections);
            }
        }

        // 🔥🔥🔥 CLAVE: Forzar la actualización del picker 🔥🔥🔥
        if (combo.isExpanded) {
            // Si el combo está abierto, cerrarlo y abrirlo para forzar re-render
            combo.collapse();

            // Usar timeout para asegurar que se cierra antes de abrir
            Ext.defer(function () {
                if (combo.isVisible()) {
                    combo.expand();
                }
            }, 100);
        } else {
            // Si no está abierto, actualizar el picker directamente
            var picker = combo.getPicker();
            if (picker) {
                picker.refresh();
            }
        }

        combo.setHidden(false);
        combo.setEmptyText('Select accounts (' + storeData.length + ' available)');

        console.log('Cuentas cargadas en combo:', storeData.length, storeData);

        // Verificar datos en consola
        combo.store.each(function (record, index) {
            console.log('Record', index, ':',
                    'code:', record.get('code'),
                    'checked:', record.get('checked'));
        });

        // Retornar número de selecciones preservadas
        return previousSelections.length;
    },
    clearAccountsCombo: function () {
        var combo = Ext.getCmp(prototype.id + '-typeSocietyCas22h');

        if (!combo) {
            console.error('Combo no encontrado:', prototype.id + '-typeSocietyCas22h');
            return;
        }

        if (combo.store) {
            combo.store.removeAll();
        }

        combo.setValue(null);
        combo.clearValue();

        combo.setEmptyText('No accounts available');

        combo.setHidden(true);

        console.log('Combo de cuentas vaciado');
    },
    onCustomerSelect: function (combo, records) {
        console.log('Registros seleccionados:', records);
        console.log('combo', combo);
        // Obtener valores seleccionados
        const selectedValues = combo.getValue() || [];
        const selectedArray = typeof selectedValues === 'string' ?
                selectedValues.split(',') :
                selectedValues;

        console.log('Valores seleccionados:', selectedArray);

        // Actualizar campo 'checked' en el store
        const store = combo.getStore();
        store.each(function (record) {
            const code = record.get('code');
            const isSelected = selectedArray.includes(code);
            record.set('checked', isSelected);
        });
    }

}
);